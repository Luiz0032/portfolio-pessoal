// Abre o build num servidor local e o Edge do Windows (playwright-core, sem baixar navegador),
// executa `fn` e fecha os dois. Usado pelos testes de acessibilidade e de teclado.

import { chromium } from 'playwright-core'
import { serve } from './serve.mjs'

/** Endereço inexistente, para testar a página 404. */
export const missingPath = '/pagina-que-nao-existe'

export async function withBrowser(port, fn) {
  const server = await serve('dist/client', port)
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? 'msedge' })
  try {
    return await fn({ browser, url: server.url })
  } finally {
    await browser.close()
    server.close()
  }
}
