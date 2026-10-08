import { useEffect, useId, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import type { Block, Item, Page, Section } from '../content/types'
import { brief, paragraphs, blocksOf, slug, splitNumbered } from '../content'
import { resolveFields } from '../content/commercial'
import { uiCopy } from '../content/ui'
import { Actions } from './Action'

/** Document <title> and description; React 19 hoists these into <head>. */
export function Meta({ page }: { page: Pick<Page, 'title' | 'description'> }) {
  return (
    <>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
    </>
  )
}

/** Copy containing {{fields}}: values not yet entered render as a dash. */
export function FieldText({ text }: { text: string }) {
  return (
    <>
      {resolveFields(text).map((part, i) =>
        part.missingKey ? (
          <span key={i} className="field-missing" data-field={part.missingKey}>
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  )
}

/** Every paragraph of a section, in full and in document order. */
export function Paragraphs({ section, lede }: { section: Section; lede?: boolean | string }) {
  const leadClass = lede === true ? 'lede' : lede || undefined
  return (
    <>
      {paragraphs(section).map((text, i) => (
        <p key={i} className={i === 0 ? leadClass : undefined}><FieldText text={text} /></p>
      ))}
    </>
  )
}

type ListStyle = 'rows' | 'bullets' | 'checks' | 'grid'

export function ItemList({ items, variant = 'bullets', headingLevel = 3, concise = false }: { items: Item[]; variant?: ListStyle; headingLevel?: 3 | 4; concise?: boolean }) {
  const H = headingLevel === 3 ? 'h3' : 'h4'
  return (
    <ul className={`items items--${variant}${concise ? ' items--concise' : ''}`}>
      {items.map((item, i) => (
        <li key={i} id={item.term ? slug(item.term) : undefined} className={item.term ? 'has-term' : undefined}>
          {item.term ? (
            <>
              <H className="items__term">{item.term}</H>
              {!concise && <p>{item.text}</p>}
            </>
          ) : (
            <span>{concise ? brief(item.text) : item.text}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function Steps({ items, compact = false, concise = false }: { items: Item[]; compact?: boolean; concise?: boolean }) {
  return (
    <ol className={`steps${compact ? ' steps--compact' : ''}`}>
      {items.map((item, i) => (
        <li key={i}>
          <span className="steps__num" aria-hidden="true" />
          <div>
            {item.term && <h3 className="steps__term">{item.term}</h3>}
            {!(concise && item.term) && <p>{concise ? brief(item.text) : item.text}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <FaqItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className={`faq__item${open ? ' is-open' : ''}`}>
      <h3 className="faq__q">
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
          <span>{q}</span>
          <span className="faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <div id={id} className="faq__a" hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export function DataTable({ head, rows, caption }: { head: string[]; rows: string[][]; caption?: string }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        {caption && <caption className="visually-hidden">{caption}</caption>}
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row">{cell}</th>
                ) : (
                  <td key={i} data-label={head[i]}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface BlocksProps {
  blocks: Block[]
  list?: ListStyle
  /** Skip CTA blocks (when a layout places them elsewhere). */
  hideCta?: boolean
  /** Visual-first trim: first paragraph as one sentence, lists and steps as labels. */
  concise?: boolean
}

/** Generic renderer for document blocks, in source order. */
export function Blocks({ blocks, list = 'bullets', hideCta = false, concise = false }: BlocksProps) {
  const firstP = blocks.findIndex((b) => b.type === 'p')
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            if (concise && i !== firstP) return null
            return <p key={i}><FieldText text={concise ? brief(b.text) : b.text} /></p>
          case 'list':
            return <ItemList key={i} items={b.items} variant={list} concise={concise} />
          case 'steps':
            return <Steps key={i} items={b.items} concise={concise} />
          case 'cta':
            return hideCta ? null : <Actions key={i} primary={b.primary} secondary={b.secondary} />
          case 'table':
            return <DataTable key={i} head={b.head} rows={b.rows} />
          case 'faq':
            return <Faq key={i} items={b.items} />
          case 'kv':
            return <p key={i}>{b.value}</p>
        }
      })}
    </>
  )
}

export function Breadcrumbs({ trail }: { trail: { label: string; to?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">{uiCopy.breadcrumbHome}</Link></li>
        {trail.map((c, i) => (
          <li key={i}>
            {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

interface HeroProps {
  page: Page
  crumbs?: { label: string; to?: string }[]
  visual?: ReactNode
  variant?: 'split' | 'stacked'
  children?: ReactNode
}

/** Page hero: the first hero paragraph is the page's single H1. */
export function Hero({ page, crumbs, visual, variant = 'split', children }: HeroProps) {
  const hero = page.sections[0]
  const [title, ...ledes] = paragraphs(hero)
  const cta = blocksOf(hero, 'cta')[0]
  return (
    <section className={`hero hero--${variant}${visual ? ' hero--has-visual' : ''}`}>
      <div className="container hero__grid">
        <div className="hero__copy">
          {crumbs && <Breadcrumbs trail={crumbs} />}
          <h1>{title}</h1>
          {ledes.map((text, i) => (
            <p key={i} className={i === 0 ? 'lede' : 'hero__more'}><FieldText text={text} /></p>
          ))}
          {cta && <Actions primary={cta.primary} secondary={cta.secondary} />}
          {children}
        </div>
        {visual && <div className="hero__visual">{visual}</div>}
      </div>
    </section>
  )
}

/** Sticky in-page navigation with a passive scroll-spy (no scroll hijacking). */
export function SectionIndex({ sections, title = uiCopy.onThisPage }: { sections: { id: string; heading: string }[]; title?: string }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav className="section-index" aria-label={title}>
      <span className="label">{title}</span>
      <ol>
        {sections.map((s, i) => {
          const { title: t } = splitNumbered(s.heading)
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}>
                <span className="section-index__num">{String(i + 1).padStart(2, '0')}</span>
                {t}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** Frame for product illustrations; the SVGs carry their own accessible labels. */
export function Figure({ children, caption, className = '' }: { children: ReactNode; caption?: string; className?: string }) {
  return (
    <figure className={`figure ${className}`.trim()}>
      <div className="figure__frame">{children}</div>
      {caption && <figcaption className="figure__caption">{caption}</figcaption>}
    </figure>
  )
}
