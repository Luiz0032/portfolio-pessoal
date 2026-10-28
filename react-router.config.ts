import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Config } from '@react-router/dev/config'
import { applyCsp } from './scripts/csp'
import { publicPaths } from './src/data/projects'

export default {
  appDirectory: 'src',
  buildDirectory: 'dist',
  // Sem servidor em produção: cada caminho abaixo vira um index.html próprio no build.
  ssr: false,
  prerender: publicPaths(),
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, 'client')
    // Qualquer outro endereço é uma página inexistente. O shell genérico (__spa-fallback.html) vira
    // 404.html, que a Vercel serve com status 404; no navegador ele hidrata e mostra a página de 404.
    await copyFile(join(client, '__spa-fallback.html'), join(client, '404.html'))
    // CSP com os hashes dos scripts inline de cada página (ver scripts/csp.mjs).
    const pages = await applyCsp(client)
    console.log(`CSP com hashes aplicada em ${pages} páginas HTML`)
  },
} satisfies Config
