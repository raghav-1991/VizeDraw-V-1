import { bodySections, getPage } from '../content'
import { Figure, Hero, Meta } from '../components/content'
import { Spine } from '../components/Spine'
import { MarkupDetail, RecordLedger, RevisionCompare, SheetSet } from '../components/illustrations'

const page = getPage(2)

export default function Product() {
  return (
    <>
      <Meta page={page} />
      <Hero
        page={page}
        crumbs={[{ label: page.name }]}
        visual={
          <Figure>
            <SheetSet />
          </Figure>
        }
      />
      <div className="band band--top-rule">
        <Spine
          sections={bodySections(page)}
          callouts={['Product boundaries']}
          visuals={{
            'Review in context': <Figure><MarkupDetail /></Figure>,
            'Compare the relevant revisions': <Figure><RevisionCompare /></Figure>,
            'Return to a usable record': <Figure><RecordLedger /></Figure>,
          }}
        />
      </div>
    </>
  )
}
