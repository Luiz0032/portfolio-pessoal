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
}

/** Title, description, canonical, Open Graph e Twitter Card de uma página. */
export function pageMeta({ title, description, path, type = 'website', noindex }: PageMeta): MetaDescriptor[] {
  const url = `${siteUrl}${path}`
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
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    ...(noindex ? [{ name: 'robots', content: 'noindex' }] : []),
  ]
}
