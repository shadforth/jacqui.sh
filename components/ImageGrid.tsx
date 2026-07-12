'use client'

import Image from 'next/image'
import { useLightbox } from '@/components/LightboxProvider'

interface ImageGridItem {
  src: string
  alt: string
}

export function ImageGrid({
  items,
  offset,
  pixelated = false,
  priorityFirst = false,
}: {
  items: ImageGridItem[]
  offset: number
  pixelated?: boolean
  priorityFirst?: boolean
}) {
  const { openAt } = useLightbox()

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
        <button
          key={item.src}
          type="button"
          onClick={() => openAt(offset + i)}
          aria-label={item.alt}
          className="group relative aspect-square min-h-0 w-full cursor-pointer overflow-hidden rounded-sm border-0 bg-transparent p-0"
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
            <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 500 }}>
              {item.alt}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
