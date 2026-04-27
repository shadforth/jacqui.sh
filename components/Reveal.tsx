'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'

interface RevealProps {
  children: React.ReactNode
  label?: string
  prefix?: string
}

export const Reveal = ({ children, label = 'Reveal answer', prefix }: RevealProps) => {
  const [revealed, setRevealed] = useState(false)

  const handleReveal = () => {
    setRevealed(true)
    track('reveal_clicked', { label })
  }

  return (
    <span>
      {prefix && <span style={{ color: 'inherit' }}>{prefix} </span>}
      <span
        role={revealed ? undefined : 'button'}
        tabIndex={revealed ? undefined : 0}
        aria-label={revealed ? undefined : label}
        onClick={revealed ? undefined : handleReveal}
        onKeyDown={
          revealed ? undefined : (e) => (e.key === 'Enter' || e.key === ' ') && handleReveal()
        }
        style={{
          color: revealed ? 'hsl(var(--muted-foreground))' : 'transparent',
          background: revealed ? 'transparent' : 'hsl(var(--foreground))',
          borderRadius: '3px',
          cursor: revealed ? 'auto' : 'pointer',
          userSelect: revealed ? 'auto' : 'none',
          transition: 'color 0.4s ease, background 0.4s ease',
        }}
      >
        {children}
      </span>
    </span>
  )
}
