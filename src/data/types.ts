export type ProjectTier = 'powerPlatform' | 'featured' | 'other'

export type ImageRef = { src: string; alt: string }

export type CaseStudy = {
  /** Texto do problema. Ausente → a página mostra um TODO. */
  problem?: string
  beforeAfter: { before: string; after: string }[]
  /** Etapas do processo, na ordem, para o diagrama de status. */
  statusFlow?: string[]
  /** Quem usa e o que faz. */
  roles?: { role: string; does: string }[]
  highlights: { title: string; body: string }[]
  /** Prints com dados fictícios. Vazio → placeholders com TODO. */
  gallery: ImageRef[]
}

export type Project = {
  slug: string
  title: string
  /** Uma ou duas frases para o card. */
  summary: string
  /** Contexto curto: para quem ou por que o projeto existe. */
  context?: string
  stack: string[]
  tier: ProjectTier
  /** Ano de criação do repositório. */
  year?: string
  /** Repositórios privados não têm `code`. */
  links: { code?: string; demo?: string }
  /** Sem imagem, o card mostra um placeholder com TODO visível. */
  image?: ImageRef
  /** Só números conferidos no repositório. */
  facts?: { label: string; value: string }[]
  caseStudy?: CaseStudy
  /** Pendência visível no card enquanto não for resolvida. */
  todo?: string
}
