import { utility } from '../content/site'
import { Action } from '../components/Action'
import { Figure } from '../components/content'
import { DrawingSheet } from '../components/illustrations'

export default function NotFound() {
  const [title, ...rest] = utility.notFound.copy.match(/[^.]+\./g)!.map((s) => s.trim())
  return (
    <>
      <title>{`${title.replace(/\.$/, '')} | VizeDraw`}</title>
      <meta name="robots" content="noindex" />
      <section className="hero hero--stacked not-found">
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1>{title}</h1>
            <p className="lede">{rest.join(' ')}</p>
            <div className="actions">
              <Action cta={utility.notFound.action} />
            </div>
          </div>
          <div className="hero__visual">
            <Figure>
              <DrawingSheet rev="A" viewBox="246 196 344 196" className="ds--detail ds--void" label="Illustrative title block with no drawing found" />
            </Figure>
          </div>
        </div>
      </section>
    </>
  )
}
