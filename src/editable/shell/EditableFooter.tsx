'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const columns = globalContent.footer.columns

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr_0.85fr] lg:px-16 lg:py-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
            </span>
            <span className="editable-display text-xl font-semibold tracking-normal">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/60">{globalContent.footer.description}</p>
          <Link href="/sbm" className="mt-7 inline-flex h-[50px] items-center gap-2 bg-[var(--slot4-accent)] px-8 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black">
            Explore collections <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.26em] text-[var(--slot4-accent)]">{column.title}</h3>
            <div className="mt-5 grid gap-3">
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-white/62 transition hover:text-white">
                  {link.label}
                  <span className="h-px w-5 origin-left scale-x-0 bg-white transition duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
              {column.title === 'Site' ? (
                <>
                  {session ? <Link href="/create" className="text-sm font-medium text-white/62 transition hover:text-white">Create</Link> : <Link href="/login" className="text-sm font-medium text-white/62 transition hover:text-white">Login</Link>}
                  {session ? <button type="button" onClick={logout} className="w-fit text-left text-sm font-medium text-white/62 transition hover:text-white">Logout</button> : <Link href="/signup" className="text-sm font-medium text-white/62 transition hover:text-white">Sign up</Link>}
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs font-medium tracking-[0.14em] text-white/45">
        © {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
