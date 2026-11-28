import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'
import { getPost } from '@/lib/posts'

export const alt = 'Post preview'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadFonts() {
  const fontsDir = path.join(process.cwd(), 'public/fonts')
  const [loraBold, dmSans, vt323] = await Promise.all([
    readFile(path.join(fontsDir, 'lora-bold.ttf')),
    readFile(path.join(fontsDir, 'dmsans.ttf')),
    readFile(path.join(fontsDir, 'vt323.ttf')),
  ])
  return [
    { name: 'Lora', data: loraBold.buffer as ArrayBuffer, weight: 700 as const, style: 'normal' as const },
    { name: 'DM Sans', data: dmSans.buffer as ArrayBuffer, weight: 400 as const, style: 'normal' as const },
    { name: 'VT323', data: vt323.buffer as ArrayBuffer, weight: 400 as const, style: 'normal' as const },
  ]
}

async function loadImage(imagePath: string): Promise<string | null> {
  try {
    const absPath = path.join(process.cwd(), 'public', imagePath)
    const buffer = await readFile(absPath)
    const ext = path.extname(imagePath).toLowerCase()
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg'
    return `data:${mime};base64,${buffer.toString('base64')}`
  } catch {
    return null
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)

  const title = post?.title ?? 'jacqui.sh'
  const description = post?.description
  const categories = post?.categories?.slice(0, 4) ?? []
  const ogCardImage = post?.ogCardImage ?? null
  const ogCardImagePosition = post?.ogCardImagePosition ?? 'center'

  const [fonts, imageDataUri] = await Promise.all([
    loadFonts(),
    ogCardImage ? loadImage(ogCardImage) : Promise.resolve(null),
  ])

  const hasImage = !!imageDataUri
  const textWidth = hasImage ? 700 : 1200

  // Font size scales with title length, but tighter when image is present
  const titleFontSize = hasImage
    ? title.length > 60 ? 38 : title.length > 40 ? 44 : 52
    : title.length > 60 ? 46 : title.length > 40 ? 54 : 64

  return new ImageResponse(
    (
      <div
        style={{
          background: '#f5f0e8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
        }}
      >
        {/* Text panel */}
        <div
          style={{
            width: textWidth,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '52px 56px 52px 80px',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {/* Left accent bar */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '8px',
              background: '#75132A',
              display: 'flex',
            }}
          />

          {/* Site name */}
          <div
            style={{
              fontSize: 28,
              fontFamily: 'VT323',
              fontWeight: 400,
              color: '#75132A',
              letterSpacing: '0.08em',
              display: 'flex',
            }}
          >
            jacqui.sh
          </div>

          {/* Title + description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center' }}>
            <div
              style={{
                fontSize: titleFontSize,
                fontFamily: 'Lora',
                fontWeight: 700,
                color: '#352012',
                lineHeight: 1.1,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {title}
            </div>

            {description && (
              <div
                style={{
                  fontSize: hasImage ? 22 : 26,
                  fontFamily: 'DM Sans',
                  fontWeight: 400,
                  color: '#796055',
                  lineHeight: 1.4,
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {description}
              </div>
            )}
          </div>

          {/* Footer: tags */}
          {categories.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
              {categories.map((cat) => (
                <div
                  key={cat}
                  style={{
                    background: 'rgba(117, 19, 42, 0.1)',
                    color: '#75132A',
                    padding: '6px 14px',
                    fontSize: 18,
                    fontFamily: 'DM Sans',
                    fontWeight: 400,
                    borderRadius: '4px',
                    display: 'flex',
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image panel */}
        {hasImage && (
          <div
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            <img
              src={imageDataUri as string}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: ogCardImagePosition,
              }}
            />
          </div>
        )}
      </div>
    ),
    { ...size, fonts }
  )
}
