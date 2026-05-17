import Link from 'next/link'
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true


const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value
}


const col = {
  product: 'Product',
  company: 'Company',
  resources: 'Resources',
  legal: 'Legal',
} as const

const links = {
  product: [
    { name: 'Press media archive', href: '/updates' },
    { name: 'Search', href: '/search' },
  ],
  company: [
    { name: 'About us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Press room', href: '/press' },
  ],
  resources: [
    { name: 'Help', href: '/help' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
} as const

const social = [
  { name: 'Twitter / X', href: 'https://twitter.com', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
]

export async function FooterOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 200, { allowMockFallback: false })
  const categories = Array.from(
    new Map(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          if (!raw) return null
          const slug = normalizeCategory(raw)
          return { slug, name: getCategoryLabel(raw) }
        })
        .filter((item): item is { slug: string; name: string } => Boolean(item))
        .map((item) => [item.slug, item])
    ).values()
  ).slice(0, 8)

  return (
    <footer className="border-t border-[#2a0d28] bg-gradient-to-b from-[#2f0b2c] to-[#1a0618] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D91656] to-[#640D5F] text-sm font-bold">
                {SITE_CONFIG.name.slice(0, 1)}
              </span>
              <div>
                <p className="text-base font-semibold leading-tight">{SITE_CONFIG.name}</p>
                <p className="text-xs text-white/65">{siteContent.footer.tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{SITE_CONFIG.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-[#FFB200] hover:text-[#FFB200]"
                  aria-label={s.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {(
            [
              [col.product, links.product],
              [col.company, links.company],
              [col.resources, links.resources],
              [col.legal, links.legal],
            ] as const
          ).map(([title, items]) => (
            <div key={title}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFB200]/90">{title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white/75 transition hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {categories.length ? (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Categories</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/updates?category=${category.slug}`}
                  className="opacity-80 underline-offset-4 transition hover:opacity-100 hover:underline"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="text-white/50">A press distribution experience built on the shared publishing engine.</p>
        </div>
      </div>
    </footer>
  )
}
