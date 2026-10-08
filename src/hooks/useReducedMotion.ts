import { useSyncExternalStore } from 'react'

const preference = () => window.matchMedia('(prefers-reduced-motion: reduce)')
const subscribe = (update: () => void) => {
  const media = preference()
  media.addEventListener('change', update)
  return () => media.removeEventListener('change', update)
}

export const useReducedMotion = () => useSyncExternalStore(subscribe, () => preference().matches, () => true)
