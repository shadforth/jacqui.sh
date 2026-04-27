'use client'

import { track } from '@vercel/analytics'
import { useState } from 'react'

export function KaomojiWave() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
    track('kaomoji_interacted')
  }
  const handleMouseLeave = () => {
    setHovered(false)
    setClicked(false)
  }
  const handleClick = () => {
    setClicked(true)
    track('kaomoji_interacted')
  }

  const face = clicked ? '(˙o˙")' : hovered ? '(ᵔ̀oᵔ́ )' : '(•̀ᴗ•́ )'

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      {face}
      <span className={hovered && !clicked ? 'inline-block robo-arm' : 'inline-block'}>و</span>
    </span>
  )
}
