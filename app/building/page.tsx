import { quickLinkClassName } from '@/lib/quick-link'
import { TrackedLink } from '@/components/TrackedLink'

export const metadata = { title: 'Building', description: 'Projects and products built by Jacqui Shadforth.' }

const projects = [
  {
    name: 'bułka.com',
    url: 'https://bułka.com',
    description: "A blog about travel, food, and bread.",
    icon: '🍞',
    stack: 'Next.js, TypeScript, MDX',
    live: true,
  },
  {
    name: 'donutdriven.dev',
    url: 'https://donutdriven.dev',
    description: 'A rewards platform simplifying recognition and celebrations for remote teams.',
    icon: '🍩',
    stack: 'Next.js, TypeScript, PostgreSQL, Auth0, Stripe',
    live: true,
  },
  {
    name: 'polish.jacqui.sh',
    url: 'https://polish.jacqui.sh',
    description: 'A web app for practicing your Polish vocabulary.',
    icon: '🇵🇱',
    stack: 'React, TypeScript, PostgreSQL, PWA',
    wip: true,
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
        Last updated: 26 March 2026
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
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span className="flex items-baseline gap-1">
                <TrackedLink href={p.url} eventName="external_link_click" eventData={{ label: p.name, location: 'building' }} external className={quickLinkClassName}>
                  {p.name}
                </TrackedLink>
                {p.live && (
                  <span className="group relative">
                    <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.6rem', opacity: 0.5, cursor: 'default' }}>▲</span>
                    <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap rounded px-2 py-0.5 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ background: 'hsl(var(--foreground))', color: 'hsl(var(--background))' }}>
                      live
                    </span>
                  </span>
                )}
                {p.wip && (
                  <span className="group relative">
                    <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem', opacity: 0.5, cursor: 'default' }}>⏸</span>
                    <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap rounded px-2 py-0.5 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ background: 'hsl(var(--foreground))', color: 'hsl(var(--background))' }}>
                      shelved
                    </span>
                  </span>
                )}
              </span>
              <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem', opacity: 0.55 }}>
                {'{ '}{p.stack}{' }'}
              </span>
            </div>
            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {p.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
