import { quickLinkClassName } from '@/lib/quick-link'

export const metadata = { title: 'Building — jacqui.sh' }

const projects = [
  {
    name: 'bułka.com',
    url: 'https://bułka.com',
    description: "A blog about travel, food, and bread.",
    icon: '🍞',
  },
  {
    name: 'donutdriven.dev',
    url: 'https://donutdriven.dev',
    description: 'A rewards platform simplifying recognition and celebrations for remote teams.',
    icon: '🍩',
  },
]

const h1Style = {
  fontFamily: 'var(--font-markazi), serif',
  fontSize: '1.5rem',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginBottom: '0.5rem',
}

export default function BuildingPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 md:py-24">
      <h1 style={h1Style}>Building</h1>
      <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, marginBottom: '2.5rem' }}>
        Last updated: 25 March 2026
      </p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {projects.map((p) => (
          <li key={p.name} style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '-2rem',
              width: '1.5rem',
              textAlign: 'right',
              fontSize: '0.85rem',
              opacity: 0.5,
              top: '0.1em',
            }}>{p.icon}</span>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={quickLinkClassName}
            >
              {p.name}
            </a>
            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {p.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
