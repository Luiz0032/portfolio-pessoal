import type { Config } from '@react-router/dev/config'
import { caseStudyPaths } from './src/data/projects'

export default {
  appDirectory: 'src',
  buildDirectory: 'dist',
  // Sem servidor em produção: cada caminho abaixo vira um index.html próprio no build.
  // O resto (404, slugs desconhecidos) usa dist/client/__spa-fallback.html, servido pelo vercel.json.
  ssr: false,
  prerender: ['/', '/curriculo', ...caseStudyPaths()],
} satisfies Config
