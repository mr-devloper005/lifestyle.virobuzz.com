import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Globe2, Newspaper, ShieldCheck, TrendingUp, Users, Zap } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const pillars = [
  {
    title: 'Wire-native structure',
    description:
      'Every release follows headline, lede, body, and contact hierarchy — the same format journalists expect from major wires.',
    icon: Newspaper,
    color: '#5628B4',
  },
  {
    title: 'Global media reach',
    description:
      'Your release reaches thousands of journalists, editors, and media databases across 100+ countries within minutes of submission.',
    icon: Globe2,
    color: '#D80E70',
  },
  {
    title: 'Real-time performance data',
    description:
      'Track pickups, views, and engagement in real time. When leadership asks what a release did, you have the numbers.',
    icon: TrendingUp,
    color: '#E7455F',
  },
  {
    title: 'Trusted by 10,000+ organizations',
    description:
      'From startups to Fortune 500 companies — communications teams worldwide rely on Virobuzz Media for their most important announcements.',
    icon: Users,
    color: '#F7B236',
  },
  {
    title: 'Instant distribution',
    description:
      'Submit your release and it goes live on the wire within minutes — formatted, indexed, and ready for media pickup.',
    icon: Zap,
    color: '#5628B4',
  },
  {
    title: 'Editorial integrity',
    description:
      'We maintain strict quality standards so your releases appear alongside credible, professional content that journalists trust.',
    icon: ShieldCheck,
    color: '#D80E70',
  },
]

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About ${SITE_CONFIG.name}`,
    description: `How ${SITE_CONFIG.name} approaches press release distribution, media reach, and journalist trust.`,
  })
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#0f0a1e]">
      <NavbarShell />

      {/* Header */}
      <div className="border-b border-[#ddd6f5] bg-gradient-to-b from-white to-[#f0ebff]">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6f5] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5628B4]">
            Our mission
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
            About {SITE_CONFIG.name}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#5a4e7a] sm:text-lg">
            {SITE_CONFIG.name} is a professional press release distribution platform built for organizations that need wire-grade reach, professional formatting, and real results.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5628B4] to-[#D80E70] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#5628B4]/25 transition hover:opacity-90"
            >
              Start distributing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#ddd6f5] bg-white px-7 py-3 text-sm font-semibold text-[#5628B4] transition hover:border-[#5628B4] hover:bg-[#f0ebff]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        {/* Why we exist */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-[#ddd6f5] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#0f0a1e]">Why we exist</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5a4e7a]">
              Most organizations do not need another blog template. They need a professional front door for announcements, a consistent reading experience, and an archive that still makes sense six months later.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#5a4e7a]">
              That is what {SITE_CONFIG.name} is built for — wire-grade distribution with transparent pricing, predictable story pages, and a UI that looks like a modern newswire instead of a recolored consumer app.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#5a4e7a]">
              We bias toward clarity: honest reach reporting, structured archives, and distribution flows that map to how communications teams already work.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { label: 'Press releases distributed', value: '2M+', color: '#5628B4' },
              { label: 'Media contacts reached', value: '50K+', color: '#D80E70' },
              { label: 'Countries covered', value: '100+', color: '#E7455F' },
              { label: 'Organizations served', value: '10K+', color: '#F7B236' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-2xl border border-[#ddd6f5] bg-white p-5 shadow-sm"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white text-lg font-black"
                  style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}cc)` }}
                >
                  {stat.value.replace(/[^0-9KM+]/g, '').slice(0, 3)}
                </div>
                <div>
                  <p className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-xs text-[#5a4e7a]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#0f0a1e] sm:text-3xl">What sets us apart</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#5a4e7a]">
            Six principles that guide every decision we make at {SITE_CONFIG.name}.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-[#ddd6f5] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${p.color}18`, border: `1.5px solid ${p.color}30` }}
              >
                <p.icon className="h-5 w-5" style={{ color: p.color }} />
              </div>
              <h3 className="text-base font-bold text-[#0f0a1e]">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5a4e7a]">{p.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#5628B4] via-[#8b3fd4] to-[#D80E70] p-10 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to distribute your next release?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/80">
            Join thousands of organizations that trust {SITE_CONFIG.name} to deliver their most important announcements.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-black text-[#5628B4] shadow-lg transition hover:bg-[#f0ebff]"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
