'use client'

import { useRef, useState } from 'react'
import { useReactions } from './PostReactionsProvider'

type Particle = { id: number; emoji: string; x: number; delay: number; size: number }
let particleCounter = 0

export function PostReactions() {
  const { emojis, counts, reacted, loading, react } = useReactions()
  const [particles, setParticles] = useState<Particle[]>([])
  const timeoutRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  const handleReact = (emoji: string) => {
    const isReacting = !reacted[emoji]
    react(emoji)

    if (!isReacting) return

    const newParticles: Particle[] = Array.from({ length: 4 }, (_, i) => ({
      id: particleCounter++,
      emoji,
      x: (Math.random() - 0.5) * 40,
      delay: i * 220,
      size: 0.8 + Math.random() * 1.2,
    }))
    setParticles((prev) => [...prev, ...newParticles])
    newParticles.forEach((p) => {
      const t = setTimeout(() => {
        setParticles((prev) => prev.filter((x) => x.id !== p.id))
        timeoutRef.current.delete(p.id)
      }, 900 + p.delay)
      timeoutRef.current.set(p.id, t)
    })
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', margin: '0.1rem 0 1.75rem' }}>
        {emojis.map((emoji) => (
          <div
            key={emoji}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              border: '1px solid hsl(var(--border))',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          >
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>{emoji}</span>
            <span
              style={{
                display: 'inline-block',
                width: '1rem',
                height: '0.65rem',
                borderRadius: '4px',
                backgroundColor: 'hsl(var(--muted-foreground) / 0.25)',
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', margin: '0.1rem 0 1.75rem' }}>
      {emojis.map((emoji) => {
        const hasReacted = reacted[emoji]
        return (
          <div key={emoji} style={{ position: 'relative' }}>
            {particles
              .filter((p) => p.emoji === emoji)
              .map((p) => (
                <span
                  key={p.id}
                  aria-hidden
                  style={{
                    position: 'absolute',
                    bottom: '50%',
                    left: '50%',
                    fontSize: `${p.size}rem`,
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    opacity: 0,
                    // @ts-expect-error React's CSSProperties doesn't allow CSS custom properties (--var) but they are valid CSS and work at runtime
                    '--dx': `${p.x}px`,
                    animation: `floatUp 0.9s ease-out ${p.delay}ms forwards`,
                  }}
                >
                  {emoji}
                </span>
              ))}
            <button
              onClick={() => handleReact(emoji)}
              aria-label={`${hasReacted ? 'Remove' : 'Add'} ${emoji} reaction`}
              aria-pressed={hasReacted}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                border: `1px solid ${hasReacted ? 'hsl(var(--accent))' : 'hsl(var(--border))'}`,
                background: hasReacted ? 'hsl(var(--accent) / 0.12)' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.15s, border-color 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!hasReacted) e.currentTarget.style.background = 'hsl(var(--accent) / 0.08)'
              }}
              onMouseLeave={(e) => {
                if (!hasReacted) e.currentTarget.style.background = 'transparent'
              }}
            >
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>{emoji}</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: hasReacted ? 'hsl(var(--accent))' : 'hsl(var(--muted-foreground))',
                  minWidth: '0.75rem',
                }}
              >
                {(counts[emoji] ?? 0) >= 100 ? '99+' : (counts[emoji] ?? 0)}
              </span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
