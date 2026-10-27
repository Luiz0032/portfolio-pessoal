// Habilidades agrupadas por área, conforme o briefing. Sem níveis ou porcentagens.
export type SkillGroup = { area: string; items: string[] }

export const skills: SkillGroup[] = [
  {
    area: 'Front-end',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue 3', 'Tailwind CSS', 'Vite'],
  },
  {
    area: 'Back-end',
    items: ['Node.js', 'APIs REST', 'Prisma', 'MongoDB', 'SQL', 'PHP', 'Laravel'],
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
  { area: 'Desktop', items: ['Electron'] },
  { area: 'Cloud e deploy', items: ['Vercel', 'Azure'] },
  { area: 'Ferramentas', items: ['Git', 'GitHub', 'VS Code', 'Claude Code'] },
]
