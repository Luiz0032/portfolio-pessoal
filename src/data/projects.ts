import type { Project } from './types'

// Ordem de destaque do briefing. A Fase 3 confere cada item com o repositório e completa a lista.
export const projects: Project[] = [
  {
    slug: 'gestao-precontratos',
    title: 'Gestão de Pré-Contratos',
    summary:
      'App corporativo que digitaliza o ciclo de pré-contratos de fornecedores de uma empresa do setor de engenharia, do cadastro por CNPJ à revisão jurídica.',
    stack: ['Power Apps', 'Power Automate', 'Dataverse', 'SharePoint', 'Word Online', 'Teams', 'API REST'],
    tier: 'featured',
    links: { code: 'https://github.com/Luiz0032/gestao-precontratos' },
    facts: [
      { label: 'Telas', value: '9' },
      { label: 'Componentes', value: '3' },
      { label: 'Fluxos Power Automate', value: '6' },
      { label: 'Listas SharePoint', value: '5' },
    ],
    caseStudy: {
      problem: 'TODO: descrever o problema a partir do README do repositório (Fase 3).',
      beforeAfter: [],
      highlights: [],
      gallery: [],
    },
  },
  {
    slug: 'avaliacao-colaboradores',
    title: 'Avaliação de Colaboradores',
    summary:
      'App de avaliação de desempenho para RH: ciclo, competências, metas com pesos, autoavaliação, avaliação do gestor e calibração da nota final.',
    stack: ['Power Apps', 'Power Fx', 'Named Formulas', 'Power Automate', 'SharePoint', 'Outlook', 'Office 365 Users'],
    tier: 'powerPlatform',
    links: { code: 'https://github.com/Luiz0032/avaliacao-colaboradores' },
    facts: [
      { label: 'Telas', value: '9' },
      { label: 'Fluxos Power Automate', value: '2' },
      { label: 'Listas SharePoint', value: '9' },
    ],
    caseStudy: {
      problem: 'TODO: descrever o problema a partir do README do repositório (Fase 3).',
      beforeAfter: [],
      highlights: [],
      gallery: [],
    },
  },
]

export const findCaseStudy = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug && project.caseStudy)
