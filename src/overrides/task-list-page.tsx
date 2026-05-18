import Link from 'next/link'
import { Filter, Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { UpdatesMediaPostList } from '@/components/tasks/updates-media-post-list'
import { fetchTaskPosts } from '@/lib/task-data'
import { normalizeCategory, CATEGORY_OPTIONS } from '@/lib/categories'
import { SITE_CONFIG } from '@/lib/site-config'
import type { TaskKey } from '@/lib/site-config'
import { taskIntroCopy } from '@/config/site.content'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

type Props = { task: TaskKey; category?: string; sort?: string }

export async function TaskListPageOverride({ task, category, sort }: Props) {
  if (task !== 'mediaDistribution') {
    return (
      <div className="min-h-screen bg-[#f8f7ff] text-[#0f0a1e]">
        <NavbarShell />
        <main className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">This view is not configured for this page.</h1>
          <Link href="/" className="mt-4 inline-block text-[#D80E70] hover:underline">
            Back home
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const initial = await fetchTaskPosts('mediaDistribution', 48, { fresh: true })
  const intro = taskIntroCopy.mediaDistribution
  const catValue = category ? normalizeCategory(category) : 'all'

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#0f0a1e]">
      <NavbarShell />

      {/* Page header */}
      <div className="border-b border-[#ddd6f5] bg-gradient-to-b from-white to-[#f0ebff]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5628B4]">Press wire · scan & filter</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            Press Release Archive — {SITE_CONFIG.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5a4e7a] sm:text-base">
            {intro.paragraphs[0]}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Filter bar */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#ddd6f5] bg-white/90 p-4 shadow-sm lg:flex-row lg:items-end lg:justify-between">
          <form className="flex w-full flex-col gap-3 sm:max-w-2xl sm:flex-row sm:items-end" action="/updates" method="get">
            <div className="min-w-0 flex-1">
              <label htmlFor="list-category" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5a4e7a]">
                <span className="inline-flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5" /> Category
                </span>
              </label>
              <select
                id="list-category"
                name="category"
                defaultValue={catValue === 'all' ? 'all' : category}
                className="mt-1.5 h-11 w-full rounded-xl border border-[#ddd6f5] bg-[#f8f7ff] px-3 text-sm text-[#0f0a1e] focus:border-[#5628B4] focus:outline-none"
              >
                <option value="all">All topics</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-48">
              <label htmlFor="list-sort" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5a4e7a]">
                Date order
              </label>
              <select
                id="list-sort"
                name="sort"
                defaultValue={sort || 'newest'}
                className="mt-1.5 h-11 w-full rounded-xl border border-[#ddd6f5] bg-[#f8f7ff] px-3 text-sm text-[#0f0a1e] focus:border-[#5628B4] focus:outline-none"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
            <button
              type="submit"
              className="h-11 shrink-0 rounded-xl bg-gradient-to-r from-[#5628B4] to-[#D80E70] px-6 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
            >
              Apply
            </button>
          </form>
          <form className="flex w-full max-w-md gap-2 sm:w-auto" action="/search" method="get">
            <input type="hidden" name="master" value="1" />
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5628B4]" />
              <input
                name="q"
                placeholder="Search headlines & body…"
                className="h-11 w-full rounded-xl border border-[#ddd6f5] bg-white pl-9 pr-3 text-sm focus:border-[#5628B4] focus:outline-none"
                type="search"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="h-11 rounded-xl border border-[#D80E70]/30 bg-white px-4 text-sm font-bold text-[#D80E70] transition hover:bg-[#fce8f3]">
              Go
            </button>
          </form>
        </div>

        <UpdatesMediaPostList task={task} initialPosts={initial} category={category} sort={sort} />

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
          {intro.links.map((l) => (
            <Link key={l.href} href={l.href} className="font-semibold text-[#5628B4] hover:text-[#D80E70] hover:underline">
              {l.label}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
