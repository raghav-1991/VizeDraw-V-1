// Original, illustrative product visuals. They depict only capabilities the
// content document describes and are always wrapped in <Figure>, which labels
// them as demo illustrations rather than product screenshots.
import { getPage, paragraphs, section } from '../../content'
import { DrawingSheet } from './DrawingSheet'

export { DrawingSheet }

function splitLabel(text: string) {
  const i = text.indexOf(':')
  return i > 0 ? { k: text.slice(0, i), v: text.slice(i + 1).trim() } : { k: '', v: text }
}

/** Workspace frame: sheet + pinned markup thread (copy from the worked example). */
export function ReviewWorkspace({ compact = false }: { compact?: boolean }) {
  const example = getPage(18)
  const [question, reviewer, status] = paragraphs(section(example, '2 Name the question and responder')).map(splitLabel)
  return (
    <div className={`ws${compact ? ' ws--compact' : ''}`} aria-hidden="false">
      <div className="ws__bar" aria-hidden="true">
        <span className="ws__dots"><i /><i /><i /></span>
        <span className="ws__file">DEMO-104 <b>Rev A</b></span>
        <span className="ws__tabs">
          <span className="is-on">Sheet</span>
          <span>Compare</span>
          <span>Review</span>
        </span>
      </div>
      <div className="ws__body">
        <div className="ws__canvas">
          <DrawingSheet rev="A" cloud pin label="Illustrative drawing sheet DEMO-104 Revision A with a revision cloud and markup pin on note 3" />
        </div>
        <aside className="ws__thread" aria-label="Illustrative markup thread">
          <div className="ws__thread-head">
            <span className="ws__pin" aria-hidden="true">1</span>
            <span className="label">{question.k}</span>
          </div>
          <p className="ws__q">{question.v}</p>
          <dl className="ws__meta">
            <div><dt>{reviewer.k}</dt><dd>{reviewer.v}</dd></div>
            <div><dt>{status.k}</dt><dd><span className="status-chip">{status.v}</span></dd></div>
          </dl>
        </aside>
      </div>
    </div>
  )
}

/** A drawing set: several sheets organized under one package. */
export function SheetSet() {
  return (
    <div className="sheetset">
      <DrawingSheet rev="A" className="sheetset__back2" label="" />
      <DrawingSheet rev="A" className="sheetset__back" label="" />
      <DrawingSheet rev="B" className="sheetset__front" label="Illustrative drawing set: DEMO-104 Revision B on top of earlier sheets" />
      <span className="sheetset__tag">DEMO-104 · SET</span>
    </div>
  )
}

/** Close-up of note 3 with the cloud and markup pin. */
export function MarkupDetail({ rev = 'A' }: { rev?: 'A' | 'B' }) {
  return (
    <DrawingSheet
      rev={rev}
      cloud
      pin
      viewBox="22 170 360 212"
      className="ds--detail"
      label={`Close-up of DEMO-104 Revision ${rev}: note 3 is clouded and pinned with markup 1`}
    />
  )
}

/** Close-up of the title block: drawing identity, sheet and revision. */
export function TitleBlockDetail() {
  return (
    <DrawingSheet
      rev="B"
      viewBox="246 196 344 196"
      className="ds--detail"
      label="Close-up of the DEMO-104 title block showing drawing number, sheet and revision B"
    />
  )
}

