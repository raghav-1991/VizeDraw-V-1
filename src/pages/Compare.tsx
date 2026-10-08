import { firstOf, getPage, section } from '../content'
import { Actions } from '../components/Action'
import { DataTable, Figure, Hero, ItemList, Meta, Paragraphs } from '../components/content'
import { StackDiagram } from '../components/illustrations'

const page = getPage(17)

export default function Compare() {
  const roles = section(page, 'Role comparison')
  const value = section(page, 'When VizeDraw adds value')
  const questions = section(page, 'Questions to ask before integrating')
  const gap = section(page, 'Evaluate the gap not the category label')
  const table = firstOf(roles, 'table')
  const cta = firstOf(gap, 'cta')

  return (
    <>
      <Meta page={page} />
      <Hero
        page={page}
        crumbs={[{ label: 'Resources', to: '/resources' }, { label: page.name }]}
        variant="stacked"
      />

      <section className="band band--top-rule" id={roles.id} aria-labelledby={`${roles.id}-h`}>
        <div className="container">
          <div className="section-head">
            <h2 id={`${roles.id}-h`}>{roles.heading}</h2>
          </div>
          <DataTable head={table.head} rows={table.rows} caption={roles.heading} />
        </div>
      </section>

      <section className="band band--sunk" id={value.id} aria-labelledby={`${value.id}-h`}>
        <div className="container split">
          <div className="prose">
            <h2 id={`${value.id}-h`}>{value.heading}</h2>
            <Paragraphs section={value} lede />
          </div>
          <Figure>
            <StackDiagram />
          </Figure>
        </div>
      </section>

      <section className="band" id={questions.id} aria-labelledby={`${questions.id}-h`}>
        <div className="container split split--wide-right">
          <div className="split__aside">
            <h2 id={`${questions.id}-h`}>{questions.heading}</h2>
          </div>
          <ItemList items={firstOf(questions, 'list').items} variant="rows" />
        </div>
      </section>

      <section className="closing" id={gap.id} aria-labelledby={`${gap.id}-h`}>
        <div className="container">
          <div className="closing__panel">
            <div>
              <h2 id={`${gap.id}-h`}>{gap.heading}</h2>
              <Paragraphs section={gap} lede />
            </div>
            <Actions primary={cta.primary} secondary={cta.secondary} />
          </div>
        </div>
      </section>
    </>
  )
}
