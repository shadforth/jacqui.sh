import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'

export const alt = 'jacqui.sh'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fontsDir = path.join(process.cwd(), 'public/fonts')
  const [loraBold, dmSans, vt323] = await Promise.all([
    readFile(path.join(fontsDir, 'lora-bold.ttf')),
    readFile(path.join(fontsDir, 'dmsans.ttf')),
    readFile(path.join(fontsDir, 'vt323.ttf')),
  ])

  const fonts = [
    { name: 'Lora', data: loraBold.buffer as ArrayBuffer, weight: 700 as const, style: 'normal' as const },
    { name: 'DM Sans', data: dmSans.buffer as ArrayBuffer, weight: 400 as const, style: 'normal' as const },
    { name: 'VT323', data: vt323.buffer as ArrayBuffer, weight: 400 as const, style: 'normal' as const },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          background: '#f5f0e8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px 56px 80px',
          position: 'relative',
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

        {/* Top label */}
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

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              fontSize: 80,
              fontFamily: 'Lora',
              fontWeight: 700,
              color: '#352012',
              lineHeight: 1.05,
              display: 'flex',
            }}
          >
            jacqui.sh
          </div>
          <div
            style={{
              fontSize: 28,
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: '#796055',
              lineHeight: 1.4,
              display: 'flex',
            }}
          >
            Writing, reading, creating, and building.
          </div>
        </div>

        <div style={{ display: 'flex', height: '36px' }} />
      </div>
    ),
    { ...size, fonts }
  )
}
