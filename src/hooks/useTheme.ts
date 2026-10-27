import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'tema'

function readSaved(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

const getSnapshot = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
// No prerender não há preferência conhecida; o cliente corrige logo após a hidratação.
const getServerSnapshot = (): Theme => 'light'

/** Avisa o React quando data-theme muda e segue o sistema enquanto não houver escolha salva. */
function subscribe(notify: () => void) {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const onSystemChange = (event: MediaQueryListEvent) => {
    if (!readSaved()) document.documentElement.dataset.theme = event.matches ? 'dark' : 'light'
  }
  media.addEventListener('change', onSystemChange)

  return () => {
    observer.disconnect()
    media.removeEventListener('change', onSystemChange)
  }
}

/**
 * Tema do site. O script do <head> (src/root.tsx) aplica o tema antes da pintura;
 * aqui lemos o estado atual e gravamos a escolha quando a pessoa alterna.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sem armazenamento (aba privada, bloqueio): o tema vale só nesta visita.
    }
  }, [])

  return { theme, toggle }
}
