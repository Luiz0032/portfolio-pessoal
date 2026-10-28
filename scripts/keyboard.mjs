// Navegação só com teclado (Tab, Enter, Esc, setas) nas rotas do site, no desktop e no celular.
// Rode `npm run build` antes. Uso: npm run test:keyboard   (sai com código 1 se algo falhar)

import { caseStudies, caseStudyPath, publicPaths } from '../src/data/projects.ts'
import { STORAGE_KEY } from '../src/hooks/useTheme.ts'
import { missingPath, withBrowser } from './lib/browser.mjs'

const report = []
const fail = (msg) => report.push(`✗ ${msg}`)
const pass = (msg) => report.push(`✓ ${msg}`)
const expect = (ok, msg) => (ok ? pass(msg) : fail(msg))

/** Estado do elemento focado: rótulo, se está visível e se tem indicador de foco. */
const focused = (page) =>
  page.evaluate(() => {
    const el = document.activeElement
    if (!el || el === document.body) return null
    const style = getComputedStyle(el)
    const rect = el.getBoundingClientRect()
    const label = (el.getAttribute('aria-label') ?? el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 50)
    return {
      label: label || el.tagName.toLowerCase(),
      tag: el.tagName.toLowerCase(),
      id: el.id,
      visible: rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden',
      ring: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2,
      inView: rect.bottom > 0 && rect.top < innerHeight,
    }
  })

/** Percorre a página com Tab até voltar ao início e confere cada parada. */
async function tabThrough(page, route) {
  const stops = []
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab')
    const f = await focused(page)
    if (!f || (stops.length && f.label === stops[0].label && f.tag === stops[0].tag)) break
    stops.push(f)
  }
  const bad = stops.filter((s) => !s.visible || !s.ring || !s.inView)
  expect(bad.length === 0, `${route}: ${stops.length} paradas de Tab, todas visíveis, na tela e com indicador de foco${bad.length ? ` (falhas: ${bad.map((b) => b.label).join(', ')})` : ''}`)
  return stops
}

await withBrowser(4500, async ({ browser, url }) => {
  // Desktop
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' })
  for (const route of [...publicPaths(), missingPath]) {
    await desktop.goto(url + route, { waitUntil: 'networkidle' })
    await tabThrough(desktop, `desktop ${route}`)
  }

  // Pular para o conteúdo
  await desktop.goto(url + '/', { waitUntil: 'networkidle' })
  await desktop.keyboard.press('Tab')
  const skip = await focused(desktop)
  expect(skip?.label === 'Pular para o conteúdo' && skip.visible, 'primeiro Tab mostra "Pular para o conteúdo"')
  await desktop.keyboard.press('Enter')
  expect((await focused(desktop))?.id === 'conteudo', 'Enter no link de pular leva o foco para o conteúdo principal')

  // Menu do cabeçalho leva à seção
  await desktop.goto(url + '/', { waitUntil: 'networkidle' })
  await desktop.focus('header nav a[href="/#habilidades"]')
  await desktop.keyboard.press('Enter')
  await desktop.waitForTimeout(400)
  const inView = await desktop.evaluate(() => {
    const r = document.getElementById('habilidades').getBoundingClientRect()
    return location.hash === '#habilidades' && r.top < innerHeight && r.bottom > 0
  })
  expect(inView, 'Enter em "Habilidades" no cabeçalho rola até a seção')

  // Tema
  await desktop.goto(url + '/', { waitUntil: 'networkidle' })
  const before = await desktop.evaluate(() => document.documentElement.dataset.theme)
  await desktop.focus('header button[aria-label^="Ativar tema"]')
  await desktop.keyboard.press('Enter')
  const after = await desktop.evaluate(() => document.documentElement.dataset.theme)
  expect(before !== after, `Enter no botão de tema alterna (${before} → ${after})`)
  await desktop.evaluate((key) => localStorage.removeItem(key), STORAGE_KEY)

  // Diagrama rolável no celular estreito: foco e setas
  const narrow = await browser.newPage({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' })
  const firstCase = caseStudyPath(caseStudies[0].slug)
  await narrow.goto(url + firstCase, { waitUntil: 'networkidle' })
  const region = narrow.locator('[role="region"][aria-label="Diagrama de arquitetura"]')
  await region.focus()
  await narrow.keyboard.press('ArrowRight')
  await narrow.keyboard.press('ArrowRight')
  await narrow.keyboard.press('ArrowRight')
  const scrolled = await region.evaluate((el) => el.scrollLeft)
  expect(scrolled > 0, `diagrama de arquitetura recebe foco e rola com as setas (scrollLeft ${scrolled})`)

  // Menu mobile: abrir com Enter, foco no primeiro link, Esc fecha e devolve o foco
  await narrow.goto(url + '/', { waitUntil: 'networkidle' })
  await tabThrough(narrow, 'celular /')
  await narrow.focus('button[aria-controls="menu-mobile"]')
  await narrow.keyboard.press('Enter')
  const open = await narrow.evaluate(() => document.querySelector('[aria-controls="menu-mobile"]').getAttribute('aria-expanded'))
  const first = await focused(narrow)
  expect(open === 'true' && first?.label === 'Projetos', 'Enter abre o menu mobile e o foco vai para o primeiro link')
  await narrow.keyboard.press('Escape')
  const closed = await narrow.evaluate(() => document.getElementById('menu-mobile').hidden)
  const back = await focused(narrow)
  expect(closed && back?.label === 'Abrir menu', 'Esc fecha o menu e o foco volta ao botão')

  // Link do menu fecha o menu e navega
  await narrow.keyboard.press('Enter')
  await narrow.keyboard.press('Tab')
  await narrow.keyboard.press('Enter')
  await narrow.waitForTimeout(400)
  const navigated = await narrow.evaluate(() => ({ hash: location.hash, closed: document.getElementById('menu-mobile').hidden }))
  expect(navigated.closed && navigated.hash !== '', `Enter num link do menu navega (${navigated.hash}) e fecha o menu`)
})

console.log(report.join('\n'))
const failures = report.filter((r) => r.startsWith('✗')).length
console.log(`\n${report.length} verificações, ${failures} falha(s).`)
process.exit(failures ? 1 : 0)
