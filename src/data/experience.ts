// Experiência profissional, do currículo em PDF (Curriculo_Luiz_Fernando_Streme_Vogel.pdf).
// Os clientes da VSTech não são citados por nome (regra do projeto).
export type Experience = {
  role: string
  company: string
  period: string
  description?: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    role: 'Desenvolvedor Low-Code',
    company: 'Kutassy Engenharia',
    period: 'abr/2025 – out/2026',
    bullets: [
      'Desenvolvimento e manutenção de aplicações low-code com Power Apps e de fluxos automatizados com Power Automate, voltados à otimização de processos internos.',
      'Suporte e sustentação de sistemas corporativos, com análise de falhas, identificação de oportunidades de melhoria e implementação de ajustes nas soluções existentes.',
      'Desenvolvimento de automações e integrações no ecossistema Microsoft 365, envolvendo SharePoint, Teams, Forms, Excel e serviços do Azure.',
      'Levantamento e análise de requisitos junto às áreas operacionais, transformando processos manuais em soluções digitais.',
      'Implementação de melhorias em aplicações e fluxos de trabalho, considerando as necessidades dos usuários, a manutenção das soluções e a confiabilidade dos processos.',
    ],
  },
  {
    role: 'Desenvolvedor Back-end',
    company: 'Dialog Solutions',
    period: 'mar/2023 – jun/2024',
    bullets: [
      'Desenvolvimento e manutenção de automações de comunicação digital por WhatsApp, SMS e chatbots, utilizando JavaScript.',
      'Automação da distribuição de imagens e descrições de imóveis por meio da integração entre API, Google Drive e bot de WhatsApp.',
      'Manipulação e estruturação de dados JSON na integração entre sistemas e serviços externos.',
    ],
  },
]

export const independent: Experience[] = [
  {
    role: 'Cofundador e Desenvolvedor Web',
    company: 'VSTech',
    period: 'set/2025 – atual',
    description:
      'Agência criada em parceria com um colega, voltada à criação de sites e ao marketing digital para negócios locais e pequenas e médias empresas, com sistemas e automações como serviços complementares.',
    bullets: [
      'Desenvolvimento de sites para clientes, do planejamento à publicação.',
      'Desenvolvimento do portfólio comercial da agência com React, TypeScript, Vite e Tailwind CSS, com componentização, layout responsivo e publicação na Vercel.',
    ],
  },
]

export const languages = [
  { language: 'Inglês', level: 'intermediário' },
  { language: 'Espanhol', level: 'intermediário' },
]
