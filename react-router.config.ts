import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Config } from '@react-router/dev/config'
import { caseStudyPaths } from './src/data/projects'

export default {
  appDirectory: 'src',
  buildDirectory: 'dist',
  // Sem servidor em produção: cada caminho abaixo vira um index.html próprio no build.
  ssr: false,
  prerender: ['/', '/curriculo', ...caseStudyPaths()],
  // Qualquer outro endereço é uma página inexistente. O shell genérico (__spa-fallback.html) vira
  // 404.html, que a Vercel serve com status 404; no navegador ele hidrata e mostra a página de 404.
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, 'client')
    await copyFile(join(client, '__spa-fallback.html'), join(client, '404.html'))
  },
} satisfies Config
