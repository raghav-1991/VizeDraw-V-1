import { firstOf, getPage, section } from '../content'
import { Action } from '../components/Action'
import { Figure, Hero, Meta, Paragraphs } from '../components/content'
import { AccessBoundary, MarkupDetail, RevisionCompare, TitleBlockDetail } from '../components/illustrations'

const page = getPage(4)

const workflows = [
  { heading: 'Engineering drawing review', visual: <MarkupDetail /> },
  { heading: 'Drawing revision review', visual: <RevisionCompare /> },
  { heading: 'Supplier and customer review', visual: <AccessBoundary /> },
  { heading: 'Production and quality handoff', visual: <TitleBlockDetail /> },
]

export default function UseCases() {
  const evaluation = section(page, 'Use the smallest meaningful evaluation')
  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: page.name }]} variant="stacked" />

      <section className="band band--top-rule" aria-label={page.name}>
        <div className="container">
          <ol className="workflows">
            {workflows.map(({ heading, visual }) => {
              const s = section(page, heading)
              const cta = firstOf(s, 'cta')
              return (
                <li key={s.id} id={s.id} className="workflow">
                  <div className="workflow__copy">
                    <h2>{s.heading}</h2>
                    <Paragraphs section={s} />
                    <Action cta={cta.primary} variant="secondary" />
                  </div>
                  <div className="workflow__visual"><Figure>{visual}</Figure></div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="band band--sunk" id={evaluation.id} aria-labelledby={`${evaluation.id}-h`}>
        <div className="container split">
          <h2 id={`${evaluation.id}-h`}>{evaluation.heading}</h2>
          <Paragraphs section={evaluation} lede />
        </div>
      </section>
    </>
  )
}
