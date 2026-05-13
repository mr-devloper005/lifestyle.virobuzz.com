import { isValidCategory, normalizeCategory } from '@/lib/categories'
import type { SitePost } from '@/lib/site-connector'

export function mergeTaskPosts(
  initialPosts: SitePost[],
  localPosts: Array<SitePost & { localOnly?: boolean }>,
  category: string | undefined
): (SitePost & { localOnly?: boolean })[] {
  const bySlug = new Set<string>()
  const combined: Array<SitePost & { localOnly?: boolean }> = []
  localPosts.forEach((post) => {
    if (post.slug) bySlug.add(post.slug)
    combined.push(post)
  })
  initialPosts.forEach((post) => {
    if (post.slug && bySlug.has(post.slug)) return
    combined.push(post)
  })
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  if (normalizedCategory === 'all') {
    return combined.filter((post) => {
      const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
      const value = typeof content.category === 'string' ? content.category : ''
      return !value || isValidCategory(value)
    })
  }
  return combined.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
    const value = typeof content.category === 'string' ? normalizeCategory(content.category) : ''
    return value === normalizedCategory
  })
}

export function sortTaskPostsByDate(posts: SitePost[], sort?: string) {
  const out = [...posts]
  if (sort === 'oldest') {
    out.sort((a, b) => new Date(a.publishedAt || 0).getTime() - new Date(b.publishedAt || 0).getTime())
  } else {
    out.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())
  }
  return out
}
