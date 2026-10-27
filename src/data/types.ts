export type ProjectTier = 'powerPlatform' | 'featured' | 'other'

/**
 * Print ou imagem de um projeto. Sem `src`, a página mostra um placeholder no tamanho final
 * com o `alt` como descrição do print que falta (TODO).
 */
export type Shot = {
  src?: string
  alt: string
  width?: number
  height?: number
}

export type CaseStudy = {
  /** Texto do problema. Ausente → a página mostra um TODO. */
  problem?: string
  beforeAfter: { before: string; after: string }[]
  /** Caminho principal do processo, na ordem. */
  statusFlow: string[]
  /** Desvio que volta para uma etapa anterior (ex.: ajustes pedidos na revisão). */
  statusBranch?: { from: string; state: string; backTo: string; label: string }
  /** Quem usa e o que faz. */
  roles: { role: string; does: string }[]
  highlights: { title: string; body: string }[]
  /** Telas mostradas na galeria (com dados fictícios). */
  gallery: Shot[]
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
  /** Imagem do card. Sem `src`, vira placeholder com TODO. */
  image?: Shot
  /** Só números conferidos no repositório. */
  facts?: { label: string; value: string }[]
  caseStudy?: CaseStudy
  /** Pendência visível no card enquanto não for resolvida. */
  todo?: string
}
