import { useEffect, useId, useRef, type ReactNode } from 'react'
import { uiCopy } from '../content/ui'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  eyebrow?: ReactNode
  children: ReactNode
  wide?: boolean
}

/**
 * Modal built on the native <dialog> element: showModal() provides the focus
 * trap, inert background and Escape handling. Focus returns to the element
 * that was focused when the dialog opened.
 */
export function Dialog({ open, onClose, title, eyebrow, children, wide }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const returnTo = useRef<HTMLElement | null>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      returnTo.current = document.activeElement as HTMLElement | null
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  function handleClose() {
    onClose()
    const target = returnTo.current
    returnTo.current = null
    if (target && document.contains(target)) target.focus()
  }

  return (
    <dialog
      ref={ref}
      className={`dialog${wide ? ' dialog--wide' : ''}`}
      aria-labelledby={titleId}
      onClose={handleClose}
      onClick={(event) => {
        // Clicking the backdrop (the dialog element itself) closes it.
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div className="dialog__inner">
        <header className="dialog__head">
          <div>
            {eyebrow && <span className="label">{eyebrow}</span>}
            <h2 id={titleId}>{title}</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label={uiCopy.close}
            onClick={() => ref.current?.close()}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" fill="none" />
            </svg>
          </button>
        </header>
        <div className="dialog__body">{children}</div>
      </div>
    </dialog>
  )
}
