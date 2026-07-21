import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Command, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { toPlainText } from '@/editable/cards/PostCards'
import { pagesContent } from '@/editable/content/pages.content'
import { isUiHiddenTask } from '@/editable/content/global.content'
import { Ads, getSlotSizes } from '@/lib/ads'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const pickRandom = (sizes: string[]) => sizes[Math.floor(Math.random() * sizes.length)]
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => {
  const content = getContent(post)
  return toPlainText(
    (typeof post.summary === 'string' && post.summary) ||
    compactRaw(content.description) ||
    compactRaw(content.excerpt) ||
    compactRaw(content.body) ||
    '',
  )
}
const categoryOf = (post: SitePost) => compactRaw(getContent(post).category) || post.tags?.[0] || 'Resource'

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (derivedTask && isUiHiddenTask(derivedTask)) return false
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  if (task && isUiHiddenTask(task)) return null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'sbm'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const strong = index === 0

  return (
    <Link href={href} className={`group grid overflow-hidden border border-[var(--editable-border)] bg-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] ${strong ? 'lg:grid-cols-[0.9fr_1.1fr] lg:col-span-2' : ''}`}>
      {image ? (
        <div className={`relative overflow-hidden bg-black ${strong ? 'aspect-[4/3] lg:aspect-auto' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover opacity-88 transition duration-500 group-hover:scale-105" />
          <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-black">{categoryOf(post)}</span>
        </div>
      ) : null}
      <div className="flex min-h-[240px] flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-5">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Result {String(index + 1).padStart(2, '0')}</span>
          {!image ? <span className="bg-black px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white">{categoryOf(post)}</span> : null}
        </div>
        <h2 className="mt-auto pt-10 text-2xl font-semibold leading-tight text-black group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
        {summary ? <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] opacity-60 group-hover:opacity-100">Open resource <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled && !isUiHiddenTask(item.key)).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled && !isUiHiddenTask(item.key))

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-black">
        <section className="bg-black text-white">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.search.hero.badge}</p>
              <h1 className="mt-6 text-5xl font-medium leading-[0.96] sm:text-7xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/68">{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className="self-end border border-white/12 bg-white p-4 text-black sm:p-5">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 border border-[var(--editable-border)] bg-white px-4 py-4">
                <Command className="h-5 w-5 text-[var(--slot4-accent)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-current/35" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_0.8fr]">
                <label className="flex items-center gap-2 border border-[var(--editable-border)] bg-white px-4 py-3">
                  <Filter className="h-4 w-4 opacity-45" />
                  <input name="category" defaultValue={category} placeholder="Collection" className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-current/35" />
                </label>
                <select name="task" defaultValue={task} className="border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-medium outline-none">
                  <option value="">All resources</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.key === 'sbm' ? 'Collections / Members' : item.label}</option>)}
                </select>
              </div>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center bg-[var(--slot4-accent)] px-6 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-black" type="submit">
                Search library
              </button>
            </form>
          </div>
        </section>

        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-16 lg:py-16">
          <aside className="h-fit border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5 lg:sticky lg:top-24">
            <Search className="h-5 w-5 text-[var(--slot4-accent)]" />
            <p className="mt-5 text-xs font-medium uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">{results.length} results</p>
            <h2 className="mt-2 text-2xl font-medium">{query ? `For "${query}"` : pagesContent.search.resultsTitle}</h2>
            <div className="mt-6 grid gap-2 text-sm text-[var(--slot4-muted-text)]">
              <p>Collection: {category || 'Any'}</p>
              <p>Mode: {task || 'All resources'}</p>
            </div>
            <Link href="/sbm" className="mt-7 inline-flex h-[50px] w-full items-center justify-center gap-2 bg-black px-6 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent)]">
              Browse latest <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>

          <div>
            {results.length ? (
              <div className="grid gap-5 md:grid-cols-2">
                {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
              </div>
            ) : (
              <div className="border border-dashed border-[var(--editable-border)] bg-white p-12 text-center">
                <p className="text-3xl font-medium">No matching resources found.</p>
                <p className="mt-3 text-sm text-[var(--slot4-muted-text)]">Try another keyword, source, or collection label.</p>
              </div>
            )}
            <div className="mt-12">
              <Ads slot="footer" size={pickRandom(getSlotSizes('footer'))} showLabel className="mx-auto w-full" />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
