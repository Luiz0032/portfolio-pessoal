import type { ReactNode } from 'react'

type Props = { label: string; className?: string; children: ReactNode }

/**
 * Área com rolagem horizontal (diagramas, tabelas largas). Recebe foco para rolar pelo teclado
 * (WCAG 2.1.1; regra scrollable-region-focusable do axe) e tem nome próprio como região.
 */
export function ScrollRegion({ label, className = '', children }: Props) {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- rolagem pelo teclado (ver acima)
    <div tabIndex={0} role="region" aria-label={label} className={`overflow-x-auto ${className}`}>
      {children}
    </div>
  )
}
