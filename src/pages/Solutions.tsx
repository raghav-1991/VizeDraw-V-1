import { Action } from '../components/Action'
import { Breadcrumbs, Meta } from '../components/content'
import { IndustryScenario } from '../components/studio/Industries'
import { industries } from '../content/solutions'

const cta = {
  primary: { label: 'Start Free', to: '{{app.signup_url}}' },
  secondary: { label: 'Request Demo', to: '/contact#demo' },
}

export default function Solutions() {
  return (
    <>
      <Meta page={{ title: 'Solutions — Construction, Engineering, Manufacturing, Fabrication | VizeDraw', description: 'How VizeDraw fits construction, engineering, manufacturing and fabrication drawing workflows.' }} />

      <section className="hero hero--split hero--has-visual">
        <div className="container hero__grid">
          <div className="hero__copy">
            <Breadcrumbs trail={[{ label: 'Solutions' }]} />
            <h1>One drawing workspace. <em>Four ways of working.</em></h1>
            <div className="actions">
              <Action cta={cta.primary} variant="primary" />
              <Action cta={cta.secondary} variant="secondary" />
            </div>
          </div>
          <nav className="hero__visual sol-index" aria-label="Solutions">
            <ol>
              {industries.map((ind) => (
                <li key={ind.id}>
                  <a href={`#${ind.id}`}>
                    <span className="sol-index__name">{ind.name}</span>
                    <span className="sol-index__sheet">{ind.sheet}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      <section className="sheet-section">
        <div className="container industries">
          {industries.map((ind) => (
            <IndustryScenario key={ind.id} industry={ind} headingLevel={2} />
          ))}
        </div>
      </section>

      <section className="closing" aria-labelledby="sol-closing">
        <div className="container closing__stage">
          <div className="closing__panel glass">
            <h2 id="sol-closing">See your own drawing set in VizeDraw.</h2>
            <div className="actions">
              <Action cta={cta.primary} variant="primary" />
              <Action cta={cta.secondary} variant="secondary" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
