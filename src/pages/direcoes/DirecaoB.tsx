import './direcao-b.css'
import { usePreviewTheme } from './usePreviewTheme'

const swatches = [
  ['Fundo', '#edf0ea'],
  ['Tinta', '#1c2a22'],
  ['Texto secundário', '#56665c'],
  ['Linhas', '#c9d2ca'],
  ['Acento', '#3b47b5'],
  ['Acento no escuro', '#a3adf5'],
]

export function DirecaoB() {
  const { theme, toggle } = usePreviewTheme()

  return (
    <div className="dir-b" data-theme={theme}>
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
            <h1>
              <span>Luiz Fernando</span>
              <span>Streme Vogel</span>
            </h1>

            <div className="hero-body">
              <div>
                <p className="role">Desenvolvedor full-stack júnior, com foco em automação e Power Platform</p>
                <p className="lede">
                  Desenvolvo aplicações web com React, TypeScript e Node.js e digitalizo processos de negócio com
                  Power Apps e Power Automate. Uso Claude Code para planejar, implementar e revisar, e valido tudo antes
                  de publicar.
                </p>
                <div className="actions">
                  <a className="btn btn-primary" href="#projetos">Ver projetos</a>
                  <a className="btn btn-ghost" href="#contato">Falar comigo</a>
                </div>
              </div>

              <dl className="ficha">
                <div><dt>Base</dt><dd>Curitiba, PR</dd></div>
                <div><dt>Formação</dt><dd>Engenharia de Software na Estácio, conclusão prevista em nov/2027</dd></div>
                <div><dt>Também</dt><dd>Cofundador da VSTech, agência de sites e marketing digital</dd></div>
                <div>
                  <dt>Perfis</dt>
                  <dd>
                    <a href="https://github.com/Luiz0032">GitHub</a>,{' '}
                    <a href="https://www.linkedin.com/in/luiz-fernando-streme-vogel-aaa363226/">LinkedIn</a>
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="section" id="projetos">
            <h2>Projetos em destaque</h2>
            <article className="project">
              <div>
                <h3>Gestão de Pré-Contratos</h3>
                <p>
                  App que digitaliza o ciclo de pré-contratos de fornecedores de uma empresa do setor de engenharia:
                  cadastra o fornecedor pelo CNPJ, gera a minuta no modelo corporativo, envia para revisão jurídica e
                  avisa o canal da obra no Teams.
                </p>
                <p className="numbers">9 telas, 3 componentes, 6 fluxos no Power Automate, Dataverse e 5 listas no SharePoint.</p>
                <div className="links">
                  <a href="#projetos">Ler o estudo de caso</a>
                  <a href="https://github.com/Luiz0032/gestao-precontratos">Código no GitHub</a>
                </div>
              </div>
              <div className="shot">TODO: print da tela inicial do app (dados fictícios)</div>
            </article>
          </section>

          <section className="section" aria-labelledby="b-spec">
            <h2 id="b-spec">Paleta e fontes desta direção</h2>
            <p>Bricolage Grotesque nos títulos e na navegação; Source Serif 4 no texto corrido, pensado para leitura longa nos estudos de caso.</p>
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
