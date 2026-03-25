import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content/posts')

export type PostMeta = {
  slug: string
  title: string
  date: string
  categories?: string[]
  description?: string
}

export type Post = PostMeta & {
  content: string
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const { data } = matter(fs.readFileSync(path.join(postsDir, file), 'utf8'))
      return { slug, title: data.title, date: data.date, categories: data.categories, description: data.description }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  return { slug, title: data.title, date: data.date, categories: data.categories, description: data.description, content }
}

export function formatDate(dateStr: string, long = false): string {
  return new Date(dateStr).toLocaleDateString('en-GB', { month: long ? 'long' : 'short', year: 'numeric' })
}

export type Heading = { level: number; text: string; id: string }

export function slugify(text: string): string {
  return text
    .replace(/[*_`[\]()]/g, '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function extractHeadings(content: string): Heading[] {
  const regex = /^(#{1,6})\s+(.+)$/gm
  const headings: Heading[] = []
  let match
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const raw = match[2].trim()
    const text = raw.replace(/[*_`[\]()]/g, '').trim()
    headings.push({ level, text, id: slugify(raw) })
  }
  return headings
}
