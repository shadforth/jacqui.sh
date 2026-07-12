'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface GalleryItem {
  src: string
  alt: string
  category: string
  pixelated: boolean
}

interface LightboxContextValue {
  openAt: (index: number) => void
}

const LightboxContext = createContext<LightboxContextValue | null>(null)

export function useLightbox(): LightboxContextValue {
  const context = useContext(LightboxContext)
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }
  return context
}

const iconButtonClassName =
  'absolute z-10 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20'

export function LightboxProvider({
  items,
  children,
}: {
  items: GalleryItem[]
  children: ReactNode
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openAt = useCallback((index: number) => {
    setOpenIndex(index)
    dialogRef.current?.showModal()
  }, [])

  const handleClose = useCallback(() => {
    dialogRef.current?.close()
  }, [])

  const showPrev = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null || items.length === 0) return current
      return (current - 1 + items.length) % items.length
    })
  }, [items.length])

  const showNext = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null || items.length === 0) return current
      return (current + 1) % items.length
    })
  }, [items.length])

  useEffect(() => {
    if (openIndex === null) return undefined

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [openIndex, showPrev, showNext])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleDialogClose = () => {
    setOpenIndex(null)
  }

  const current = openIndex !== null ? items[openIndex] : null

  return (
    <LightboxContext.Provider value={{ openAt }}>
      {children}
      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-[200] m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 [&::backdrop]:bg-black/60 [&::backdrop]:backdrop-blur-sm"
        onClose={handleDialogClose}
        aria-label={current ? `${current.category} — ${current.alt}` : undefined}
      >
        {current && (
          <div
            className="relative flex h-full w-full items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            <button
              type="button"
              onClick={handleClose}
              className={`${iconButtonClassName} right-4 top-4`}
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  className={`${iconButtonClassName} left-4 top-1/2 -translate-y-1/2`}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={2} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className={`${iconButtonClassName} right-4 top-1/2 -translate-y-1/2`}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={2} aria-hidden />
                </button>
              </>
            )}

            <div className="relative h-[min(80vh,90vw,600px)] w-[min(80vh,90vw,600px)]">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className={`object-contain${current.pixelated ? ' image-rendering-pixelated' : ''}`}
                sizes="600px"
              />
            </div>

            <p className="absolute bottom-4 left-4 text-sm text-white">
              {current.category} — {current.alt}
            </p>
          </div>
        )}
      </dialog>
    </LightboxContext.Provider>
  )
}
