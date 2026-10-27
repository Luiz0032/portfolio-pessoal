// Endereço público do site, usado em canonical e Open Graph (precisam de URL absoluta).
// TODO: confirmar depois do deploy na Vercel (Fase 7). Pode ser sobrescrito por VITE_SITE_URL.
export const siteUrl = (import.meta.env.VITE_SITE_URL ?? 'https://luiz-vogel.vercel.app').replace(/\/$/, '')
