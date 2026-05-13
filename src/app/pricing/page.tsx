import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'

const plans = [
  {
    name: 'Basic',
    price: 99,
    description: 'Lean syndication for routine announcements and internal comms that still need a public page.',
    popular: false,
    distribution: 'Core wire + archive',
    reach: 'Standard index partners',
    features: ['1 user seat', '48h support SLA', 'Embargo scheduling'],
  },
  {
    name: 'Pro',
    price: 249,
    description: 'For teams that publish at least once a week and need performance visibility.',
    popular: true,
    distribution: 'Pro syndication + digest inclusion',
    reach: 'Broader industry verticals',
    features: ['5 seats', '4h support SLA', 'A/B headlines', 'Quarterly reach snapshot'],
  },
  {
    name: 'Premium',
    price: 499,
    description: 'For launches, crisis windows, and moments when the story has to outrank everything else in your calendar.',
    popular: false,
    distribution: 'Priority rotation + day-of support',
    reach: 'Max vertical + follow-up resend',
    features: ['Unlimited seats (fair use)', '1h support SLA', 'Analyst Q&A pass', 'Custom routing'],
  },
] as const

const addOns = [
  { title: 'Add-on: multimedia package', copy: 'Extra image slots, 60s clip, and file attachments sized for major wires.' },
  { title: 'Add-on: same-day re-push', copy: 'Second push window in the 24h cycle when news shifts after publish.' },
  { title: 'Add-on: analyst briefing', copy: 'Optional 15-minute run-through for finance or public-policy releases.' },
]

const faq = [
  {
    q: 'What does distribution level mean?',
    a: 'It describes which partner surfaces include your release, how long it remains in rotation, and how quickly support will escalate issues.',
  },
  {
    q: 'What analytics are included?',
    a: 'Every plan includes archive views, referral domains where available, and a monthly aggregate; Pro+ adds more granular reporting.',
  },
  {
    q: 'Can I move between plans month to month?',
    a: 'Yes. Upgrades prorate, downgrades apply to the next cycle so a live run is never cut mid-way.',
  },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: `Distribution pricing — ${SITE_CONFIG.name}`,
    description: 'Compare Basic, Pro, and Premium newswire plans, add-ons, and FAQ for Daily Trend Press.',
  })
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fffcf7] text-[#1a0f18]">
      <NavbarShell />
      <div className="border-b border-[#ead8cc] bg-gradient-to-b from-[#2f0b2c] via-[#3f0a3d] to-[#2f0b2c] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-semibold sm:text-4xl">Newswire pricing that scales with your story calendar</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            {SITE_CONFIG.name} uses transparent tiers. Pick a lane, add what you need, and keep every release in the same professional layout.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FFB200] to-white px-6 py-2.5 text-sm font-bold text-[#2a0f0c] shadow">
              Get started
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-6 py-2.5 text-sm font-bold text-white hover:bg-white/10"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-200 hover:shadow-md ${
                p.popular ? 'border-2 border-[#D91656] shadow-lg shadow-[#d91656]/20' : 'border-[#ead8cc]'
              }`}
            >
              {p.popular && (
                <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#D91656] to-[#640D5F] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  <Sparkles className="h-3 w-3" />
                  Most popular
                </div>
              )}
              <div className="p-6">
                <h2 className="text-lg font-bold">{p.name}</h2>
                <p className="mt-1 text-3xl font-bold tabular-nums">
                  ${p.price}
                  <span className="text-sm font-medium text-[#5c4a52]"> / month</span>
                </p>
                <p className="mt-2 text-sm text-[#5c4a52]">{p.description}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  <li>
                    <span className="font-semibold text-[#640D5F]">Distribution: </span>
                    {p.distribution}
                  </li>
                  <li>
                    <span className="font-semibold text-[#640D5F]">Media reach: </span>
                    {p.reach}
                  </li>
                </ul>
                <ul className="mt-3 space-y-1.5 text-sm text-[#2d2326]">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D91656]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto border-t border-[#f0e3d8] p-4">
                <Link
                  href="/register"
                  className="flex w-full items-center justify-center rounded-full border border-[#ead8cc] py-2.5 text-sm font-bold text-[#1a0f18] hover:border-[#640D5F] hover:text-[#640D5F]"
                >
                  Choose {p.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-center text-2xl font-semibold">Add-ons</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {addOns.map((a) => (
            <Card key={a.title} className="border-[#ead8cc]">
              <CardContent className="p-5">
                <h3 className="text-sm font-bold text-[#1a0f18]">{a.title}</h3>
                <p className="mt-2 text-sm text-[#5c4a52]">{a.copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="mt-16 text-center text-2xl font-semibold">FAQ</h2>
        <div className="mx-auto mt-4 max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-[#ead8cc]">
                <AccordionTrigger className="text-left text-sm font-semibold hover:text-[#D91656]">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-[#5c4a52] leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  )
}
