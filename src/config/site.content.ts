import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press media distribution & newswire',
  },
  footer: {
    tagline: 'Wire-grade reach for teams that ship news on a schedule.',
  },
  hero: {
    badge: 'Press wire',
    title: ['Press Release Distribution Since 2004'],
    description:
      'Daily Trend Press helps organizations publish announcements with a clear archive, readable story pages, and distribution flows built for busy communications teams.',
    primaryCta: {
      label: 'Sign Up',
      href: '/register',
    },
    secondaryCta: {
      label: 'View Pricing',
      href: '/pricing',
    },
    searchPlaceholder: 'Search press media',
    focusLabel: 'Latest wire',
    featureCardBadge: 'Why teams stay',
    featureCardTitle: 'One home for press media, and reader trust.',
    featureCardDescription:
      'The homepage highlights your latest wire items, trust markers, and direct paths to plans so nothing gets lost in a generic blog layout.',
  },
  home: {
    metadata: {
      title: 'Daily Trend Press — press media distribution & newswire',
      description:
        'Distribute press media with a professional newswire experience: clear story pages, and an archive built for scanning.',
      openGraphTitle: 'Daily Trend Press — press media distribution',
      openGraphDescription:
        'Publish announcements with wire-style presentation, structured archives, and pricing that stays easy to compare.',
      keywords: [
        'press release distribution',
        'newswire',
        'media announcements',
        'PR wire',
        'company news',
        'Daily Trend Press',
      ],
    },
    introBadge: 'Newswire',
    introTitle: 'Built for communications that need both speed and polish.',
    introParagraphs: [
      'Daily Trend Press is tuned for teams that publish often: press media stays easy to find, detail pages read like a professional wire, and the archive supports category and search without feeling like a generic template.',
      'We keep the interface light so your stories stay in focus, while structure underneath stays compatible with the wider publishing system.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'A homepage that sells distribution, not blog noise.',
      'Archive pages with category filters and search hand-off.',
      'Detail pages with share tools and related reading.',
    ],
    primaryLink: {
      label: 'Browse the wire',
      href: '/news',
    },
    secondaryLink: {
      label: 'Talk to us',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready when you are',
    title: 'Need a calmer way to ship announcements at volume?',
    description:
      'Start with a plan, publish through the same routes you already use, and keep the reading experience consistent end to end.',
    primaryCta: {
      label: 'View plans',
      href: '/pricing',
    },
    secondaryCta: {
      label: 'Read latest press media',
      href: '/news',
    },
  },
  taskSectionHeading: 'Latest press media',
  taskSectionDescriptionSuffix: 'Fresh items from the wire, updated as your team publishes.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Press media archive',
    description: 'Scan the latest newswire posts with filters, search, and full release pages.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press media archive',
    paragraphs: [
      'Browse every live announcement in one place. Use category filters to jump between topics, or open search for keyword-wide discovery across the full wire.',
      'Each item opens to a full release view with clear headline hierarchy, share actions, and related items so readers can keep moving without hitting dead ends.',
    ],
    links: [
      { label: 'Home', href: '/' },
    ],
  },
}
