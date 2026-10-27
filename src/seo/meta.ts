import type { MetaDescriptor } from 'react-router'
import { siteUrl } from '@/data/site'
import { t } from '@/i18n'

type PageMeta = {
  title: string
  description: string
  /** Caminho a partir da raiz, ex.: "/curriculo". */
  path: string
  type?: 'website' | 'article' | 'profile'
  noindex?: boolean
  /** Chave da imagem em public/og/<chave>.png (gerada a partir de scripts/og/). */
  ogImage?: string
}

/** Title, description, canonical, Open Graph e Twitter Card de uma página. */
export function pageMeta({ title, description, path, type = 'website', noindex, ogImage = 'home' }: PageMeta): MetaDescriptor[] {
  const url = `${siteUrl}${path}`
  const image = `${siteUrl}/og/${ogImage}.png`
  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: t.meta.siteTitle },
    { property: 'og:locale', content: 'pt_BR' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: title },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    ...(noindex ? [{ name: 'robots', content: 'noindex' }] : []),
  ]
}
