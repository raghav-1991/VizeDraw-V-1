import { useState } from 'react'
import { blocksOf, firstOf, getPage, paragraphs, section } from '../content'
import type { Section } from '../content/types'
import { Action } from '../components/Action'
import { FieldText, Hero, ItemList, Meta } from '../components/content'
import { PRICING, estimate, fmtMoney, fmtNumber, fmtStorage, presets, type CalculatorInput, type Pack } from '../content/pricing'

const page = getPage(19)

function Plan({ s, variant }: { s: Section; variant?: 'pro' | 'enterprise' }) {
  const [price, period, desc] = paragraphs(s)
  const cta = firstOf(s, 'cta').primary
  return (
    <article className={`plan${variant ? ` plan--${variant}` : ''}`} id={s.id} aria-labelledby={`${s.id}-h`}>
      {variant === 'pro' && <span className="plan__tag">Recommended</span>}
      <h2 id={`${s.id}-h`} className="plan__name">{s.heading}</h2>
      <p className="plan__desc">{desc}</p>
      <p className="plan__price">
        <FieldText text={price} />
        <span className="plan__period">{period}</span>
      </p>
      <ul className="plan__features">
        {firstOf(s, 'list').items.map((item) => (
          <li key={item.text}><FieldText text={item.text} /></li>
        ))}
      </ul>
      <Action cta={cta} variant={variant === 'enterprise' ? 'secondary' : 'primary'} className="plan__cta" newTab />
    </article>
  )
}

/* ---------- Calculator ---------- */

type Draft = Record<keyof CalculatorInput, string>

const toDraft = (v: CalculatorInput): Draft => ({
  team: String(v.team),
  control: String(v.control),
  pro: String(v.pro),
  storageTB: String(v.storageTB),
  aiCredits: String(v.aiCredits),
})

const fields: { key: keyof CalculatorInput; label: string; hint: string; min: number; max: number; step?: number; wide?: boolean }[] = [
  { key: 'team', label: 'Total team members', hint: 'Everyone who is not paid remains a free reviewer.', min: 1, max: 100000 },
  { key: 'control', label: 'Control users', hint: 'Users who control workflow without Pro AI.', min: 0, max: 100000 },
  { key: 'pro', label: 'Pro users', hint: 'Workflow owners who also need included AI.', min: 0, max: 100000 },
  { key: 'storageTB', label: 'Shared storage required (TB)', hint: 'Total project data required across the team.', min: 0, max: 10000, step: 0.1 },
  {
    key: 'aiCredits',
    label: 'Expected AI credits used per year',
    hint: `Pro includes ${fmtNumber(PRICING.proIncludedAICredits)} credits per user/year. A simple Q&A can use ~1 credit; heavier revision or multi-sheet reviews can use more.`,
    min: 0,
    max: 1000000000,
    step: 100,
    wide: true,
  },
]

