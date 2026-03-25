'use client'

import type { Heading } from '@/lib/posts'

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const items = headings.filter((h) => h.level === 2 || h.level === 3)
  if (items.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      style={{
        position: 'sticky',
        top: '6rem',
        borderRight: '1px solid hsl(var(--border))',
        paddingRight: '1.5rem',
      }}
    >
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {items.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? '0.75rem' : '0' }}>
            <a
              href={`#${h.id}`}
              className="block text-[0.8rem] leading-snug text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
