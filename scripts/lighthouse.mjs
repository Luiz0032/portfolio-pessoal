// Lighthouse (mobile e desktop) em todas as rotas pré-renderizadas, usando o Edge do Windows.
// Rode `npm run build` antes. Uso: npm run test:lighthouse   (falha se alguma nota ficar abaixo de 90)
// Relatórios completos em .lighthouse/ (ignorado pelo git).

import { exec } from 'node:child_process'
import { mkdir, readFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { caseStudyPaths } from '../src/data/projects.ts'
import { serve } from './lib/serve.mjs'

const run = promisify(exec)
const LIGHTHOUSE = 'lighthouse@13.5.0'
const EDGE = process.env.CHROME_PATH ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const MIN = 90
const routes = ['/', '/curriculo', ...caseStudyPaths()]
const categories = ['performance', 'accessibility', 'best-practices', 'seo']

await mkdir('.lighthouse', { recursive: true })
const server = await serve('dist/client', 4400)
const rows = []

try {
  for (const route of routes) {
    for (const formFactor of ['mobile', 'desktop']) {
      const name = `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}-${formFactor}`
      const out = `.lighthouse/${name}.json`
      const args = [
        '-y',
        LIGHTHOUSE,
        server.url + route,
        '--quiet',
        '--output=json',
        `--output-path=${out}`,
        '--chrome-flags=--headless=new --no-first-run',
        `--only-categories=${categories.join(',')}`,
        ...(formFactor === 'desktop' ? ['--preset=desktop'] : []),
      ]
      // Argumentos fixos deste script (nenhum vem de fora); o npx precisa de shell no Windows.
      const command = ['npx', ...args].map((a) => (/[\s=,]/.test(a) ? `"${a}"` : a)).join(' ')
      await run(command, { env: { ...process.env, CHROME_PATH: EDGE }, maxBuffer: 1 << 26 })
      const report = JSON.parse(await readFile(out, 'utf8'))
      const scores = categories.map((c) => Math.round(report.categories[c].score * 100))
      const lcp = report.audits['largest-contentful-paint'].displayValue
      const cls = report.audits['cumulative-layout-shift'].displayValue
      rows.push({ route, formFactor, scores, lcp, cls })
      console.log(`${route.padEnd(34)} ${formFactor.padEnd(8)} ${scores.map((s) => String(s).padStart(3)).join('  ')}   LCP ${lcp}  CLS ${cls}`)
    }
  }
} finally {
  server.close()
}

const failing = rows.filter((r) => r.scores.some((s) => s < MIN))
console.log(`\nColunas: ${categories.join(', ')}. ${rows.length} execuções; ${failing.length} com nota abaixo de ${MIN}.`)
process.exit(failing.length ? 1 : 0)
