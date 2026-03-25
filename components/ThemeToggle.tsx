'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { track } from '@vercel/analytics'

type Theme = 'light' | 'dark' | 'auto'

const options: { value: Theme; icon: LucideIcon; label: string }[] = [
  { value: 'auto', icon: Monitor, label: 'System' },
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
]

const bubble = {
  background: 'hsl(var(--foreground))',
  color: 'hsl(var(--background))',
  borderRadius: '1rem',
  fontSize: '0.9rem',
  fontWeight: 600 as const,
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('auto')
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as Theme) ?? 'auto'
    setTheme(stored)
  }, [])

  const apply = useCallback((t: Theme) => {
    setTheme(t)
    setOpen(false)
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

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = options.find((o) => o.value === theme) ?? options[0]
  const CurrentIcon = current.icon

  return (
    <div ref={rootRef} style={{ position: 'relative', zIndex: open ? 50 : undefined }}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Theme"
        onClick={() => setOpen((v) => !v)}
        className={`cursor-pointer rounded p-1.5 transition-colors duration-150 text-muted-foreground hover:text-[hsl(var(--accent))] ${open ? 'text-foreground' : ''}`}
      >
        <CurrentIcon className="h-4 w-4" strokeWidth={2} aria-hidden />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Theme"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '6px',
            ...bubble,
            padding: '0.35rem 0',
            minWidth: '9.5rem',
            boxShadow: '0 6px 24px hsl(var(--foreground) / 0.12)',
            pointerEvents: 'auto',
          }}
        >
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '6px solid hsl(var(--foreground))',
            }}
          />
          {options.map(({ value, icon: Icon, label }) => {
            const selected = theme === value
            return (
              <button
                key={value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => apply(value)}
                className={`flex w-full cursor-pointer items-center gap-2 border-0 px-3 py-2 text-left transition-colors duration-150 hover:bg-[hsl(var(--background)/0.14)] ${selected ? 'bg-[hsl(var(--background)/0.1)]' : 'bg-transparent'}`}
                style={{
                  color: 'hsl(var(--background))',
                  fontWeight: 600,
                  fontSize: bubble.fontSize,
                }}
              >
                <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
                <span>{label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
