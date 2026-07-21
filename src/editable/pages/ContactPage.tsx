'use client'

import { Clock3, Mail, MessageSquare, Send, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: Sparkles, title: 'Resource lead', body: 'Send a useful link, source note, correction, or collection idea.' },
  { icon: MessageSquare, title: 'Curation brief', body: 'Discuss reference pages, partnership shelves, or a focused resource list.' },
  { icon: Mail, title: 'Account support', body: 'Ask about access, submissions, attribution, or something that needs a human reply.' },
]

const expectations = [
  'Useful context beats long messages.',
  'Include the source URL when you have one.',
  'For corrections, mention the current page title.',
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-black">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-0 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-16 lg:py-20">
          <div className="border border-[var(--editable-border)] bg-black p-7 text-white sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="editable-display mt-6 text-5xl font-medium leading-[0.96] sm:text-7xl">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">{pagesContent.contact.description}</p>
            <div className="mt-10 grid gap-3">
              {expectations.map((item) => (
                <div key={item} className="flex items-center gap-3 border border-white/12 p-4 text-sm text-white/72">
                  <Send className="h-4 w-4 text-[var(--slot4-accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-l-0 border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 sm:p-8">
            <div className="grid gap-4">
              {lanes.map((lane, index) => (
                <div key={lane.title} className={`${index === 0 ? 'bg-[var(--slot4-green)]' : 'bg-white'} border border-[var(--editable-border)] p-5`}>
                  <div className="flex items-start justify-between gap-5">
                    <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                    <span className="text-xs font-medium uppercase tracking-[0.22em] text-black/45">0{index + 1}</span>
                  </div>
                  <h2 className="editable-display mt-5 text-2xl font-medium">{lane.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-black/68">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--editable-border)] bg-white">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-16 lg:py-20">
            <aside className="border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6">
              <Clock3 className="h-6 w-6 text-[var(--slot4-accent)]" />
              <h2 className="editable-display mt-6 text-3xl font-medium">A clearer inbox for useful requests.</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">The form stays intentionally direct: what you want to add, what should change, and how we can reach you.</p>
            </aside>
            <div className="border border-[var(--editable-border)] bg-white p-6 sm:p-8">
              <h2 className="editable-display text-2xl font-medium">{pagesContent.contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
