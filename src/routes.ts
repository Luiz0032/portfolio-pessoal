import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('pages/Home.tsx'),
  route('projetos/:slug', 'pages/CaseStudy.tsx'),
  route('curriculo', 'pages/Curriculo.tsx'),
  route('*', 'pages/NotFound.tsx'),
] satisfies RouteConfig
