import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'tema'
const media = () => window.matchMedia('(prefers-color-scheme: dark)')

function readSaved(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

/**
 * Tema do site. O script inline do index.html já aplicou o tema antes da pintura;
 * aqui só lemos o estado atual, seguimos o sistema enquanto não houver escolha salva
 * e gravamos a escolha quando a pessoa alterna.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    const query = media()
    const onChange = (event: MediaQueryListEvent) => {
      if (readSaved()) return
      const next = event.matches ? 'dark' : 'light'
      apply(next)
      setTheme(next)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    apply(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sem armazenamento (aba privada, bloqueio): o tema vale só nesta visita.
    }
    setTheme(next)
  }, [theme])

  return { theme, toggle }
}
