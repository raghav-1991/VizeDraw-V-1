import { bodySections, firstOf, getPage, section } from '../content'
import { Actions } from '../components/Action'
import { Figure, Hero, Meta, Paragraphs } from '../components/content'
import { ReviewWorkspace } from '../components/illustrations'

const page = getPage(9)

export default function Features() {
  const availability = section(page, 'Feature availability')
  const features = bodySections(page, [availability.heading])
  const cta = firstOf(availability, 'cta')

  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: page.name }]} variant="stacked">
        <Figure className="figure--wide">
          <ReviewWorkspace />
        </Figure>
      </Hero>

      <div className="band band--top-rule">
        <div className="container">
          <div>
            <ol className="spec-grid">
              {features.map((f) => (
                <li key={f.id} id={f.id} className="spec">
                  <h2 className="spec__title">{f.heading}</h2>
                  <Paragraphs section={f} />
                </li>
              ))}
            </ol>
            <section id={availability.id} className="note-panel" aria-labelledby={`${availability.id}-h`}>
              <h2 id={`${availability.id}-h`}>{availability.heading}</h2>
              <Paragraphs section={availability} />
              <Actions primary={cta.primary} secondary={cta.secondary} />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
