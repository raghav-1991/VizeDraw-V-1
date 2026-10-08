import type { ReactNode } from 'react'
import { bodySections, firstOf, getPage, section } from '../content'
import { Figure, Hero, ItemList, Meta } from '../components/content'
import { Spine } from '../components/Spine'
import { AccessBoundary, MarkupDetail, RecordLedger, RevisionCompare, TitleBlockDetail } from '../components/illustrations'

interface Config {
  hero: ReactNode
  callouts: string[]
  visuals?: Record<string, ReactNode>
  /** A list section rendered as a feature grid above the spine. */
  featured?: string
}

const configs: Record<number, Config> = {
  5: {
    hero: <MarkupDetail />,
    callouts: ['A practical first test'],
    visuals: { 'Record the outcome': <Figure><RecordLedger /></Figure> },
  },
  6: {
    hero: <RevisionCompare />,
    callouts: ['Important limitation'],
    visuals: { 'Reassess earlier decisions': <Figure><MarkupDetail rev="B" /></Figure> },
  },
  7: {
    hero: <AccessBoundary />,
    callouts: ['Keep clarification and authority separate', 'Test the complete journey'],
  },
  8: {
    hero: <TitleBlockDetail />,
    callouts: ['Keep the boundary clear'],
    featured: 'Prepare the handoff',
  },
}

export default function UseCaseDetail({ id }: { id: 5 | 6 | 7 | 8 }) {
  const page = getPage(id)
  const config = configs[id]
  const featured = config.featured ? section(page, config.featured) : null
  const rest = bodySections(page, featured ? [featured.heading] : [])

  return (
    <>
      <Meta page={page} />
      <Hero
        page={page}
        crumbs={[{ label: 'Use Cases', to: '/use-cases' }, { label: page.name }]}
        visual={<Figure>{config.hero}</Figure>}
      />

      {featured && (
        <section className="band band--sunk" id={featured.id} aria-labelledby={`${featured.id}-h`}>
          <div className="container">
            <div className="section-head">
              <h2 id={`${featured.id}-h`}>{featured.heading}</h2>
            </div>
            <ItemList items={firstOf(featured, 'list').items} variant="grid" />
          </div>
        </section>
      )}

      <div className="band band--top-rule">
        <Spine sections={rest} callouts={config.callouts} visuals={config.visuals} />
      </div>
    </>
  )
}
