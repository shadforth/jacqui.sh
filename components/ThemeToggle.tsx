'use client'

import { useCallback, useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { track } from '@vercel/analytics'

type Theme = 'light' | 'dark' | 'auto'

const CYCLE: Theme[] = ['auto', 'light', 'dark']
const LABEL: Record<Theme, string> = { auto: 'System', light: 'Light', dark: 'Dark' }
const ICON: Record<Theme, LucideIcon> = { auto: Monitor, light: Sun, dark: Moon }

const bubble = {
  background: 'hsl(var(--foreground))',
  color: 'hsl(var(--background))',
  borderRadius: '1rem',
  fontSize: '0.9rem',
  fontWeight: 400 as const,
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('auto')
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as Theme) ?? 'auto'
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(stored)
  }, [])

  const apply = useCallback((t: Theme) => {
    setTheme(t)
    track('theme_changed', { theme: t })
    if (t === 'auto') {
      localStorage.removeItem('theme')
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', system)
    } else {
      localStorage.setItem('theme', t)
      document.documentElement.setAttribute('data-theme', t)
    }
  }, [])

  function handleClick() {
    const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length]
    apply(next)
  }

  const CurrentIcon = ICON[theme]

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        aria-label="Theme"
        onClick={handleClick}
        className="cursor-pointer rounded p-1.5 transition-colors duration-150 text-muted-foreground hover:text-[hsl(var(--accent))]"
      >
        <CurrentIcon className="h-4 w-4" strokeWidth={2} aria-hidden />
      </button>

      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '100%',
            transform: 'translateY(-50%)',
            marginLeft: '8px',
            whiteSpace: 'nowrap',
            ...bubble,
            padding: '0.35rem 0.75rem',
            boxShadow: '0 6px 24px hsl(var(--foreground) / 0.12)',
            pointerEvents: 'none',
          }}
        >
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: '50%',
              right: 'calc(100% - 1px)',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderRight: '6px solid hsl(var(--foreground))',
            }}
          />
          {LABEL[theme]}
        </div>
      )}
    </div>
  )
}
