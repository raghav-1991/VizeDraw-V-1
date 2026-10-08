import type { ReactNode } from 'react'
import { bodySections, firstOf, getPage, paragraphs, section, splitNumbered } from '../content'
import { Actions } from '../components/Action'
import { Blocks, Figure, Hero, Meta } from '../components/content'
import { MarkupDetail, RevisionCompare, TitleBlockDetail } from '../components/illustrations'

const page = getPage(18)

function labelled(text: string) {
  const i = text.indexOf(':')
  return i > 0 ? { k: text.slice(0, i), v: text.slice(i + 1).trim() } : null
}

export default function Example() {
  const start = section(page, 'The starting point')
  const steps = bodySections(page, [start.heading])
  const last = steps[steps.length - 1]
  const cta = firstOf(last, 'cta')
  const [disclaimer] = paragraphs(page.sections[0]).slice(1)

  const visuals: Record<string, ReactNode> = {
    '1 Preserve the source': <Figure><MarkupDetail /></Figure>,
    '4 Reassess the revised drawing': <Figure><RevisionCompare /></Figure>,
    "6 Test the next person's understanding": <Figure><TitleBlockDetail /></Figure>,
  }

  return (
    <>
      <Meta page={page} />
      <Hero
        page={{ ...page, sections: [{ ...page.sections[0], blocks: page.sections[0].blocks.filter((b) => b.type !== 'p' || b.text !== disclaimer) }] }}
        crumbs={[{ label: 'Resources', to: '/resources' }, { label: page.name }]}
        variant="stacked"
      >
        <p className="disclaimer" role="note">{disclaimer}</p>
      </Hero>

      <section className="band band--top-rule" id={start.id} aria-labelledby={`${start.id}-h`}>
        <div className="container split">
          <h2 id={`${start.id}-h`}>{start.heading}</h2>
          <p className="lede">{paragraphs(start)[0]}</p>
        </div>
      </section>

      <div className="band band--sunk">
        <ol className="container timeline">
          {steps.map((s) => {
            const { num, title } = splitNumbered(s.heading)
            const fields = s.blocks.every((b) => b.type === 'p' && labelled(b.text))
              ? paragraphs(s).map((t) => labelled(t)!)
              : null
            return (
              <li key={s.id} id={s.id} className={`timeline__step${visuals[s.heading] ? ' timeline__step--visual' : ''}`}>
                <span className="timeline__num" aria-hidden="true">{num}</span>
                <div className="timeline__body">
                  <h2>
                    <span className="visually-hidden">{num} </span>
                    {title}
                  </h2>
                  {fields ? (
                    <dl className="record-card">
                      {fields.map((f) => (
                        <div key={f.k}>
                          <dt>{f.k}</dt>
                          <dd>{f.k === 'Status' ? <span className="status-chip">{f.v}</span> : f.v}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <Blocks blocks={s.blocks} list="rows" hideCta />
                  )}
                </div>
                {visuals[s.heading] && <div className="timeline__visual">{visuals[s.heading]}</div>}
              </li>
            )
          })}
        </ol>
      </div>

      <section className="closing" aria-label={page.name}>
        <div className="container">
          <div className="closing__panel closing__panel--compact">
            <Actions primary={cta.primary} secondary={cta.secondary} />
          </div>
        </div>
      </section>
    </>
  )
}
