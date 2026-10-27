// Dados pessoais vindos do briefing-portfolio.md.
export const profile = {
  name: 'Luiz Fernando Streme Vogel',
  shortName: 'Luiz Fernando Vogel',
  role: 'Desenvolvedor full-stack júnior, com foco em automação e Power Platform',
  location: 'Curitiba, PR',
  education: {
    course: 'Engenharia de Software',
    school: 'Estácio (EAD)',
    expectedEnd: 'nov/2027',
  },
  contacts: {
    email: 'luizfernandostremevogel@gmail.com',
    // Só aparece no /curriculo (decisão do Luiz).
    phone: { display: '(47) 99910-0032', href: 'tel:+5547999100032' },
    github: 'https://github.com/Luiz0032',
    linkedin: 'https://www.linkedin.com/in/luiz-fernando-streme-vogel-aaa363226/',
    vstech: 'https://portfolio-comercial-two.vercel.app',
  },
} as const
