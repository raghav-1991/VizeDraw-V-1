// Hero product composition: the VizeDraw workspace as a drawing table turned
// into software. Illustrative UI with a fictional project; tools are live and
// switch the overlay drawn on the sheet.
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { PlanDrawing, type PlanOverlay } from './PlanDrawing'

const disciplines = [
  { code: 'A', name: 'Architectural', count: 28 },
  { code: 'S', name: 'Structural', count: 42, open: true },
  { code: 'M', name: 'Mechanical', count: 19 },
  { code: 'E', name: 'Electrical', count: 16 },
]

const sheets = [
  { no: 'S-100', title: 'General notes', rev: '02' },
  { no: 'S-101', title: 'Level 02 framing', rev: '04', active: true },
  { no: 'S-102', title: 'Level 03 framing', rev: '03' },
  { no: 'S-103', title: 'Roof framing', rev: '03' },
  { no: 'S-201', title: 'Elevations', rev: '01' },
  { no: 'S-301', title: 'Sections', rev: '02' },
]

const tools: { id: PlanOverlay; label: string; key: string; icon: string }[] = [
  { id: 'none', label: 'Select', key: 'V', icon: 'M5 3l10 6-4.5 1.2L9 15z' },
  { id: 'markup', label: 'Markup', key: 'K', icon: 'M3 14l2-5 7-7 3 3-7 7zM11 3l3 3' },
  { id: 'measure', label: 'Measure', key: 'M', icon: 'M2 12L12 2l4 4L6 16zM5 9l1.5 1.5M7.5 6.5L9 8M10 4l1.5 1.5' },
  { id: 'revision', label: 'Compare', key: 'C', icon: 'M3 4h5v10H3zM10 4h5v10h-5zM8 9h2' },
]

const cycle: PlanOverlay[] = ['none', 'markup', 'measure', 'revision']

/** Context card set over the sheet, describing the active overlay. */
const tracing: Record<string, { k: string; t: string; rows: [string, string][] }> = {
  none: { k: 'Sheet S-101', t: 'Level 02 framing plan', rows: [['Status', 'In review'], ['Rev', '04']] },
  markup: { k: 'Markup #1 · A. Kaur', t: 'Confirm connection at D/2 once the W16 moves to 2.7.', rows: [['Assigned', 'Structural'], ['State', 'Awaiting']] },
  measure: { k: 'Measure · calibrated', t: 'Grid B → D', rows: [['M-01', '14 400 mm'], ['M-02', '86.4 m²']] },
  revision: { k: 'Compare · Rev 03 ↔ 04', t: 'W16×31 relocated, grid D–E', rows: [['Changes', '1'], ['Cloud', 'Δ4']] },
}

const readout: Record<string, { layer: string; note: string }> = {
  none: { layer: 'Framing', note: 'Sheet S-101 · Level 02' },
  markup: { layer: 'Markups', note: '3 markups · 1 awaiting response' },
  measure: { layer: 'Measure', note: 'Calibrated 1:100 · A1' },
  revision: { layer: 'Rev 03 ↔ 04', note: '1 change detected' },
}

