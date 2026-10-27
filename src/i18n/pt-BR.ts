// Textos de interface em português. Uma versão em inglês terá a mesma forma (ver `Messages`).
export const ptBR = {
  skipLink: 'Pular para o conteúdo',
  nav: {
    label: 'Principal',
    home: 'Página inicial',
    projects: 'Projetos',
    about: 'Sobre',
    skills: 'Habilidades',
    contact: 'Contato',
    resume: 'Currículo',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    menu: 'Menu',
  },
  theme: {
    toDark: 'Ativar tema escuro',
    toLight: 'Ativar tema claro',
  },
  footer: {
    contactsLabel: 'Contatos',
    location: 'Curitiba, PR',
  },
  externalLink: '(abre em nova aba)',
  notFound: {
    title: 'Página não encontrada',
    body: 'O endereço que você abriu não existe ou mudou de lugar.',
    back: 'Voltar para a página inicial',
    projects: 'Ver projetos',
  },
  error: {
    title: 'Algo deu errado ao abrir esta página',
    body: 'Recarregue a página. Se o erro continuar, volte para a página inicial.',
  },
  meta: {
    siteTitle: 'Luiz Fernando Streme Vogel',
    titleSuffix: 'Luiz Fernando Vogel',
    homeTitle: 'Luiz Fernando Streme Vogel · Desenvolvedor full-stack',
    homeDescription:
      'Portfólio de Luiz Fernando Streme Vogel, desenvolvedor full-stack júnior em Curitiba, com foco em automação e Power Platform.',
    resumeDescription:
      'Currículo de Luiz Fernando Streme Vogel, desenvolvedor full-stack júnior com foco em automação e Power Platform.',
    caseStudySuffix: 'estudo de caso',
  },
  hero: {
    lede: 'Desenvolvo aplicações web com React, TypeScript e Node.js e automatizo processos de negócio com Power Apps e Power Automate.',
    primaryCta: 'Ver projetos',
    secondaryCta: 'Falar comigo',
    flowCaption: 'Ciclo de pré-contratos que digitalizei para uma empresa do setor de engenharia.',
    flowLink: 'Ler o estudo de caso',
  },
  about: {
    title: 'Sobre',
    paragraphs: [
      'Sou desenvolvedor full-stack júnior em Curitiba. Trabalho com JavaScript, TypeScript, React e Node.js. Profissionalmente, desenvolvi automações back-end e integrações com APIs e JSON (WhatsApp, SMS e chatbots) e, depois, aplicações low-code e fluxos com Power Apps, Power Automate e Microsoft 365.',
      'Sou cofundador da VSTech, agência de criação de sites e marketing digital, onde entrego sites do planejamento ao deploy.',
      'No dia a dia, uso Claude Code e agentes de código para planejar, implementar, depurar e revisar, e valido o resultado antes de publicar.',
    ],
    facts: {
      location: 'Base',
      education: 'Formação',
      educationValue: 'Engenharia de Software na Estácio (EAD), conclusão prevista em novembro de 2027',
      company: 'Também',
      companyValue: 'Cofundador da VSTech',
    },
  },
  projects: {
    title: 'Projetos',
    powerPlatformTitle: 'Power Platform',
    powerPlatformIntro:
      'Dois apps com perfis diferentes: um processo jurídico com integrações e geração de documentos, e um processo de RH com regras de negócio e controle por perfil e por data.',
    featuredTitle: 'Projetos web',
    otherTitle: 'Outros projetos',
    caseStudyLink: 'Ler o estudo de caso',
    codeLink: 'Código',
    demoLink: 'Ver site',
  },
  caseStudy: {
    back: 'Todos os projetos',
    problem: 'O problema',
    problemTodo: 'descrever o problema que o app resolveu (o README do repositório não traz essa parte).',
    beforeAfter: 'Antes e depois',
    beforeAfterTodo: 'tabela de antes e depois do processo (o README do repositório não traz essa parte).',
    roles: 'Quem usa',
    flow: 'Fluxo do processo',
    architecture: 'Arquitetura',
    diagramHint: 'Em telas estreitas, arraste o diagrama para o lado.',
    highlights: 'Destaques técnicos',
    gallery: 'Telas',
    galleryNote: 'Prints com dados fictícios.',
    next: 'Próximo estudo de caso',
  },
  resume: {
    print: 'Imprimir ou salvar em PDF',
    printHint: 'No diálogo de impressão, escolha “Salvar como PDF”.',
    summary: 'Resumo',
    summaryText:
      'Estudante de Engenharia de Software (Estácio), com foco em desenvolvimento web full-stack com JavaScript, TypeScript, React e Node.js. Tenho experiência profissional em desenvolvimento back-end de automações e integrações com APIs e JSON, além do desenvolvimento de aplicações low-code e fluxos automatizados com Power Apps, Power Automate e Microsoft 365. Como cofundador da VSTech, agência de criação de sites e marketing digital, desenvolvo sites para clientes do planejamento à publicação. Uso o Claude Code e agentes de programação no planejamento, na implementação, na depuração e na revisão de código, sempre validando as alterações antes de publicá-las.',
    experience: 'Experiência',
    independent: 'Atuação independente',
    projects: 'Projetos selecionados',
    education: 'Formação',
    educationStatus: 'EAD, em andamento. Previsão de conclusão: nov/2027',
    skills: 'Competências',
    languages: 'Idiomas',
  },
  skills: {
    title: 'Habilidades',
    intro: 'Tecnologias que uso em projetos, agrupadas por área.',
  },
  contact: {
    title: 'Contato',
    body: 'Para conversar sobre uma vaga ou um projeto, escreva para o meu e-mail ou me chame no LinkedIn.',
    sendEmail: 'Enviar e-mail',
    resume: 'Ver currículo',
  },
}

export type Messages = typeof ptBR
