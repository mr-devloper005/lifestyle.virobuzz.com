import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BarChart3,
  Globe2,
  Headphones,
  Newspaper,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
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
  return 'Press Release'
}

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Open the full release for complete details and quotes.'
  return value.length > 180 ? value.slice(0, 177).trimEnd() + '…' : value
}

const features = [
  {
    title: 'Global Media Reach',
    description: 'Distribute to thousands of journalists, editors, and media outlets across 100+ countries with a single submission.',
    icon: Globe2,
    accent: 'from-[#5628B4] to-[#D80E70]',
    bg: 'bg-[#f0ebff]',
    iconColor: 'text-[#5628B4]',
  },
  {
    title: 'Instant Wire Distribution',
    description: 'Your release goes live on the wire within minutes — formatted, indexed, and ready for journalists to pick up.',
    icon: Zap,
    accent: 'from-[#D80E70] to-[#E7455F]',
    bg: 'bg-[#fce8f3]',
    iconColor: 'text-[#D80E70]',
  },
  {
    title: 'Real-Time Analytics',
    description: 'Track pickups, views, and media engagement in real time so you can report results to leadership with confidence.',
    icon: BarChart3,
    accent: 'from-[#E7455F] to-[#F7B236]',
    bg: 'bg-[#fef0f2]',
    iconColor: 'text-[#E7455F]',
  },
  {
    title: 'Dedicated Support',
    description: 'Real humans available for scheduling, formatting questions, and timing so your news hits the window you promised.',
    icon: Headphones,
    accent: 'from-[#F7B236] to-[#5628B4]',
    bg: 'bg-[#fff8ec]',
    iconColor: 'text-[#F7B236]',
  },
] as const

const stats = [
  { value: '50K+', label: 'Media contacts', icon: Users },
  { value: '100+', label: 'Countries reached', icon: Globe2 },
  { value: '2M+', label: 'Releases distributed', icon: Send },
  { value: '99.9%', label: 'Uptime guarantee', icon: ShieldCheck },
]

const categories = [
  'Technology', 'Finance', 'Healthcare', 'Entertainment',
  'Sports', 'Politics', 'Business', 'Science',
]

