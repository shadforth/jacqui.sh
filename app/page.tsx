export const revalidate = 60

import type { Metadata } from 'next'
import Link from 'next/link'
import HeadshotGreeting from '@/components/HeadshotGreeting'
import { KaomojiWave } from '@/components/KaomojiWave'
import { NutshellNut } from '@/components/NutshellNut'
import { CurrentMedia } from '@/components/CurrentMedia'
import { PixelSun } from '@/components/PixelSun'
import { quickLinkClassName } from '@/lib/quick-link'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://jacqui.sh',
  },
}

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 md:py-16">
      <section className="hero-sunrise mb-4">
        <PixelSun className="hero-sun" />
        <div className="hero-copy">
          <h1 className="hero-title">
            Hi! I&rsquo;m
            <br />
            Jacqui.
          </h1>
          <p className="hero-role">
            <span>Software developer</span>
            <em>and designer</em>
          </p>
        </div>
      </section>
      <p className="text-muted-body mb-10">Welcome to my space of personal curiosities.</p>

      <section className="mb-14">
        <h2 className="heading-pixel">Quick links</h2>
        <ul className="quick-links-list">
          <li>
            <Link href="/writing" className={quickLinkClassName}>
              Writing
            </Link>
            <span className="text-muted">
              {' '}
              occasionally about software, systems, and other detours
            </span>
          </li>
          <li>
            <Link href="/building" className={quickLinkClassName}>
              Building
            </Link>
            <span className="text-muted"> software and tools with people smarter than me</span>
          </li>
          <li>
            <Link href="/creating" className={quickLinkClassName}>
              Creating
            </Link>
            <span className="text-muted"> art, food, and whatever else takes my fancy</span>
          </li>
          <li>
            <Link href="/reading" className={quickLinkClassName}>
              Reading
            </Link>
            <span className="text-muted"> something depressing, probably</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="heading-pixel flex items-center gap-1.5">
          Me in a nutshell
          <NutshellNut />
        </h2>
        <div className="float-right mb-3 ml-5 mt-1">
          <HeadshotGreeting />
        </div>
        <div className="text-muted-body content-stack">
          <p>I&rsquo;m an Aussie software developer and designer based in London.</p>
          <p>
            I have a knack for translating complex technical concepts into everyday language. I
            obsess over the details, and I love building thoughtful products that delight users.
          </p>
          <p>
            Outside of work, I&rsquo;m into art, languages, AFL, and F1. I have a concerning
            obsession with dark history and dystopian fiction. My outlook on life is shaped by
            spiritual and Buddhist values, thanks in large part to my mum&rsquo;s Thai heritage. I
            strive for humility, curiosity, and seeing the best in others. Always a work in
            progress. <KaomojiWave />
          </p>
          <p>I&rsquo;m glad you&rsquo;re here! Thanks for stopping by.</p>
        </div>
      </section>
      <section className="mt-2">
        <span className="homepage-last-updated">
          <span className="font-medium">Last updated</span>: 10 October 2026
        </span>
      </section>

      <CurrentMedia />
    </div>
  )
}
