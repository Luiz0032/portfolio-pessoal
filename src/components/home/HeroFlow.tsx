import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { textLink } from '@/components/ui/styles'
import { t } from '@/i18n'

type Step = { title: string; detail: string; x: number; y: number; key?: boolean }

// Ciclo do app de Gestão de Pré-Contratos em "serpentina": três etapas por linha.
const steps: Step[] = [
  { title: 'Cadastro por CNPJ', detail: 'dados via API CNPJa', x: 10, y: 30 },
  { title: 'Minuta em Word', detail: 'modelo e cláusulas', x: 235, y: 30 },
  { title: 'Prévia em PDF', detail: 'antes de enviar', x: 460, y: 30 },
  { title: 'Revisão jurídica', detail: 'aprova ou devolve', x: 460, y: 200, key: true },
  { title: 'Aviso no Teams', detail: 'canal da obra', x: 235, y: 200 },
  { title: 'Histórico', detail: 'cada etapa registrada', x: 10, y: 200 },
]

const edges = ['M200 60 H229', 'M425 60 H454', 'M555 90 V194', 'M460 230 H431', 'M235 230 H206']

const order = (i: number) => ({ '--i': i }) as CSSProperties

const label =
  'Fluxo do app de pré-contratos: cadastro por CNPJ, minuta em Word, prévia em PDF, revisão jurídica (que pode devolver para ajustes e reenvio), aviso no Teams e histórico.'

export function HeroFlow() {
  return (
    <figure className="m-0 rounded-card border border-line bg-surface p-5 shadow-md md:p-6">
      <svg viewBox="0 0 660 290" role="img" aria-label={label} className="hidden h-auto w-full sm:block">
        <defs>
          <marker id="hero-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
          </marker>
          <marker id="hero-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
          </marker>
        </defs>

        {edges.map((d, i) => (
          <path key={d} d={d} className="flow-in fill-none stroke-muted" strokeWidth={1.5} markerEnd="url(#hero-arrow)" style={order(i + 0.5)} />
        ))}
        <path
          d="M500 200 C500 150 330 150 330 96"
          className="flow-in fill-none stroke-accent"
          strokeWidth={1.5}
          strokeDasharray="5 5"
          markerEnd="url(#hero-arrow-accent)"
          style={order(6.5)}
        />
        <text x="415" y="182" textAnchor="middle" className="flow-in fill-accent text-[12.5px] font-semibold" style={order(6.5)}>
          ajustes e reenvio
        </text>

        {steps.map((step, i) => (
          <g key={step.title} className="flow-in" style={order(i)}>
            <rect
              x={step.x}
              y={step.y}
              width="190"
              height="60"
              rx="8"
              className={step.key ? 'fill-accent-soft stroke-accent' : 'fill-bg stroke-line'}
            />
            <text x={step.x + 14} y={step.y + 26} className="fill-ink text-[15px] font-semibold">
              {step.title}
            </text>
            <text x={step.x + 14} y={step.y + 45} className="fill-muted text-[12.5px]">
              {step.detail}
            </text>
          </g>
        ))}
      </svg>

      {/* No celular o diagrama vira lista: o SVG ficaria pequeno demais para ler. */}
      <ol className="grid gap-3 pl-5 text-sm marker:text-muted sm:hidden">
        {steps.map((step) => (
          <li key={step.title}>
            <span className="font-semibold">{step.title}</span>
            <span className="block text-muted">{step.detail}</span>
          </li>
        ))}
      </ol>

      <figcaption className="mt-4 text-sm text-muted">
        {t.hero.flowCaption}{' '}
        <Link to="/projetos/gestao-precontratos" className={textLink}>
          {t.hero.flowLink}
        </Link>
      </figcaption>
    </figure>
  )
}
