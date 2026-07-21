import Link from 'next/link'
import { ArrowRight, Bookmark, Check, ExternalLink, LibraryBig, Search, Sparkles } from 'lucide-react'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { getEditableCategory, getEditableExcerpt, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-8 lg:px-16'

function getContent(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

function getField(post: SitePost, keys: string[]) {
  const content = getContent(post)
  for (const key of keys) {
    const value = content[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function domainOf(post: SitePost) {
  const raw = getField(post, ['website', 'url', 'link'])
  if (!raw) return 'Curated source'
  return raw.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0]
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

const collectionLinks = CATEGORY_OPTIONS.slice(0, 8).map((item) => ({
  label: item.name,
  href: `/sbm?category=${item.slug}`,
}))

export function EditableHomeHero({ primaryRoute, posts }: HomeSectionProps) {
  const featured = posts[0]
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className={`${container} grid min-h-[calc(100vh-78px)] gap-12 py-16 lg:grid-cols-[1fr_0.86fr] lg:items-center lg:py-20`}>
        <EditableReveal className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p>
          <h1 className="editable-display mt-6 text-balance text-5xl font-medium leading-[0.96] sm:text-6xl lg:text-[4.85rem]">
            {pagesContent.home.hero.title.join(' ')}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/68 sm:text-lg">{pagesContent.home.hero.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={primaryRoute} className="inline-flex h-[50px] items-center gap-2 bg-[var(--slot4-accent)] px-8 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black">
              {pagesContent.home.hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/search" className="inline-flex h-[50px] items-center gap-2 border border-white/20 px-8 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-white">
              <Search className="h-4 w-4" /> {pagesContent.home.hero.secondaryCta.label}
            </Link>
          </div>
        </EditableReveal>

        <EditableReveal index={1}>
          <div className="border border-white/12 bg-white text-black">
            <div className="border-b border-black/10 bg-[var(--slot4-accent)] px-5 py-4 text-sm font-medium text-white">Featured resource shelf</div>
            <div className="grid gap-0">
              {(posts.length ? posts.slice(0, 4) : [featured]).filter(Boolean).map((post, index) => (
                <Link key={post.id || post.slug} href={postHref('sbm', post, primaryRoute)} className="group grid grid-cols-[56px_minmax(0,1fr)] gap-4 border-b border-black/10 p-5 transition duration-300 last:border-b-0 hover:bg-[var(--slot4-panel-bg)]">
                  <span className="flex h-12 w-12 items-center justify-center bg-black text-xs font-medium text-white">{String(index + 1).padStart(2, '0')}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-medium uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{domainOf(post)}</span>
                    <span className="mt-2 block text-xl font-semibold leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}

export function EditableCollectionsMarquee({ primaryRoute }: HomeSectionProps) {
  return (
    <section className="border-y border-[var(--editable-border)] bg-white">
      <EditableReveal>
        <div className={`${container} flex flex-wrap items-center gap-3 py-7`}>
          <span className="mr-3 text-xs font-medium uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Collections</span>
          {collectionLinks.map((item, index) => (
            <Link key={item.href} href={item.href || primaryRoute} className={`${index === 1 ? 'bg-[var(--slot4-green)]' : 'bg-[var(--slot4-panel-bg)]'} inline-flex h-10 items-center px-4 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white`}>
              {item.label}
            </Link>
          ))}
        </div>
      </EditableReveal>
    </section>
  )
}

const features = [
  'Collections are organized around repeat visits, not one-off browsing.',
  'Every resource keeps source context visible before you open it.',
  'Search and archive pages stay tuned for links, tools, references, and guides.',
]

export function EditableResourceFeatures(_: HomeSectionProps) {
  return (
    <section className="bg-[var(--slot4-panel-bg)]">
      <div className={`${container} py-20 lg:py-24`}>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <EditableReveal>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Why it works</p>
            <h2 className="editable-display mt-5 text-4xl font-medium leading-tight sm:text-5xl">A public resource library with an editorial pulse.</h2>
          </EditableReveal>
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <EditableReveal key={feature} index={index}>
                <div className="grid gap-5 border border-[var(--editable-border)] bg-white p-6 sm:grid-cols-[42px_minmax(0,1fr)]">
                  <span className="flex h-10 w-10 items-center justify-center bg-black text-white"><Check className="h-5 w-5" /></span>
                  <p className="text-xl font-medium leading-8">{feature}</p>
                </div>
              </EditableReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ResourceCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex min-h-[280px] flex-col border border-[var(--editable-border)] bg-white p-6 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)]">
      <div className="flex items-start justify-between gap-5">
        <span className="flex h-12 w-12 items-center justify-center bg-[var(--slot4-accent)] text-white"><Bookmark className="h-5 w-5" /></span>
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="mt-auto pt-10">
        <p className="truncate text-xs font-medium uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 150)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">Open brief <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export function EditableFeaturedResources({ primaryRoute, posts }: HomeSectionProps) {
  const visible = posts.slice(0, 6)
  if (!visible.length) return null
  return (
    <section className="bg-white">
      <div className={`${container} py-20 lg:py-24`}>
        <EditableReveal>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Featured</p>
              <h2 className="editable-display mt-4 text-4xl font-medium leading-tight sm:text-5xl">Current resource picks.</h2>
            </div>
            <Link href={primaryRoute} className="inline-flex h-[50px] items-center gap-2 border border-[var(--editable-border)] px-8 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:border-black">
              Browse all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </EditableReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((post, index) => (
            <EditableReveal key={post.id || post.slug} index={index}>
              <ResourceCard post={post} href={postHref('sbm', post, primaryRoute)} index={index} />
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh shelf', title: 'Newly added resources' },
  browse: { eyebrow: 'Trending shelf', title: 'Collections getting attention' },
  index: { eyebrow: 'Evergreen shelf', title: 'References worth keeping' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Collection', title: 'More resources' }
        const pool = dedupePosts(section.posts).slice(0, 4)
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-black text-white' : 'bg-[var(--slot4-panel-bg)] text-black'}>
            <div className={`${container} py-18 py-20 lg:py-24`}>
              <EditableReveal>
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                    <h2 className="editable-display mt-4 text-4xl font-medium leading-tight sm:text-5xl">{copy.title}</h2>
                  </div>
                  <Link href={section.href || primaryRoute} className={`inline-flex h-[50px] items-center gap-2 px-8 text-sm font-medium transition duration-300 hover:-translate-y-0.5 ${index % 2 === 0 ? 'bg-white text-black hover:bg-[var(--slot4-accent)] hover:text-white' : 'border border-[var(--editable-border)] bg-white hover:border-black'}`}>
                    See shelf <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </EditableReveal>
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {pool.map((post, itemIndex) => (
                  <EditableReveal key={post.id || post.slug} index={itemIndex}>
                    <Link href={postHref(primaryTask, post, primaryRoute)} className={`group block min-h-[240px] border p-5 transition duration-500 hover:-translate-y-1 ${index % 2 === 0 ? 'border-white/12 bg-white/5 hover:bg-white hover:text-black' : 'border-[var(--editable-border)] bg-white'}`}>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{domainOf(post)}</p>
                      <h3 className="mt-12 text-xl font-semibold leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
                      <p className={`mt-3 line-clamp-2 text-sm leading-6 ${index % 2 === 0 ? 'text-white/58 group-hover:text-black/60' : 'text-[var(--slot4-muted-text)]'}`}>{getEditableExcerpt(post, 110)}</p>
                    </Link>
                  </EditableReveal>
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

export function EditableHomeProof({ posts }: { posts: SitePost[] }) {
  const stats = [
    { value: `${Math.max(posts.length, 1)}+`, label: 'live resource briefs' },
    { value: '5', label: 'collection lanes' },
    { value: '1', label: 'focused public archive' },
  ]
  return (
    <section className="bg-white">
      <div className={`${container} py-16`}>
        <EditableReveal>
          <div className="grid border border-[var(--editable-border)] md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border-b border-[var(--editable-border)] p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <p className="editable-display text-5xl font-medium">{stat.value}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}

export function EditableHomeFaq() {
  const items = [
    ['What belongs here?', 'Useful links, tools, references, directories, guides, and collections that help people discover something worth saving.'],
    ['Can I search by collection?', 'Yes. Search supports keywords, category labels, and collection-oriented filtering across the public archive.'],
    ['Who can submit?', 'Signed-in members can open the create workspace and suggest new resources for the library.'],
  ]
  return (
    <section className="bg-[var(--slot4-panel-bg)]">
      <div className={`${container} py-20 lg:py-24`}>
        <EditableReveal>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">FAQ</p>
              <h2 className="editable-display mt-4 text-4xl font-medium leading-tight">Resource discovery, without the fluff.</h2>
            </div>
            <div className="grid gap-3">
              {items.map(([question, answer], index) => (
                <details key={question} className="group border border-[var(--editable-border)] bg-white p-6" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                    {question}
                    <Sparkles className="h-4 w-4 text-[var(--slot4-accent)] transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[var(--slot4-accent)] text-white">
      <div className={`${container} py-18 py-20 text-center lg:py-24`}>
        <EditableReveal>
          <LibraryBig className="mx-auto h-10 w-10" />
          <h2 className="editable-display mx-auto mt-6 max-w-3xl text-4xl font-medium leading-tight sm:text-6xl">Add something genuinely useful to the library.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/82">Suggest resources, collect references, and help the next visitor find a better starting point.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/create" className="inline-flex h-[50px] items-center gap-2 bg-white px-8 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5">
              Submit resource <ExternalLink className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex h-[50px] items-center gap-2 border border-white/45 px-8 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-white">
              Contact
            </Link>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}
