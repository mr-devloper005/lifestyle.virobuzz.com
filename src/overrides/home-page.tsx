import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BadgeCheck,
  Headphones,
  LineChart,
  Newspaper,
  Sparkles,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { buildPostUrl } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'
import { ContentImage } from '@/components/shared/content-image'
import { mergeEditorialPostsForHome, getHomeEditorialMockPosts } from '@/lib/home-editorial-mock'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const FALLBACK_WIRE_IMAGES = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80&auto=format&fit=crop',
]

function getPostImage(post: SitePost, index: number) {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((m) => typeof m?.url === 'string' && m.url)?.url
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const first = images.find((u) => typeof u === 'string') as string | undefined
  const logo = typeof content.logo === 'string' ? content.logo : null
  return mediaUrl || first || logo || FALLBACK_WIRE_IMAGES[index % FALLBACK_WIRE_IMAGES.length]
}

function getCategoryLabel(post: SitePost) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw = typeof content.category === 'string' ? content.category : post.tags?.find((t) => typeof t === 'string')
  if (typeof raw === 'string' && raw.trim()) {
    const n = normalizeCategory(raw)
    return CATEGORY_OPTIONS.find((c) => c.slug === n)?.name || raw
  }
  return 'Press media'
}

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Open the full release for complete details and quotes.'
  return value.length > 180 ? value.slice(0, 177).trimEnd() + '…' : value
}

const features = [
  {
    title: 'Wide Distribution Reach',
    description: 'Get your releases in front of journalists, editors, and syndication partners across hundreds of channels.',
    icon: LineChart,
    accent: 'from-[#640D5F] to-[#D91656]',
  },
  {
    title: 'Value Driven Approach',
    description: 'Releases are structured for scanning first and deep reading second—headline, lede, body, and contacts stay consistent.',
    icon: Sparkles,
    accent: 'from-[#EB5B00] to-[#FFB200]',
  },
  {
    title: 'Caring Customer Service',
    description: 'Real humans on scheduling, format questions, and timing so your news hits the window you promised leadership.',
    icon: Headphones,
    accent: 'from-[#D91656] to-[#640D5F]',
  },
  {
    title: 'Industry Excellence',
    description: 'Editorial-style presentation and archive patterns borrowed from major wires—without a recycled template look.',
    icon: BadgeCheck,
    accent: 'from-[#FFB200] to-[#EB5B00]',
  },
] as const

export async function HomePageOverride() {
  const raw = await fetchTaskPosts('mediaDistribution', 12, { fresh: true, revalidate: 120 })
  const posts: SitePost[] = raw.length > 0 ? raw : mergeEditorialPostsForHome([], getHomeEditorialMockPosts(), 6)
  const latest = posts.slice(0, 6)

  return (
    <div className="min-h-screen bg-[#fffcf7] text-[#1a0f18]">
      <NavbarShell />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#ead8cc]/80">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.4]"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 100% 0%, rgba(235, 91, 0, 0.15), transparent), radial-gradient(ellipse 60% 40% at 0% 100%, rgba(100, 13, 95, 0.12), transparent)',
            }}
            aria-hidden
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
            <div className="dtp-animate-in max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#640D5F]">Public companies · growth teams · agencies</p>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-[-0.035em] text-[#1a0f18] sm:text-5xl lg:text-[3.1rem]">
                Press Release Distribution Since 2004
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#5c4a52] sm:text-lg">
                {siteContent.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={siteContent.hero.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D91656] to-[#640D5F] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#640D5F]/20 transition hover:opacity-95"
                >
                  {siteContent.hero.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="dtp-animate-in dtp-delay-2 relative mx-auto flex w-full max-w-md justify-center lg:max-w-none">
              <div className="relative aspect-square w-full max-w-[min(100%,360px)]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fff8f0] to-[#ffe8f2] shadow-[0_32px_80px_rgba(100,13,95,0.2)]" />
                <div className="absolute inset-4 flex items-center justify-center rounded-full border-2 border-dashed border-[#EB5B00]/35 bg-white/60 backdrop-blur-sm">
                  <div className="relative h-[78%] w-[78%]">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&q=80&auto=format&fit=crop"
                      alt="Global media distribution"
                      fill
                      className="rounded-full object-cover"
                      sizes="(max-width: 768px) 100vw, 360px"
                      priority
                    />
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/40" />
                    <div className="absolute -right-1 -top-1 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFB200] text-[#2a1608] shadow-md">
                      <Newspaper className="h-5 w-5" />
                    </div>
                    <div className="absolute -bottom-1 -left-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#640D5F] text-white shadow-md">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature highlight */}
        <section className="bg-gradient-to-r from-[#640D5F] via-[#7a156f] to-[#640D5F] py-5 text-center">
          <p className="px-4 text-sm font-medium tracking-wide text-white/95 sm:text-base">
            Experience The 24-7 Press Release Difference
          </p>
        </section>

        {/* Feature grid */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`group dtp-animate-in relative overflow-hidden rounded-3xl border border-[#ead8cc] bg-white p-7 shadow-sm transition duration-300 hover:shadow-md ${i % 2 ? 'dtp-delay-2' : ''}`}
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.accent} text-white shadow-md shadow-black/10`}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a0f18]">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5c4a52]">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#EB5B00] to-[#D91656] py-14 text-center sm:py-16">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Ready to Grow Your Brand?</h2>
          <Link
            href="/register"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#9b1038] shadow-lg transition hover:bg-[#fff8f0]"
          >
            Get Started
          </Link>
        </section>

        {/* Latest */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-22">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#1a0f18] sm:text-3xl">
                Latest {SITE_CONFIG.name} Press Media
              </h2>
              <p className="mt-1 text-sm text-[#5c4a52]">Recent wire items—update automatically from your feed.</p>
            </div>
            <Link
              href="/updates"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#640D5F] hover:text-[#D91656]"
            >
              Open full archive
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post, index) => (
              <article
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#ead8cc] bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f4ece6]">
                  <ContentImage
                    src={getPostImage(post, index)}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 360px"
                  />
                  <span className="absolute left-3 top-3 inline-flex rounded-full bg-[#640D5F] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {getCategoryLabel(post)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 text-lg font-semibold text-[#1a0f18]">{post.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#5c4a52]">
                    {excerpt(post.summary)}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={buildPostUrl('mediaDistribution', post.slug)}
                      className="inline-flex items-center text-sm font-semibold text-[#D91656] hover:text-[#EB5B00]"
                    >
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
