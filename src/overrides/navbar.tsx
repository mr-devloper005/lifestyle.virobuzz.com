'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
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
  { label: 'Press media', href: '/updates' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-[#ead8cc]/90 bg-[#fffcf7]/92 backdrop-blur-xl">
      <div className="border-b border-[#ead8cc]/40 bg-[#3f0a3d] text-[11px] text-white/90 sm:text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
          <span className="font-medium tracking-wide">Press wire · {siteContent.navbar.tagline}</span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <Link href="/search" className="hover:text-[#FFB200]">
              Search archive
            </Link>
            <Link href="/register" className="font-semibold text-[#FFB200] hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#640D5F] to-[#D91656] text-sm font-bold text-white shadow-md shadow-[#640D5F]/30">
            {SITE_CONFIG.name.slice(0, 1)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-semibold tracking-tight text-[#1a0f18] group-hover:text-[#640D5F]">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-[#5c4a52] sm:block">dailytrendpress.com</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition',
                  active ? 'bg-[#640D5F] text-white shadow-sm' : 'text-[#3f3438] hover:bg-[#fff0f0]/80 hover:text-[#D91656]',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden rounded-full text-[#640D5F] md:inline-flex">
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
              <Button variant="ghost" size="sm" asChild className="rounded-full font-semibold text-[#3f0a3d]">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-full border-0 bg-gradient-to-r from-[#D91656] to-[#640D5F] font-semibold text-white shadow-md hover:opacity-95"
              >
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}
          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-[#ead8cc] bg-[#fffcf7] px-4 py-4 lg:hidden">
          <div className="mb-3 flex items-center gap-2 rounded-2xl border border-[#ead8cc] bg-white px-3 py-2">
            <Search className="h-4 w-4 text-[#640D5F]" />
            <Link href="/search" className="text-sm font-medium text-[#3f3438]" onClick={() => setOpen(false)}>
              Open site search
            </Link>
          </div>
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-2xl px-3 py-3 text-sm font-semibold text-[#1a0f18] hover:bg-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-[#ead8cc] pt-4">
            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <>
                <Link
                  href="/login"
                  className="block rounded-2xl border border-[#ead8cc] bg-white py-3 text-center text-sm font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="block rounded-2xl bg-[#640D5F] py-3 text-center text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
