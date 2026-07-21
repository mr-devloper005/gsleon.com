import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Curated collections and useful resources',
      description: 'Explore curated bookmarks, resource shelves, and useful links through a focused public library.',
      openGraphTitle: 'Curated collections and useful resources',
      openGraphDescription: 'Discover useful resources, tools, references, and collections through a focused public library.',
      keywords: ['curated resources', 'bookmark collections', 'resource library', 'useful links'],
    },
    hero: {
      badge: 'Collections · Members',
      title: ['Useful resources,', 'arranged like a living library.'],
      description: 'Browse curated links, tools, references, and collection shelves built for repeat discovery.',
      primaryCta: { label: 'Browse collections', href: '/sbm' },
      secondaryCta: { label: 'Search library', href: '/search' },
      searchPlaceholder: 'Search resources, tools, references, and collections',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for reading, browsing, and connecting different kinds of content.',
      paragraphs: [
        'This site brings together article-style reading, visual browsing, and structured discovery so visitors can move naturally between different content types.',
        'Instead of separating stories, visuals, and supporting resources into disconnected surfaces, the platform keeps them connected in one place with consistent navigation and easier exploration.',
        'Whether someone starts with a story, an image-led post, a listing, or a resource page, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for articles, visuals, listings, and supporting resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore useful resources through one focused library.',
      description: 'Move between curated links, collection shelves, and reference pages through one clear discovery surface.',
      primaryCta: { label: 'Browse Collections', href: '/sbm' },
      secondaryCta: { label: 'Contact', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
      title: 'A calmer, clearer way to collect useful resources.',
      description: `${slot4BrandConfig.siteName} is built to make links, references, tools, and collections easier to evaluate and revisit.`,
    paragraphs: [
      'Instead of treating every useful link as a loose item, the platform gives resources enough structure to be compared, saved mentally, and revisited.',
      'Visitors can start with a collection, follow a source, search by category, or open a resource brief without losing context.',
    ],
    values: [
      {
        title: 'Curated by usefulness',
        description: 'We prioritize resources that are clear, practical, and worth returning to.',
      },
      {
        title: 'Collection-first discovery',
        description: 'The experience is shaped around shelves, categories, and source context.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'Clean navigation and direct resource pages help visitors decide what is worth opening.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Send a resource note, partnership idea, or support request.',
    description: 'Tell us what you want to add, fix, or clarify. We will route it to the right person without making you fit a generic support bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search resources, categories, and collections across the site.',
    },
    hero: {
      badge: 'Search the library',
      title: 'Find resources and collections faster.',
      description: 'Use keywords and categories to discover useful links from the public library.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable resources',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new resources for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to suggest a resource.',
      description: 'Use your account to open the publishing workspace and prepare a resource submission.',
    },
    hero: {
      badge: 'Resource workspace',
      title: 'Create a resource brief.',
      description: 'Add the title, collection, source URL, summary, and notes that help visitors decide why it matters.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to the library.',
      description: 'Login to continue browsing, managing submissions, and adding useful resources.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start collecting.',
      description: 'Create an account to access the resource workspace and submit useful links through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested resources',
      fallbackDescription: 'Identity details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
