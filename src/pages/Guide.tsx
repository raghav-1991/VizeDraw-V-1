import { bodySections, getPage, section } from '../content'
import { Blocks, Hero, ItemList, Meta, SectionIndex } from '../components/content'

/** Article layout for the educational guides (pages 14, 15 and 16). */
export default function Guide({ id }: { id: 14 | 15 | 16 }) {
  const page = getPage(id)
  const sections = bodySections(page)
  const contrast = id === 16 ? [section(page, 'Where AI can help'), section(page, 'What AI cannot establish by itself')] : null
  const flow = contrast ? sections.filter((s) => !contrast.includes(s)) : sections

  return (
    <>
      <Meta page={page} />
      <Hero
        page={page}
        crumbs={[{ label: 'Resources', to: '/resources' }, { label: page.name }]}
        variant="stacked"
      />

      <div className="band band--top-rule">
        <div className="container article">
          <aside className="article__toc">
            <SectionIndex sections={sections} />
          </aside>
          <article className="article__body">
            {contrast && (
              <div className="contrast">
                {contrast.map((s, i) => (
                  <section key={s.id} id={s.id} className={`contrast__col contrast__col--${i ? 'no' : 'yes'}`} aria-labelledby={`${s.id}-h`}>
                    <h2 id={`${s.id}-h`}>{s.heading}</h2>
                    <ItemList items={s.blocks.flatMap((b) => (b.type === 'list' ? b.items : []))} variant={i ? 'bullets' : 'checks'} />
                  </section>
                ))}
              </div>
            )}
            {flow.map((s) => (
              <section key={s.id} id={s.id} className="article__section" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>{s.heading}</h2>
                <Blocks blocks={s.blocks} list={id === 15 ? 'checks' : 'bullets'} />
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  )
}
