import { Suspense } from 'react'
import { getAllPosts } from '@/lib/posts'
import { WritingList } from '@/components/WritingList'

export const metadata = {
  title: 'Writing',
  description: 'Blog posts and travel writing by Jacqui Shadforth.',
}

export default function WritingPage() {
  const posts = getAllPosts()
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 md:py-24">
      <Suspense fallback={null}>
        <WritingList posts={posts} />
      </Suspense>
    </div>
  )
}
