'use client'

import Link from 'next/link'
import { track } from '@vercel/analytics'

interface TrackedLinkProps {
  href: string
  eventName: string
  eventData?: Record<string, string>
  external?: boolean
  className?: string
  children: React.ReactNode
}

export function TrackedLink({
  href,
  eventName,
  eventData,
  external,
  className,
  children,
}: TrackedLinkProps) {
  const handleClick = () => track(eventName, eventData)

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
