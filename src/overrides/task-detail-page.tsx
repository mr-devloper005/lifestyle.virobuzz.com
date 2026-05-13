import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Share2, Twitter } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { buildPostUrl } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

const isValidImageUrl = (value?: string | null) =>
  typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))

type PostContent = {
  body?: string
  category?: string
  description?: string
  excerpt?: string
  author?: string
  images?: string[]
  logo?: string
}

const getContent = (post: SitePost): PostContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as PostContent
}

const getImageUrls = (post: SitePost, content: PostContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media.map((item) => item?.url).filter((url): url is string => isValidImageUrl(url))
  const contentImages = Array.isArray(content.images) ? content.images.filter((url): url is string => isValidImageUrl(url)) : []
  const merged = [...mediaImages, ...contentImages]
  if (merged.length) return merged
  if (isValidImageUrl(content.logo)) return [content.logo as string]
  return [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80&auto=format&fit=crop',
  ]
}

const formatBody = (content: PostContent, post: SitePost) => {
  const raw =
    (typeof content.body === 'string' && content.body.trim()) ||
    (typeof content.description === 'string' && content.description.trim()) ||
    (typeof post.summary === 'string' && post.summary.trim()) ||
    ''
  return formatRichHtml(raw, 'Full release text will appear here when available.')
}

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()
  const content = getContent(post)
  const images = getImageUrls(post, content)
  const related = (await fetchTaskPosts('mediaDistribution', 10, { fresh: true })).filter((p) => p.slug !== slug).slice(0, 3)
  const html = formatBody(content, post)
  const author = (typeof content.author === 'string' && content.author.trim()) || post.authorName || 'Communications team'
  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''
  const rawCat = content.category || post.tags?.[0] || 'Press media'
  const catLabel =
    typeof rawCat === 'string' ? CATEGORY_OPTIONS.find((c) => c.slug === normalizeCategory(rawCat))?.name || rawCat : 'Press media'
  const subtitle =
    (typeof content.excerpt === 'string' && content.excerpt.trim()) ||
    (post.summary || '').split('.')[0] ||
    'Full announcement with quotes and contact blocks below.'

  const pageUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/updates/${post.slug}`
  const share = {
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.publishedAt || undefined,
    author: { '@type': 'Person', name: author },
  }

  return (
    <div className="min-h-screen bg-[#fffcf7] text-[#1a0f18]">
      <NavbarShell />
      <SchemaJsonLd data={articleSchema} />
      <article>
        <header className="border-b border-[#ead8cc] bg-gradient-to-b from-white to-[#fff5eb]">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#640D5F] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {catLabel}
            </div>
            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-[2.4rem]">{post.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-[#5c4a52] sm:text-xl">{subtitle}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#5c4a52]">
              <span>By {author}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <a
                href={share.x}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#ead8cc] bg-white px-3 py-1.5 text-xs font-semibold text-[#1a0f18] transition hover:border-[#D91656] hover:text-[#D91656]"
              >
                <Twitter className="h-3.5 w-3.5" />
                X / Twitter
              </a>
              <a
                href={share.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#ead8cc] bg-white px-3 py-1.5 text-xs font-semibold text-[#1a0f18] transition hover:border-[#0a66c2] hover:text-[#0a66c2]"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
              <a
                href={share.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#ead8cc] bg-white px-3 py-1.5 text-xs font-semibold text-[#1a0f18] transition hover:border-[#1877f2] hover:text-[#1877f2]"
              >
                <Facebook className="h-3.5 w-3.5" />
                Facebook
              </a>
              <a
                href={pageUrl}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#FFB200]/50 bg-[#fff8e8] px-3 py-1.5 text-xs font-semibold text-[#6b4500]"
              >
                <Share2 className="h-3.5 w-3.5" />
                Permalink
              </a>
            </div>
          </div>
        </header>

        {images[0] && (
          <div className="border-b border-[#ead8cc] bg-white">
            <div className="relative mx-auto aspect-[16/7] w-full max-w-5xl overflow-hidden sm:aspect-[21/9]">
              <ContentImage
                src={images[0]}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority
                intrinsicWidth={1920}
                intrinsicHeight={820}
              />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="prose prose-lg max-w-none article-content text-[#2d2326]">
            <RichContent html={html} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-[#ead8cc] bg-white/90 py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="mb-6 flex items-end justify-between gap-3">
                <h2 className="text-lg font-semibold sm:text-xl">More from the wire</h2>
                <Link href="/updates" className="text-sm font-medium text-[#D91656] hover:underline">
                  View all
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {related.map((item) => (
                  <TaskPostCard key={item.id} post={item} href={buildPostUrl('mediaDistribution', item.slug)} taskKey="mediaDistribution" />
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="bg-gradient-to-r from-[#640D5F] to-[#D91656] py-10 text-center sm:py-12">
          <p className="px-4 text-base font-medium text-white sm:text-lg">Wish your news had this kind of reach?</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link href="/register" className="inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[#7a1038] shadow">
              Sign up
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  )
}
