import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { SkipLink } from './SkipLink'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  )
}
