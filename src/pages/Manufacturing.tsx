import { firstOf, getPage, paragraphs, section, slug } from '../content'
import { Actions } from '../components/Action'
import { Figure, Hero, Meta, Paragraphs } from '../components/content'
import { HandoffMap } from '../components/illustrations'

const page = getPage(3)
const sentences = (text: string) => text.match(/[^.]+\./g)?.map((s) => s.trim()) ?? [text]

export default function Manufacturing() {
  const handoff = section(page, 'The handoff needs more than an attachment')
  const fits = section(page, 'Where VizeDraw fits')
  const roles = section(page, 'One drawing different responsibilities')
  const first = section(page, 'Choose the first workflow carefully')
  const [rolesText, ...rolesMore] = paragraphs(roles)
  const firstCta = firstOf(first, 'cta')

  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: page.name }]} variant="stacked">
        <Figure className="figure--wide">
          <HandoffMap />
        </Figure>
      </Hero>

      <section className="band band--top-rule" id={handoff.id} aria-labelledby={`${handoff.id}-h`}>
        <div className="container split">
          <h2 id={`${handoff.id}-h`}>{handoff.heading}</h2>
          <div className="prose">
            <Paragraphs section={handoff} lede />
          </div>
        </div>
      </section>

      <section className="band band--sunk" id={fits.id} aria-labelledby={`${fits.id}-h`}>
        <div className="container">
          <div className="section-head">
            <h2 id={`${fits.id}-h`}>{fits.heading}</h2>
          </div>
          <ol className="sector-table">
            {firstOf(fits, 'list').items.map((item) => (
              <li key={item.term} id={slug(item.term ?? '')}>
                <h3>{item.term}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band--night" id={roles.id} aria-labelledby={`${roles.id}-h`}>
        <div className="container split">
          <div>
            <h2 id={`${roles.id}-h`}>{roles.heading}</h2>
          </div>
          <div>
            <ol className="roles">
              {sentences(rolesText).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
            {rolesMore.map((text) => <p key={text} className="roles__boundary">{text}</p>)}
          </div>
        </div>
      </section>

      <section className="closing" id={first.id} aria-labelledby={`${first.id}-h`}>
        <div className="container">
          <div className="closing__panel">
            <div>
              <h2 id={`${first.id}-h`}>{first.heading}</h2>
              <Paragraphs section={first} lede />
            </div>
            <Actions primary={firstCta.primary} secondary={firstCta.secondary} />
          </div>
        </div>
      </section>
    </>
  )
}
