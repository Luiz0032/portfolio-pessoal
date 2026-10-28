// Habilidades agrupadas por área (briefing + currículo em PDF). Sem níveis ou porcentagens.
export type SkillGroup = { area: string; items: string[] }

export const skills: SkillGroup[] = [
  {
    area: 'Front-end',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue 3', 'Tailwind CSS', 'Vite', 'Interfaces responsivas'],
  },
  {
    area: 'Back-end e dados',
    items: ['Node.js', 'APIs REST', 'JSON', 'Prisma', 'MongoDB', 'SQL', 'PHP', 'Laravel'],
  },
  {
    area: 'Power Platform e Microsoft 365',
    items: [
      'Power Apps (Canvas, Power Fx)',
      'Power Automate',
      'Dataverse',
      'SharePoint',
      'Teams',
      'Word Online',
      'Forms',
      'Excel',
    ],
  },
  {
    area: 'Automação e integrações',
    items: ['Integração de APIs', 'Bots de WhatsApp', 'Automação de processos', 'Levantamento de requisitos'],
  },
  {
    area: 'Desenvolvimento assistido por IA',
    items: [
      'Claude Code (terminal e VS Code)',
      'Agentes de programação',
      'Engenharia de prompts',
      'Definição de escopo e contexto',
      'Revisão e validação de alterações',
    ],
  },
  { area: 'Desktop', items: ['Electron'] },
  { area: 'Cloud e deploy', items: ['Vercel', 'Azure'] },
  { area: 'Ferramentas', items: ['Git', 'GitHub', 'VS Code', 'npm'] },
]
