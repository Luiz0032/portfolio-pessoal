import { useEffect, useRef } from 'react'
import { t } from '@/i18n'
import { NavItemLink } from './NavItemLink'
import { navItems } from './navItems'

type Props = {
  id: string
  open: boolean
  onClose: (returnFocus: boolean) => void
}

/** Painel de navegação do celular (padrão disclosure): Esc fecha e devolve o foco ao botão. */
export function MobileMenu({ id, open, onClose }: Props) {
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    firstLink.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose(true)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <nav id={id} aria-label={t.nav.label} hidden={!open} className="border-t border-line bg-bg md:hidden">
      <ul className="container-page flex flex-col py-2">
        {navItems.map((item, index) => (
          <li key={item.label} className="border-b border-line last:border-b-0">
            <NavItemLink
              ref={index === 0 ? firstLink : undefined}
              item={item}
              onClick={() => onClose(false)}
              className="block py-3 text-lg font-medium aria-[current=page]:text-accent"
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
