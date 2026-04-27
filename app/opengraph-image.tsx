import { ImageResponse } from 'next/og'

export const alt = 'jacqui.sh'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#f7f3ec',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-2px' }}>
        jacqui.sh
      </div>
      <div style={{ fontSize: 32, color: '#666', marginTop: 20 }}>
        Personal site of Jacqui Shadforth
      </div>
    </div>,
    { ...size }
  )
}
