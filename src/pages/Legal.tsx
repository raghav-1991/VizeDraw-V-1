import { Fragment, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { legalDoc, type LegalBlock, type LegalKey } from '../content/legal'
import type { Page } from '../content/types'
import { Hero, Meta, SectionIndex } from '../components/content'

/** Mentions of the other legal pages become links. */
const crossLinks: { phrase: string; key: LegalKey }[] = [
  { phrase: 'Cookie Preferences page', key: 'cookies' },
  { phrase: 'Privacy Notice', key: 'privacy' },
]

/** Copy with [label](href) links and cross-links to the other legal pages. */
function Rich({ text, self }: { text: string; self: LegalKey }) {
  const parts: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  const plain = (s: string) => {
    const link = crossLinks.find((c) => c.key !== self && s.includes(c.phrase))
    if (!link) return s
    const i = s.indexOf(link.phrase)
    return (
      <>
        {s.slice(0, i)}
        <Link to={legalDoc(link.key).route}>{link.phrase}</Link>
        {s.slice(i + link.phrase.length)}
      </>
    )
  }
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0
    if (i > last) parts.push(plain(text.slice(last, i)))
    parts.push(<a href={m[2]}>{m[1]}</a>)
    last = i + m[0].length
  }
  if (last < text.length) parts.push(plain(text.slice(last)))
  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>
}

/* ---------- Cookie preference controls ---------- */

const STORAGE_KEY = 'vizedraw.cookie-preferences'
type Prefs = Record<string, boolean>

/** "2. Preference Cookies" -> "preference" */
const categoryKey = (heading: string) => heading.replace(/^\d+\.\s*/, '').replace(/\s*Cookies$/i, '').toLowerCase()

function readPrefs(): Prefs {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Prefs
  } catch {
    return {}
  }
}

function CookieSwitch({ heading, prefs, onChange }: { heading: string; prefs: Prefs; onChange: (key: string, on: boolean) => void }) {
  const key = categoryKey(heading)
  const name = heading.replace(/^\d+\.\s*/, '')
  return (
    <label className="cookie-switch">
      <input type="checkbox" role="switch" checked={!!prefs[key]} onChange={(e) => onChange(key, e.target.checked)} />
      <span className="cookie-switch__track" aria-hidden="true" />
      <span>Allow {name.toLowerCase()}</span>
    </label>
  )
}

/* ---------- Page ---------- */

export default function Legal({ which }: { which: LegalKey }) {
  const doc = legalDoc(which)
  const [prefs, setPrefs] = useState<Prefs>(readPrefs)
  const [saved, setSaved] = useState(false)

  const changePref = (key: string, on: boolean) => {
    const next = { ...prefs, [key]: on }
    setPrefs(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setSaved(true)
    } catch {
      setSaved(false)
    }
  }

  // Hero renders the first paragraph as the H1 and the rest as the lede.
  const page: Page = {
    id: 0,
    name: doc.title,
    route: doc.route,
    purpose: '',
    title: `${doc.title} | VizeDraw`,
    description: doc.intro.find((t) => t.includes(doc.title)) ?? doc.intro[0],
    searchTheme: '',
    sections: [{ heading: 'Hero', id: 'hero', blocks: [doc.title, ...doc.intro].map((text) => ({ type: 'p' as const, text })) }],
  }
  const index = doc.sections.map((s) => ({ id: s.id, heading: s.heading.replace(/^\d+\.\s*/, '') }))

  const block = (b: LegalBlock, i: number) => {
    switch (b.type) {
      case 'p':
        return <p key={i}><Rich text={b.text} self={which} /></p>
      case 'list':
        return (
          <ul key={i} className="items items--bullets">
            {b.items.map((item) => <li key={item}><span>{item}</span></li>)}
          </ul>
        )
      case 'h3':
        return (
          <div key={i} className="legal__subhead">
            <h3>{b.text}</h3>
            {b.badge && <span className={`legal__badge${b.badge === 'Always Active' ? ' is-on' : ''}`}>{b.badge}</span>}
            {which === 'cookies' && b.badge === 'Optional' && <CookieSwitch heading={b.text} prefs={prefs} onChange={changePref} />}
          </div>
        )
    }
  }

  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: doc.title }]} variant="stacked" />

      <div className="band band--top-rule">
        <div className="container article legal">
          <aside className="article__toc">
            <SectionIndex sections={index} />
          </aside>
          <article className="article__body">
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} className="article__section" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>{s.heading}</h2>
                {s.blocks.map(block)}
                {which === 'cookies' && s.id === 'cookie-categories' && (
                  <p className="legal__saved" role="status">{saved ? 'Your cookie preferences have been saved in this browser.' : ''}</p>
                )}
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  )
}
