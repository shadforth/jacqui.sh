import { getAllPosts } from '@/lib/posts'
import type { MetadataRoute } from 'next'

const siteUrl = 'https://jacqui.sh'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/writing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/reading`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/building`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/creating`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...postRoutes]
}
