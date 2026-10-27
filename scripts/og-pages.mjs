// Gera scripts/og/pages.json: o conteúdo da imagem de Open Graph de cada rota pré-renderizada.
// O template scripts/og/template.html lê este arquivo; o Playwright (Edge) renderiza cada página
// em 1200×630 e salva em public/og/<chave>.png. Uso: npm run og:data
// Node 24 executa os .ts de src/data diretamente (remove os tipos).

import { writeFile } from 'node:fs/promises'
import { profile } from '../src/data/profile.ts'
import { projects } from '../src/data/projects.ts'
import { siteUrl } from '../src/data/site.ts'

const domain = siteUrl.replace(/^https?:\/\//, '')

const pages = [
  { key: 'home', path: '/', kind: 'home', title: profile.name, subtitle: profile.role },
  { key: 'curriculo', path: '/curriculo', kind: 'cv', title: 'Currículo', subtitle: `${profile.name} · ${profile.role}` },
  ...projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      key: `projeto-${p.slug}`,
      path: `/projetos/${p.slug}`,
      kind: 'case',
      title: p.title,
      subtitle: p.summary,
      facts: (p.facts ?? []).slice(0, 4),
    })),
]

await writeFile('scripts/og/pages.json', `${JSON.stringify({ domain, name: profile.name, pages }, null, 2)}\n`)
console.log(pages.map((p) => `${p.key} → ${p.path}`).join('\n'))
