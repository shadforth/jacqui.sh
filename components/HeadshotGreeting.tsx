'use client'

import Image from 'next/image'
import { useState, useCallback, useRef } from 'react'

const greetings = ['g\'day!', 'สวัสดี!', 'hiya!']

interface Bubble {
  id: number
  label: string
  x: number // horizontal offset in px, relative to image centre
}

let nextId = 0

export default function HeadshotGreeting() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [hovered, setHovered] = useState(false)
  const greetingIndexRef = useRef(0)

  const spawnBubble = useCallback(() => {
    const i = greetingIndexRef.current
    greetingIndexRef.current = (i + 1) % greetings.length
    const id = nextId++
    const label = greetings[i % greetings.length]
    const x = Math.round((Math.random() - 0.5) * 60) // –30 … +30 px
    setBubbles((prev) => [...prev, { id, label, x }])
    window.setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id))
    }, 900)
  }, [])

  return (
    <div
        style={{ position: 'relative', flexShrink: 0, width: 120, height: 120, cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={spawnBubble}
      >
        {bubbles.map((b) => (
          <div
            key={b.id}
            style={{
              position: 'absolute',
              bottom: '105%',
              left: `calc(50% + ${b.x}px)`,
              transform: 'translateX(-50%)',
              background: 'hsl(var(--foreground))',
              color: 'hsl(var(--background))',
              borderRadius: '1rem',
              padding: '0.3rem 0.7rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              animation: 'floatUpBubble 0.9s ease-out forwards',
            }}
          >
            {b.label}
            <span
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
          </div>
        ))}

        {/* Headshot */}
        <Image
          src="/media/profile/headshot.jpeg"
          alt="Jacqui Shadforth"
          width={120}
          height={120}
          priority
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
            display: 'block',
            transition: 'transform 0.18s ease',
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
          }}
        />
      </div>
  )
}
