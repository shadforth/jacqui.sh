import Image from 'next/image'

export default function HeadshotGreeting() {
  return (
    <div style={{ flexShrink: 0, width: 120, height: 120 }}>
      <Image
        src="/media/profile/headshot.jpeg"
        alt="Jacqui Shadforth"
        width={120}
        height={120}
        priority
        style={{
          objectFit: 'cover',
          borderRadius: '0.5rem',
          display: 'block',
        }}
      />
    </div>
  )
}
