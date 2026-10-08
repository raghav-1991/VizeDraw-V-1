import { createContext, useContext, useState, type ReactNode } from 'react'
import { Dialog } from './Dialog'
import { uiCopy } from '../content/ui'
import { legalFields, type LegalKey } from '../content/commercial'

type DialogState =
  | { kind: 'destination'; label: string; fieldKey: string }
  | { kind: 'legal'; which: LegalKey; label: string }
  | null

interface DialogApi {
  openDestination: (label: string, fieldKey: string) => void
  openLegal: (which: LegalKey, label: string) => void
}

const DialogContext = createContext<DialogApi | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useDialogs(): DialogApi {
  const api = useContext(DialogContext)
  if (!api) throw new Error('useDialogs must be used inside DialogProvider')
  return api
}

/**
 * Fallback dialogs for destinations that are not configured in this
 * environment (see src/config.ts). With configuration in place, links go
 * straight to their destination and these never open.
 */
export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DialogState>(null)
  const close = () => setState(null)
  const d = uiCopy.pendingDialog
  const l = uiCopy.legalDialog

  const api: DialogApi = {
    openDestination: (label, fieldKey) => setState({ kind: 'destination', label, fieldKey }),
    openLegal: (which, label) => setState({ kind: 'legal', which, label }),
  }

  return (
    <DialogContext.Provider value={api}>
      {children}

      <Dialog open={state?.kind === 'destination'} onClose={close} title={d.title}>
        {state?.kind === 'destination' && (
          <>
            <p>{d.body(state.label)}</p>
            <p>{d.unavailable}</p>
            <p className="dialog__key">
              <span className="label">{d.keyLabel}</span>
              <code>{state.fieldKey}</code>
            </p>
            <div className="dialog__actions">
              <button type="button" className="btn btn--primary" onClick={close}>{d.close}</button>
            </div>
          </>
        )}
      </Dialog>

      <Dialog open={state?.kind === 'legal'} onClose={close} title={state?.kind === 'legal' ? state.label : ''}>
        {state?.kind === 'legal' && (
          <>
            <p>{l.unavailable(state.label)}</p>
            <p className="dialog__key">
              <span className="label">{l.keyLabel}</span>
              <code>{legalFields[state.which]}</code>
            </p>
            <div className="dialog__actions">
              <button type="button" className="btn btn--primary" onClick={close}>{l.close}</button>
            </div>
          </>
        )}
      </Dialog>
    </DialogContext.Provider>
  )
}
