interface PixelSunProps {
  className?: string
}

interface Pixel {
  x: number
  y: number
  colour: string
}

const GRID = 24
const CENTRE = (GRID - 1) / 2
const RADIUS_SQUARED = 132
// Token name with a fallback, so the sun keeps its colours even if the
// theme variables have not loaded yet
const BANDS = [
  '--maroon, 350 55% 30%',
  '--rose, 352 38% 48%',
  '--slate, 215 28% 42%',
  '--navy, 222 50% 22%',
]

// Striped sunset drawn on a pixel grid: colour bands top to bottom, with gaps
// in the lower half like a 70s poster sun
const PIXELS: Pixel[] = Array.from({ length: GRID * GRID }, (_, i) => ({
  x: i % GRID,
  y: Math.floor(i / GRID),
}))
  .filter(({ x, y }) => {
    const dx = x - CENTRE
    const dy = y - CENTRE
    if (dx * dx + dy * dy > RADIUS_SQUARED) return false
    return !(y > GRID / 2 && y % 3 === 0)
  })
  .map(({ x, y }) => ({
    x,
    y,
    colour: `hsl(var(${BANDS[Math.min(BANDS.length - 1, Math.floor(y / 6))]}))`,
  }))

export const PixelSun = ({ className }: PixelSunProps): React.ReactElement => (
  <svg
    className={className}
    viewBox={`0 0 ${GRID} ${GRID}`}
    width={240}
    height={240}
    shapeRendering="crispEdges"
    aria-hidden="true"
    focusable="false"
  >
    {PIXELS.map(({ x, y, colour }) => (
      <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={colour} />
    ))}
  </svg>
)
