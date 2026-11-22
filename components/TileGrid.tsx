'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { track } from '@vercel/analytics'

type TileShape =
  | 'quarter-top-left'
  | 'quarter-top-right'
  | 'quarter-bottom-right'
  | 'quarter-bottom-left'
  | 'circle'
  | 'square'
  | 'half'
  | 'dot'

type TileColour = '--maroon' | '--navy' | '--rose' | '--slate' | '--paper'

interface Tile {
  shape: TileShape
  colour: TileColour
}

const SHAPES: TileShape[] = [
  'quarter-top-left',
  'quarter-top-right',
  'quarter-bottom-right',
  'quarter-bottom-left',
  'circle',
  'square',
  'half',
  'dot',
]
const COLOURS: TileColour[] = ['--maroon', '--navy', '--rose', '--slate']

// Mid-century cut-paper composition, read left to right, top to bottom
const INITIAL_TILES: Tile[] = [
  { shape: 'quarter-top-left', colour: '--maroon' },
  { shape: 'circle', colour: '--navy' },
  { shape: 'square', colour: '--rose' },
  { shape: 'quarter-bottom-right', colour: '--navy' },
  { shape: 'half', colour: '--maroon' },
  { shape: 'quarter-top-right', colour: '--slate' },
  { shape: 'square', colour: '--paper' },
  { shape: 'quarter-bottom-left', colour: '--rose' },
  { shape: 'dot', colour: '--maroon' },
]

// Every shape is built from the same three properties (radius, scale, colour)
// so tiles morph smoothly from one shape into another
const SHAPE_STYLES: Record<TileShape, CSSProperties> = {
  'quarter-top-left': { borderRadius: '100% 0 0 0' },
  'quarter-top-right': { borderRadius: '0 100% 0 0' },
  'quarter-bottom-right': { borderRadius: '0 0 100% 0' },
  'quarter-bottom-left': { borderRadius: '0 0 0 100%' },
  circle: { borderRadius: '50%' },
  square: { borderRadius: '0' },
  half: {
    borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
    transform: 'scaleY(0.5)',
    transformOrigin: 'bottom center',
  },
  dot: { borderRadius: '50%', transform: 'scale(0.4)' },
}

const MORPH_DURATION_MS = 900
const PIXEL_SIZE = 6

const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

const randomTile = (current: Tile, allowPaper: boolean): Tile => {
  if (allowPaper && Math.random() < 0.12) return { shape: 'square', colour: '--paper' }
  const shape = pick(SHAPES.filter((s) => s !== current.shape))
  return { shape, colour: pick(COLOURS) }
}

const nextPattern = (tiles: Tile[]): Tile[] => {
  const paperSlot = Math.floor(Math.random() * tiles.length)
  return tiles.map((tile, i) => randomTile(tile, i === paperSlot))
}

const tileStyle = ({ shape, colour }: Tile): CSSProperties => ({
  backgroundColor: `hsl(var(${colour}))`,
  transform: 'none',
  ...SHAPE_STYLES[shape],
})

export const TileGrid = (): React.ReactElement => {
  const [tiles, setTiles] = useState<Tile[]>(INITIAL_TILES)
  const [isMorphing, setIsMorphing] = useState<boolean>(false)
  const morphTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (morphTimer.current) clearTimeout(morphTimer.current)
    }
  }, [])

  const handleClick = () => {
    setTiles(nextPattern)
    setIsMorphing(true)
    if (morphTimer.current) clearTimeout(morphTimer.current)
    morphTimer.current = setTimeout(() => setIsMorphing(false), MORPH_DURATION_MS)
    track('tiles_shuffled')
  }

  return (
    <button
      type="button"
      className={isMorphing ? 'tile-grid is-morphing' : 'tile-grid'}
      onClick={handleClick}
      aria-label="Rearrange the decorative shapes"
      title="Click me!"
    >
      {/* Pixelate filter: samples one colour per block and grows it to fill the block */}
      <svg className="tile-grid-filter" aria-hidden="true" focusable="false">
        <filter id="tile-pixelate" x="0" y="0" width="100%" height="100%">
          <feFlood x={PIXEL_SIZE / 2} y={PIXEL_SIZE / 2} height="1" width="1" />
          <feComposite width={PIXEL_SIZE} height={PIXEL_SIZE} />
          <feTile result="grid" />
          <feComposite in="SourceGraphic" in2="grid" operator="in" />
          <feMorphology operator="dilate" radius={PIXEL_SIZE / 2} />
        </filter>
      </svg>
      {tiles.map((tile, i) => (
        <span key={i} className="tile" style={tileStyle(tile)} />
      ))}
    </button>
  )
}
