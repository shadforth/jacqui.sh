'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { track } from '@vercel/analytics'

export const DEFAULT_EMOJIS = ['🐦', '🩷', '😂', '✨', '👏']

type Counts = Record<string, number>
type Reacted = Record<string, boolean>

interface ReactionsContextType {
  emojis: string[]
  counts: Counts
  reacted: Reacted
  loading: boolean
  react: (emoji: string) => void
}

const ReactionsContext = createContext<ReactionsContextType | null>(null)

function storageKey(slug: string, emoji: string) {
  return `reaction:${slug}:${emoji}`
}

export function PostReactionsProvider({
  slug,
  emojis = DEFAULT_EMOJIS,
  children,
}: {
  slug: string
  emojis?: string[]
  children: React.ReactNode
}) {
  const [counts, setCounts] = useState<Counts>({})
  const [reacted, setReacted] = useState<Reacted>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved: Reacted = {}
    for (const emoji of emojis) {
      saved[emoji] = localStorage.getItem(storageKey(slug, emoji)) === '1'
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReacted(saved)

    fetch(`/api/reactions/${slug}`)
      .then((r) => r.json())
      .then((data: Counts) => {
        setCounts(data)
        setLoading(false)
      })
  }, [slug, emojis])

  const react = useCallback(
    async (emoji: string) => {
      const isReacted = reacted[emoji]
      const delta = isReacted ? -1 : 1

      setReacted((prev) => ({ ...prev, [emoji]: !isReacted }))
      setCounts((prev) => ({ ...prev, [emoji]: Math.max(0, (prev[emoji] ?? 0) + delta) }))

      track(isReacted ? 'reaction_removed' : 'reaction_added', { slug, emoji })

      if (isReacted) {
        localStorage.removeItem(storageKey(slug, emoji))
      } else {
        localStorage.setItem(storageKey(slug, emoji), '1')
      }

      await fetch(`/api/reactions/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji, delta }),
      })
    },
    [slug, reacted]
  )

  return (
    <ReactionsContext.Provider value={{ emojis, counts, reacted, loading, react }}>
      {children}
    </ReactionsContext.Provider>
  )
}

export function useReactions() {
  const ctx = useContext(ReactionsContext)
  if (!ctx) throw new Error('useReactions must be used within PostReactionsProvider')
  return ctx
}
