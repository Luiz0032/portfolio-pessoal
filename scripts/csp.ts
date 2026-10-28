// CSP por página, sem 'unsafe-inline' em script-src.
//
// O prerender gera scripts inline que mudam por página e por build (tema, contexto do React Router,
// carregador de módulos, streaming do React). Por isso a lista de hashes não pode ficar fixa no
// vercel.json: depois do build, cada HTML recebe um <meta http-equiv="Content-Security-Policy"> com
// os hashes SHA-256 dos seus próprios scripts. O cabeçalho HTTP (vercel.json) completa com
// frame-ancestors, que não funciona em <meta>.

import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DIRECTIVES = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
]

/** Scripts executáveis inline (JSON-LD é dado, não executa, e não precisa de hash). */
const inlineScripts = (html: string) =>
  [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attrs, body]) => body.trim() && !/type="application\/(ld\+)?json"/.test(attrs))
    .map(([, , body]) => body)

const sha256 = (text: string) => `'sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}'`

export function cspFor(html: string) {
  const hashes = [...new Set(inlineScripts(html).map(sha256))]
  return [...DIRECTIVES, `script-src 'self' ${hashes.join(' ')}`.trim()].join('; ')
}

/** Insere a CSP em todos os HTML da pasta (recursivo). Devolve quantos arquivos foram tratados. */
export async function applyCsp(dir: string) {
  let count = 0
  for (const entry of await readdir(dir, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue
    const file = join(entry.parentPath, entry.name)
    const html = (await readFile(file, 'utf8')).replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/, '')
    // Logo após o charset, antes de qualquer script do <head>.
    const tag = `<meta http-equiv="Content-Security-Policy" content="${cspFor(html)}"/>`
    const withCsp = html.replace(/(<meta charSet="utf-8"\/>)/, `$1${tag}`)
    if (withCsp === html) throw new Error(`CSP: <meta charSet> não encontrado em ${file}`)
    await writeFile(file, withCsp)
    count++
  }
  return count
}