export async function HomePageOverride() {
  const raw = await fetchTaskPosts('mediaDistribution', 12, { fresh: true, revalidate: 120 })
  const posts: SitePost[] = raw.length > 0 ? raw : mergeEditorialPostsForHome([], getHomeEditorialMockPosts(), 6)
  const featured = posts[0]
  const latest = posts.slice(1, 7)

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#0f0a1e]">
      <NavbarShell />
      <main>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden border-b border-[#ddd6f5]">
          {/* Background blobs */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 100% 0%, rgba(216,14,112,0.12), transparent),' +
                'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(86,40,180,0.1), transparent)',
            }}
            aria-hidden
          />
          {/* Decorative grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'linear-gradient(rgba(86,40,180,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(86,40,180,0.06) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left copy */}
              <div className="dtp-animate-in max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#5628B4]/20 bg-[#5628B4]/8 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#5628B4]">
                  <Radio className="h-3.5 w-3.5" />
                  Global Press Release Wire
                </div>
                <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#0f0a1e] sm:text-5xl lg:text-[3.4rem]">
                  Amplify Your Story.{' '}
                  <span className="bg-gradient-to-r from-[#5628B4] via-[#D80E70] to-[#E7455F] bg-clip-text text-transparent">
                    Reach Every Newsroom.
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-base leading-8 text-[#5a4e7a] sm:text-lg">
                  {siteContent.hero.description}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={siteContent.hero.primaryCta.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5628B4] to-[#D80E70] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5628B4]/25 transition hover:opacity-90 hover:shadow-xl"
                  >
                    {siteContent.hero.primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/news"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ddd6f5] bg-white px-7 py-3.5 text-sm font-semibold text-[#5628B4] transition hover:border-[#5628B4]/40 hover:bg-[#f0ebff]"
                  >
                    <Newspaper className="h-4 w-4" />
                    Browse releases
                  </Link>
                </div>
                {/* Trust badges */}
                <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-[#5a4e7a]">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#5628B4]" /> Trusted by 10,000+ organizations</span>
                  <span className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-[#D80E70]" /> 2M+ releases distributed</span>
                </div>
              </div>

              {/* Right — featured release card */}
              <div className="dtp-animate-in dtp-delay-2 relative">
                <div className="relative overflow-hidden rounded-3xl border border-[#ddd6f5] bg-white shadow-2xl shadow-[#5628B4]/10">
                  {/* Top accent bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#5628B4] via-[#D80E70] to-[#E7455F]" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5628B4]">
                      <span className="flex h-2 w-2 rounded-full bg-[#E7455F]" />
                      Live on the wire
                    </div>
                    {featured ? (
                      <>
                        <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-2xl bg-[#ede9f8]">
                          <ContentImage
                            src={getPostImage(featured, 0)}
                            alt={featured.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 560px"
                            priority
                          />
                          <span className="absolute left-3 top-3 rounded-full bg-[#5628B4] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                            {getCategoryLabel(featured)}
                          </span>
                        </div>
                        <h3 className="mt-4 line-clamp-2 text-lg font-bold text-[#0f0a1e]">{featured.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5a4e7a]">{excerpt(featured.summary)}</p>
                        <Link
                          href={buildPostUrl('mediaDistribution', featured.slug)}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#D80E70] hover:text-[#5628B4]"
                        >
                          Read full release <ArrowRight className="h-4 w-4" />
                        </Link>
                      </>
                    ) : (
                      <div className="mt-4 flex h-48 items-center justify-center rounded-2xl bg-[#ede9f8]">
                        <Newspaper className="h-10 w-10 text-[#5628B4]/30" />
                      </div>
                    )}
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-2xl border border-[#ddd6f5] bg-white px-4 py-2.5 shadow-lg">
                  <Sparkles className="h-4 w-4 text-[#F7B236]" />
                  <span className="text-xs font-bold text-[#0f0a1e]">Updated in real-time</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS TICKER ── */}
        <section className="border-b border-[#ddd6f5] bg-gradient-to-r from-[#5628B4] via-[#7a3cc8] to-[#D80E70]">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <s.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{s.value}</p>
                    <p className="text-[11px] text-white/75">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORY PILLS ── */}
        <section className="border-b border-[#ddd6f5] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5a4e7a]">Browse by:</span>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/updates?category=${cat.toLowerCase()}`}
                  className="rounded-full border border-[#ddd6f5] bg-[#f8f7ff] px-3.5 py-1.5 text-xs font-semibold text-[#5628B4] transition hover:border-[#5628B4] hover:bg-[#f0ebff]"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6f5] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5628B4]">
              Why choose Virobuzz Media
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[#0f0a1e] sm:text-4xl">
              Everything your PR team needs
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#5a4e7a]">
              From startup launches to enterprise announcements — professional distribution built for communications teams that move fast.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`group dtp-animate-in relative overflow-hidden rounded-3xl border border-[#ddd6f5] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#5628B4]/8 ${i % 2 ? 'dtp-delay-2' : ''}`}
              >
                <div className={`mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${f.accent} p-3 shadow-md`}>
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0f0a1e]">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-7 text-[#5a4e7a]">{f.description}</p>
                {/* Decorative corner gradient */}
                <div
                  className={`pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-bl ${f.accent} opacity-5`}
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="border-y border-[#ddd6f5] bg-gradient-to-b from-[#f0ebff] to-[#f8f7ff] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#0f0a1e] sm:text-4xl">
                Distribute in 3 simple steps
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-[#5a4e7a]">
                From draft to live wire in minutes — no technical setup required.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { step: '01', title: 'Write your release', desc: 'Use our editor or paste your existing release. We format it to wire standards automatically.', icon: Newspaper, color: '#5628B4' },
                { step: '02', title: 'Choose distribution', desc: 'Select your target regions, industries, and media categories. Preview your reach before submitting.', icon: Globe2, color: '#D80E70' },
                { step: '03', title: 'Go live instantly', desc: 'Your release hits the wire within minutes and starts appearing in journalist inboxes and media databases.', icon: Send, color: '#E7455F' },
              ].map((item) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`, border: `2px solid ${item.color}30` }}
                  >
                    <item.icon className="h-7 w-7" style={{ color: item.color }} />
                  </div>
                  <span className="mt-4 text-xs font-black uppercase tracking-[0.3em]" style={{ color: item.color }}>{item.step}</span>
                  <h3 className="mt-2 text-lg font-bold text-[#0f0a1e]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a4e7a]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#5628B4] via-[#8b3fd4] to-[#D80E70] py-14 text-center sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(247,178,54,0.4), transparent 40%), radial-gradient(circle at 80% 50%, rgba(231,69,95,0.3), transparent 40%)',
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl px-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90">
              <Zap className="h-3.5 w-3.5 text-[#F7B236]" />
              Start distributing today
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Ready to get your story in front of the world?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/80">
              Join thousands of organizations that trust Virobuzz Media to deliver their most important announcements.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#5628B4] shadow-lg transition hover:bg-[#f0ebff]"
              >
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </section>

        {/* ── LATEST RELEASES ── */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6f5] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#5628B4]">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#E7455F]" />
                Live wire
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-[#0f0a1e] sm:text-3xl">
                Latest Press Releases
              </h2>
              <p className="mt-1 text-sm text-[#5a4e7a]">Fresh releases from the wire — updated as organizations publish.</p>
            </div>
            <Link
              href="/updates"
              className="group inline-flex items-center gap-2 rounded-full border border-[#ddd6f5] bg-white px-5 py-2.5 text-sm font-bold text-[#5628B4] transition hover:border-[#5628B4] hover:bg-[#f0ebff]"
            >
              View full archive
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post, index) => (
              <article
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#ddd6f5] bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#5628B4]/8"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#ede9f8]">
                  <ContentImage
                    src={getPostImage(post, index + 1)}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 360px"
                  />
                  <span className="absolute left-3 top-3 inline-flex rounded-full bg-[#5628B4] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {getCategoryLabel(post)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 text-base font-bold leading-snug text-[#0f0a1e]">{post.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#5a4e7a]">
                    {excerpt(post.summary)}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={buildPostUrl('mediaDistribution', post.slug)}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D80E70] transition hover:text-[#5628B4]"
                    >
                      Read release
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── BOTTOM TRUST STRIP ── */}
        <section className="border-t border-[#ddd6f5] bg-white py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-[#5a4e7a]">
              Trusted by leading organizations worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 opacity-50 grayscale">
              {[
                'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=120&h=40&fit=crop&auto=format',
                'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=120&h=40&fit=crop&auto=format',
                'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=120&h=40&fit=crop&auto=format',
              ].map((src, i) => (
                <div key={i} className="relative h-8 w-24 overflow-hidden rounded">
                  <Image src={src} alt="Partner logo" fill className="object-cover" sizes="96px" />
                </div>
              ))}
              <span className="text-sm font-semibold text-[#5a4e7a]">+ 10,000 more organizations</span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
