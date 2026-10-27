export type ProjectTier = 'featured' | 'powerPlatform' | 'other' | 'client'

export type ImageRef = { src: string; alt: string }

export type CaseStudy = {
  problem: string
  beforeAfter: { aspect: string; before: string; after: string }[]
  diagram?: string
  highlights: string[]
  gallery: ImageRef[]
}

export type Project = {
  slug: string
  title: string
  /** Uma ou duas frases para o card. */
  summary: string
  stack: string[]
  tier: ProjectTier
  /** Repositórios privados não têm `code`. */
  links: { code?: string; demo?: string }
  /** Sem imagem, o card mostra um placeholder com TODO visível. */
  image?: ImageRef
  /** Só números que estão no briefing ou no repositório. */
  facts?: { label: string; value: string }[]
  caseStudy?: CaseStudy
}