/** The record a later reviewer should be able to recover (terms from the Product page). */
export function RecordLedger() {
  const rows: [string, string, 'plain' | 'rev' | 'open'][] = [
    ['Source drawing', 'DEMO-104', 'plain'],
    ['Applicable revision', 'B', 'rev'],
    ['Recorded response', 'CHANGE-DEMO-07', 'plain'],
    ['Remaining action', 'Open', 'open'],
  ]
  return (
    <dl className="ledger" aria-label="Illustrative review record">
      {rows.map(([k, v, kind]) => (
        <div key={k} className="ledger__row">
          <dt>{k}</dt>
          <dd className={`ledger__v ledger__v--${kind}`}>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Side-by-side Rev A / Rev B crop of the changed note. */
export function RevisionCompare() {
  const crop = '28 300 262 78'
  return (
    <div className="compare-wrap">
    <div className="compare">
      <div className="compare__pane">
        <span className="compare__tag">REV A <small>baseline</small></span>
        <DrawingSheet rev="A" viewBox={crop} label="Revision A notes, note 3 reads: cover access this side" />
      </div>
      <div className="compare__pane compare__pane--b">
        <span className="compare__tag compare__tag--b">REV B</span>
        <DrawingSheet rev="B" changed cloud viewBox={crop} label="Revision B notes, note 3 changed to reference CHANGE-DEMO-07, highlighted and clouded" />
      </div>
    </div>
    </div>
  )
}

const ROLES = ['Engineering', 'Procurement', 'Suppliers', 'Customers', 'Production', 'Quality']

/** The drawing at the centre of every handoff (roles from the Manufacturing hero). */
export function HandoffMap() {
  const left = ROLES.slice(0, 3)
  const right = ROLES.slice(3)
  const ys = [65, 165, 265]
  return (
    <>
    <div className="handoff-stack" aria-hidden="true">
      <span className="handoff-stack__sheet">DEMO-104 <b>REV B</b></span>
      <ul>
        {ROLES.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
    <svg className="handoff" viewBox="0 0 960 330" role="img" aria-label={`Illustration: one drawing and its review context shared between ${ROLES.join(', ')}`}>
      <rect x="0" y="0" width="960" height="330" className="handoff__bg" />
      {ys.map((y, i) => (
        <g key={`l${i}`}>
          <path d={`M204 ${y} H330 V165 H410`} className="handoff__wire" />
          <path d={`M756 ${y} H630 V165 H550`} className="handoff__wire" />
        </g>
      ))}
      {left.map((r, i) => (
        <g key={r} className="handoff__node" transform={`translate(24 ${ys[i] - 18})`}>
          <rect width="180" height="36" />
          <circle cx="180" cy="18" r="3.5" className="handoff__port" />
          <text x="14" y="23">{r}</text>
        </g>
      ))}
      {right.map((r, i) => (
        <g key={r} className="handoff__node" transform={`translate(756 ${ys[i] - 18})`}>
          <rect width="180" height="36" />
          <circle cx="0" cy="18" r="3.5" className="handoff__port" />
          <text x="166" y="23" textAnchor="end">{r}</text>
        </g>
      ))}
      <g transform="translate(410 91)">
        <rect width="140" height="148" className="handoff__sheet" />
        <rect x="8" y="8" width="124" height="132" className="handoff__sheet-in" />
        <rect x="22" y="26" width="64" height="52" rx="3" className="handoff__part" />
        <rect x="38" y="40" width="32" height="24" rx="2" className="handoff__part" />
        <line x1="96" y1="26" x2="96" y2="78" className="handoff__part" />
        <rect x="70" y="108" width="62" height="32" className="handoff__tb" />
        <text x="74" y="121" className="handoff__tb-text">DEMO-104</text>
        <text x="74" y="133" className="handoff__tb-text">REV B</text>
        <circle cx="30" cy="112" r="9" className="handoff__pin" />
        <text x="30" y="116" textAnchor="middle" className="handoff__pin-text">1</text>
      </g>
    </svg>
    </>
  )
}

/** Existing systems stay authoritative; VizeDraw sits alongside as the review layer. */
export function StackDiagram() {
  const systems = ['CAD authoring', 'PDM', 'PLM', 'QMS', 'Production systems']
  return (
    <div className="stack" role="img" aria-label="Illustration: CAD authoring, PDM, PLM, QMS and production systems remain in place; VizeDraw sits alongside them for drawing review">
      <ul className="stack__systems" aria-hidden="true">
        {systems.map((s) => (
          <li key={s}><span className="stack__dot" />{s}</li>
        ))}
      </ul>
      <div className="stack__bracket" aria-hidden="true" />
      <div className="stack__layer" aria-hidden="true">
        <span className="stack__name">VizeDraw</span>
        <span className="stack__desc">questions, markups and decisions</span>
      </div>
    </div>
  )
}

/** Authorized participants on either side of an access boundary. */
export function AccessBoundary() {
  return (
    <svg className="access" viewBox="0 0 640 320" role="img" aria-label="Illustration: engineering shares a drawing package across an access boundary with an invited supplier and customer">
      <rect x="0" y="0" width="640" height="320" className="access__bg" />
      <rect x="24" y="24" width="250" height="272" className="access__zone" />
      <line x1="320" y1="16" x2="320" y2="304" className="access__boundary" />
      <text x="40" y="50" className="access__label">ENGINEERING</text>
      <text x="344" y="50" className="access__label">SUPPLIER</text>
      <text x="344" y="196" className="access__label">CUSTOMER</text>
      <g transform="translate(64 86)">
        <rect width="150" height="112" className="access__sheet" />
        <rect x="8" y="8" width="134" height="96" className="access__sheet-in" />
        <rect x="22" y="22" width="60" height="44" rx="3" className="access__part" />
        <rect x="88" y="78" width="54" height="26" className="access__tb" />
        <text x="92" y="95" className="access__tb-text">DEMO-104</text>
      </g>
      <g transform="translate(64 214)">
        <rect width="170" height="54" className="access__note" />
        <text x="12" y="22" className="access__note-k">REV</text>
        <text x="48" y="22" className="access__note-v">B</text>
        <text x="12" y="42" className="access__note-k">PURPOSE</text>
        <text x="80" y="42" className="access__note-v">REVIEW</text>
      </g>
      <path d="M214 130 H300 V104 H344" className="access__wire" />
      <path d="M214 150 H300 V250 H344" className="access__wire" />
      <circle cx="320" cy="104" r="7" className="access__gate" />
      <circle cx="320" cy="250" r="7" className="access__gate" />
      <g transform="translate(344 72)">
        <rect width="256" height="64" className="access__card" />
        <circle cx="22" cy="32" r="10" className="access__pin" />
        <text x="22" y="36" textAnchor="middle" className="access__pin-text">?</text>
        <rect x="44" y="20" width="160" height="7" className="access__line" />
        <rect x="44" y="36" width="112" height="7" className="access__line access__line--soft" />
      </g>
      <g transform="translate(344 218)">
        <rect width="256" height="64" className="access__card" />
        <circle cx="22" cy="32" r="10" className="access__pin access__pin--ok" />
        <path d="M17 32 l4 4 l7 -8" className="access__check" />
        <rect x="44" y="20" width="140" height="7" className="access__line" />
        <rect x="44" y="36" width="176" height="7" className="access__line access__line--soft" />
      </g>
    </svg>
  )
}
