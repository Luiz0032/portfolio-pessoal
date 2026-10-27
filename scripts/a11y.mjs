// Acessibilidade com axe-core em todas as rotas, nos temas claro e escuro, no celular e no desktop.
// Usa o Edge instalado no Windows (playwright-core, sem baixar navegador). Rode `npm run build` antes.
// Uso: npm run test:a11y   (sai com código 1 se houver qualquer violação)

import AxeBuilder from '@axe-core/playwright'
import { chromium } from 'playwright-core'
import { caseStudyPaths } from '../src/data/projects.ts'
import { serve } from './lib/serve.mjs'

const routes = ['/', '/curriculo', ...caseStudyPaths(), '/pagina-que-nao-existe']
const themes = ['light', 'dark']
const viewports = [
  { name: 'celular', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 900 },
]
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']

const server = await serve('dist/client', 4300)
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? 'msedge' })
const results = []

async function audit(page, label) {
  const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze()
  results.push({ label, violations })
}

try {
  for (const theme of themes) {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: viewport,
        colorScheme: theme,
        reducedMotion: 'reduce',
      })
      // Escolha salva igual ao tema do sistema, para testar o tema explicitamente.
      await context.addInitScript((t) => localStorage.setItem('tema', t), theme)
      const page = await context.newPage()

      for (const route of routes) {
        await page.goto(server.url + route, { waitUntil: 'networkidle' })
        await audit(page, `${route} | ${theme} | ${viewport.name}`)
      }

      // Menu mobile aberto.
      if (viewport.width < 768) {
        await page.goto(server.url + '/', { waitUntil: 'networkidle' })
        await page.click('button[aria-controls="menu-mobile"]')
        await audit(page, `/ (menu aberto) | ${theme} | ${viewport.name}`)
      }
      await context.close()
    }
  }
} finally {
  await browser.close()
  server.close()
}

let total = 0
for (const { label, violations } of results) {
  total += violations.length
  if (violations.length === 0) continue
  console.log(`\n✗ ${label}`)
  for (const v of violations) {
    console.log(`  [${v.impact}] ${v.id}: ${v.help}`)
    for (const node of v.nodes.slice(0, 3)) console.log(`      ${node.target.join(' ')}  ${node.failureSummary?.split('\n')[1]?.trim() ?? ''}`)
  }
}
console.log(`\n${results.length} verificações (${routes.length} rotas × ${themes.length} temas × ${viewports.length} larguras + menu aberto): ${total} violação(ões).`)
process.exit(total > 0 ? 1 : 0)
