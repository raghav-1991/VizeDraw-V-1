import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useReducedMotion } from '../hooks/useReducedMotion'

/** One-shot reveals. Content remains readable if motion or observation is unavailable. */
export function Motion() {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || !('IntersectionObserver' in window)) return
    const selector = '.hero__copy h1, .hero__copy .lede, .hero__copy .actions, .hero__visual, .section-head, .workflow-story, .problem__grid, .spine__section, .split, .closing__panel, .marker, .lead-grid, .xform, .ind, .systems, .ent'
    const targets = [...document.querySelectorAll<HTMLElement>(`main :is(${selector})`)]
      .filter(el => !el.parentElement?.closest(selector))
    const animations = new Map<Element, Animation>()
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        el.classList.add('motion-entered')
        const delay = el.matches('.hero__copy .lede') ? 100 : el.matches('.hero__copy .actions') ? 180 : 0
        animations.set(el, el.animate([
          { opacity: 0, transform: 'translateY(28px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 750, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }))
        observer.unobserve(el)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })
    targets.forEach(el => observer.observe(el))
    const onFocus = (event: FocusEvent) => {
      animations.forEach((animation, el) => {
        if (event.target instanceof Node && el.contains(event.target)) animation.finish()
      })
    }
    document.addEventListener('focusin', onFocus)
    return () => {
      observer.disconnect()
      animations.forEach(animation => animation.cancel())
      targets.forEach(el => el.classList.remove('motion-entered'))
      document.removeEventListener('focusin', onFocus)
    }
  }, [pathname, reduced])
  return null
}
