import type { To } from 'react-router'
import { t } from '@/i18n'

export type NavItem = { label: string; to: To }

// Seções da home funcionam a partir de qualquer página (/#projetos etc.).
export const navItems: NavItem[] = [
  { label: t.nav.projects, to: { pathname: '/', hash: '#projetos' } },
  { label: t.nav.about, to: { pathname: '/', hash: '#sobre' } },
  { label: t.nav.skills, to: { pathname: '/', hash: '#habilidades' } },
  { label: t.nav.contact, to: { pathname: '/', hash: '#contato' } },
  { label: t.nav.resume, to: '/curriculo' },
]
