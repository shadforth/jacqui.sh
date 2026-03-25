import { slugify } from '@/lib/posts'
import React from 'react'

function getChildText(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(getChildText).join('')
  if (React.isValidElement(children)) {
    const nested = (children.props as { children?: React.ReactNode }).children
    return getChildText(nested ?? '')
  }
  return ''
}

const markazi = { fontFamily: 'var(--font-markazi), serif' } as const

/** Same visual weight for ## … ###### so posts can use any depth without prose fighting us. */
const sectionHeading: React.CSSProperties = {
  ...markazi,
  fontSize: '1.6rem',
  fontWeight: 700,
  color: 'hsl(var(--muted-foreground))',
  marginTop: '1.5rem',
  marginBottom: '0.25rem',
  lineHeight: 1.3,
}

const styles: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', React.CSSProperties> = {
  h1: {
    ...markazi,
    fontSize: '2rem',
    fontWeight: 700,
    color: 'hsl(var(--foreground))',
    marginTop: '1.75rem',
    marginBottom: '0.5rem',
    lineHeight: 1.25,
  },
  h2: sectionHeading,
  h3: sectionHeading,
  h4: sectionHeading,
  h5: sectionHeading,
  h6: sectionHeading,
}

function makeHeading(Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
  return function Heading({
    children,
    className,
    style,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) {
    const id = slugify(getChildText(children))
    const mergedClass = ['not-prose', className].filter(Boolean).join(' ')
    return (
      <Tag id={id} style={{ ...styles[Tag], ...style }} className={mergedClass || undefined} {...props}>
        {children}
      </Tag>
    )
  }
}

export const mdxComponents = {
  h1: makeHeading('h1'),
  h2: makeHeading('h2'),
  h3: makeHeading('h3'),
  h4: makeHeading('h4'),
  h5: makeHeading('h5'),
  h6: makeHeading('h6'),
}
