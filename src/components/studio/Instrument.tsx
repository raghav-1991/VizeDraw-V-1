// The capability index: seven realistic, illustrative UI compositions that
// demonstrate the product instead of describing it with icon cards.
import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import { PlanDrawing } from './PlanDrawing'

interface Capability {
  id: string
  title: string
  line: string
}

const capabilities: Capability[] = [
  { id: 'workspace', title: 'Drawing Workspace', line: 'Technical sheets organised by project and discipline.' },
  { id: 'revisions', title: 'Revision Control', line: 'Compare revisions and clearly identify changes.' },
  { id: 'review', title: 'Review & Markup', line: 'Place contextual comments and markups directly on drawings.' },
  { id: 'measure', title: 'Measurement', line: 'Measure directly against calibrated drawings.' },
  { id: 'takeoff', title: 'Search & Takeoff', line: 'Find information and extract quantities.' },
  { id: 'collab', title: 'Collaboration', line: 'Keep discussions and decisions connected to drawings.' },
  { id: 'enterprise', title: 'Enterprise Controls', line: 'Permissions, access, audit trails and controlled sharing.' },
]

/* ---------- Panels ---------- */

function WorkspacePanel() {
  const [group, setGroup] = useState<'discipline' | 'status'>('discipline')
  const sets = group === 'discipline'
    ? [
        { h: 'A — Architectural', n: 28, s: ['A-101', 'A-102', 'A-103', 'A-201', 'A-301'] },
        { h: 'S — Structural', n: 42, s: ['S-100', 'S-101', 'S-102', 'S-103', 'S-201', 'S-301'] },
        { h: 'M — Mechanical', n: 19, s: ['M-101', 'M-102', 'M-401'] },
      ]
    : [
        { h: 'In review', n: 7, s: ['S-101', 'A-201', 'M-102'] },
        { h: 'Issued for construction', n: 64, s: ['A-101', 'A-102', 'S-100', 'S-102', 'S-103', 'M-101'] },
        { h: 'Superseded', n: 18, s: ['A-103', 'S-201', 'S-301', 'A-301', 'M-401'] },
      ]
  return (
    <div className="inst-ws">
      <div className="inst__toolbar">
        <span className="inst__path"><b>Harbour Works</b> / Block C / 105 sheets</span>
        <div className="inst__seg" role="group" aria-label="Group sheets by">
          <button type="button" aria-pressed={group === 'discipline'} onClick={() => setGroup('discipline')}>Discipline</button>
          <button type="button" aria-pressed={group === 'status'} onClick={() => setGroup('status')}>Status</button>
        </div>
      </div>
      <div className="inst-ws__sets" key={group}>
        {sets.map((set) => (
          <section key={set.h} className="inst-ws__set">
            <header><span>{set.h}</span><span>{set.n}</span></header>
            <ul>
              {set.s.map((code, i) => (
                <li key={code} style={{ '--i': i } as CSSProperties} className={code === 'S-101' ? 'is-active' : undefined}>
                  <span className="inst-ws__thumb" aria-hidden="true"><PlanDrawing label="" viewBox={`${60 + ((i * 37) % 200)} ${40 + ((i * 23) % 120)} 420 280`} /></span>
                  <b>{code}</b>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

function RevisionPanel() {
  const [pos, setPos] = useState(56)
  const id = useId()
  return (
    <div className="inst-rev">
      <div className="inst__toolbar">
        <span className="inst__path"><b>S-101</b> · Rev 03 <span className="inst__vs">↔</span> Rev 04</span>
        <label className="inst__slider-label" htmlFor={id}>Wipe</label>
        <input id={id} className="inst__slider" type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Compare revision 03 and revision 04" />
      </div>
      <div className="inst-rev__stage" style={{ '--pos': `${pos}%`, '--pos-n': pos / 100 } as CSSProperties}>
        <div className="inst-rev__layer inst-rev__layer--old"><PlanDrawing label="" ghost /></div>
        <div className="inst-rev__layer inst-rev__layer--new"><PlanDrawing overlay="revision" label="Illustrative revision comparison of sheet S-101, revision 03 against revision 04" /></div>
        <span className="inst-rev__handle" aria-hidden="true"><i>03</i><i>04</i></span>
      </div>
      <ol className="inst-rev__log">
        <li><span className="inst__dot" /> <b>Δ4</b> Beam W16×31 relocated, grid D–E</li>
        <li><span className="inst__dot inst__dot--grey" /> <b>—</b> No other geometry changed</li>
        <li><span className="inst__dot inst__dot--grey" /> <b>TB</b> Title block revision 03 → 04</li>
      </ol>
    </div>
  )
}

function Thread({ n, who, role, text, state, children }: { n: number; who: string; role: string; text: string; state?: string; children?: ReactNode }) {
  return (
    <li className="inst-thread__item">
      <span className="inst-thread__pin">{n}</span>
      <div>
        <p className="inst-thread__who"><b>{who}</b> <span>{role}</span></p>
        <p className="inst-thread__text">{text}</p>
        {state && <span className={`inst__chip${state === 'Resolved' ? ' inst__chip--ok' : ''}`}>{state}</span>}
        {children}
      </div>
    </li>
  )
}

function ReviewPanel() {
  return (
    <div className="inst-split">
      <div className="inst-split__drawing"><PlanDrawing overlay="markup" label="Illustrative sheet with three markups: a revision cloud, a core box and a column arrow" /></div>
      <ol className="inst-thread">
        <Thread n={1} who="Anika K." role="Structural lead" text="Confirm connection at D/2 once the W16 moves to 2.7." state="Awaiting response" />
        <Thread n={2} who="Jon M." role="Architect" text="Core opening to follow lift supplier dims — see A-201." state="Open" />
        <Thread n={3} who="Rafael S." role="Contractor" text="Base plate A/4 checked on site." state="Resolved" />
      </ol>
    </div>
  )
}

function MeasurePanel() {
  return (
    <div className="inst-split">
      <div className="inst-split__drawing"><PlanDrawing overlay="measure" label="Illustrative calibrated measurement: a 14 400 millimetre length and an 86.4 square metre area" /></div>
      <div className="inst-measure">
        <p className="inst__k">Calibration</p>
        <p className="inst-measure__cal">1 : 100 <span>verified against grid B–D</span></p>
        <table className="inst__table">
          <thead><tr><th scope="col">Measure</th><th scope="col">Type</th><th scope="col">Value</th></tr></thead>
          <tbody>
            <tr className="is-accent"><th scope="row">M-01</th><td>Length</td><td>14 400 mm</td></tr>
            <tr className="is-accent"><th scope="row">M-02</th><td>Area</td><td>86.4 m²</td></tr>
            <tr><th scope="row">M-03</th><td>Length</td><td>6 000 mm</td></tr>
            <tr><th scope="row">M-04</th><td>Perimeter</td><td>37.2 m</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TakeoffPanel() {
  return (
    <div className="inst-split">
      <div className="inst-split__drawing">
        <div className="inst-search"><svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><circle cx="7" cy="7" r="5" /><path d="M11 11l4 4" /></svg><span>W12×26</span><em>2 hits · 1 sheet</em></div>
        <PlanDrawing overlay="search" label="Illustrative search results highlighting W12×26 beam marks on sheet S-101" />
      </div>
      <div className="inst-measure">
        <p className="inst__k">Takeoff · Level 02 steel</p>
        <table className="inst__table">
          <thead><tr><th scope="col">Member</th><th scope="col">Qty</th><th scope="col">Length</th></tr></thead>
          <tbody>
            <tr className="is-accent"><th scope="row">W12×26</th><td>8</td><td>57.6 m</td></tr>
            <tr><th scope="row">W14×30</th><td>8</td><td>57.6 m</td></tr>
            <tr><th scope="row">W16×31</th><td>4</td><td>28.8 m</td></tr>
            <tr><th scope="row">HSS columns</th><td>20</td><td>74.5 m</td></tr>
          </tbody>
          <tfoot><tr><th scope="row">Total</th><td>40</td><td>218.5 m</td></tr></tfoot>
        </table>
        <p className="inst__foot">Export · CSV · XLSX</p>
      </div>
    </div>
  )
}

function CollabPanel() {
  return (
    <div className="inst-split inst-split--wide">
      <div className="inst-split__drawing"><PlanDrawing overlay="collab" label="Illustrative drawing with markup pins linked to a discussion" /></div>
      <ol className="inst-timeline">
        <li><time>09:12</time><p><b>Anika K.</b> opened <span className="inst__ref">#1</span> on S-101</p></li>
        <li><time>09:40</time><p><b>Jon M.</b> mentioned <b>@Structural</b> — linked A-201</p></li>
        <li><time>11:05</time><p><b>Rafael S.</b> attached site photo to <span className="inst__ref">#3</span></p></li>
        <li className="is-decision"><time>14:30</time><p><b>Decision</b> Beam relocation accepted — issued as Rev 04</p></li>
      </ol>
    </div>
  )
}

function EnterprisePanel() {
  const roles = [['O', 'Owner'], ['R', 'Reviewer'], ['C', 'Contributor'], ['G', 'Guest']]
  const perms: [string, boolean[]][] = [
    ['View sheets', [true, true, true, true]],
    ['Markup', [true, true, true, false]],
    ['Issue revisions', [true, false, false, false]],
    ['Share externally', [true, true, false, false]],
  ]
  return (
    <div className="inst-split">
      <div className="inst-split__drawing"><PlanDrawing overlay="access" label="Illustrative sheet with a restricted area for the steel package" /></div>
      <div className="inst-measure">
        <p className="inst__k">Role permissions</p>
        <table className="inst__table inst__table--matrix">
          <thead><tr><th scope="col"><span className="visually-hidden">Permission</span></th>{roles.map(([k, r]) => <th key={k} scope="col"><abbr title={r}>{k}</abbr></th>)}</tr></thead>
          <tbody>
            {perms.map(([p, row]) => (
              <tr key={p}><th scope="row">{p}</th>{row.map((on, i) => <td key={i}><span className={`inst__tick${on ? ' is-on' : ''}`}>{on ? 'Allowed' : 'Not allowed'}</span></td>)}</tr>
            ))}
          </tbody>
        </table>
        <p className="inst__legend">O Owner · R Reviewer · C Contributor · G Guest</p>
        <p className="inst__k">Audit trail</p>
        <ol className="inst-audit">
          <li><time>14:30</time>Rev 04 issued · A. Kaur</li>
          <li><time>14:31</time>Shared with Steelwork Ltd · view only · expires 30 d</li>
          <li><time>15:02</time>Downloaded S-101 · R. Silva</li>
        </ol>
      </div>
    </div>
  )
}

const panels: Record<string, () => ReactNode> = {
  workspace: WorkspacePanel,
  revisions: RevisionPanel,
  review: ReviewPanel,
  measure: MeasurePanel,
  takeoff: TakeoffPanel,
  collab: CollabPanel,
  enterprise: EnterprisePanel,
}

export function Instrument() {
  const [active, setActive] = useState(capabilities[0].id)
  const base = useId()
  const current = capabilities.find((c) => c.id === active)!
  const Panel = panels[active]

  return (
    <div className="inst">
      <div className="inst__index" role="tablist" aria-label="Capabilities" aria-orientation="vertical">
        {capabilities.map((c, i) => (
          <button
            key={c.id}
            id={`${base}-tab-${c.id}`}
            role="tab"
            type="button"
            aria-selected={c.id === active}
            aria-controls={`${base}-panel`}
            tabIndex={c.id === active ? 0 : -1}
            className="inst__tab"
            onClick={() => setActive(c.id)}
            onKeyDown={(e) => {
              const n = capabilities.length
              const target =
                e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % n
                : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i - 1 + n) % n
                : e.key === 'Home' ? 0
                : e.key === 'End' ? n - 1
                : -1
              if (target < 0) return
              e.preventDefault()
              const next = capabilities[target]
              setActive(next.id)
              document.getElementById(`${base}-tab-${next.id}`)?.focus()
            }}
          >
            <span className="inst__tab-body">
              <span className="inst__title">{c.title}</span>
              <span className="inst__line">{c.line}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="inst__frame" id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`}>
        <div className="inst__frame-head">
          <span>{current.title}</span>
        </div>
        <div className="inst__stage" key={active}>
          <Panel />
        </div>
      </div>
    </div>
  )
}
