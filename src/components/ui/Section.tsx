import type { ReactNode } from 'react'

type Props = {
  id: string
  title: string
  intro?: string
  children: ReactNode
  /** Primeira seção depois do hero não leva a linha de topo. */
  first?: boolean
}

export function Section({ id, title, intro, children, first }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-page">
      <div className={first ? 'py-section' : 'border-t border-line py-section'}>
        <header className="mb-10 max-w-prose">
          <h2 id={`${id}-title`} className="text-2xl font-bold md:text-3xl">
            {title}
          </h2>
          {intro && <p className="mt-3 text-muted">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
