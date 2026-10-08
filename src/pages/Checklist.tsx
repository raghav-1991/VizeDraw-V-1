import { useState } from 'react'
import { bodySections, firstOf, getPage, paragraphs, section, splitNumbered } from '../content'
import { uiCopy } from '../content/ui'
import { Actions } from '../components/Action'
import { Hero, Meta } from '../components/content'

const page = getPage(13)

// The three outcomes named in the "Readiness result" copy.
const OUTCOMES = ['ready for the defined next action', 'awaiting information or disposition', 'not ready']

export default function Checklist() {
  const result = section(page, 'Readiness result')
  const groups = bodySections(page, [result.heading])
  const resultText = paragraphs(result)[0]
  const cta = firstOf(result, 'cta')
  // Ticks live only in memory; nothing is stored.
  const [ticked, setTicked] = useState<Set<string>>(new Set())
  const [outcome, setOutcome] = useState('')

  const toggle = (key: string) =>
    setTicked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  return (
    <>
      <Meta page={page} />
      <Hero
        page={page}
        crumbs={[{ label: 'Resources', to: '/resources' }, { label: page.name }]}
        variant="stacked"
      >
        <div className="actions no-print">
          <button type="button" className="btn btn--secondary" onClick={() => window.print()}>
            {uiCopy.checklist.print}
          </button>
          <button
            type="button"
            className="btn btn--text"
            onClick={() => {
              setTicked(new Set())
              setOutcome('')
            }}
            disabled={ticked.size === 0 && !outcome}
          >
            {uiCopy.checklist.clear}
          </button>
        </div>
      </Hero>

      <div className="band band--top-rule">
        <div className="container checklist">
          {groups.map((g) => {
            const { num, title } = splitNumbered(g.heading)
            const items = firstOf(g, 'list').items
            return (
              <section key={g.id} id={g.id} className="checklist__group" aria-labelledby={`${g.id}-h`}>
                <div className="checklist__head">
                  <span className="checklist__num" aria-hidden="true">{num}</span>
                  <h2 id={`${g.id}-h`}>
                    <span className="visually-hidden">{num} </span>
                    {title}
                  </h2>
                </div>
                <ul className="checklist__items">
                  {items.map((item, i) => {
                    const key = `${g.id}-${i}`
                    return (
                      <li key={key}>
                        <label className="check">
                          <input type="checkbox" checked={ticked.has(key)} onChange={() => toggle(key)} />
                          <span className="check__box" aria-hidden="true" />
                          <span className="check__text">{item.text}</span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )
          })}

          <section id={result.id} className="checklist__result" aria-labelledby={`${result.id}-h`}>
            <h2 id={`${result.id}-h`}>{result.heading}</h2>
            <p className="lede">{resultText}</p>
            <fieldset className="outcomes no-print">
              <legend className="label">{uiCopy.checklist.outcomeLegend}</legend>
              {OUTCOMES.map((o, i) => (
                <label key={o} className={`outcome outcome--${i}`}>
                  <input type="radio" name="readiness" value={o} checked={outcome === o} onChange={() => setOutcome(o)} />
                  <span>{o}</span>
                </label>
              ))}
            </fieldset>
            <Actions primary={cta.primary} secondary={cta.secondary} />
          </section>
        </div>
      </div>
    </>
  )
}
