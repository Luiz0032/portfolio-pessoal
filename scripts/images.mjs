// Gera as mídias otimizadas do site a partir dos originais em media/.
//
//   media/shots/<projeto>/<tela>.png|jpg  →  public/img/<projeto>/<tela>-<largura>.avif|webp
//   media/videos/<nome>.gif|mp4           →  public/media/<nome>.mp4 (H.264) e .webm (VP9) + pôster responsivo
//
// Também escreve src/data/media-manifest.json com dimensões e larguras disponíveis.
// Uso: npm run images   (só reprocessa o que mudou; --force refaz tudo)

import { execFile } from 'node:child_process'
import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative, sep } from 'node:path'
import { promisify } from 'node:util'
import ffmpegPath from 'ffmpeg-static'
import sharp from 'sharp'

const run = promisify(execFile)
const FORCE = process.argv.includes('--force')
const WIDTHS = [480, 800, 1200, 1600]
const VIDEO_MAX_WIDTH = 1280
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp'])
const VIDEO_EXT = new Set(['.gif', '.mp4', '.mov'])

const paths = {
  shots: 'media/shots',
  videos: 'media/videos',
  img: 'public/img',
  video: 'public/media',
  manifest: 'src/data/media-manifest.json',
}

const toKey = (file, base) => relative(base, file).replace(extname(file), '').split(sep).join('/')

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => [])
  const files = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])))
  return files.flat()
}

async function isFresh(output, source) {
  if (FORCE) return false
  try {
    return (await stat(output)).mtimeMs >= (await stat(source)).mtimeMs
  } catch {
    return false
  }
}

/**
 * AVIF e WebP em cada largura até a do original (nunca amplia).
 * `source` é o arquivo original usado para saber se a saída está atualizada (no pôster, o vídeo).
 */
async function responsive(input, key, produced, source = input) {
  // Decodifica uma vez; cada saída usa um clone e todas são codificadas em paralelo.
  const base = sharp(input)
  const { width, height } = await base.metadata()
  const widths = [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, WIDTHS.at(-1))])].sort((a, b) => a - b)
  await mkdir(dirname(join(paths.img, key)), { recursive: true })
  const formats = [
    ['avif', { quality: 50, effort: 4 }],
    ['webp', { quality: 78 }],
  ]
  await Promise.all(
    widths.flatMap((w) =>
      formats.map(async ([format, options]) => {
        const out = join(paths.img, `${key}-${w}.${format}`)
        produced.add(out)
        if (await isFresh(out, source)) return
        await base.clone().resize({ width: w }).toFormat(format, options).toFile(out)
      }),
    ),
  )
  return { kind: 'image', width, height, widths }
}

async function video(input, key, produced) {
  const mp4 = join(paths.video, `${key}.mp4`)
  const webm = join(paths.video, `${key}.webm`)
  produced.add(mp4).add(webm)
  await mkdir(paths.video, { recursive: true })

  // Redução leve de ruído (GIFs têm pontilhado que pesa na compressão), largura par
  // e no máximo VIDEO_MAX_WIDTH; sem áudio.
  const scale = `hqdn3d=3:2:4:4,scale='min(${VIDEO_MAX_WIDTH},iw)':-2:flags=lanczos,format=yuv420p`
  // As duas codificações são independentes: rodam ao mesmo tempo.
  const encodes = [
    [mp4, ['-c:v', 'libx264', '-preset', 'slow', '-crf', '30', '-movflags', '+faststart']],
    [webm, ['-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-row-mt', '1']],
  ]
  await Promise.all(
    encodes.map(async ([out, codec]) => {
      if (!(await isFresh(out, input))) await run(ffmpegPath, ['-y', '-i', input, '-vf', scale, ...codec, '-an', out])
    }),
  )

  // Pôster: primeiro quadro extraído pelo ffmpeg (funciona para GIF, MP4 e MOV), em versões responsivas.
  const { stdout: firstFrame } = await run(
    ffmpegPath,
    ['-loglevel', 'error', '-i', input, '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'],
    { encoding: 'buffer', maxBuffer: 1 << 28 },
  )
  const posterKey = `${key}-poster`
  const poster = await responsive(firstFrame, posterKey, produced, input)
  const width = Math.min(poster.width, VIDEO_MAX_WIDTH)
  const height = Math.round((poster.height * width) / poster.width / 2) * 2
  const sizes = await Promise.all([mp4, webm].map(async (f) => (await stat(f)).size))

  return { manifest: { kind: 'video', width, height, mp4: `/${relative('public', mp4).split(sep).join('/')}`, webm: `/${relative('public', webm).split(sep).join('/')}`, poster: posterKey }, poster, sizes }
}

const produced = new Set()
const manifest = {}
const report = []

for (const file of (await walk(paths.shots)).filter((f) => IMAGE_EXT.has(extname(f).toLowerCase()))) {
  const key = toKey(file, paths.shots)
  manifest[key] = await responsive(file, key, produced)
  report.push(`imagem  ${key}  ${manifest[key].width}×${manifest[key].height}  larguras ${manifest[key].widths.join(', ')}`)
}

for (const file of (await walk(paths.videos)).filter((f) => VIDEO_EXT.has(extname(f).toLowerCase()))) {
  const key = toKey(file, paths.videos)
  const { manifest: entry, poster, sizes } = await video(file, key, produced)
  manifest[key] = entry
  manifest[`${key}-poster`] = poster
  const original = (await stat(file)).size
  const kb = (n) => `${Math.round(n / 1024)} KB`
  report.push(`vídeo   ${key}  ${entry.width}×${entry.height}  original ${kb(original)} → mp4 ${kb(sizes[0])}, webm ${kb(sizes[1])}`)
}

// Remove saídas antigas que não correspondem a nenhum original.
for (const dir of [paths.img, paths.video]) {
  for (const file of await walk(dir)) {
    if (!produced.has(file)) {
      await rm(file)
      report.push(`removido ${file}`)
    }
  }
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
await writeFile(paths.manifest, `${JSON.stringify(sorted, null, 2)}\n`)
console.log(report.join('\n') || 'Nenhuma mídia em media/.')
console.log(`Manifesto: ${paths.manifest} (${Object.keys(sorted).length} itens)`)
