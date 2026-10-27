import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import { EscolhaDirecao } from '@/pages/direcoes/EscolhaDirecao'
import { DirecaoA } from '@/pages/direcoes/DirecaoA'
import { DirecaoB } from '@/pages/direcoes/DirecaoB'

// Rotas temporárias da Fase 1: /direcao-a e /direcao-b saem depois da escolha.
const router = createBrowserRouter([
  { path: '/', element: <EscolhaDirecao /> },
  { path: '/direcao-a', element: <DirecaoA /> },
  { path: '/direcao-b', element: <DirecaoB /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
