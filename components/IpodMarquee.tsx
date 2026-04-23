'use client'

import { useRef, useEffect, useState } from 'react'

interface IpodMarqueeProps {
  text: string
  href?: string
  style?: React.CSSProperties
  linkStyle?: React.CSSProperties
  linkClassName?: string
  isPaused?: boolean
}

export const IpodMarquee = ({ text, href, style, linkStyle, linkClassName, isPaused = false }: IpodMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLAnchorElement & HTMLSpanElement>(null)
  const [overflow, setOverflow] = useState(0)
  const [atEnd, setAtEnd] = useState(false)

  // offsetWidth is NOT clipped by parent overflow:hidden — getBoundingClientRect is, so we use offsetWidth
  useEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current
    if (!container || !inner) return

    const measure = () => {
      setOverflow(Math.max(0, inner.offsetWidth - container.clientWidth))
    }

    // Wait for custom fonts before measuring
    document.fonts.ready.then(() => requestAnimationFrame(measure))

    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
  }, [text])

  // JS-driven oscillation: wait → scroll to end → wait → scroll back → repeat
  useEffect(() => {
    if (overflow <= 0 || isPaused) {
      return
    }

    const scrollMs = (1.5 + overflow * 0.03) * 1000
    let timer: ReturnType<typeof setTimeout>
    let isAtEnd = false

    const next = () => {
      isAtEnd = !isAtEnd
      setAtEnd(isAtEnd)
      timer = setTimeout(next, scrollMs + (isAtEnd ? 1500 : 2000))
    }

    timer = setTimeout(next, 2000) // initial pause
    return () => clearTimeout(timer)
  }, [overflow, isPaused])

  const scrollDuration = overflow > 0 ? 1.5 + overflow * 0.03 : 0

  const innerStyle: React.CSSProperties = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    transform: atEnd && overflow > 0 ? `translateX(-${overflow}px)` : 'translateX(0)',
    transition: overflow > 0 ? `transform ${scrollDuration.toFixed(2)}s ease-in-out` : 'none',
    ...linkStyle,
  }

  return (
    <div ref={containerRef} style={{ overflow: 'hidden', ...style }}>
      {href ? (
        <a
          ref={innerRef as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          style={innerStyle}
        >
          {text}
        </a>
      ) : (
        <span
          ref={innerRef as React.Ref<HTMLSpanElement>}
          className={linkClassName}
          style={innerStyle}
        >
          {text}
        </span>
      )}
    </div>
  )
}
