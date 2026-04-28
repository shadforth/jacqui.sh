import React from 'react'

interface QuoteProps {
  author: string
  url?: string
  children: React.ReactNode
}

export function Quote({ author, url, children }: QuoteProps) {
  return (
    <figure className="not-prose my-6 border-l-2 border-border pl-4">
      <blockquote
        className="italic text-base leading-relaxed"
        style={{ color: 'hsl(var(--foreground))' }}
      >
        {children}
      </blockquote>
      <figcaption className="mt-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            — {author}
          </a>
        ) : (
          <>— {author}</>
        )}
      </figcaption>
    </figure>
  )
}
