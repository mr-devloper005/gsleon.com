'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="sticky top-0 z-50 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)]">
      <div className="mx-auto flex min-h-[78px] w-full max-w-[var(--editable-container)] items-center gap-6 px-5 sm:px-8 lg:px-16">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white text-black transition duration-300 group-hover:border-[var(--slot4-accent)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
          </span>
          <span className="min-w-0">
            <span className="editable-display block max-w-[220px] truncate text-lg font-semibold leading-none tracking-normal text-white">{SITE_CONFIG.name}</span>
            <span className="mt-1 hidden max-w-[220px] truncate text-[10px] font-medium uppercase tracking-[0.24em] text-white/55 sm:block">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="group relative pb-1 text-sm font-medium text-white/80 transition duration-300 hover:text-white">
              {item.label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white transition duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
          <Link href="/search" aria-label="Search" className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition duration-300 hover:border-[var(--slot4-accent)] hover:bg-[var(--slot4-accent)]">
            <Search className="h-4 w-4" />
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          {session ? (
            <>
              <Link href="/create" className="inline-flex h-10 items-center gap-2 bg-[var(--editable-cta-bg)] px-4 text-xs font-medium uppercase tracking-[0.16em] text-[var(--editable-cta-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black">
                <PlusCircle className="h-3.5 w-3.5" /> Create
              </Link>
              <button type="button" onClick={logout} className="px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/60 transition hover:text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="inline-flex h-10 items-center gap-2 border border-white/15 px-4 text-xs font-medium uppercase tracking-[0.16em] text-white/70 transition duration-300 hover:border-white hover:text-white">
                <LogIn className="h-3.5 w-3.5" /> Login
              </Link>
              <Link href="/signup" className="inline-flex h-10 items-center gap-2 bg-[var(--editable-cta-bg)] px-4 text-xs font-medium uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black">
                <UserPlus className="h-3.5 w-3.5" /> Sign up
              </Link>
            </>
          )}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto border border-white/15 p-2 text-white lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="h-px bg-white/10" />

      {open ? (
        <div className="border-t border-white/10 bg-black px-5 py-5 lg:hidden">
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, ...navLinks, { label: 'Search', href: '/search' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border border-white/10 px-4 py-3 text-sm font-medium uppercase tracking-[0.16em] text-white/75 transition hover:border-[var(--slot4-accent)] hover:text-white">
                {item.label}
              </Link>
            ))}
            {session ? <button type="button" onClick={() => { logout(); setOpen(false) }} className="border border-white/10 px-4 py-3 text-left text-sm font-medium uppercase tracking-[0.16em] text-white/75 transition hover:text-white">Logout</button> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
