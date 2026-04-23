'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { BookOpen, Code2, Menu, Paintbrush, Pencil, X } from 'lucide-react'
import { track } from '@vercel/analytics'

const navItems = [
  { label: 'writing', href: '/writing', icon: <Pencil className="h-3.5 w-3.5 shrink-0" /> },
  { label: 'building', href: '/building', icon: <Code2 className="h-3.5 w-3.5 shrink-0" /> },
  { label: 'creating', href: '/creating', icon: <Paintbrush className="h-3.5 w-3.5 shrink-0" /> },
  { label: 'reading', href: '/reading', icon: <BookOpen className="h-3.5 w-3.5 shrink-0" /> },
]

const navLinkClass = (isActive: boolean) =>
  `flex items-center gap-1.5 text-sm lowercase underline-offset-4 transition-colors hover:text-[hsl(var(--accent))] hover:underline ${
    isActive ? 'text-foreground underline' : 'text-muted-foreground no-underline'
  }`

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [glitching, setGlitching] = useState(false)
  const glitchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChaoticGoodClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (glitching) return
    setGlitching(true)
    glitchTimer.current = setTimeout(() => {
      setGlitching(false)
      router.push('/')
    }, 800)
  }, [glitching, router])

  useEffect(() => () => { if (glitchTimer.current) clearTimeout(glitchTimer.current) }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <header style={{ borderBottom: '1px solid hsl(var(--border))' }}>
        <div className="container mx-auto max-w-2xl px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="header-brand group rounded-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] flex min-w-0 flex-1 flex-col items-start gap-0 leading-none"
              style={glitching ? { animation: 'pokemonGlitch 0.8s linear forwards' } : undefined}
            >
              <span
                className="transition-colors duration-150 group-hover:text-[hsl(var(--muted-foreground))]"
                style={{
                  fontFamily: 'var(--font-markazi), serif',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  lineHeight: 1.15,
                }}
              >
                Jacqui Shadforth
              </span>
              <span
                className="-mt-0.5"
                style={{
                  textTransform: 'lowercase',
                  fontFamily: 'var(--font-fredoka), sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  lineHeight: 1.2,
                  color: 'inherit',
                  opacity: 0.85,
                }}
              >
                <span className="transition-colors duration-150 group-hover:text-[hsl(var(--muted-foreground))]">
                  Engineer
                </span>
                <span aria-hidden className="text-muted-foreground">
                  {' '}
                  ·{' '}
                </span>
                <span className="transition-colors duration-150 group-hover:text-[hsl(var(--muted-foreground))]">
                  Designer
                </span>
                <span aria-hidden className="text-muted-foreground">
                  {' '}
                  ·{' '}
                </span>
                <span
                  className="transition-colors duration-150 group-hover:text-[hsl(var(--muted-foreground))] hover:text-orange-500 dark:hover:text-orange-400 cursor-pointer"
                  onClick={handleChaoticGoodClick}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleChaoticGoodClick(e as unknown as React.MouseEvent) }}
                  role="button"
                  tabIndex={0}
                  aria-label="Chaotic good"
                >
                  Chaotic good
                </span>
              </span>
            </Link>

            <nav className="hidden shrink-0 items-center gap-6 md:flex" aria-label="Main">
              {navItems.map(({ label, href, icon }) => {
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
                return (
                  <Link key={href} href={href} className={navLinkClass(isActive)} onClick={() => track('nav_click', { page: label })}>
                    {icon}
                    {label}
                  </Link>
                )
              })}
            </nav>

            <button
              type="button"
              className="cursor-pointer rounded p-2 text-muted-foreground transition-colors hover:bg-[hsl(var(--border))] hover:text-foreground md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="h-5 w-5" strokeWidth={2} aria-hidden /> : <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />}
            </button>
          </div>

          {menuOpen && (
            <nav
              id="mobile-nav"
              className="-mx-4 mt-6 border-t border-[hsl(var(--border))] px-4 pb-1 pt-5 md:hidden"
              aria-label="Main"
            >
              <ul className="flex flex-col gap-3">
                {navItems.map(({ label, href, icon }) => {
                  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
                  return (
                    <li key={href}>
                      <Link href={href} className={navLinkClass(isActive)} onClick={() => { setMenuOpen(false); track('nav_click', { page: label }) }}>
                        {icon}
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
