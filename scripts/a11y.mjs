// Acessibilidade com axe-core em todas as rotas, nos temas claro e escuro, no celular e no desktop.
// Rode `npm run build` antes. Uso: npm run test:a11y   (sai com código 1 se houver qualquer violação)

import AxeBuilder from '@axe-core/playwright'
import { publicPaths } from '../src/data/projects.ts'
import { STORAGE_KEY } from '../src/hooks/useTheme.ts'
import { missingPath, withBrowser } from './lib/browser.mjs'

const routes = [...publicPaths(), missingPath]
const themes = ['light', 'dark']
const viewports = [
  { name: 'celular', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 900 },
]
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']

const results = await withBrowser(4300, ({ browser, url }) =>
  // Cada combinação de tema e largura roda em paralelo, num contexto próprio.
  Promise.all(
    themes.flatMap((theme) =>
      viewports.map(async (viewport) => {
        const context = await browser.newContext({ viewport, colorScheme: theme, reducedMotion: 'reduce' })
        // Escolha salva igual ao tema do sistema, para testar o tema explicitamente.
        await context.addInitScript(([key, value]) => localStorage.setItem(key, value), [STORAGE_KEY, theme])
        const page = await context.newPage()
        const audit = async (label) => {
          const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze()
          return { label: `${label} | ${theme} | ${viewport.name}`, violations }
        }

        const out = []
        for (const route of routes) {
          await page.goto(url + route, { waitUntil: 'load' })
          out.push(await audit(route))
        }
        if (viewport.width < 768) {
          await page.goto(url + '/', { waitUntil: 'load' })
          await page.click('button[aria-controls="menu-mobile"]')
          out.push(await audit('/ (menu aberto)'))
        }
        await context.close()
        return out
      }),
    ),
  ).then((groups) => groups.flat()),
)

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