function Calculator({ s }: { s: Section }) {
  const [intro, help] = paragraphs(s)
  const [draft, setDraft] = useState<Draft>(() => toDraft(presets[1].values))
  const [preset, setPreset] = useState<string | null>(presets[1].id)

  const r = estimate({
    team: Number(draft.team),
    control: Number(draft.control),
    pro: Number(draft.pro),
    storageTB: Number(draft.storageTB),
    aiCredits: Number(draft.aiCredits),
  })

  const summary = [
    `${fmtNumber(r.reviewers)} people can collaborate as free reviewers.`,
    r.extraStorageTB > 0
      ? `Paid users include ${fmtStorage(r.includedStorageGB)} of pooled storage; the estimate adds ${fmtNumber(r.storage.capacity)} TB of additional capacity.`
      : 'The selected storage requirement is fully covered by paid-user storage allowances.',
    r.extraAI > 0
      ? `Pro users include ${fmtNumber(r.includedAI)} AI credits; the estimate adds ${fmtNumber(r.ai.capacity)} more credits.`
      : 'The selected AI usage is covered by the Pro allowance.',
  ].join(' ')

  return (
    <section className="band band--sunk" id={s.id} aria-labelledby={`${s.id}-h`}>
      <div className="container">
        <header className="pricing-head">
          <h2 id={`${s.id}-h`}>{s.heading}</h2>
          <p>{intro}</p>
        </header>

        <div className="calc">
          <form className="calc__panel calc__inputs" onSubmit={(e) => e.preventDefault()} aria-label="Plan your workspace">
            <h3 className="calc__title">Plan your workspace</h3>
            <p className="calc__help">{help}</p>

            <div className="calc__presets" role="group" aria-label="Presets">
              {presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`calc__preset${preset === p.id ? ' is-active' : ''}`}
                  aria-pressed={preset === p.id}
                  onClick={() => {
                    setDraft(toDraft(p.values))
                    setPreset(p.id)
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="form__grid">
              {fields.map((f) => (
                <div key={f.key} className={`field${f.wide ? ' calc__wide' : ''}`}>
                  <label htmlFor={`calc-${f.key}`}>{f.label}</label>
                  <input
                    id={`calc-${f.key}`}
                    type="number"
                    inputMode={f.step && f.step < 1 ? 'decimal' : 'numeric'}
                    min={f.min}
                    max={f.max}
                    step={f.step ?? 1}
                    value={draft[f.key]}
                    aria-describedby={`calc-${f.key}-hint`}
                    onChange={(e) => {
                      setDraft((d) => ({ ...d, [f.key]: e.target.value }))
                      setPreset(null)
                    }}
                  />
                  <p id={`calc-${f.key}-hint`} className="calc__hint">{f.hint}</p>
                </div>
              ))}
            </div>

            {r.overAllocated && (
              <p className="calc__warning" role="status">
                Control + Pro users exceed total team members. The estimate is still shown, but adjust the inputs for a realistic team plan.
              </p>
            )}
          </form>

          <aside className="calc__panel calc__result" aria-live="polite" aria-label="Estimate">
            <div className="calc__total">
              <span className="label">Estimated annual cost</span>
              <p className="calc__amount">{fmtMoney(r.annual)}</p>
              <p className="calc__monthly">{fmtMoney(r.monthly)}/month equivalent</p>

              <dl className="calc__stats">
                <div>
                  <dt>Free reviewers</dt>
                  <dd>{fmtNumber(r.reviewers)}</dd>
                </div>
                <div>
                  <dt>Cost / team member / month</dt>
                  <dd>${r.perMemberMonthly.toFixed(2)}</dd>
                </div>
              </dl>
            </div>

            <div className="calc__breakdown">
              <h3 className="label">Cost breakdown</h3>
              <dl className="calc__rows">
                <div><dt>Control licences</dt><dd>{fmtMoney(r.controlCost)}</dd></div>
                <div><dt>Pro licences</dt><dd>{fmtMoney(r.proCost)}</dd></div>
                <div><dt>Additional storage</dt><dd>{fmtMoney(r.storage.cost)}</dd></div>
                <div><dt>Additional AI</dt><dd>{fmtMoney(r.ai.cost)}</dd></div>
              </dl>

              <h3 className="label">Included capacity</h3>
              <dl className="calc__rows">
                <div><dt>Paid-user storage included</dt><dd>{fmtStorage(r.includedStorageGB)}</dd></div>
                <div><dt>Storage add-on selected</dt><dd>{r.storage.capacity > 0 ? `${r.storage.summary} TB` : 'None'}</dd></div>
                <div><dt>Pro AI credits included</dt><dd>{fmtNumber(r.includedAI)}</dd></div>
                <div><dt>Additional AI pack</dt><dd>{r.ai.capacity > 0 ? `${r.ai.summary} credits` : 'None'}</dd></div>
              </dl>

              <p className="calc__summary">{summary}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

/* ---------- Add-ons and entitlements ---------- */

function PackTable({ title, packs, unit, quote }: { title: string; packs: Pack[]; unit: (p: Pack) => string; quote: string }) {
  const i = quote.indexOf(':')
  const [label, value] = [quote.slice(0, i), quote.slice(i + 1).trim()]
  return (
    <article className="addon">
      <h3 className="addon__title">{title}</h3>
      <table className="addon__table">
        <tbody>
          {[...packs].sort((a, b) => a.size - b.size).map((p) => (
            <tr key={p.size}>
              <th scope="row">{unit(p)}</th>
              <td>{fmtMoney(p.price)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">{label}</th>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}

const cellClass = (v: string) => (v === '✓' ? 'is-yes' : v === '—' ? 'is-no' : v === 'PAYG' ? 'is-payg' : 'is-note')

export default function Pricing() {
  const highlights = firstOf(section(page, 'Highlights'), 'list').items
  const rule = section(page, 'Commercial rule')
  const addons = section(page, 'Usage add-ons')
  const [storageQuote, aiQuote] = blocksOf(addons, 'kv')
  const [addonsIntro, addonsNote] = paragraphs(addons)
  const ent = section(page, 'Feature entitlements')
  const matrix = firstOf(ent, 'table')
  const before = section(page, 'Before you choose')

  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: page.name }]} variant="stacked">
        <ul className="pricing-pills">
          {highlights.map((h) => <li key={h.text}>{h.text}</li>)}
        </ul>
      </Hero>

      <section className="band band--top-rule" id="plans" aria-label={page.name}>
        <div className="container">
          <div className="plans">
            <Plan s={section(page, 'Review')} />
            <Plan s={section(page, 'Control')} />
            <Plan s={section(page, 'Pro')} variant="pro" />
            <Plan s={section(page, 'Enterprise')} variant="enterprise" />
          </div>

          <p className="pricing-rule" id={rule.id}>
            <strong>{rule.heading}:</strong> {paragraphs(rule)[0]}
          </p>
        </div>
      </section>

      <Calculator s={section(page, 'Team pricing calculator')} />

      <section className="band" id={addons.id} aria-labelledby={`${addons.id}-h`}>
        <div className="container">
          <header className="pricing-head">
            <h2 id={`${addons.id}-h`}>{addons.heading}</h2>
            <p>{addonsIntro}</p>
          </header>
          <div className="addons">
            <PackTable title={storageQuote.key} packs={PRICING.storagePacks} unit={(p) => `+${fmtNumber(p.size)} TB / year`} quote={storageQuote.value} />
            <PackTable title={aiQuote.key} packs={PRICING.aiPacks} unit={(p) => `${fmtNumber(p.size)} credits`} quote={aiQuote.value} />
          </div>
          <p className="pricing-note">{addonsNote}</p>
        </div>
      </section>

      <section className="band band--top-rule" id={ent.id} aria-labelledby={`${ent.id}-h`}>
        <div className="container">
          <header className="pricing-head">
            <h2 id={`${ent.id}-h`}>{ent.heading}</h2>
            <p>{paragraphs(ent)[0]}</p>
          </header>
          <div className="entitlements-wrap">
            <table className="entitlements">
              <caption className="visually-hidden">{ent.heading}</caption>
              <thead>
                <tr>
                  {matrix.head.map((h) => <th key={h} scope="col">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {matrix.rows.map(([cap, ...cells]) => (
                  <tr key={cap}>
                    <th scope="row">{cap}</th>
                    {cells.map((c, i) => (
                      <td key={i} data-label={matrix.head[i + 1]} className={cellClass(c)}>
                        {c === '✓' ? <><span aria-hidden="true">✓</span><span className="visually-hidden">Included</span></>
                          : c === '—' ? <><span aria-hidden="true">—</span><span className="visually-hidden">Not included</span></>
                          : c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="band band--sunk" id={before.id} aria-labelledby={`${before.id}-h`}>
        <div className="container split split--wide-right">
          <div className="split__aside">
            <h2 id={`${before.id}-h`}>{before.heading}</h2>
          </div>
          <ItemList items={firstOf(before, 'list').items} variant="rows" />
        </div>
      </section>
    </>
  )
}
