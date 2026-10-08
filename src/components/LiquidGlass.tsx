import { useEffect } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Support for the Liquid Glass material (styles/glass.css):
//  - an SVG displacement filter that glass surfaces use to refract what is
//    behind them (Chromium only: it is the one engine that renders url()
//    filters in backdrop-filter, so it is enabled by detection, never by
//    @supports, which would pass in engines that then drop the blur);
//  - a shared light position (--mx / --my on :root) that the specular glint
//    on every glass surface follows, like iOS's highlights tracking motion.

export function LiquidGlass() {
  const reduced = useReducedMotion()

  useEffect(() => {
    const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands
    if (brands?.some((b) => b.brand === 'Chromium')) document.documentElement.classList.add('lg-refract')
    return () => document.documentElement.classList.remove('lg-refract')
  }, [])

  useEffect(() => {
    const root = document.documentElement.style
    if (reduced) {
      root.setProperty('--mx', '30%')
      root.setProperty('--my', '0px')
      return
    }
    let frame = 0
    let x = window.innerWidth * 0.3
    let y = 0
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        root.setProperty('--mx', `${x}px`)
        root.setProperty('--my', `${y}px`)
      })
    }
    root.setProperty('--mx', `${x}px`)
    root.setProperty('--my', `${y}px`)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduced])

  return (
    <svg className="lg-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {/* Soft, low-frequency displacement: bends the backdrop like thick glass. */}
        <filter id="lg-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="2" seed="11" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="3" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="46" xChannelSelector="R" yChannelSelector="G" result="bent" />
          <feGaussianBlur in="bent" stdDeviation="1.4" />
        </filter>
      </defs>
    </svg>
  )
}
