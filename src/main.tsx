import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { RouteError } from '@/pages/RouteError'

// A home vem no bundle principal; as demais páginas são carregadas sob demanda.
const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    ErrorBoundary: RouteError,
    // Ao abrir direto uma página lazy (/curriculo, 404), nada é mostrado até o chunk chegar.
    HydrateFallback: () => null,
    children: [
      { index: true, Component: Home },
      { path: 'projetos/:slug', lazy: async () => ({ Component: (await import('@/pages/CaseStudy')).default }) },
      { path: 'curriculo', lazy: async () => ({ Component: (await import('@/pages/Curriculo')).default }) },
      { path: '*', lazy: async () => ({ Component: (await import('@/pages/NotFound')).default }) },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
