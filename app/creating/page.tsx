import { LightboxProvider, type GalleryItem } from '@/components/LightboxProvider'
import { ImageGrid } from '@/components/ImageGrid'

export const metadata = {
  title: 'Creating',
  description: 'Creative work by Jacqui Shadforth — pixel art, baking, and sewing.',
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
  { src: '/media/creating/baking/pastel-de-nata.jpeg', alt: 'Pastel de nata' },
]

const sewing = [
  { src: '/media/creating/sewing/canvas-tote.jpeg', alt: 'Canvas tote bag' },
  { src: '/media/creating/sewing/corduroy-bag.jpeg', alt: 'Corduroy bag' },
  { src: '/media/creating/sewing/corduroy-pouch.jpeg', alt: 'Corduroy pouch' },
  { src: '/media/creating/sewing/cotton-pouch.jpeg', alt: 'Blue floral cotton pouch' },
  { src: '/media/creating/sewing/canvas-duffel-progress.jpeg', alt: 'Canvas duffel bag, wip' },
  { src: '/media/creating/sewing/canvas-duffel.jpeg', alt: 'Canvas duffel bag' },
]

const withCategory = (
  category: string,
  items: { src: string; alt: string }[],
  pixelated = false
): GalleryItem[] => items.map((item) => ({ ...item, category, pixelated }))

const allItems: GalleryItem[] = [
  ...withCategory('Pixel art', pixelArt, true),
  ...withCategory('Baking', baking),
  ...withCategory('Sewing', sewing),
]

const pixelArtOffset = 0
const bakingOffset = pixelArt.length
const sewingOffset = pixelArt.length + baking.length

const h2Style = {
  fontFamily: 'var(--font-dm-sans), sans-serif',
  fontSize: '1.0rem',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  marginBottom: '0.5rem',
}

export default function CreatingPage() {
  return (
    <LightboxProvider items={allItems}>
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
            style={{
              color: 'hsl(var(--muted-foreground))',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            A certain 2000s isometric chatroom—whose name I dare not utter here—sparked a pixel
            art obsession that never really faded.
          </p>
          <ImageGrid items={pixelArt} offset={pixelArtOffset} pixelated priorityFirst />
        </section>

        <section>
          <h2 style={h2Style}>Baking</h2>
          <ImageGrid items={baking} offset={bakingOffset} />
        </section>

        <section>
          <h2 style={h2Style}>Sewing</h2>
          <p
            style={{
              color: 'hsl(var(--muted-foreground))',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            A desire to hem my own jeans and fix all these oversized tech t-shirts from fitting
            like dressesヽ(｀Д´#)ﾉ ﾑｷｰ ...has spiralled into a full-blown love for making bags. (
            ˶˘ ³˘)♡
          </p>
          <ImageGrid items={sewing} offset={sewingOffset} />
        </section>
      </div>
    </LightboxProvider>
  )
}
