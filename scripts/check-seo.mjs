// Verifica o SEO do build (dist/client): rode `npm run build` antes. Uso: npm run test:seo
// Sai com código 1 se algum item falhar.

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'
import { caseStudyPaths } from '../src/data/projects.ts'
import { siteUrl } from '../src/data/site.ts'

const root = 'dist/client'
const routes = [
  { path: '/', schema: 'Person' },
  { path: '/curriculo', schema: 'Person' },
  ...caseStudyPaths().map((path) => ({ path, schema: 'CreativeWork' })),
]
const PHONE = /99910-?0032|5547999100032/

const failures = []
const check = (ok, message) => {
  if (!ok) failures.push(message)
  return ok
}
const attr = (html, re) => html.match(re)?.[1]
const metaContent = (html, key) =>
  attr(html, new RegExp(`<meta[^>]+(?:name|property)="${key}"[^>]+content="([^"]*)"`)) ??
  attr(html, new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="${key}"`))

const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8')
const robots = readFileSync(join(root, 'robots.txt'), 'utf8')
check(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), 'robots.txt não aponta para o sitemap')

const rows = []
for (const { path, schema } of routes) {
  const file = join(root, path === '/' ? 'index.html' : `${path.slice(1)}/index.html`)
  if (!check(existsSync(file), `${path}: sem HTML pré-renderizado`)) continue
  const html = readFileSync(file, 'utf8')
  const url = `${siteUrl}${path}`
  const title = attr(html, /<title>([^<]*)<\/title>/)
  const description = metaContent(html, 'description') ?? ''
  const canonical = attr(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)
  const ogImage = metaContent(html, 'og:image') ?? ''
  const imageFile = join(root, ogImage.replace(siteUrl, ''))

  check(!!title, `${path}: sem <title>`)
  check(description.length >= 50 && description.length <= 160, `${path}: description com ${description.length} caracteres (50–160)`)
  check(canonical === url, `${path}: canonical ${canonical} ≠ ${url}`)
  check(metaContent(html, 'og:url') === url, `${path}: og:url diferente do canonical`)
  check(sitemap.includes(`<loc>${url}</loc>`), `${path}: fora do sitemap.xml`)
  for (const key of ['og:title', 'og:description', 'og:type', 'twitter:card', 'twitter:image']) {
    check(!!metaContent(html, key), `${path}: sem ${key}`)
  }
  if (check(existsSync(imageFile), `${path}: og:image não existe (${ogImage})`)) {
    const { width, height } = await sharp(imageFile).metadata()
    check(width === 1200 && height === 630, `${path}: og:image com ${width}×${height}`)
  }
  check(/<html[^>]+lang="pt-BR"/.test(html), `${path}: sem lang="pt-BR"`)
  check((html.match(/<h1[\s>]/g) ?? []).length === 1, `${path}: deve ter exatamente um <h1>`)

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
  let types = []
  try {
    types = blocks.map((b) => JSON.parse(b)['@type'])
  } catch {
    check(false, `${path}: JSON-LD inválido`)
  }
  check(types.includes(schema), `${path}: JSON-LD sem ${schema} (tem: ${types.join(', ') || 'nada'})`)
  check(!blocks.some((b) => PHONE.test(b) || b.includes('telephone')), `${path}: telefone no JSON-LD`)
  if (path !== '/curriculo') check(!PHONE.test(html), `${path}: telefone no HTML`)

  rows.push(`${path.padEnd(36)} ${String(description.length).padStart(3)} car. | JSON-LD: ${types.join(', ')} | og:image ok`)
}

console.log(rows.join('\n'))
if (failures.length) {
  console.error(`\n${failures.length} problema(s):\n- ${failures.join('\n- ')}`)
  process.exit(1)
}
console.log(`\nSEO ok em ${routes.length} rotas (sitemap, robots, canonical, Open Graph, Twitter Card, JSON-LD).`)
