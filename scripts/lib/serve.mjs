// Servidor estático para testes locais do build, imitando a Vercel:
// arquivo > pasta/index.html > 404.html com status 404.

import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, isAbsolute, join, normalize, relative, resolve } from 'node:path'
import { promisify } from 'node:util'
import { brotliCompress, constants, gzip } from 'node:zlib'

// Como a Vercel, comprime texto com Brotli (ou gzip). Sem isso o Lighthouse mede tudo sem compressão.
// A compressão é assíncrona (não trava as outras requisições) e fica em cache por arquivo.
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.svg', '.json', '.webmanifest', '.xml', '.txt'])
const brotli = promisify(brotliCompress)
const gzipAsync = promisify(gzip)
const cache = new Map()

function compress(file, body, encoding) {
  const key = `${encoding}:${file}`
  if (!cache.has(key)) {
    cache.set(
      key,
      encoding === 'br'
        ? brotli(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } })
        : gzipAsync(body, { level: 9 }),
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

/** Arquivo pedido (ou pasta/index.html). `null` se não existir ou se o caminho sair da raiz. */
async function findFile(root, urlPath) {
  let clean
  try {
    clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^[/\\]+/, '')
  } catch {
    return null // URL malformada
  }
  for (const candidate of [clean, join(clean, 'index.html')]) {
    const full = join(root, candidate)
    const rel = relative(root, full)
    if (rel.startsWith('..') || isAbsolute(rel)) continue
    try {
      if ((await stat(full)).isFile()) return full
    } catch {
      // tenta o próximo
    }
  }
  return null
}

/** Sobe o servidor e devolve { url, close }. Endereços inexistentes recebem 404.html com status 404. */
export function serve(dir = 'dist/client', port = 4300) {
  const root = resolve(dir)
  const server = createServer(async (req, res) => {
    try {
      const found = await findFile(root, req.url ?? '/')
      const file = found ?? join(root, '404.html')
      const status = found ? 200 : 404
      const body = await readFile(file)
      const headers = { 'content-type': types[extname(file)] ?? 'application/octet-stream' }
      const accepts = req.headers['accept-encoding'] ?? ''
      const encoding = !COMPRESSIBLE.has(extname(file)) ? null : accepts.includes('br') ? 'br' : accepts.includes('gzip') ? 'gzip' : null
      if (encoding) {
        res.writeHead(status, { ...headers, 'content-encoding': encoding, vary: 'accept-encoding' })
        res.end(await compress(file, body, encoding))
      } else {
        res.writeHead(status, headers)
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
