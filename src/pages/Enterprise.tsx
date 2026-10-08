import { firstOf, getPage, section } from '../content'
import { Actions } from '../components/Action'
import { Faq, Hero, Meta, Paragraphs } from '../components/content'

const page = getPage(10)

export default function Enterprise() {
  const scope = section(page, 'Define the information scope')
  const controls = section(page, 'Review the controls that matter')
  const authority = section(page, 'Keep engineering authority explicit')
  const validate = section(page, 'Validate with a contained evaluation')
  const questions = section(page, 'Enterprise questions')
  const faq = firstOf(questions, 'faq')
  const cta = firstOf(questions, 'cta')

  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: page.name }]} variant="stacked" />

      <section className="band band--top-rule" id={scope.id} aria-labelledby={`${scope.id}-h`}>
        <div className="container split">
          <div>
            <h2 id={`${scope.id}-h`}>{scope.heading}</h2>
          </div>
          <Paragraphs section={scope} lede />
        </div>
      </section>

      <section className="band band--sunk" id={controls.id} aria-labelledby={`${controls.id}-h`}>
        <div className="container">
          <div className="section-head">
            <h2 id={`${controls.id}-h`}>{controls.heading}</h2>
          </div>
          <dl className="matrix">
            {firstOf(controls, 'list').items.map((item) => (
              <div key={item.term} className="matrix__row">
                <dt>{item.term}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="band" aria-label={`${authority.heading}; ${validate.heading}`}>
        <div className="container duo">
          <div id={authority.id} className="duo__item">
            <h2>{authority.heading}</h2>
            <Paragraphs section={authority} />
          </div>
          <div id={validate.id} className="duo__item">
            <h2>{validate.heading}</h2>
            <Paragraphs section={validate} />
          </div>
        </div>
      </section>

      <section className="band band--rule" id={questions.id} aria-labelledby={`${questions.id}-h`}>
        <div className="container split split--wide-right">
          <div className="split__aside">
            <h2 id={`${questions.id}-h`}>{questions.heading}</h2>
          </div>
          <div>
            <Faq items={faq.items} />
            <Actions primary={cta.primary} secondary={cta.secondary} className="actions--after" />
          </div>
        </div>
      </section>
    </>
  )
}
