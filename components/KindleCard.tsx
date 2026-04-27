'use client'

import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { track } from '@vercel/analytics'
import Image from 'next/image'

interface ReadingData {
  title: string
  author: string
  url?: string
  cover?: string
}

export const KindleCard = ({ reading }: { reading: ReadingData }) => {
  const [flashing, setFlashing] = useState(0)
  const [showCover, setShowCover] = useState(false)

  const handlePageTurn = () => {
    if (flashing > 0) return
    track('kindle_clicked')
    setFlashing(1)
    setShowCover(true)
    setTimeout(() => {
      setShowCover(false)
      setFlashing(2)
    }, 1000)
    setTimeout(() => {
      setFlashing(0)
    }, 1600)
  }

  return (
    <div className="media-card">
      <div
        className={`media-screen-base kindle-screen ${flashing > 0 ? 'eink-page-turn' : ''}`}
        key={flashing}
      >
        {showCover && reading.cover ? (
          <div className="kindle-cover-container">
            <Image
              src={reading.cover}
              alt={reading.title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'left center' }}
              sizes="140px"
              quality={75}
            />
          </div>
        ) : (
          <>
            <span className="media-label kindle-label">
              <BookOpen size={7} strokeWidth={2.5} aria-hidden />
              Now reading
            </span>
            {reading.url ? (
              <a
                href={reading.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reading-title-link media-title kindle-title leading-snug"
              >
                {reading.title}
              </a>
            ) : (
              <span className="media-title kindle-title leading-snug">{reading.title}</span>
            )}
            <span className="media-subtitle kindle-author truncate">{reading.author}</span>
          </>
        )}
      </div>

      <button onClick={handlePageTurn} aria-label="Turn page" className="kindle-button" />
    </div>
  )
}
