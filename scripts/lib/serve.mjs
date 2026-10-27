// Servidor estático para testes locais do build, imitando a Vercel:
// arquivo > pasta/index.html > __spa-fallback.html (rotas sem prerender, como a 404).

import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'
import { brotliCompressSync, constants, gzipSync } from 'node:zlib'

// Como a Vercel, comprime texto com Brotli (ou gzip). Sem isso o Lighthouse mede tudo sem compressão.
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.svg', '.json', '.webmanifest', '.xml', '.txt'])
const cache = new Map()

function compress(file, body, encoding) {
  const key = `${encoding}:${file}`
  if (!cache.has(key)) {
    cache.set(
      key,
      encoding === 'br'
        ? brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } })
        : gzipSync(body, { level: 9 }),
    )
  }
  return cache.get(key)
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
}

async function findFile(root, urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^[/\\]+/, '')
  for (const candidate of [clean, join(clean, 'index.html')]) {
    const full = join(root, candidate)
    if (!full.startsWith(root)) continue
    try {
      if ((await stat(full)).isFile()) return full
    } catch {
      // tenta o próximo
    }
  }
  return join(root, '__spa-fallback.html')
}

/** Sobe o servidor e devolve { url, close }. */
export function serve(dir = 'dist/client', port = 4300) {
  const root = resolve(dir)
  const server = createServer(async (req, res) => {
    const file = await findFile(root, req.url ?? '/')
    try {
      const body = await readFile(file)
      const headers = { 'content-type': types[extname(file)] ?? 'application/octet-stream' }
      const accepts = req.headers['accept-encoding'] ?? ''
      const encoding = !COMPRESSIBLE.has(extname(file)) ? null : accepts.includes('br') ? 'br' : accepts.includes('gzip') ? 'gzip' : null
      if (encoding) {
        res.writeHead(200, { ...headers, 'content-encoding': encoding, vary: 'accept-encoding' })
        res.end(compress(file, body, encoding))
      } else {
        res.writeHead(200, headers)
        res.end(body)
      }
    } catch {
      res.writeHead(404).end('não encontrado')
    }
  })
  return new Promise((done) =>
    server.listen(port, () => done({ url: `http://localhost:${port}`, close: () => server.close() })),
  )
}
