'use client'

import { useMemo } from 'react'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { buildPostUrl } from '@/lib/task-data'
import { getLocalPostsForTask } from '@/lib/local-posts'
import { mergeTaskPosts, sortTaskPostsByDate } from '@/lib/merge-task-posts'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

type Props = {
  task: TaskKey
  initialPosts: SitePost[]
  category?: string
  sort?: string
}

export function UpdatesMediaPostList({ task, initialPosts, category, sort }: Props) {
  const localPosts = getLocalPostsForTask(task)
  const posts = useMemo(() => {
    const merged = mergeTaskPosts(initialPosts, localPosts, category)
    return sortTaskPostsByDate(merged, sort)
  }, [category, initialPosts, localPosts, sort])

  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#ead8cc] bg-white/50 py-20 text-center text-[#5c4a52]">
        No posts match this filter yet.
      </div>
    )
  }

  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
      {posts.map((post) => {
        const localOnly = (post as { localOnly?: boolean }).localOnly
        const href = localOnly ? `/local/${task}/${post.slug}` : buildPostUrl(task, post.slug)
        return (
          <div key={post.id} className="mb-6 break-inside-avoid">
            <TaskPostCard post={post} href={href} taskKey="mediaDistribution" />
          </div>
        )
      })}
    </div>
  )
}
