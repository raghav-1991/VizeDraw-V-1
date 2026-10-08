import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { uiCopy } from '../content/ui'
import { DialogProvider } from './dialogs'
import { FluidBackground } from './FluidBackground'
import { LiquidGlass } from './LiquidGlass'
import { Footer } from './Footer'
import { Header } from './Header'
import { Motion } from './Motion'

/**
 * On route change: scroll to the hash target if there is one, otherwise to the
 * top, and move focus to <main> so screen readers start at the new content.
 * Nothing intercepts normal scrolling.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    const isFirst = first.current
    first.current = false
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (target) {
          target.scrollIntoView({ block: 'start' })
          return
        }
      }
      if (!isFirst) {
        window.scrollTo(0, 0)
        document.getElementById('main')?.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}

export function Layout() {
  return (
    <DialogProvider>
      <FluidBackground />
      <LiquidGlass />
      <a className="skip-link" href="#main">{uiCopy.skip}</a>
      <Header />
      <ScrollManager />
      <Motion />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </DialogProvider>
  )
}
