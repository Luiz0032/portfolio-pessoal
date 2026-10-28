// Serve o build (dist/client) como a Vercel: páginas pré-renderizadas, compressão e 404.html com status 404.
// Uso: npm run build && npm run preview

import { serve } from './lib/serve.mjs'

const { url } = await serve('dist/client', Number(process.env.PORT ?? 4173))
console.log(`Build servido em ${url} (Ctrl+C para parar)`)
