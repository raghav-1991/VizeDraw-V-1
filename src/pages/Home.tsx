import { firstOf, getPage, paragraphs, section } from '../content'
import { Actions } from '../components/Action'
import { Faq, Figure, ItemList, Meta, Steps } from '../components/content'
import { Workbench } from '../components/studio/Workbench'
import { MarkupDetail, RecordLedger } from '../components/illustrations'

// Homepage copy comes from page 1 of the content document; the product
// compositions illustrate it.

const page = getPage(1)

const annotations = [
  { k: 'Sheet', v: 'S-101', pos: 'tl' },
  { k: 'Revision', v: 'REV 04', pos: 'tr', accent: true },
  { k: 'Discipline', v: 'Structural', pos: 'ml' },
  { k: 'Set', v: '42 Sheets', pos: 'bl' },
  { k: 'Review status', v: '3 of 5 approved', pos: 'br' },
]

/** Systems named in "Fits around the systems you already use". */
const systems = [
  { k: 'Authoring', v: 'CAD' },
  { k: 'Record', v: 'PDM / PLM' },
  { k: 'Quality', v: 'QMS' },
  { k: 'Execution', v: 'Production' },
]

/** "Every drawing carries decisions. Keep them connected." -> one line per sentence. */
const sentences = (text: string) => text.match(/[^.!?]+[.!?]/g)?.map((s) => s.trim()) ?? [text]

/** Section opener: a sheet-zone number and a hairline rule. */
function Marker({ n }: { n: number }) {
  return (
    <div className="marker" aria-hidden="true">
      <span className="marker__name">{String(n).padStart(2, '0')}</span>
      <span className="marker__rule" />
    </div>
  )
}

export default function Home() {
  const hero = section(page, 'Hero')
  const problem = section(page, 'Problem statement')
  const how = section(page, 'How VizeDraw works')
  const handoffs = section(page, 'Built for manufacturing handoffs')
  const fits = section(page, 'Fits around the systems you already use')
  const questions = section(page, 'Homepage questions')
  const closing = section(page, 'Closing conversion')

  const [title, lede] = paragraphs(hero)
  const heroCta = firstOf(hero, 'cta')
  const [scattered, contextLine, together] = paragraphs(problem)
  const [closingTitle, ...closingText] = paragraphs(closing)
  const closingCta = firstOf(closing, 'cta')

  return (
    <>
      <Meta page={page} />

      {/* ---------- Hero ---------- */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="container">
          <div className="home-hero__grid">
            <h1 id="home-title" className="home-hero__title">
              {sentences(title).map((line, i, all) => (
                <span key={line} className="home-hero__line">
                  {i === all.length - 1 && all.length > 1 ? <em>{line}</em> : line}
                  {i < all.length - 1 && ' '}
                </span>
              ))}
            </h1>
            <div className="home-hero__aside">
              <p className="home-hero__lede">{lede}</p>
              <Actions primary={heroCta.primary} secondary={heroCta.secondary} />
            </div>
          </div>
        </div>

        <div className="table">
          <div className="container table__inner">
            <ul className="annot" aria-hidden="true">
              {annotations.map((a) => (
                <li key={a.pos} className={`annot__item glass annot__item--${a.pos}${a.accent ? ' is-accent' : ''}`}>
                  <span className="annot__k">{a.k}</span>
                  <span className="annot__v">{a.v}</span>
                </li>
              ))}
            </ul>
            <Workbench />
          </div>
        </div>
      </section>

      {/* ---------- 01 Problem statement ---------- */}
      <section className="sheet-section" id={problem.id} aria-labelledby={`${problem.id}-h`}>
        <div className="container">
          <Marker n={1} />
          <h2 id={`${problem.id}-h`} className="visually-hidden">{problem.heading}</h2>
          <div className="home-split">
            <div className="prose">
              <p className="lede">{scattered}</p>
              <p className="home-statement">{contextLine}</p>
              <p className="lede">{together}</p>
            </div>
            <Figure><RecordLedger /></Figure>
          </div>
        </div>
      </section>

      {/* ---------- 02 How VizeDraw works ---------- */}
      <section className="sheet-section" id={how.id} aria-labelledby={`${how.id}-h`}>
        <div className="container">
          <Marker n={2} />
          <h2 id={`${how.id}-h`} className="lead-grid__title lead-title">{how.heading}</h2>
          <div className="home-split">
            <Steps items={firstOf(how, 'steps').items} />
            <Figure><MarkupDetail /></Figure>
          </div>
        </div>
      </section>

      {/* ---------- 03 Built for manufacturing handoffs ---------- */}
      <section className="sheet-section" id={handoffs.id} aria-labelledby={`${handoffs.id}-h`}>
        <div className="container">
          <Marker n={3} />
          <h2 id={`${handoffs.id}-h`} className="lead-grid__title lead-title">{handoffs.heading}</h2>
          <ItemList items={firstOf(handoffs, 'list').items} variant="grid" />
        </div>
      </section>

      {/* ---------- 04 Fits around existing systems ---------- */}
      <section className="sheet-section" id="integrations" aria-labelledby={`${fits.id}-h`}>
        <div className="container">
          <Marker n={4} />
          <h2 id={`${fits.id}-h`} className="lead-grid__title lead-title">{fits.heading}</h2>
          <p className="lede home-fits__text">{paragraphs(fits)[0]}</p>
          <div className="systems" role="img" aria-label="VizeDraw alongside CAD, PDM, PLM, QMS and production systems">
            <ul className="systems__row" aria-hidden="true">
              {systems.map((s) => (
                <li key={s.k}>
                  <span className="systems__k">{s.k}</span>
                  <b>{s.v}</b>
                </li>
              ))}
            </ul>
            <div className="systems__layer" aria-hidden="true">
              <span className="systems__wordmark">VizeDraw</span>
              <span>Drawing review and collaboration</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 05 Homepage questions ---------- */}
      <section className="sheet-section" id={questions.id} aria-labelledby={`${questions.id}-h`}>
        <div className="container split split--wide-right">
          <div className="split__aside">
            <Marker n={5} />
            <h2 id={`${questions.id}-h`}>{questions.heading}</h2>
          </div>
          <Faq items={firstOf(questions, 'faq').items} />
        </div>
      </section>

      {/* ---------- Closing conversion ---------- */}
      <section className="closing" id={closing.id} aria-labelledby={`${closing.id}-h`}>
        <div className="container closing__stage">
          <div className="closing__panel glass">
            <div>
              <h2 id={`${closing.id}-h`}>{closingTitle}</h2>
              {closingText.map((t) => <p key={t} className="lede">{t}</p>)}
            </div>
            <Actions primary={closingCta.primary} secondary={closingCta.secondary} />
          </div>
        </div>
      </section>
    </>
  )
}
