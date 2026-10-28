import { caseStudyPath } from '@/data/projects'
import { profile } from '@/data/profile'
import { ogImageKey, ogImageUrl, siteUrl } from '@/data/site'
import type { Project } from '@/data/types'

// Dados estruturados (schema.org). O telefone nunca entra aqui.
const personId = `${siteUrl}/#pessoa`

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    jobTitle: 'Desenvolvedor full-stack júnior',
    description: profile.role,
    url: `${siteUrl}/`,
    email: `mailto:${profile.contacts.email}`,
    image: ogImageUrl(ogImageKey.home),
    address: { '@type': 'PostalAddress', addressLocality: 'Curitiba', addressRegion: 'PR', addressCountry: 'BR' },
    sameAs: [profile.contacts.github, profile.contacts.linkedin],
    knowsAbout: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Power Apps', 'Power Automate', 'Microsoft 365', 'APIs REST'],
    knowsLanguage: ['pt-BR', 'en', 'es'],
  }
}

export function caseStudySchema(project: Project) {
  const url = `${siteUrl}${caseStudyPath(project.slug)}`
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#estudo-de-caso`,
    name: project.title,
    headline: `${project.title}: estudo de caso`,
    description: project.summary,
    url,
    image: ogImageUrl(ogImageKey.caseStudy(project.slug)),
    inLanguage: 'pt-BR',
    keywords: project.stack.join(', '),
    author: { '@type': 'Person', '@id': personId, name: profile.name, url: `${siteUrl}/` },
    ...(project.links.code ? { sameAs: project.links.code } : {}),
  }
}
