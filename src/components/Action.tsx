import { Link } from 'react-router'
import type { Cta } from '../content/types'
import { destinationFor, fieldKey, isField } from '../content/commercial'
import { useDialogs } from './dialogs'

type Variant = 'primary' | 'secondary' | 'text' | 'plain'

interface ActionProps {
  cta: Cta
  variant?: Variant
  className?: string
  onNavigate?: () => void
  /** Open in a new tab. Application links (sign in / sign up) always do. */
  newTab?: boolean
}

const Arrow = () => (
  <svg className="btn__arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)

/**
 * A call to action from the content document. Internal routes navigate in the
 * app; {{field}} destinations use the configured URL, or explain that the
 * destination is not configured in this environment.
 */
const NEW_TAB = { target: '_blank', rel: 'noopener noreferrer' }

export function Action({ cta, variant = 'primary', className = '', onNavigate, newTab = false }: ActionProps) {
  const { openDestination } = useDialogs()
  const cls = variant === 'plain' ? className : `btn btn--${variant} ${className}`.trim()

  if (isField(cta.to)) {
    const key = fieldKey(cta.to)
    const href = destinationFor(key)
    if (href) {
      return (
        <a href={href} className={cls} onClick={onNavigate} {...(newTab || key.startsWith('app.') ? NEW_TAB : {})}>
          {cta.label}
        </a>
      )
    }
    return (
      // The trigger stays mounted (onNavigate not called) so focus can return to it.
      <button type="button" className={cls} aria-haspopup="dialog" onClick={() => openDestination(cta.label, key)}>
        {cta.label}
      </button>
    )
  }

  return (
    <Link to={cta.to} className={cls} onClick={onNavigate} {...(newTab ? NEW_TAB : {})}>
      {cta.label}
      {variant !== 'plain' && <Arrow />}
    </Link>
  )
}

export function Actions({ primary, secondary, className = '' }: { primary: Cta; secondary?: Cta; className?: string }) {
  return (
    <div className={`actions ${className}`.trim()}>
      <Action cta={primary} variant="primary" />
      {secondary && <Action cta={secondary} variant="secondary" />}
    </div>
  )
}
