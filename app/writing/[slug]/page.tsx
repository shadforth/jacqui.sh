import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost, formatDate, extractHeadings } from '@/lib/posts'
import { TableOfContents } from '@/components/TableOfContents'
import { mdxComponents } from '@/components/MdxComponents'
import { PostReactionsProvider } from '@/components/PostReactionsProvider'
import { PostReactions } from '@/components/PostReactions'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Not found' }

  const ogImage = post.image
    ? [{ url: `https://jacqui.sh${post.image}`, width: 1200, height: 630, alt: post.title }]
    : undefined

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `https://jacqui.sh/writing/${slug}`,
      publishedTime: post.date,
      authors: ['Jacqui Shadforth'],
      tags: post.categories,
      ...(ogImage && { images: ogImage }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(ogImage && { images: [ogImage[0].url] }),
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Jacqui Shadforth',
      url: 'https://jacqui.sh',
    },
    url: `https://jacqui.sh/writing/${slug}`,
    keywords: post.categories?.join(', '),
  }

  return (
    <>
    <PostReactionsProvider slug={slug} emojis={post.emojis}>
    <div className="container mx-auto px-4" style={{ maxWidth: '72rem' }}>
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'stretch', minHeight: 'calc(100vh - 5.25rem)' }}>

        {/* Sidebar — date + tags + optional TOC */}
        <aside
          style={{ width: '13rem', flexShrink: 0, paddingTop: '3rem', borderRight: '1px solid hsl(var(--border))', paddingRight: '1.5rem' }}
          className="hidden lg:block"
        >
          {/* Date + Tags — not sticky, scroll away naturally */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '1.1rem', fontFamily: 'var(--font-markazi), serif', color: 'hsl(var(--foreground))', marginBottom: '-.25rem' }}>Date</p>
              <time style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}>
                {formatDate(post.date, true)}
              </time>
            </div>
            {post.categories && post.categories.length > 0 && (
              <div>
                <p style={{ fontSize: '1.1rem', fontFamily: 'var(--font-markazi), serif', color: 'hsl(var(--foreground))', marginBottom: '0.25rem' }}>Tags</p>
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                  {post.categories.map((category) => (
                    <a key={category} href={`/writing?tags=${encodeURIComponent(category)}`} className="post-tag">
                      {category}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TOC — only when headings exist */}
          {headings.length > 1 && (
            <div style={{ position: 'sticky', top: '5rem', maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}>
              <TableOfContents headings={headings} />
            </div>
          )}
        </aside>

        {/* Post content */}
        <article className="min-w-0 max-w-[42rem] flex-1 pt-12 pb-24 mx-auto lg:mx-0">
<div style={{ marginBottom: '0.25rem' }}>
            <h1 style={{ fontFamily: 'var(--font-markazi), serif', fontSize: '2rem', lineHeight: 1.2 }}>
              {post.title}
            </h1>
          </div>
          <PostReactions />
          <div className="prose prose-base max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
          <div style={{ textAlign: 'center', color: 'hsl(var(--muted-foreground) / 0.6)', margin: '0.75rem 0 0.5rem', letterSpacing: '0.2em', fontSize: '0.8rem' }}>
            ~*~
          </div>
          <PostReactions />
        </article>
      </div>
    </div>
    </PostReactionsProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  )
}
