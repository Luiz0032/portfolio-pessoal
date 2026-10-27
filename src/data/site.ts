// Endereço público do site, usado em canonical, Open Graph, JSON-LD e sitemap (precisam de URL absoluta).
// TODO: confirmar depois do deploy na Vercel (Fase 7). Pode ser sobrescrito por VITE_SITE_URL:
// o Vite injeta no app (import.meta.env) e os scripts em Node (sitemap, Open Graph) leem process.env.
const fromVite = (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_SITE_URL
const fromNode = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.VITE_SITE_URL

export const siteUrl = (fromVite ?? fromNode ?? 'https://luiz-vogel.vercel.app').replace(/\/$/, '')
