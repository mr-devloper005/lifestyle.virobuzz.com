import Link from 'next/link'
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

const col = {
  product: 'Distribution',
  company: 'Company',
  resources: 'Resources',
  legal: 'Legal',
} as const

const links = {
  product: [
    { name: 'Press release archive', href: '/updates' },
    { name: 'Search releases', href: '/search' },
  ],
  company: [
    { name: 'About us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Press room', href: '/press' },
  ],
  resources: [
    { name: 'Help center', href: '/help' },
    { name: 'Writing guide', href: '/help' },
  ],
  legal: [
    { name: 'Privacy policy', href: '/privacy' },
    { name: 'Terms of service', href: '/terms' },
  ],
} as const

const social = [
  { name: 'Twitter / X', href: 'https://twitter.com', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
]

export function FooterOverride() {
  return (
    <footer className="border-t border-[#2a1a5e] bg-gradient-to-b from-[#1a0f3e] to-[#0d0820] text-white">
      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#5628B4] via-[#D80E70] to-[#E7455F]" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5628B4] to-[#D80E70] text-sm font-black shadow-lg shadow-[#5628B4]/30">
                {SITE_CONFIG.name.slice(0, 1)}
              </span>
              <div>
                <p className="text-base font-bold leading-tight">{SITE_CONFIG.name}</p>
                <p className="text-xs text-white/60">Press Release Wire</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">{siteContent.footer.tagline}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/50">{SITE_CONFIG.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#F7B236] hover:bg-[#F7B236]/10 hover:text-[#F7B236]"
                  aria-label={s.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(
            [
              [col.product, links.product],
              [col.company, links.company],
              [col.resources, links.resources],
              [col.legal, links.legal],
            ] as const
          ).map(([title, items]) => (
            <div key={title}>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F7B236]/90">{title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {items.map((item) => (
                  <li key={`${title}-${item.name}`}>
                    <Link href={item.href} className="text-white/65 transition hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-8 text-sm text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="text-white/35">Professional press release distribution powered by Virobuzz Media.</p>
        </div>
      </div>
    </footer>
  )
}
