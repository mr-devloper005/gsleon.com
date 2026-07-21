import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const REF_FONT = "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

const base = {
  dark: false,
  fontDisplay: REF_FONT,
  fontBody: REF_FONT,
  bg: '#ffffff',
  surface: '#ffffff',
  raised: '#f4f4f4',
  text: '#000000',
  muted: '#5f6368',
  line: '#e6e6e6',
  accent: '#fe4804',
  accentSoft: '#fff0e8',
  onAccent: '#ffffff',
  glow: 'rgba(254,72,4,0.12)',
  radius: '0',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'Long-form references preserved for compatibility.' },
  listing: { ...base, kicker: 'Listings', note: 'Directory routes remain available when enabled elsewhere.' },
  classified: { ...base, kicker: 'Notices', note: 'Classified routes remain available when enabled elsewhere.' },
  image: { ...base, kicker: 'Visuals', note: 'Image routes remain available when enabled elsewhere.' },
  sbm: { ...base, kicker: 'Collections', note: 'Curated resources and links arranged for practical discovery.' },
  pdf: { ...base, kicker: 'Documents', note: 'Document routes remain available when enabled elsewhere.' },
  profile: { ...base, kicker: 'Identity', note: 'Direct identity pages for signed-in or linked access.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
