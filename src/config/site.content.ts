import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Global press release distribution & media wire',
  },
  footer: {
    tagline: 'Connecting your story to the journalists who matter.',
  },
  hero: {
    badge: 'Press wire',
    title: ['Amplify Your Story. Reach Every Newsroom.'],
    description:
      'Virobuzz Media delivers your press releases to thousands of journalists, editors, and media outlets worldwide — with professional formatting, instant distribution, and real-time analytics.',
    primaryCta: {
      label: 'Distribute Now',
      href: '/register',
    },
    secondaryCta: {
      label: 'View Pricing',
      href: '/pricing',
    },
    searchPlaceholder: 'Search press releases',
    focusLabel: 'Latest releases',
    featureCardBadge: 'Why brands choose us',
    featureCardTitle: 'One platform for press releases, media reach, and journalist trust.',
    featureCardDescription:
      'From startup launches to enterprise announcements — Virobuzz Media gives every release a professional home with wire-grade distribution.',
  },
  home: {
    metadata: {
      title: 'Virobuzz Media — Press Release Distribution & Media Wire',
      description:
        'Distribute press releases with professional wire-grade reach: instant newsroom delivery, structured archives, and analytics built for communications teams.',
      openGraphTitle: 'Virobuzz Media — Press Release Distribution',
      openGraphDescription:
        'Publish announcements with wire-style presentation, global media reach, and pricing that scales with your team.',
      keywords: [
        'press release distribution',
        'media wire',
        'newswire',
        'PR distribution',
        'media announcements',
        'press release service',
        'Virobuzz Media',
      ],
    },
    introBadge: 'Media Wire',
    introTitle: 'Built for communications teams that need speed, reach, and polish.',
    introParagraphs: [
      'Virobuzz Media is engineered for organizations that publish press releases regularly: every release gets a professional detail page, a searchable archive, and distribution flows that reach the right journalists at the right time.',
      'We keep the interface clean so your stories stay front and center, while the infrastructure underneath handles syndication, SEO, and media partner delivery automatically.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Instant distribution to thousands of media contacts.',
      'Professional release pages with share tools and SEO.',
      'Searchable archive with category filters and analytics.',
    ],
    primaryLink: {
      label: 'Browse press releases',
      href: '/news',
    },
    secondaryLink: {
      label: 'Talk to us',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready to distribute',
    title: 'Get your next press release in front of the right journalists.',
    description:
      'Start distributing in minutes. Choose a plan, upload your release, and let Virobuzz Media handle the rest — from formatting to delivery.',
    primaryCta: {
      label: 'View plans',
      href: '/pricing',
    },
    secondaryCta: {
      label: 'Read latest releases',
      href: '/news',
    },
  },
  taskSectionHeading: 'Latest press releases',
  taskSectionDescriptionSuffix: 'Fresh releases from the wire, updated as organizations publish.',
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
    title: 'Press release archive',
    description: 'Browse every press release with category filters, search, and full release pages.',
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
    title: 'Press release archive',
    paragraphs: [
      'Browse every live press release in one place. Use category filters to jump between industries, or open search for keyword discovery across the full wire.',
      'Each release opens to a full professional page with clear headline hierarchy, share actions, and related releases so journalists and readers can keep moving without hitting dead ends.',
    ],
    links: [
      { label: 'Home', href: '/' },
    ],
  },
}
