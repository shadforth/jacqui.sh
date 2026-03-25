import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost, formatDate, extractHeadings } from '@/lib/posts'
import { TableOfContents } from '@/components/TableOfContents'
import { mdxComponents } from '@/components/MdxComponents'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Not found' }

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
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
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
    <div className="container mx-auto px-4 pb-24" style={{ maxWidth: '72rem' }}>
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>

        {/* TOC — hidden on narrow screens, only shown when >1 heading */}
        {headings.length > 1 && (
          <aside
            style={{ width: '13rem', flexShrink: 0, paddingTop: '3rem' }}
            className="hidden lg:block"
          >
            <TableOfContents headings={headings} />
          </aside>
        )}

        {/* Post content — mx-auto when TOC is hidden so the column stays centred; lg:mx-0 when aside is visible */}
        <article
          className={`min-w-0 max-w-[42rem] flex-1 pt-12 ${headings.length > 1 ? 'mx-auto lg:mx-0' : 'mx-auto'}`}
        >
          <nav style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1rem' }}>
            <Link href="/writing" className="hover:underline underline-offset-4">← Writing</Link>
          </nav>
          <div style={{ paddingBottom: '1rem', borderBottom: '1px solid hsl(var(--border))', marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: 'var(--font-markazi), serif', fontSize: '2rem', lineHeight: 1.2, marginBottom: '0.25rem' }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <time style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                {formatDate(post.date, true)}
              </time>
              {post.categories && post.categories.length > 0 && (
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {post.categories.map((category) => (
                    <span key={category} style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      padding: '0.125rem 0.5rem',
                      borderRadius: '9999px',
                      backgroundColor: 'hsl(var(--accent) / 0.15)',
                      color: 'hsl(var(--accent))',
                    }}>
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="prose prose-base max-w-none" style={{ color: 'hsl(var(--foreground))' }}>
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </div>
    </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  )
}
