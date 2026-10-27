import { useCallback, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { profile } from '@/data/profile'
import { t } from '@/i18n'
import { CloseIcon, MenuIcon } from '@/components/ui/Icons'
import { MobileMenu } from './MobileMenu'
import { NavItemLink } from './NavItemLink'
import { ThemeToggle } from './ThemeToggle'
import { navItems } from './navItems'

const MENU_ID = 'menu-mobile'

export function Header() {
  // O menu fica aberto só na navegação em que foi aberto: qualquer mudança de página
  // (link fora do menu, voltar do navegador) o fecha sem precisar de efeito.
  const location = useLocation()
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === location.key
  const menuButton = useRef<HTMLButtonElement>(null)

  const close = useCallback((returnFocus: boolean) => {
    setOpenAt(null)
    if (returnFocus) menuButton.current?.focus()
  }, [])

  return (
    <header className="sticky top-0 z-40 print:hidden border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-bold tracking-tight" onClick={() => close(false)}>
          {profile.shortName}
        </Link>

        <nav aria-label={t.nav.label} className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavItemLink
                  item={item}
                  className="transition-colors hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-ink"
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpenAt(open ? null : location.key)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <MobileMenu id={MENU_ID} open={open} onClose={close} />
    </header>
  )
}
