import type { AnchorHTMLAttributes } from 'react'
import { t } from '@/i18n'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** Link para outro site: abre em nova aba e avisa leitores de tela. */
export function ExternalLink({ children, ...props }: Props) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> {t.externalLink}</span>
    </a>
  )
}
