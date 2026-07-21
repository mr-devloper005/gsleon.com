'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Link2, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { isUiHiddenTask } from '@/editable/content/global.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: Link2,
}

const fieldClass = 'border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-medium text-black outline-none transition placeholder:text-black/35 focus:border-[var(--slot4-accent)]'
const displayTaskLabel = (key: TaskKey, fallback?: string) => key === 'sbm' ? 'Collections / Members' : fallback || key

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

const checklist = [
  'Use a specific source URL when available.',
  'Name the collection in plain language.',
  'Write the note for someone deciding whether to open it.',
]

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && !isUiHiddenTask(task.key)), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'sbm') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-white text-black">
          <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] px-5 py-16 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-16 lg:py-20">
            <div className="flex items-center justify-center border border-[var(--editable-border)] bg-black p-10 text-white">
              <Lock className="h-24 w-24 text-[var(--slot4-accent)]" />
            </div>
            <div className="border border-t-0 border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 sm:p-10 lg:border-l-0 lg:border-t">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-6 max-w-2xl text-5xl font-medium leading-[0.96] sm:text-7xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex h-[50px] items-center gap-2 bg-black px-8 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent)]">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex h-[50px] items-center gap-2 border border-[var(--editable-border)] bg-white px-8 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:border-black">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-black">
        <section className="bg-black text-white">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.create.hero.badge}</p>
              <h1 className="mt-6 max-w-3xl text-5xl font-medium leading-[0.96] sm:text-7xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/68">{pagesContent.create.hero.description}</p>
            </div>
            <div className="grid content-end gap-3">
              {checklist.map((item, index) => (
                <div key={item} className={`${index === 1 ? 'bg-[var(--slot4-accent)] text-white' : 'bg-white text-black'} flex items-center gap-4 p-4`}>
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-16 lg:py-16">
          <aside className="h-fit border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5 lg:sticky lg:top-24">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Submission lane</p>
            <div className="mt-5 grid gap-3">
              {enabledTasks.map((item) => {
                const Icon = taskIcon[item.key] || FileText
                const active = item.key === task
                return (
                  <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`${active ? 'bg-black text-white' : 'bg-white text-black'} border border-[var(--editable-border)] p-4 text-left transition hover:-translate-y-0.5`}>
                    <Icon className={`h-5 w-5 ${active ? 'text-[var(--slot4-accent)]' : 'text-black/50'}`} />
                    <span className="mt-4 block text-sm font-medium">{displayTaskLabel(item.key, item.label)}</span>
                    <span className="mt-1 block text-xs leading-5 opacity-65">{item.description}</span>
                  </button>
                )
              })}
            </div>
          </aside>

          <form onSubmit={submit} className="border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--editable-border)] pb-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">Create {activeTask ? displayTaskLabel(activeTask.key, activeTask.label) : 'resource'}</p>
                <h2 className="mt-2 text-4xl font-medium leading-tight">{pagesContent.create.formTitle}</h2>
              </div>
              <span className="bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.16em]">{session.name}</span>
            </div>

            <div className="mt-6 grid gap-4">
              <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Resource title" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Collection" />
                <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
              </div>
              <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Optional image URL" />
              <textarea className={`${fieldClass} min-h-28`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short reason this belongs in the library" required />
              <textarea className={`${fieldClass} min-h-52`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Context, notes, details, or source summary" required />
            </div>

            {created ? (
              <div className="mt-5 border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                <p className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                <p className="mt-1 text-sm opacity-80">{created.title}</p>
              </div>
            ) : null}

            <button type="submit" className="mt-5 inline-flex h-[50px] w-full items-center justify-center gap-2 bg-black px-6 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent)]">
              <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
            </button>
          </form>
        </section>
      </main>
    </EditableSiteShell>
  )
}
