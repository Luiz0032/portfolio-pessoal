// Gera os ícones PNG a partir do monograma de public/favicon.svg.
// Uso: npm run icons

import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const BG = '#0f1b22'
const INK = '#5cc2b8'
const mark = `<path d="M8.5 9v14H14M16.5 9 20 23l3.5-14" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`

// Favicon: cantos arredondados, como no SVG.
const rounded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="${BG}"/>${mark}</svg>`

// Fundo inteiro e monograma reduzido: o sistema aplica a própria máscara (iOS, Android maskable).
const fullBleed = (scale) => {
  const offset = (32 - 32 * scale) / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="${BG}"/><g transform="translate(${offset} ${offset}) scale(${scale})">${mark}</g></svg>`
}

const outputs = [
  ['public/favicon-16.png', rounded, 16],
  ['public/favicon-32.png', rounded, 32],
  ['public/apple-touch-icon.png', fullBleed(0.8), 180],
  ['public/icon-192.png', rounded, 192],
  ['public/icon-512.png', rounded, 512],
  ['public/icon-maskable-512.png', fullBleed(0.62), 512],
]

for (const [file, svg, size] of outputs) {
  await sharp(Buffer.from(svg), { density: (72 * size) / 32 }).resize(size, size).png().toFile(file)
  console.log(`${file} (${size}×${size})`)
}

const manifest = {
  name: 'Luiz Fernando Streme Vogel',
  short_name: 'Luiz Vogel',
  lang: 'pt-BR',
  start_url: '/',
  display: 'browser',
  background_color: BG,
  theme_color: BG,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}
await writeFile('public/site.webmanifest', `${JSON.stringify(manifest, null, 2)}\n`)
console.log('public/site.webmanifest')
