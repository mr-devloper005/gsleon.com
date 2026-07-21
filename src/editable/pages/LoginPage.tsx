import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, KeyRound, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

const notes = [
  { icon: Bookmark, title: 'Submit resources', body: 'Add links, source notes, and collection context.' },
  { icon: Search, title: 'Return faster', body: 'Use your account to keep the contribution flow close.' },
  { icon: KeyRound, title: 'Quiet access', body: 'No public account promotion, just the tools you need.' },
]

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-20">
          <div className="flex flex-col justify-between border border-[var(--editable-border)] bg-black p-7 text-white sm:p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.auth.login.badge}</p>
              <h1 className="mt-6 max-w-xl text-5xl font-medium leading-[0.96] sm:text-7xl">{pagesContent.auth.login.title}</h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/68">{pagesContent.auth.login.description}</p>
            </div>
            <div className="mt-12 grid gap-3">
              {notes.map((item) => (
                <div key={item.title} className="grid gap-4 border border-white/12 p-4 sm:grid-cols-[32px_minmax(0,1fr)]">
                  <item.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-t-0 border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 sm:p-8 lg:border-l-0 lg:border-t">
            <div className="mx-auto max-w-md border border-[var(--editable-border)] bg-white p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Account</p>
              <h2 className="mt-3 text-3xl font-medium">{pagesContent.auth.login.formTitle}</h2>
              <EditableLocalLoginForm />
              <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
                New here?{' '}
                <Link href="/signup" className="inline-flex items-center gap-1 font-medium text-[var(--slot4-accent)] underline-offset-4 hover:underline">
                  {pagesContent.auth.login.createCta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
