import type { Project } from './types'

/*
 * Projetos na ordem de destaque do briefing, conferidos com os repositórios em 27/10/2026.
 * Para adicionar um projeto, acrescente um objeto aqui; nenhum componente precisa mudar.
 * Trabalhos para clientes só entram com autorização do cliente e depois de publicados.
 */
export const projects: Project[] = [
  {
    slug: 'gestao-precontratos',
    title: 'Gestão de Pré-Contratos',
    summary:
      'App que digitaliza o ciclo de pré-contratos de fornecedores: cadastro por CNPJ, minuta gerada do modelo corporativo, revisão jurídica com ajustes e reenvio, aviso no Teams e histórico auditável.',
    metaDescription:
      'Estudo de caso: app em Power Platform que digitaliza pré-contratos de fornecedores, do cadastro por CNPJ à revisão jurídica, com aviso no Teams.',
    context: 'Projeto corporativo para uma empresa do setor de engenharia.',
    stack: ['Power Apps', 'Power Fx', 'Power Automate', 'Dataverse', 'SharePoint', 'Word Online', 'Teams', 'API REST'],
    tier: 'powerPlatform',
    links: { code: 'https://github.com/Luiz0032/gestao-precontratos' },
    image: { image: 'gestao-precontratos/home', alt: 'Tela inicial do app de pré-contratos, com contadores por status e a lista de pré-contratos recentes' },
    facts: [
      { label: 'Telas', value: '9' },
      { label: 'Componentes', value: '3' },
      { label: 'Fluxos no Power Automate', value: '6' },
      { label: 'Listas no SharePoint', value: '5' },
      { label: 'Bibliotecas de documentos', value: '2' },
    ],
    caseStudy: {
      problem:
        'Cada pré-contrato era montado à mão. O Comercial copiava dados do fornecedor do cartão CNPJ, editava um Word modelo e mandava anexos por e-mail; o Jurídico devolvia ajustes sem rastreabilidade. O resultado era retrabalho, cláusulas desatualizadas, documentos perdidos e nenhuma visão de status.',
      beforeAfter: [
        {
          before: 'Dados do fornecedor digitados manualmente',
          after: 'Consulta automática por CNPJ (API CNPJa) e cadastro no Dataverse',
        },
        {
          before: 'Word editado à mão, com cláusulas copiadas',
          after: 'Minuta gerada do modelo corporativo, com biblioteca de cláusulas versionável',
        },
        {
          before: 'Anexos soltos em e-mail',
          after: 'Pasta por pré-contrato no SharePoint, vinculada pelo ID do registro',
        },
        {
          before: 'Ajustes combinados em conversa informal',
          after: 'Fluxo de revisão jurídica com status, motivo do ajuste e reenvio',
        },
        {
          before: 'Ninguém sabia em que etapa cada pré-contrato estava',
          after: 'Painel com rascunhos, pendentes, em revisão e concluídos, mais o histórico',
        },
        {
          before: 'Aviso por e-mail feito à mão',
          after: 'Post automático no canal do Teams da obra, com menção ao Jurídico',
        },
      ],
      statusFlow: ['Rascunho', 'Enviado ao Jurídico', 'Em revisão jurídica', 'Aguardando assinatura', 'Concluído'],
      statusBranch: {
        from: 'Em revisão jurídica',
        state: 'Ajustes solicitados',
        backTo: 'Enviado ao Jurídico',
        label: 'o Jurídico pede correção e o Comercial reenvia',
      },
      roles: [
        { role: 'Comercial', does: 'Cadastra o fornecedor, preenche o pré-contrato e envia ao Jurídico.' },
        { role: 'Jurídico', does: 'Revisa a prévia em PDF, aprova ou pede ajustes com o motivo.' },
      ],
      highlights: [
        {
          title: 'Consulta de CNPJ integrada',
          body: 'Um fluxo HTTP limpa o CNPJ, consulta a API CNPJa e devolve ao app razão social, endereço e CNAEs já tratados.',
        },
        {
          title: 'Motor de cláusulas',
          body: 'As cláusulas ficam numa lista do SharePoint com ordem e seção. O fluxo substitui os campos do modelo Word de uma vez, a partir de um JSON codificado.',
        },
        {
          title: 'Prévia em PDF antes do envio',
          body: 'O Jurídico revisa uma prévia gerada na hora (Word para PDF), sem baixar arquivos.',
        },
        {
          title: 'Vínculo por ID, não por nome',
          body: 'Anexos, minuta e contrato final guardam o ID do pré-contrato nas propriedades do arquivo, o que evita documento ligado ao registro errado.',
        },
        {
          title: 'Notificação no canal certo',
          body: 'Cada obra tem seu canal do Teams configurado; o fluxo posta com os links da minuta e dos anexos e menciona a responsável.',
        },
        {
          title: 'Histórico auditável',
          body: 'Toda mudança de status gera um registro com quem, quando, o quê e o motivo.',
        },
      ],
      gallery: [
        {
          image: 'gestao-precontratos/home',
          alt: 'Tela inicial com contadores de rascunhos, jurídico, aguardando assinatura e concluídos, e a lista de pré-contratos recentes',
        },
        {
          image: 'gestao-precontratos/novo-precontrato',
          alt: 'Início do formulário de novo pré-contrato: busca do cliente ou fornecedor e dados do representante legal',
        },
        { image: 'gestao-precontratos/juridico', alt: 'Fila do Jurídico com os pré-contratos enviados para revisão' },
        // TODO: print da revisão com a prévia em PDF (media/shots/gestao-precontratos/revisao-juridica.png).
        {
          image: 'gestao-precontratos/revisao-juridica',
          alt: 'Revisão jurídica com a prévia em PDF e as opções de aprovar ou pedir ajuste',
        },
        { image: 'gestao-precontratos/pendentes', alt: 'Pré-contratos pendentes, com busca por número, empresa ou obra e filtro por status' },
        {
          image: 'gestao-precontratos/historico',
          alt: 'Histórico de movimentações com data, evento, status anterior, novo status e quem executou',
        },
      ],
    },
  },
  {
    slug: 'avaliacao-colaboradores',
    title: 'Avaliação de Colaboradores',
    summary:
      'App de avaliação de desempenho para RH: o administrador abre o ciclo, o colaborador define metas com pesos e faz a autoavaliação, o gestor avalia o time e a nota final é calibrada.',
    metaDescription:
      'Estudo de caso: app de avaliação de desempenho em Power Apps, com metas com pesos, autoavaliação, avaliação do gestor e calibração da nota.',
    context: 'Roda inteiro no Microsoft 365, sem licença premium.',
    stack: ['Power Apps', 'Power Fx', 'Named Formulas', 'Power Automate', 'SharePoint', 'Outlook', 'Office 365 Users'],
    tier: 'powerPlatform',
    links: { code: 'https://github.com/Luiz0032/avaliacao-colaboradores' },
    image: { image: 'avaliacao-colaboradores/home', alt: 'Tela inicial do app de avaliação, com filtros e a lista de avaliações' },
    facts: [
      { label: 'Telas', value: '8' },
      { label: 'Componentes', value: '3' },
      { label: 'Fluxos no Power Automate', value: '2' },
      { label: 'Listas no SharePoint', value: '9' },
    ],
    caseStudy: {
      // TODO: o README não descreve o problema que o app resolveu nem um "antes/depois".
      beforeAfter: [],
      statusFlow: ['Convite', 'Definição de metas', 'Metas definidas', 'Avaliação', 'Calibração e conclusão'],
      roles: [
        {
          role: 'Administrador',
          does: 'Cria o ciclo com datas de metas e de avaliação, cadastra as competências, escolhe os participantes e envia o convite. Pode simular o acesso de um colaborador para dar suporte.',
        },
        {
          role: 'Colaborador',
          does: 'Define metas com pesos (o app só aceita se a soma der 100%) e faz a autoavaliação das competências, numa escala de 1 a 3.',
        },
        { role: 'Gestor', does: 'Avalia cada pessoa do time, comenta e conclui a avaliação.' },
        { role: 'Calibração', does: 'Registra a nota final de competências e metas e encerra o ciclo.' },
      ],
      highlights: [
        {
          title: 'Fluxo por status',
          body: 'Cada avaliação avança por status numerados de 10 a 50, do convite à calibração.',
        },
        {
          title: 'Etapas bloqueadas por data',
          body: 'O app impede ações fora do período configurado para metas e para avaliação.',
        },
        {
          title: 'Relatório pronto para PDF',
          body: 'A avaliação gera um relatório em HTML formatado para impressão.',
        },
        {
          title: 'Tema claro e escuro',
          body: 'As cores ficam centralizadas em Named Formulas, então o tema muda num lugar só.',
        },
        {
          title: 'Muda de ambiente sem editar o app',
          body: 'Site e listas vêm de variáveis de ambiente da solução.',
        },
        {
          title: 'Componentes próprios',
          body: 'Loading, estado vazio e diálogo de confirmação com confirmação automática por tempo.',
        },
      ],
      gallery: [
        {
          image: 'avaliacao-colaboradores/home',
          alt: 'Tela inicial com filtros por tipo de avaliação, status e ciclo, e a lista de avaliações',
        },
        { image: 'avaliacao-colaboradores/home-escuro', alt: 'A mesma tela inicial no tema escuro' },
        {
          image: 'avaliacao-colaboradores/colaboradores-convidados',
          alt: 'Administração do ciclo: colaboradores que podem ser convidados, com e-mail, e o status dos convites ao lado',
        },
        {
          image: 'avaliacao-colaboradores/itens-avaliacao',
          alt: 'Administração do ciclo: itens avaliados em um ciclo de junho de 2026, com categorias como segurança e operação',
        },
        { image: 'avaliacao-colaboradores/metas', alt: 'Lista de metas de desempenho do colaborador' },
        // TODO: print da autoavaliação (media/shots/avaliacao-colaboradores/autoavaliacao.png).
        { image: 'avaliacao-colaboradores/autoavaliacao', alt: 'Autoavaliação das competências na escala de 1 a 3' },
      ],
    },
  },
  {
    slug: 'vstech',
    title: 'VSTech',
    summary:
      'Landing page da VSTech, agência de criação de sites e marketing digital da qual sou cofundador, com foco em conversão pelo WhatsApp.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS v4'],
    tier: 'featured',
    year: '2026',
    links: { demo: 'https://portfolio-comercial-two.vercel.app' },
    image: { image: 'vstech/home', alt: 'Primeira dobra da landing page da VSTech' },
  },
  {
    slug: 'formulario-leads',
    title: 'Formulário de captação de leads',
    summary:
      'Aplicação full-stack para cadastrar, listar e excluir clientes: API em Fastify com Prisma e MongoDB e front-end em React com Tailwind.',
    stack: ['TypeScript', 'Node.js', 'Fastify', 'Prisma', 'MongoDB', 'React', 'Tailwind CSS'],
    tier: 'featured',
    year: '2025',
    links: { code: 'https://github.com/Luiz0032/Fomulario' },
    image: {
      video: 'formulario-demo',
      alt: 'Demonstração: um cliente de teste é cadastrado no formulário (nome, e-mail e telefone), aparece na lista com botão de excluir e é conferido no banco de dados.',
    },
  },
  {
    slug: 'gerenciador-tarefas',
    title: 'Gerenciador de tarefas',
    summary:
      'CRUD de tarefas com filtro por status, busca por título, modal de edição e persistência em localStorage.',
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Vite'],
    tier: 'featured',
    year: '2025',
    links: { code: 'https://github.com/Luiz0032/gestor-de-tarefas' },
    image: { image: 'gerenciador-tarefas/home', alt: 'Lista de tarefas em cards, com filtro por status e busca' },
  },
  {
    slug: 'meu-launcher',
    title: 'Meu Launcher',
    summary:
      'App desktop que se conecta à live do TikTok e transforma likes, comentários e presentes em ações de um jogo, com regras configuráveis por preset.',
    stack: ['Electron', 'React', 'TypeScript', 'Vite', 'tiktok-live-connector'],
    // Fica em "outros" até o README existir (briefing: escrever o README antes de destacar).
    tier: 'other',
    year: '2026',
    links: { code: 'https://github.com/Luiz0032/Meu-Launcher' },
    todo: 'o README do repositório está vazio; escrever antes de mover para os destaques.',
  },
  {
    slug: 'login-laravel',
    title: 'Autenticação com Laravel',
    summary:
      'Cadastro, login, recuperação de senha, verificação de e-mail e edição de perfil, sobre a estrutura do Laravel Breeze.',
    stack: ['PHP', 'Laravel', 'Blade', 'Tailwind CSS', 'Alpine.js'],
    tier: 'other',
    year: '2025',
    links: { code: 'https://github.com/Luiz0032/login' },
    todo: 'o README do repositório ainda é o padrão do Laravel.',
  },
  {
    slug: 'previsao-tempo',
    title: 'Previsão do tempo',
    summary: 'Consulta o clima atual de uma cidade pela WeatherAPI, com umidade do ar e velocidade do vento.',
    stack: ['HTML', 'CSS', 'JavaScript', 'API REST'],
    tier: 'other',
    year: '2024',
    links: { code: 'https://github.com/Luiz0032/app-previsao-tempo' },
  },
  {
    slug: 'pokedex',
    title: 'Pokédex',
    summary:
      'Lista de Pokémon em que cada item abre um card com imagem e atributos como ataque e defesa, feita com HTML, CSS e JavaScript puro.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    tier: 'other',
    year: '2024',
    links: { code: 'https://github.com/Luiz0032/app-pokedex' },
  },
  {
    slug: 'tabela-precos',
    title: 'Tabela de preços',
    summary: 'Página de planos de um produto SaaS, feita para praticar layout com HTML e CSS.',
    stack: ['HTML', 'CSS'],
    tier: 'other',
    year: '2024',
    links: { code: 'https://github.com/Luiz0032/Tabela-de-precos' },
  },
]

export const projectsByTier = (tier: Project['tier']) => projects.filter((project) => project.tier === tier)

export const findCaseStudy = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug && project.caseStudy)

/** Caminhos dos estudos de caso, usados pelo prerender em react-router.config.ts. */
export const caseStudyPaths = () =>
  projects.filter((project) => project.caseStudy).map((project) => `/projetos/${project.slug}`)
