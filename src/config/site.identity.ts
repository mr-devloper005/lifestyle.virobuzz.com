export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'mg6jugdq2l',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Virobuzz Media',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Press releases & media distribution',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Virobuzz Media is a professional press release distribution platform delivering your announcements to journalists, editors, and media partners worldwide.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'lifestyle.virobuzz.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lifestyle.virobuzz.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
