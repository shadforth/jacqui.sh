'use client'

import { useState, useRef } from 'react'
import { Volume2, AudioLines } from 'lucide-react'
import { track } from '@vercel/analytics'

export function NamePronunciation() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handlePlay = () => {
    if (playing) return

    if (!audioRef.current) {
      audioRef.current = new Audio('/media/profile/name-pronunciation.m4a')
      audioRef.current.onended = () => setPlaying(false)
    }

    audioRef.current.currentTime = 0
    audioRef.current.play()
    setPlaying(true)
    track('pronunciation_clicked')
  }

  return (
    <button
      onClick={handlePlay}
      aria-label="Hear how to pronounce Jacqui"
      title="Hear how to pronounce Jacqui"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: 'none',
        padding: '0 0 0 0.3rem',
        cursor: playing ? 'default' : 'pointer',
        color: 'hsl(var(--muted-foreground))',
        opacity: playing ? 1 : 0.5,
        transition: 'opacity 0.15s, color 0.15s',
        verticalAlign: 'middle',
        position: 'relative',
        bottom: '2px',
      }}
      onMouseEnter={(e) => {
        if (!playing) (e.currentTarget as HTMLButtonElement).style.opacity = '1'
      }}
      onMouseLeave={(e) => {
        if (!playing) (e.currentTarget as HTMLButtonElement).style.opacity = '0.5'
      }}
    >
      {playing ? (
        <AudioLines size={18} strokeWidth={1.75} />
      ) : (
        <Volume2 size={18} strokeWidth={1.75} />
      )}
    </button>
  )
}
