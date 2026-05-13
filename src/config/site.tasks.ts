export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Press media',
    route: '/news',
    description: 'Newswire stories, announcements, and company updates in one scannable feed.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/news',
} as const
