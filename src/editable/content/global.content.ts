import { slot4BrandConfig } from '@/editable/theme/brand.config'
import { CATEGORY_OPTIONS } from '@/lib/categories'

export const uiHiddenTaskKeys = ['profile'] as const
export const isUiHiddenTask = (key: string) => (uiHiddenTaskKeys as readonly string[]).includes(key)

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent reading platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated collections and resources',
    primaryLinks: [
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Explore collections', href: '/sbm' },
      secondary: { label: 'Submit a resource', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Curated resources, organized into collections',
    description: 'A public library for useful links, tools, references, and collections worth returning to.',
    columns: [
      {
        title: 'Collections',
        links: CATEGORY_OPTIONS.slice(0, 8).map((item) => ({ label: item.name, href: `/sbm?category=${item.slug}` })),
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for focused resource discovery.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
