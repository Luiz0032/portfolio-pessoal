# Portfólio — Luiz Fernando Streme Vogel

Portfólio pessoal de desenvolvedor full-stack júnior, com foco em automação e Power Platform. Reúne os projetos em destaque, dois estudos de caso de apps Power Platform, habilidades e um currículo para impressão.

**Site:** https://luiz-vogel.vercel.app

## Stack

- React 19 + TypeScript, com React Router 8 em modo framework (pré-renderização estática, sem servidor)
- Vite 8 e Tailwind CSS v4 (tokens de design no `@theme` de `src/index.css`)
- Hospedagem na Vercel
- Qualidade: ESLint (typescript-eslint, react-hooks, jsx-a11y), axe-core, Lighthouse e Playwright (Edge)

Todas as páginas públicas são geradas como HTML no build, cada uma com title, description, Open Graph, JSON-LD e uma CSP própria (hashes dos scripts inline, sem `'unsafe-inline'`). Endereços inexistentes recebem uma página 404 com status 404.

## Como rodar

Requer Node.js 22.19 ou mais recente (o projeto usa Node 24).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/client
npm run preview    # serve o build como a Vercel (http://localhost:4173)
```

## Estrutura

```
src/
  data/          conteúdo: projetos, perfil, experiência, habilidades, mídia
  i18n/          textos de interface (pt-BR; preparado para outro idioma)
  components/    layout, home, estudo de caso e componentes de interface
  pages/         rotas: home, estudo de caso, currículo, 404
  seo/           meta tags e dados estruturados (JSON-LD)
  routes.ts      tabela de rotas
media/           originais de prints e vídeos (entrada do npm run images)
public/          arquivos estáticos e mídia gerada (img/, media/, og/)
scripts/         mídia, Open Graph, CSP, sitemap e testes
```

## Como adicionar um projeto

1. Acrescente um objeto em `src/data/projects.ts`. O tipo `Project` (em `src/data/types.ts`) documenta cada campo. A posição na lista define a ordem no site, e `tier` define a seção:
   - `powerPlatform`: cards grandes com números.
   - `featured`: "Projetos web", com print.
   - `other`: grade compacta.
2. Para um estudo de caso, preencha `caseStudy`. A página `/projetos/<slug>` entra sozinha no prerender, no sitemap e nos testes. O diagrama de arquitetura é opcional e fica em `src/components/case/diagrams/`.
3. Prints: salve o PNG em `media/shots/<slug>/<tela>.png` (16:10, de preferência 1600×1000), referencie como `image: '<slug>/<tela>'` e rode `npm run images`. Enquanto o arquivo não existe, o site mostra um placeholder com o nome esperado.

Não é preciso mexer em componentes.

## Mídia, ícones e Open Graph

| Comando | O que faz |
|---|---|
| `npm run images` | Converte `media/shots/` em AVIF e WebP (480 a 1600 px) e `media/videos/` em MP4 e WebM com pôster. Só reprocessa o que mudou (`-- --force` refaz tudo). |
| `npm run icons` | Gera os PNGs, o `apple-touch-icon` e o `site.webmanifest` a partir de `public/favicon.svg`. |
| `npm run og:data` | Atualiza `scripts/og/pages.json` com o conteúdo das imagens de Open Graph. O template `scripts/og/template.html` é renderizado em 1200×630 com o Playwright e salvo em `public/og/`. |

O domínio usado em canonical, Open Graph, JSON-LD e sitemap fica em `src/data/site.ts` e pode ser sobrescrito pela variável `VITE_SITE_URL`.

## Testes de qualidade

Rode `npm run build` antes. Os testes usam o build servido localmente, com os mesmos cabeçalhos do `vercel.json`, e o Microsoft Edge instalado na máquina.

| Comando | Verifica |
|---|---|
| `npm run lint` | ESLint sem erros nem avisos |
| `npm run typecheck` | Tipos do TypeScript, incluindo os gerados pelo React Router |
| `npm run test:seo` | title, description, canonical, sitemap, Open Graph, Twitter Card, JSON-LD, h1 único, idioma e CSP de cada página |
| `npm run test:a11y` | axe-core (WCAG 2.2 A e AA) em todas as rotas, nos temas claro e escuro, no celular e no desktop |
| `npm run test:keyboard` | navegação só com Tab, Enter, Esc e setas, com foco sempre visível |
| `npm run test:lighthouse` | Lighthouse mobile e desktop em todas as rotas (mínimo 90 em cada categoria) |

## Deploy

Cada push na Vercel gera um deploy; o `vercel.json` define o comando de build, a pasta de saída (`dist/client`) e os cabeçalhos de segurança e de cache.

## Conteúdo e privacidade

Os textos vêm do briefing do projeto e dos repositórios de cada app, sem métricas ou resultados inventados. Projetos corporativos não citam o cliente pelo nome, repositórios privados não têm link de código e os prints usam dados fictícios.
