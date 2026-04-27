import Image from 'next/image'

export const metadata = {
  title: 'Creating',
  description: 'Creative work by Jacqui Shadforth — pixel art, baking, and painting.',
}

const pixelArt = [
  { src: '/media/creating/pixel-art/grandma.png', alt: 'Grandmother Fa, Mulan' },
  { src: '/media/creating/pixel-art/jigglypuff.png', alt: 'Jigglypuff' },
  { src: '/media/creating/pixel-art/oh-the-ironing.png', alt: 'Oh, the ironing' },
  { src: '/media/creating/pixel-art/phoenix-arizona.png', alt: 'Phoenix, Arizona' },
  { src: '/media/creating/pixel-art/red-house.png', alt: 'Somewhere in Scandinavia' },
  { src: '/media/creating/pixel-art/sky-hotel.png', alt: 'Sky hotel' },
  { src: '/media/creating/pixel-art/spyro.png', alt: 'Spyro' },
  { src: '/media/creating/pixel-art/witch.png', alt: 'Witch, please' },
  { src: '/media/creating/pixel-art/pigeon.gif', alt: 'Pidgi' },
]

const baking = [
  { src: '/media/creating/baking/bagels.jpeg', alt: 'Bagels' },
  { src: '/media/creating/baking/english-muffins.jpeg', alt: 'English muffins' },
  { src: '/media/creating/baking/macarons.jpeg', alt: 'Macarons' },
  { src: '/media/creating/baking/sourdough.jpeg', alt: 'Sourdough' },
  { src: '/media/creating/baking/choux.jpeg', alt: 'Choux' },
]

const painting = [
  { src: '/media/creating/painting/01.jpeg', alt: 'Painting study' },
  { src: '/media/creating/painting/02.jpeg', alt: 'Painting study' },
  { src: '/media/creating/painting/03.jpeg', alt: 'Painting study' },
  { src: '/media/creating/painting/04.jpeg', alt: 'Painting study' },
  { src: '/media/creating/painting/05.jpeg', alt: 'Painting study' },
  { src: '/media/creating/painting/06.jpeg', alt: 'Painting study' },
]

const h2Style = {
  fontFamily: 'var(--font-markazi), serif',
  fontSize: '1.5rem',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginBottom: '0.5rem',
}

function ImageGrid({
  items,
  pixelated = false,
  priorityFirst = false,
}: {
  items: { src: string; alt: string }[]
  pixelated?: boolean
  priorityFirst?: boolean
}) {
  if (items.length === 0) {
    return (
      <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>Coming soon.</p>
    )
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '1rem',
      }}
    >
      {items.map((item, i) => (
        <div
          key={item.src}
          className="group relative aspect-square min-h-0 w-full overflow-hidden rounded-sm"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            priority={priorityFirst && i === 0}
            className={`object-cover${pixelated ? ' image-rendering-pixelated' : ''}`}
            sizes="(max-width: 640px) 33vw, 22vw"
          />
          <div
            className="pointer-events-none absolute inset-0 flex items-end p-2 opacity-0 transition-opacity group-hover:opacity-100"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 500 }}>{item.alt}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CreatingPage() {
  return (
    <div
      className="container mx-auto max-w-2xl px-4 py-16 md:py-24"
      style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}
    >
      <section>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '0.25rem',
          }}
        >
          <h2 style={{ ...h2Style, marginBottom: 0 }}>Pixel art</h2>
          <span
            style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem', opacity: 0.55 }}
          >
            <span style={{ fontWeight: 500 }}>Medium</span>: Aseprite
          </span>
        </div>
        <p
          style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, marginBottom: '1.5rem' }}
        >
          A certain 2000s isometric chatroom sparked a pixel art obsession that never really faded.
        </p>
        <ImageGrid items={pixelArt} pixelated priorityFirst />
      </section>

      <section>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '0.25rem',
          }}
        >
          <h2 style={{ ...h2Style, marginBottom: 0 }}>Painting</h2>
          <span
            style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem', opacity: 0.55 }}
          >
            <span style={{ fontWeight: 500 }}>Medium</span>: Acrylics on claybord
          </span>
        </div>
        <p
          style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, marginBottom: '1.5rem' }}
        >
          Jim Musil&rsquo;s{' '}
          <a
            href="https://jimmusil.com/learn"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            landscape
          </a>{' '}
          course is brilliant for deconstructing the mechanics. The fear of being crap at a new
          medium never leaves—I&rsquo;m just getting better at sitting with it.
        </p>
        <ImageGrid items={painting} />
      </section>

      <section>
        <h2 style={h2Style}>Baking</h2>
        <ImageGrid items={baking} />
      </section>
    </div>
  )
}
