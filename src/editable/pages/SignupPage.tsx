import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, LibraryBig, PenLine } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

const steps = [
  'Create access',
  'Prepare resource notes',
  'Submit to the library',
]

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-black">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-16 lg:py-20">
          <div className="border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 sm:p-8">
            <div className="mx-auto max-w-md border border-[var(--editable-border)] bg-white p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">New account</p>
              <h1 className="mt-3 text-3xl font-medium">{pagesContent.auth.signup.formTitle}</h1>
              <EditableLocalSignupForm />
              <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
                Already have an account?{' '}
                <Link href="/login" className="inline-flex items-center gap-1 font-medium text-[var(--slot4-accent)] underline-offset-4 hover:underline">
                  {pagesContent.auth.signup.loginCta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between border border-t-0 border-[var(--editable-border)] bg-black p-7 text-white sm:p-10 lg:border-l-0 lg:border-t">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.auth.signup.badge}</p>
              <h2 className="mt-6 max-w-xl text-5xl font-medium leading-[0.96] sm:text-7xl">{pagesContent.auth.signup.title}</h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/68">{pagesContent.auth.signup.description}</p>
            </div>
            <div className="mt-12 grid gap-3">
              {steps.map((step, index) => (
                <div key={step} className={`${index === 1 ? 'bg-[var(--slot4-accent)] text-white' : 'bg-white text-black'} flex items-center gap-4 p-4`}>
                  {index === 0 ? <PenLine className="h-5 w-5" /> : index === 1 ? <LibraryBig className="h-5 w-5" /> : <Check className="h-5 w-5" />}
                  <span className="text-sm font-medium uppercase tracking-[0.16em]">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