export function Workbench() {
  const reduced = useReducedMotion()
  const [overlay, setOverlay] = useState<PlanOverlay>('none')
  const [auto, setAuto] = useState(true)
  const root = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!auto || reduced || !visible) return
    const t = window.setInterval(() => {
      setOverlay((o) => cycle[(cycle.indexOf(o) + 1) % cycle.length])
    }, 3600)
    return () => window.clearInterval(t)
  }, [auto, reduced, visible])

  const pick = (id: PlanOverlay) => {
    setAuto(false)
    setOverlay(id)
  }

  const r = readout[overlay] ?? readout.none
  const tr = tracing[overlay] ?? tracing.none

  return (
    <div className="wb" ref={root} data-overlay={overlay}>
      <div className="wb__bar">
        <span className="wb__crumbs">
          <b>Harbour Works</b>
          <span aria-hidden="true">/</span> Block C
          <span aria-hidden="true">/</span> Structural
        </span>
        <div className="wb__tools" role="toolbar" aria-label="Illustrative drawing tools">
          {tools.map((t) => (
            <button
              key={t.id}
              type="button"
              className="wb__tool"
              aria-pressed={overlay === t.id}
              onClick={() => pick(t.id)}
            >
              <svg viewBox="0 0 18 18" width="15" height="15" aria-hidden="true"><path d={t.icon} /></svg>
              <span>{t.label}</span>
              <kbd aria-hidden="true">{t.key}</kbd>
            </button>
          ))}
        </div>
        <span className="wb__people" aria-hidden="true">
          <i>JM</i><i>AK</i><i>RS</i>
          <span className="wb__live">Review · 3 open</span>
        </span>
      </div>

      <div className="wb__body">
        <aside className="wb__sheets" aria-label="Illustrative sheet navigator">
          <div className="wb__panel-head"><span>Drawing set</span><span>105</span></div>
          <ul className="wb__disc">
            {disciplines.map((d) => (
              <li key={d.code} className={d.open ? 'is-open' : undefined}>
                <span className="wb__disc-code">{d.code}</span>
                <span>{d.name}</span>
                <span className="wb__count">{d.count}</span>
              </li>
            ))}
          </ul>
          <ol className="wb__sheetlist">
            {sheets.map((s) => (
              <li key={s.no} className={s.active ? 'is-active' : undefined}>
                <span className="wb__thumb" aria-hidden="true"><i /><i /><i /></span>
                <span className="wb__sheet-meta">
                  <b>{s.no}</b>
                  <span>{s.title}</span>
                </span>
                <span className="wb__rev">R{s.rev}</span>
              </li>
            ))}
          </ol>
        </aside>

        <div className="wb__canvas">
          <div className="wb__ruler wb__ruler--x" aria-hidden="true" />
          <div className="wb__ruler wb__ruler--y" aria-hidden="true" />
          <div className="wb__sheet">
            <PlanDrawing overlay={overlay} ghost={overlay === 'revision'} label="Illustrative structural framing plan, sheet S-101 revision 04" />
          </div>
          <div className="wb__tracing glass" key={overlay} aria-hidden="true">
            <span className="wb__tracing-k">{tr.k}</span>
            <span className="wb__tracing-t">{tr.t}</span>
            <dl>
              {tr.rows.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="wb__zoom glass" aria-hidden="true">
            <span>−</span><b>100%</b><span>+</span>
          </div>
        </div>

        <aside className="wb__inspector" aria-label="Illustrative sheet inspector">
          <div className="wb__panel-head"><span>Sheet</span><span>S-101</span></div>
          <dl className="wb__props">
            <div><dt>Discipline</dt><dd>Structural</dd></div>
            <div><dt>Revision</dt><dd className="is-accent">04</dd></div>
            <div><dt>Issued</dt><dd>12.09.2026</dd></div>
            <div><dt>Scale</dt><dd>1:100 @ A1</dd></div>
          </dl>
          <div className="wb__panel-head"><span>Revisions</span><span>4</span></div>
          <ol className="wb__revs">
            <li className="is-current"><b>04</b><span>Beam D–E relocated</span><i>Current</i></li>
            <li><b>03</b><span>Issued for construction</span></li>
            <li><b>02</b><span>Coordination</span></li>
            <li><b>01</b><span>Issued for review</span></li>
          </ol>
          <div className="wb__panel-head"><span>Review status</span><span>3 / 5</span></div>
          <div className="wb__review">
            <div className="wb__meter" aria-hidden="true"><i style={{ width: '60%' }} /></div>
            <ul>
              <li className="is-done">Structural lead</li>
              <li className="is-done">Architect</li>
              <li className="is-done">Services</li>
              <li>Contractor</li>
              <li>Client rep.</li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="wb__status" aria-live="polite">
        <span>X 14 400 · Y 6 000</span>
        <span>Layer · {r.layer}</span>
        <span className="wb__status-note">{r.note}</span>
        <span className="wb__synced">Synced</span>
      </div>
    </div>
  )
}
