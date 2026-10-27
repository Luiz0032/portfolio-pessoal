import type { Ref } from 'react'
import { Link, NavLink } from 'react-router'
import type { NavItem } from './navItems'

type Props = {
  item: NavItem
  className: string
  onClick?: () => void
  ref?: Ref<HTMLAnchorElement>
}

/**
 * Rotas próprias (/curriculo) usam NavLink e ganham aria-current.
 * Âncoras da home (/#projetos) usam Link: senão todas ficariam "atuais" na home.
 */
export function NavItemLink({ item, className, onClick, ref }: Props) {
  const Component = typeof item.to === 'string' ? NavLink : Link
  return (
    <Component ref={ref} to={item.to} onClick={onClick} className={className}>
      {item.label}
    </Component>
  )
}
