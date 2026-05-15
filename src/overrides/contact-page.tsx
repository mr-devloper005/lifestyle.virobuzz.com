import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#0f0a1e]">
      <NavbarShell />

      {/* Header */}
      <div className="border-b border-[#ddd6f5] bg-gradient-to-b from-white to-[#f0ebff]">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6f5] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5628B4]">
            Get in touch
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Contact Virobuzz Media</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5a4e7a] sm:text-base">
            Distribution questions, billing, editorial timing, or partnership inquiries — send us the details and we will route your request to the right team.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        {/* Form */}
        <div className="rounded-3xl border border-[#ddd6f5] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold">Send a message</h2>
          <p className="mt-1 text-sm text-[#5a4e7a]">Fill in the form below and our team will get back to you within 24 hours.</p>
          <form className="mt-6 grid gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.15em] text-[#5a4e7a]" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                required
                className="mt-1.5 h-11 w-full rounded-xl border border-[#ddd6f5] bg-[#f8f7ff] px-3 text-sm transition focus:border-[#5628B4] focus:outline-none"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.15em] text-[#5a4e7a]" htmlFor="contact-email">
                Work email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="mt-1.5 h-11 w-full rounded-xl border border-[#ddd6f5] bg-[#f8f7ff] px-3 text-sm transition focus:border-[#5628B4] focus:outline-none"
                placeholder="name@company.com"
                autoComplete="email"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.15em] text-[#5a4e7a]" htmlFor="contact-phone">
                  Phone
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  className="mt-1.5 h-11 w-full rounded-xl border border-[#ddd6f5] bg-[#f8f7ff] px-3 text-sm transition focus:border-[#5628B4] focus:outline-none"
                  placeholder="Optional"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.15em] text-[#5a4e7a]" htmlFor="contact-subject">
                  Subject
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  className="mt-1.5 h-11 w-full rounded-xl border border-[#ddd6f5] bg-[#f8f7ff] px-3 text-sm transition focus:border-[#5628B4] focus:outline-none"
                  defaultValue="general"
                >
                  <option value="general">General question</option>
                  <option value="distribution">Distribution &amp; reach</option>
                  <option value="billing">Billing &amp; plan change</option>
                  <option value="partnership">Media partnership</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.15em] text-[#5a4e7a]" htmlFor="contact-body">
                Message
              </label>
              <textarea
                id="contact-body"
                name="message"
                rows={5}
                className="mt-1.5 w-full rounded-2xl border border-[#ddd6f5] bg-[#f8f7ff] px-3 py-2.5 text-sm transition focus:border-[#5628B4] focus:outline-none"
                placeholder="What do you need help with?"
              />
            </div>
            <button
              type="button"
              className="h-12 w-full rounded-full bg-gradient-to-r from-[#5628B4] to-[#D80E70] text-sm font-bold text-white shadow-md shadow-[#5628B4]/25 transition hover:opacity-90"
            >
              Send message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
