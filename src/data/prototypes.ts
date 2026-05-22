// =============================================================================
// Azalea Phangsoa — staging hub (azalea-verkada.github.io)
// Prod source of truth: ankush-rustagi.github.io (Ankush-Rustagi org)
// =============================================================================

export type PrototypeStatus = 'live' | 'wip' | 'archived'

export type PrototypeCategory =
  | 'canvas'
  | 'storybook'
  | 'dashboard'
  | 'prototype'
  | 'tool'
  | 'writeup'

export type GradientTheme =
  | 'maps'
  | 'hex'
  | 'floorplans'
  | 'cursor'
  | 'router'
  | 'analytics'
  | 'default'

export interface Prototype {
  slug: string
  title: string
  description: string
  href: string
  category: PrototypeCategory
  status: PrototypeStatus
  createdDate: string
  modifiedDate: string
  createdBy: string
  lastModifiedBy: string
  gradient: GradientTheme
  tags?: string[]
  external?: boolean
  featured?: boolean
  image?: string
}

export const GRADIENTS: Record<GradientTheme, string> = {
  maps: 'radial-gradient(ellipse 80% 70% at 20% 30%, oklch(0.55 0.18 230 / 0.85), transparent), radial-gradient(ellipse 70% 60% at 80% 70%, oklch(0.62 0.18 160 / 0.7), transparent), linear-gradient(135deg, oklch(0.25 0.05 230), oklch(0.22 0.08 180))',
  hex: 'conic-gradient(from 200deg at 40% 55%, oklch(0.65 0.22 200 / 0.8), oklch(0.6 0.22 280 / 0.7), oklch(0.65 0.2 340 / 0.6), oklch(0.7 0.18 60 / 0.55), oklch(0.68 0.2 140 / 0.65), oklch(0.65 0.22 200 / 0.8))',
  floorplans: 'radial-gradient(ellipse 70% 60% at 30% 30%, oklch(0.6 0.16 195 / 0.85), transparent), radial-gradient(ellipse 60% 50% at 75% 75%, oklch(0.7 0.18 70 / 0.7), transparent), linear-gradient(135deg, oklch(0.25 0.06 195), oklch(0.25 0.06 60))',
  cursor: 'radial-gradient(ellipse 70% 60% at 25% 25%, oklch(0.55 0.22 290 / 0.9), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, oklch(0.65 0.22 340 / 0.7), transparent), linear-gradient(135deg, oklch(0.22 0.08 290), oklch(0.2 0.1 320))',
  router: 'radial-gradient(ellipse 70% 60% at 30% 25%, oklch(0.6 0.18 150 / 0.85), transparent), radial-gradient(ellipse 60% 55% at 75% 75%, oklch(0.55 0.2 265 / 0.7), transparent), linear-gradient(135deg, oklch(0.22 0.07 150), oklch(0.22 0.08 265))',
  analytics: 'radial-gradient(ellipse 70% 60% at 20% 70%, oklch(0.55 0.22 260 / 0.85), transparent), radial-gradient(ellipse 60% 50% at 80% 25%, oklch(0.65 0.2 35 / 0.7), transparent), linear-gradient(135deg, oklch(0.22 0.09 250), oklch(0.24 0.08 30))',
  default: 'linear-gradient(135deg, oklch(0.25 0 0), oklch(0.18 0 0))',
}

export const prototypes: Prototype[] = [
  {
    slug: 'maps-2-0-editor-experience',
    title: 'Maps 2.0 Editor Experience',
    description:
      'Interactive editor prototype for Verkada Maps 2.0. Click through 14 edit-mode states — Manage Maps home, structural tools, device placement, FOV adjust, cable paths, and scale/align — on top of the Navigation Audit IA.',
    href: '/maps-2-0-editor-experience/',
    category: 'canvas',
    status: 'live',
    createdDate: '2026-05-22',
    modifiedDate: '2026-05-22',
    createdBy: 'Azalea Phangsoa',
    lastModifiedBy: 'Azalea Phangsoa',
    gradient: 'maps',
    tags: ['maps', 'editor', 'floorplans', 'command', 'ia'],
    featured: true,
  },
  {
    slug: 'maps-2-0-nav-audit',
    title: 'Maps 2.0 Navigation Redesign',
    description:
      'Interactive IA prototype for Verkada Maps 2.0. Cross-walks Google Maps patterns to Verkada concepts and lets you click through viewer and editor states.',
    href: '/maps-2-0-nav-audit/',
    category: 'canvas',
    status: 'live',
    createdDate: '2026-05-15',
    modifiedDate: '2026-05-18',
    createdBy: 'Ankush Rustagi',
    lastModifiedBy: 'Azalea Phangsoa',
    gradient: 'maps',
    tags: ['maps', 'navigation', 'ia', 'command'],
    featured: true,
    image: '/project-headers/maps-2-0-nav-audit.png',
  },
]
