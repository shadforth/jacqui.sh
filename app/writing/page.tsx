import { getAllPosts, formatDate } from '@/lib/posts'
import { quickLinkClassName } from '@/lib/quick-link'
import { TrackedLink } from '@/components/TrackedLink'

export const metadata = { title: 'Writing', description: 'Blog posts and travel writing by Jacqui Shadforth.' }

const blogHeadingStyle = {
  fontFamily: 'var(--font-markazi), serif',
  fontSize: '1.1rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: 'hsl(var(--muted-foreground))',
  marginBottom: '0.5rem',
}

export default function WritingPage() {
  const posts = getAllPosts()
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 md:py-24">
      <h1 style={{ fontFamily: 'var(--font-markazi), serif', fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Writing</h1>
      <section>
      <h2 style={blogHeadingStyle}>Blog posts</h2>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
            <TrackedLink href={`/writing/${post.slug}`} eventName="post_click" eventData={{ slug: post.slug, title: post.title }} className={quickLinkClassName}>
              {post.title}
            </TrackedLink>
            <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', flexShrink: 0 }}>
              {formatDate(post.date)}
            </span>
          </li>
        ))}
      </ul>
      </section>
      <section style={{ marginTop: '3rem' }}>
        <h2 style={blogHeadingStyle}>Travel blog</h2>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <li
            style={{
              display: 'flex',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              columnGap: '0.5rem',
              rowGap: '0.25rem',
            }}
          >
            <TrackedLink href="https://bułka.com" eventName="external_link_click" eventData={{ label: 'bułka.com', location: 'writing' }} external className={quickLinkClassName}>
              bułka.com
            </TrackedLink>
            <span
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.875rem',
              }}
            >
              A blog about travel, food, and bread.
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}
