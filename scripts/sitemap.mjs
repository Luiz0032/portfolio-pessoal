// Gera public/sitemap.xml e public/robots.txt com as mesmas rotas do prerender.
// Roda antes do `react-router build` (ver script "build"). Node 24 executa os .ts de src/data diretamente.

import { writeFile } from 'node:fs/promises'
import { caseStudyPaths } from '../src/data/projects.ts'
import { siteUrl } from '../src/data/site.ts'

const today = new Date().toISOString().slice(0, 10)
const routes = [
  { path: '/', priority: '1.0' },
  { path: '/curriculo', priority: '0.6' },
  ...caseStudyPaths().map((path) => ({ path, priority: '0.8' })),
]

const urls = routes
  .map(
    ({ path, priority }) =>
      `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')

await writeFile(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
await writeFile('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`sitemap.xml (${routes.length} rotas) e robots.txt gerados para ${siteUrl}`)
