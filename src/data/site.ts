// Endereço público do site, usado em canonical, Open Graph, JSON-LD e sitemap (precisam de URL absoluta).
// Domínio definitivo do projeto luiz-vogel na Vercel. Pode ser sobrescrito por VITE_SITE_URL:
// o Vite injeta no app (import.meta.env) e os scripts em Node (sitemap, Open Graph) leem process.env.
const fromVite = (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_SITE_URL
const fromNode = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.VITE_SITE_URL

export const siteUrl = (fromVite ?? fromNode ?? 'https://luiz-vogel.vercel.app').replace(/\/$/, '')

/** URL sem protocolo, "www." e barra final, para exibir em texto. */
export const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

/** Imagens de Open Graph: public/og/<chave>.png, geradas a partir de scripts/og/. */
export const ogImageKey = { home: 'home', resume: 'curriculo', caseStudy: (slug: string) => `projeto-${slug}` }
export const ogImageUrl = (key: string) => `${siteUrl}/og/${key}.png`
