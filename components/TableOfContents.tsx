'use client'

import type { Heading } from '@/lib/posts'

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const items = headings.filter((h) => h.level === 2 || h.level === 3)
  if (items.length === 0) return null

  return (
    <nav aria-label="Table of contents" style={{ paddingRight: '1.5rem' }}>
      <p
        style={{
          fontSize: '1.1rem',
          fontFamily: 'var(--font-markazi), serif',
          color: 'hsl(var(--foreground))',
          marginBottom: '0.25rem',
        }}
      >
        On this page
      </p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {items.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? '0.75rem' : '0' }}>
            <a
              href={`#${h.id}`}
              className="block text-[0.8rem] leading-snug text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-2"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
