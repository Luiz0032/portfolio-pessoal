// Endereço público do site, usado em canonical e Open Graph (precisam de URL absoluta).
// TODO: confirmar depois do deploy na Vercel (Fase 7). Pode ser sobrescrito por VITE_SITE_URL.
// `import.meta.env` só existe no Vite; scripts em Node (scripts/og-pages.mjs) usam o valor padrão.
const fromEnv = (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_SITE_URL

export const siteUrl = (fromEnv ?? 'https://luiz-vogel.vercel.app').replace(/\/$/, '')
