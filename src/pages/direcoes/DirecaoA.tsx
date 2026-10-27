import type { CSSProperties } from 'react'
import './direcao-a.css'
import { usePreviewTheme } from './usePreviewTheme'

type Step = { title: string; detail: string; x: number; y: number; key?: boolean }

// Ciclo do app de Gestão de Pré-Contratos, em "serpentina": 3 etapas por linha.
const steps: Step[] = [
  { title: 'Cadastro por CNPJ', detail: 'dados via API CNPJa', x: 10, y: 30 },
  { title: 'Minuta em Word', detail: 'modelo e cláusulas', x: 235, y: 30 },
  { title: 'Prévia em PDF', detail: 'antes de enviar', x: 460, y: 30 },
  { title: 'Revisão jurídica', detail: 'aprova ou devolve', x: 460, y: 200, key: true },
  { title: 'Aviso no Teams', detail: 'canal da obra', x: 235, y: 200 },
  { title: 'Histórico', detail: 'cada etapa registrada', x: 10, y: 200 },
]

const edges = ['M200 60 H229', 'M425 60 H454', 'M555 90 V194', 'M460 230 H431', 'M235 230 H206']

const swatches = [
  ['Fundo', '#f4f6f7'],
  ['Tinta', '#15222c'],
  ['Texto secundário', '#52616c'],
  ['Linhas', '#d3dbe0'],
  ['Acento', '#0a6b66'],
  ['Acento no escuro', '#5cc2b8'],
]

const vars = (i: number) => ({ '--i': i }) as CSSProperties

export function DirecaoA() {
  const { theme, toggle } = usePreviewTheme()

  return (
    <div className="dir-a" data-theme={theme}>
      <div className="wrap">
        <header className="top">
          <a className="brand" href="#inicio">Luiz Fernando Vogel</a>
          <nav className="nav" aria-label="Principal">
            <a href="#projetos">Projetos</a>
            <a href="#sobre">Sobre</a>
            <a href="#habilidades">Habilidades</a>
            <a href="#contato">Contato</a>
          </nav>
          <button type="button" className="theme-btn" onClick={toggle} aria-pressed={theme === 'dark'}>
            {theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
          </button>
        </header>

        <main id="inicio">
          <section className="hero">
            <div>
              <h1>Luiz Fernando Streme Vogel</h1>
              <p className="role">Desenvolvedor full-stack júnior, com foco em automação e Power Platform</p>
              <p className="lede">
                Desenvolvo aplicações web com React, TypeScript e Node.js e digitalizo processos de negócio com
                Power Apps e Power Automate, do formulário ao documento final.
              </p>
              <div className="actions">
                <a className="btn btn-primary" href="#projetos">Ver projetos</a>
                <a className="btn btn-ghost" href="#contato">Falar comigo</a>
              </div>
              <div className="social">
                <a href="https://github.com/Luiz0032">GitHub</a>
                <a href="https://www.linkedin.com/in/luiz-fernando-streme-vogel-aaa363226/">LinkedIn</a>
              </div>
            </div>

            <figure className="flow">
              <svg
                viewBox="0 0 660 290"
                role="img"
                aria-label="Fluxo do app de pré-contratos: cadastro por CNPJ, minuta em Word, prévia em PDF, revisão jurídica com ajustes e reenvio, aviso no Teams e histórico."
              >
                <defs>
                  <marker id="a-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path className="arrow" d="M0 0 L10 5 L0 10 z" />
                  </marker>
                  <marker id="a-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path className="arrow accent" d="M0 0 L10 5 L0 10 z" />
                  </marker>
                </defs>

                {edges.map((d, i) => (
                  <path key={d} className="edge" d={d} markerEnd="url(#a-arrow)" style={vars(i)} />
                ))}
                <path className="edge loop" d="M500 200 C500 150 330 150 330 96" markerEnd="url(#a-arrow-accent)" />
                <text className="loop-label" x="415" y="176" textAnchor="middle">ajustes e reenvio</text>

                {steps.map((s, i) => (
                  <g key={s.title} className={s.key ? 'node key' : 'node'} style={vars(i)}>
                    <rect x={s.x} y={s.y} width="190" height="60" rx="8" />
                    <text className="t" x={s.x + 14} y={s.y + 26}>{s.title}</text>
                    <text className="s" x={s.x + 14} y={s.y + 45}>{s.detail}</text>
                  </g>
                ))}
              </svg>

              <ol className="flow-list">
                {steps.map((s) => (
                  <li key={s.title}>
                    {s.title}
                    <span>{s.detail}</span>
                  </li>
                ))}
              </ol>

              <figcaption>
                Ciclo de pré-contratos que digitalizei para uma empresa do setor de engenharia.{' '}
                <a href="#projetos">Ler o estudo de caso</a>
              </figcaption>
            </figure>
          </section>

          <section className="section" id="projetos">
            <h2>Projetos em destaque</h2>
            <article className="project">
              <div className="shot">TODO: print da tela inicial do app (dados fictícios)</div>
              <div>
                <h3>Gestão de Pré-Contratos</h3>
                <p>
                  App corporativo que leva o pré-contrato de fornecedores do cadastro por CNPJ até a revisão jurídica,
                  com minuta gerada do modelo da empresa e histórico de cada etapa.
                </p>
                <dl className="facts">
                  <div><dt>Telas</dt><dd>9</dd></div>
                  <div><dt>Fluxos Power Automate</dt><dd>6</dd></div>
                  <div><dt>Componentes</dt><dd>3</dd></div>
                  <div><dt>Listas SharePoint</dt><dd>5</dd></div>
                </dl>
                <ul className="stack" aria-label="Tecnologias">
                  <li>Power Apps</li><li>Power Automate</li><li>Dataverse</li><li>SharePoint</li><li>Word Online</li><li>Teams</li>
                </ul>
              </div>
            </article>
          </section>

          <section className="section" aria-labelledby="a-spec">
            <h2 id="a-spec">Paleta e fontes desta direção</h2>
            <p>Schibsted Grotesk em todo o site: uma família só, com pesos 400, 500, 600 e 700.</p>
            <div className="spec">
              {swatches.map(([name, hex]) => (
                <span key={hex} className="swatch"><i style={{ background: hex }} />{name} {hex}</span>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
