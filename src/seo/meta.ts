import type { MetaDescriptor } from 'react-router'
import { ogImageKey, ogImageUrl, siteUrl } from '@/data/site'
import { t } from '@/i18n'

type PageMeta = {
  title: string
  description: string
  /** Caminho a partir da raiz, ex.: "/curriculo". */
  path: string
  type?: 'website' | 'article' | 'profile'
  /** Chave da imagem de Open Graph (ver ogImageKey em src/data/site.ts). */
  ogImage?: string
  /** Blocos JSON-LD (src/seo/schema.ts). */
  jsonLd?: object[]
}

/** Title, description, canonical, Open Graph, Twitter Card e JSON-LD de uma página indexável. */
export function pageMeta({ title, description, path, type = 'website', ogImage = ogImageKey.home, jsonLd = [] }: PageMeta): MetaDescriptor[] {
  const url = `${siteUrl}${path}`
  const image = ogImageUrl(ogImage)
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
    ...jsonLd.map((data) => ({ 'script:ld+json': data })),
  ]
}

/** Página inexistente: sem canonical nem Open Graph, e fora do índice. */
export const notFoundMeta = (): MetaDescriptor[] => [
  { title: `${t.notFound.title} · ${t.meta.titleSuffix}` },
  { name: 'description', content: t.notFound.body },
  { name: 'robots', content: 'noindex' },
]
