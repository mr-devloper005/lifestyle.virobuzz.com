'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Newspaper, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((m) => m.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

export const NAVBAR_OVERRIDE_ENABLED = true

const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Press Releases', href: '/updates' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-[#ddd6f5]/80 bg-[#f8f7ff]/95 backdrop-blur-xl">
      {/* Top utility bar */}
      <div className="border-b border-[#5628B4]/20 bg-gradient-to-r from-[#5628B4] to-[#3a1a80] text-[11px] text-white/90 sm:text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
          <span className="flex items-center gap-2 font-medium tracking-wide">
            <Newspaper className="h-3.5 w-3.5 text-[#F7B236]" />
            Press wire · {siteContent.navbar.tagline}
          </span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <Link href="/search" className="hover:text-[#F7B236] transition">
              Search archive
            </Link>
            <Link href="/register" className="font-bold text-[#F7B236] hover:underline">
              Distribute a release
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5628B4] to-[#D80E70] text-sm font-black text-white shadow-md shadow-[#5628B4]/30">
            {SITE_CONFIG.name.slice(0, 1)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold tracking-tight text-[#0f0a1e] transition group-hover:text-[#5628B4]">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5a4e7a] sm:block">
              Press Release Wire
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {mainNav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  active
                    ? 'bg-gradient-to-r from-[#5628B4] to-[#D80E70] text-white shadow-sm'
                    : 'text-[#2d1f4e] hover:bg-[#f0ebff] hover:text-[#5628B4]',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden rounded-full text-[#5628B4] hover:bg-[#f0ebff] md:inline-flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          {isAuthenticated ? (
            <div className="hidden md:block">
              <NavbarAuthControls />
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full font-semibold text-[#2d1f4e] hover:bg-[#f0ebff] hover:text-[#5628B4]">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-full border-0 bg-gradient-to-r from-[#5628B4] to-[#D80E70] font-bold text-white shadow-md shadow-[#5628B4]/25 hover:opacity-90"
              >
                <Link href="/register">Distribute Now</Link>
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#5628B4] hover:bg-[#f0ebff] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#ddd6f5] bg-[#f8f7ff] px-4 py-4 lg:hidden">
          <div className="mb-3 flex items-center gap-2 rounded-2xl border border-[#ddd6f5] bg-white px-3 py-2.5">
            <Search className="h-4 w-4 text-[#5628B4]" />
            <Link href="/search" className="text-sm font-semibold text-[#2d1f4e]" onClick={() => setOpen(false)}>
              Search press releases
            </Link>
          </div>
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-2xl px-4 py-3 text-sm font-semibold text-[#0f0a1e] transition hover:bg-white hover:text-[#5628B4]"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-[#ddd6f5] pt-4">
            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <>
                <Link
                  href="/login"
                  className="block rounded-2xl border border-[#ddd6f5] bg-white py-3 text-center text-sm font-semibold text-[#5628B4]"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="block rounded-2xl bg-gradient-to-r from-[#5628B4] to-[#D80E70] py-3 text-center text-sm font-bold text-white"
                  onClick={() => setOpen(false)}
                >
                  Distribute Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
