export type ProjectTier = 'powerPlatform' | 'featured' | 'other'

/**
 * Print ou vídeo de um projeto, pelo nome no manifesto de mídia (ex.: 'gestao-precontratos/home'
 * para media/shots/gestao-precontratos/home.png). Se o arquivo ainda não existe, a página mostra
 * um TODO no tamanho final em desenvolvimento; em produção, capas viram uma capa gerada e prints da galeria somem.
 */
export type Shot = {
  image?: string
  video?: string
  alt: string
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
  /** Description da página do estudo de caso (até 160 caracteres). */
  metaDescription?: string
  /** Contexto curto: para quem ou por que o projeto existe. */
  context?: string
  stack: string[]
  tier: ProjectTier
  /** Ano de criação do repositório. */
  year?: string
  /** Repositórios privados não têm `code`. */
  links: { code?: string; demo?: string }
  /** Imagem do card. Sem print, vira uma capa gerada com o nome e a stack (TODO em desenvolvimento). */
  image?: Shot
  /** Só números conferidos no repositório. */
  facts?: { label: string; value: string }[]
  caseStudy?: CaseStudy
  /** Pendência visível no card enquanto não for resolvida. */
  todo?: string
}
