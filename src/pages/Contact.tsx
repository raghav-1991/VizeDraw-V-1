import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router'
import { blocksOf, firstOf, getPage, paragraphs, section } from '../content'
import { uiCopy } from '../content/ui'
import { contactEmails, utility } from '../content/site'
import { legalDoc } from '../content/legal'
import { Actions } from '../components/Action'
import { Hero, Meta, Steps } from '../components/content'
import { contactEndpoint } from '../config'

const page = getPage(21)

interface FieldSpec {
  name: string
  label: string
  required: boolean
  optional: boolean
  options?: string[]
  kind: 'text' | 'email' | 'tel' | 'select' | 'textarea'
}

/** Build the form from the document's "Contact form" list (label*, options after ":"). */
function parseFields(): FieldSpec[] {
  const list = firstOf(section(page, 'Contact form'), 'list').items
  return list.map(({ text }) => {
    const [rawLabel, rawOptions] = text.split(/:\s(.+)/)
    const required = rawLabel.includes('*')
    let label = rawLabel.replace('*', '').trim()
    const optional = / optional$/.test(label)
    if (optional) label = label.replace(/ optional$/, '')
    const options = rawOptions?.split('|').map((o) => o.trim())
    const kind: FieldSpec['kind'] = options
      ? 'select'
      : /email/i.test(label)
        ? 'email'
        : /phone/i.test(label)
          ? 'tel'
          : label.endsWith('?')
            ? 'textarea'
            : 'text'
    const name = label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
    return { name, label, required, optional, options, kind }
  })
}

const FIELDS = parseFields()
const ENQUIRY = FIELDS.find((f) => f.label === 'Enquiry type')!
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Status = 'idle' | 'sending' | 'success' | 'error'
type Values = Record<string, string>

const empty = (): Values => Object.fromEntries(FIELDS.map((f) => [f.name, '']))

function validate(field: FieldSpec, value: string): string | null {
  if (field.required && !value.trim()) return utility.requiredField
  if (field.kind === 'email' && value.trim() && !EMAIL_RE.test(value.trim())) return utility.invalidEmail
  return null
}

