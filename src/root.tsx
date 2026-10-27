import type { ReactNode } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { AppShell } from '@/components/layout/AppShell'
import { RouteError } from '@/pages/RouteError'
import './index.css'
import fontLatin from '@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2?url'

// Pré-carrega a fonte do texto (subconjunto latino): evita a troca tardia que atrasa o LCP e desloca o layout.
export const links = () => [{ rel: 'preload', href: fontLatin, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }]

// Aplica o tema antes da pintura: escolha salva > preferência do sistema.
const themeScript = `(function(){var s=null;try{s=localStorage.getItem('tema')}catch(e){}var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=d?'dark':'light'})()`

export function Layout({ children }: { children: ReactNode }) {
  return (
    // data-theme é definido pelo script antes da hidratação, por isso a diferença é esperada.
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f4f6f7" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f1b22" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}

export function ErrorBoundary() {
  return (
    <AppShell>
      <RouteError />
    </AppShell>
  )
}
