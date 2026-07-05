import { slugify } from '@/lib/posts'
import React from 'react'
import { PostImage } from '@/components/PostImage'
import { PostImagePair } from '@/components/PostImagePair'
import { PostImagePortraitPair } from '@/components/PostImagePortraitPair'
import { Reveal } from '@/components/Reveal'
import { VibeCodingConversation } from '@/components/VibeCodingConversation'
import { Quote } from '@/components/Quote'

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

const markazi = { fontFamily: 'var(--font-dm-sans), sans-serif' } as const

const sectionHeading: React.CSSProperties = {
  ...markazi,
  fontSize: '1.6rem',
  fontWeight: 700,
  color: 'hsl(var(--foreground) / 0.7)',
  marginTop: '1.5rem',
  marginBottom: '0.25rem',
  lineHeight: 1.3,
}

const subHeading: React.CSSProperties = {
  ...markazi,
  fontSize: '1.35rem',
  fontWeight: 700,
  color: 'hsl(var(--subheading))',
  marginTop: '1.25rem',
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
  h3: subHeading,
  h4: subHeading,
  h5: subHeading,
  h6: subHeading,
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
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong style={{ fontWeight: 500, color: 'inherit' }}>{children}</strong>
  ),
  PostImage,
  PostImagePair,
  PostImagePortraitPair,
  Reveal,
  VibeCodingConversation,
  Quote,
}