export default function Contact() {
  const { hash } = useLocation()
  const formId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorCopy, setErrorCopy] = useState<'contact' | 'utility'>('contact')

  const formSection = section(page, 'Contact form')
  const [helpText, privacyLine] = blocksOf(formSection, 'kv').map((k) => k.value)
  const sendCta = firstOf(formSection, 'cta').primary
  const demoCover = section(page, 'What a demo should cover')
  const after = section(page, 'After submission')
  const [successMessage, contactError] = blocksOf(after, 'kv').map((k) => k.value)
  const afterCta = firstOf(after, 'cta')
  const [privacyBefore, privacyAfter] = privacyLine.split('Privacy Notice')
  const [thanksTitle, ...thanksRest] = utility.thankYou.copy.match(/[^.]+\./g)!.map((s) => s.trim())

  // /contact#demo and /contact#enterprise preselect the enquiry type
  // (adjusted during render when the hash changes, not in an effect).
  const [appliedHash, setAppliedHash] = useState<string | null>(null)
  if (appliedHash !== hash) {
    setAppliedHash(hash)
    const preset = hash === '#enterprise' ? 'Enterprise' : hash === '#demo' ? 'Workflow demo' : null
    if (preset) setValues((v) => ({ ...v, [ENQUIRY.name]: preset }))
  }

  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus()
  }, [status])

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) {
      const field = FIELDS.find((f) => f.name === name)!
      setErrors((e) => ({ ...e, [name]: validate(field, value) }))
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next = Object.fromEntries(FIELDS.map((f) => [f.name, validate(f, values[f.name])]))
    setErrors(next)
    const firstInvalid = FIELDS.find((f) => next[f.name])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus()
      return
    }
    void send()
  }

  async function send() {
    setStatus('sending')
    const payload = Object.fromEntries(FIELDS.map((f) => [f.label, values[f.name].trim()]))
    try {
      if (contactEndpoint) {
        const response = await fetch(contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) {
          setErrorCopy('contact')
          setStatus('error')
          return
        }
      } else if (import.meta.env.DEV) {
        // Local development without an endpoint: nothing is sent or stored.
        await new Promise((resolve) => window.setTimeout(resolve, 600))
      } else {
        setErrorCopy('contact')
        setStatus('error')
        return
      }
      setValues(empty())
      setErrors({})
      setStatus('success')
    } catch {
      // Network failure before the request reached the service.
      setErrorCopy('utility')
      setStatus('error')
    }
  }

  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: page.name }]} variant="stacked" />

      <div className="band band--top-rule">
        <div className="container contact">
          <div className="contact__aside">
            <dl className="contact__emails" aria-label="Email us">
              {contactEmails.map((c) => (
                <div key={c.email}>
                  <dt>{c.label}</dt>
                  <dd><a href={`mailto:${c.email}`}>{c.email}</a></dd>
                </div>
              ))}
            </dl>

            <section id={demoCover.id} className="contact__cover" aria-labelledby={`${demoCover.id}-h`}>
              <h2 id={`${demoCover.id}-h`}>{demoCover.heading}</h2>
              <Steps items={firstOf(demoCover, 'steps').items} compact />
              <p className="contact__sample">{paragraphs(demoCover)[0]}</p>
            </section>
          </div>

          <div id="enterprise" className="contact__form-anchor">
            <div id="demo" className="contact__form-wrap">

              {status === 'success' ? (
                <div className="form-result form-result--success" ref={statusRef} tabIndex={-1} role="status">
                  <h2>{thanksTitle}</h2>
                  <p>{thanksRest.join(' ')}</p>
                  <p className="form-result__message">{successMessage}</p>
                  <Actions primary={afterCta.primary} secondary={afterCta.secondary} />
                </div>
              ) : (
                <form id={formId} ref={formRef} className="form" noValidate onSubmit={onSubmit} aria-describedby={`${formId}-help`}>
                  {status === 'error' && (
                    <div className="form-alert" ref={statusRef} tabIndex={-1} role="alert">
                      <p>{errorCopy === 'contact' ? contactError : utility.submissionError}</p>
                    </div>
                  )}
                  <p id={`${formId}-help`} className="form__help">{helpText}</p>
                  <div className="form__grid">
                    {FIELDS.map((f) => {
                      const id = `${formId}-${f.name}`
                      const err = errors[f.name]
                      const describedBy = err ? `${id}-err` : undefined
                      const common = {
                        id,
                        name: f.name,
                        value: values[f.name],
                        required: f.required,
                        'aria-required': f.required || undefined,
                        'aria-invalid': err ? true : undefined,
                        'aria-describedby': describedBy,
                        onBlur: () => {
                          if (values[f.name] || errors[f.name] !== undefined) setErrors((e) => ({ ...e, [f.name]: validate(f, values[f.name]) }))
                        },
                      }
                      return (
                        <div key={f.name} className={`field field--${f.kind}${err ? ' has-error' : ''}`}>
                          <label htmlFor={id}>
                            {f.label}
                            {f.required && (
                              <>
                                <span aria-hidden="true" className="field__req">*</span>
                                <span className="visually-hidden"> ({uiCopy.form.required})</span>
                              </>
                            )}
                            {f.optional && <span className="field__opt">optional</span>}
                          </label>
                          {f.kind === 'select' ? (
                            <select {...common} onChange={(e) => set(f.name, e.target.value)}>
                              <option value="">{uiCopy.form.choose}</option>
                              {f.options!.map((o) => (
                                <option key={o} value={o}>{o}</option>
                              ))}
                            </select>
                          ) : f.kind === 'textarea' ? (
                            <textarea {...common} rows={5} onChange={(e) => set(f.name, e.target.value)} />
                          ) : (
                            <input
                              {...common}
                              type={f.kind}
                              autoComplete={f.kind === 'email' ? 'email' : f.kind === 'tel' ? 'tel' : f.label === 'Full name' ? 'name' : f.label === 'Company' ? 'organization' : 'off'}
                              onChange={(e) => set(f.name, e.target.value)}
                            />
                          )}
                          {err && (
                            <p id={`${id}-err`} className="field__error">{err}</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <p className="form__privacy">
                    {privacyBefore}
                    {/* New tab, so a half-completed form is not lost. */}
                    <Link to={legalDoc('privacy').route} target="_blank" rel="noopener noreferrer">
                      Privacy Notice
                    </Link>
                    {privacyAfter}
                  </p>
                  <button type="submit" className="btn btn--primary form__submit" disabled={status === 'sending'}>
                    {status === 'sending' ? uiCopy.form.sending : sendCta.label}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
