import Link from 'next/link'
import { ArrowRight, BookOpen, Check, Layers3 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const principles = [
  'Useful before decorative',
  'Source context before outbound clicks',
  'Collections shaped for return visits',
  'Quiet pages that reward scanning',
]

const workflow = [
  { title: 'Find', body: 'Resources are gathered from practical use, recurring questions, and references worth saving.' },
  { title: 'Frame', body: 'Each item gets enough context to explain the collection, source, and reason to open it.' },
  { title: 'Shelve', body: 'Resources are grouped into collections so the archive feels navigable instead of endless.' },
]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-black">
        <section className="bg-black text-white">
          <div className="mx-auto grid min-h-[520px] max-w-[var(--editable-container)] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-24">
            <div className="flex flex-col justify-end">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
              <h1 className="editable-display mt-6 max-w-5xl text-5xl font-medium leading-[0.96] sm:text-7xl">About {SITE_CONFIG.name}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">{pagesContent.about.description}</p>
            </div>
            <div className="grid content-end gap-3">
              {principles.map((principle, index) => (
                <div key={principle} className={`${index === 1 ? 'bg-[var(--slot4-accent)] text-white' : 'bg-white text-black'} flex items-center justify-between border border-white/10 p-5`}>
                  <span className="text-sm font-medium uppercase tracking-[0.16em]">{principle}</span>
                  <span className="text-xs font-medium">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--editable-border)]">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-16 lg:py-20">
            <aside>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Library thesis</p>
              <h2 className="editable-display mt-5 text-4xl font-medium leading-tight sm:text-5xl">A resource page should help you decide, not just redirect.</h2>
            </aside>
            <article className="grid gap-5 text-lg leading-9 text-[var(--slot4-muted-text)]">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>
          </div>
        </section>

        <section className="bg-[var(--slot4-panel-bg)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-5 py-16 sm:px-8 lg:px-16 lg:py-20">
            <div className="grid border border-[var(--editable-border)] bg-white lg:grid-cols-3">
              {workflow.map((item, index) => (
                <div key={item.title} className="border-b border-[var(--editable-border)] p-7 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Step 0{index + 1}</p>
                  <h3 className="editable-display mt-8 text-3xl font-medium">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[var(--editable-container)] gap-5 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1fr_1fr] lg:px-16 lg:py-20">
          {pagesContent.about.values.map((value, index) => (
            <div key={value.title} className={`${index === 1 ? 'bg-[var(--slot4-green)]' : 'bg-white'} border border-[var(--editable-border)] p-6`}>
              {index === 0 ? <BookOpen className="h-6 w-6 text-[var(--slot4-accent)]" /> : index === 1 ? <Layers3 className="h-6 w-6 text-black" /> : <Check className="h-6 w-6 text-[var(--slot4-accent)]" />}
              <h2 className="editable-display mt-8 text-2xl font-medium">{value.title}</h2>
              <p className="mt-3 text-sm leading-7 text-black/68">{value.description}</p>
            </div>
          ))}
        </section>

        <section className="bg-black text-white">
          <div className="mx-auto flex max-w-[var(--editable-container)] flex-col gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-16">
            <h2 className="editable-display max-w-2xl text-3xl font-medium leading-tight sm:text-5xl">Start with the collection shelf.</h2>
            <Link href="/sbm" className="inline-flex h-[50px] w-fit items-center gap-2 bg-[var(--slot4-accent)] px-8 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-black">
              Browse resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
