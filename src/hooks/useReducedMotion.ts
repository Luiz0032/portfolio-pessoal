import { useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'

function subscribe(notify: () => void) {
  const media = window.matchMedia(query)
  media.addEventListener('change', notify)
  return () => media.removeEventListener('change', notify)
}

/** No prerender assume movimento reduzido: o HTML inicial nunca traz vídeo tocando. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true,
  )
}
