import { ImageResponse } from 'next/og'
import { getPost } from '@/lib/posts'

export const alt = 'Post'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)

  return new ImageResponse(
    <div
      style={{
        background: '#f7f3ec',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 58,
          fontWeight: 700,
          color: '#1a1a1a',
          lineHeight: 1.2,
          marginBottom: 32,
          maxWidth: '900px',
        }}
      >
        {post?.title ?? 'Post'}
      </div>
      <div style={{ fontSize: 28, color: '#888' }}>jacqui.sh</div>
    </div>,
    { ...size }
  )
}
