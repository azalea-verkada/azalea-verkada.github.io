/**
 * Staging hub changelog (azalea-verkada.github.io).
 * Prod banner lives in Ankush-Rustagi.github.io/src/data/site-updates.ts
 */
export const lastSiteEditDate = '2026-05-22'

export interface SiteUpdate {
  date: string
  title: string
  author?: string
  href?: string
  external?: boolean
  bullets: string[]
}

export const siteUpdates: SiteUpdate[] = [
  {
    date: '2026-05-22',
    title: 'Staging hub online',
    author: 'Azalea Phangsoa',
    bullets: [
      'Personal staging portfolio at azalea-verkada.github.io — iterate here before promoting to ankush-rustagi.github.io.',
      'Maps 2.0 Editor Experience and Navigation Audit linked from staging prototype repos.',
      'See WORKFLOW.md for local → staging → prod steps.',
    ],
  },
  {
    date: '2026-05-22',
    title: 'Maps 2.0 Editor Experience',
    author: 'Azalea Phangsoa',
    href: '/maps-2-0-editor-experience/',
    bullets: [
      '14 editor states: Manage Maps home, structural tools, device stamp, FOV adjust, scale/align.',
      'Built from Cursor canvas; extends Navigation Audit IA with Maps v1 PRD M2 editor MVP scope.',
    ],
  },
]
