import Link from 'next/link'
import HeadshotGreeting from '@/components/HeadshotGreeting'
import { NutshellNut } from '@/components/NutshellNut'
import { quickLinkClassName } from '@/lib/quick-link'

const h2Style = {
  fontFamily: 'var(--font-markazi), serif',
  fontSize: '1.5rem',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginBottom: '0.25rem',
}

const mutedStyle = { color: 'hsl(var(--muted-foreground))' }

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 md:py-24">
      <section className="mb-10" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
        <div>
          <h1 style={{ ...h2Style, marginBottom: '0.25rem' }}>
            Hi! I&rsquo;m Jacqui.
          </h1>
          <p style={{ ...mutedStyle, lineHeight: 1.7 }}>
            Welcome to my space of personal curiosities.
          </p>
        </div>
        <HeadshotGreeting />
      </section>
      <section className="mb-10">
        <h2 style={h2Style}>Quick Links</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            <Link href="/writing" className={quickLinkClassName}>
              Writing
            </Link>
            <span style={mutedStyle}> occasionally</span>
          </li>
          <li>
            <Link href="/building" className={quickLinkClassName}>Building</Link>
            <span style={mutedStyle}> things with people smarter than me</span>
          </li>
          <li>
            <Link href="/reading" className={quickLinkClassName}>Reading</Link>
            <span style={mutedStyle}> something depressing, probably</span>
          </li>
        </ul>
      </section>
      <section>
        <h2 style={h2Style} className="flex items-center gap-1.5">
          Me in a nutshell
          <NutshellNut />
        </h2>
        <div style={{ ...mutedStyle, lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p>
            I&rsquo;m an Aussie software engineer and designer based in London.
          </p>
          <p>
            I have a knack for translating complex technical concepts into everyday language.
            I obsess over the details, and I love building thoughtful products that delight users.
          </p>
          <p>
            Outside of work, I&rsquo;m into art, languages, AFL, and F1. I have a
            concerning obsession with dark history and dystopian fiction.
            I&rsquo;m glad you&rsquo;re here! Thanks for stopping by.
          </p>
        </div>
      </section>
    </div>
  )
}
