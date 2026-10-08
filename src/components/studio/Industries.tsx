// Four industry scenarios, each composed around its own technical drawing and
// workflow rather than a shared card template. Illustrative data throughout.
import type { ReactNode } from 'react'
import { DrawingSheet } from '../illustrations/DrawingSheet'
import type { Industry } from '../../content/solutions'
import { cloud } from './geometry'
import { PlanDrawing } from './PlanDrawing'

/* ---------- Scenario visuals ---------- */

function ConstructionVisual() {
  return (
    <div className="ind-v ind-v--construction">
      <div className="ind-v__tabs" aria-hidden="true">
        <span>A</span><span className="is-on">S</span><span>M</span><span>E</span><span>P</span>
      </div>
      <div className="ind-v__drawing">
        <PlanDrawing overlay="none" label="Illustrative structural plan crop with an RFI on grid C/2" viewBox="160 30 420 300" />
        <svg className="ind-v__overlay" viewBox="160 30 420 300" aria-hidden="true">
          <path className="ov-cloud ov-cloud--static" d={cloud(318, 170, 64, 52)} />
          <g className="ov-pin" transform="translate(386 166)"><circle r="10" /><text y="4">R</text></g>
        </svg>
      </div>
      <aside className="ind-card">
        <p className="ind-card__k">RFI-017 <span className="inst__chip">Open</span></p>
        <p className="ind-card__t">Column C/2 base plate — confirm anchor layout for revised core.</p>
        <dl>
          <div><dt>Sheet</dt><dd>S-101 · C/2</dd></div>
          <div><dt>To</dt><dd>Structural engineer</dd></div>
          <div><dt>Due</dt><dd>3 working days</dd></div>
        </dl>
      </aside>
    </div>
  )
}

function EngineeringVisual() {
  const gates = [
    { k: 'DR-1', t: 'Concept', s: 'done' },
    { k: 'DR-2', t: 'Detail design', s: 'done' },
    { k: 'DR-3', t: 'Release review', s: 'now' },
    { k: 'DR-4', t: 'Released', s: '' },
  ]
  return (
    <div className="ind-v ind-v--engineering">
      <div className="ind-v__drawing ind-v__drawing--sheet">
        <DrawingSheet rev="B" changed cloud label="Illustrative mechanical drawing DEMO-104 revision B with the changed note highlighted" />
      </div>
      <ol className="ind-gates">
        {gates.map((g) => (
          <li key={g.k} className={g.s ? `is-${g.s}` : undefined}>
            <b>{g.k}</b><span>{g.t}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function FlangePart() {
  const holes = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4)
  const balloons: [number, number, number, number, string][] = [
    [300, 150, 404, 70, '1'],
    [220, 100, 110, 60, '2'],
    [247, 247, 120, 300, '3'],
    [316, 214, 410, 290, '4'],
  ]
  return (
    <svg className="flange" viewBox="0 0 520 360" role="img" aria-label="Illustrative flange part drawing P-2210 with four inspection balloons">
      <rect className="pl-paper" width="520" height="360" />
      <rect className="pl-border" x="10" y="10" width="500" height="340" />
      <g className="fl-center">
        <line x1="120" y1="180" x2="380" y2="180" />
        <line x1="250" y1="50" x2="250" y2="310" />
        <circle cx="250" cy="180" r="95" />
      </g>
      <g className="fl-part">
        <circle cx="250" cy="180" r="120" />
        <circle cx="250" cy="180" r="56" />
        <circle cx="250" cy="180" r="40" />
        {holes.map((a) => (
          <circle key={a} cx={250 + 95 * Math.cos(a)} cy={180 + 95 * Math.sin(a)} r="10" />
        ))}
      </g>
      <g className="fl-dim">
        <line x1="130" y1="330" x2="370" y2="330" />
        <line x1="130" y1="324" x2="130" y2="336" /><line x1="370" y1="324" x2="370" y2="336" />
        <text x="250" y="325">Ø240 ±0.1</text>
      </g>
      {balloons.map(([x, y, bx, by, n]) => (
        <g key={n} className="fl-balloon">
          <line x1={x} y1={y} x2={bx} y2={by} />
          <circle cx={bx} cy={by} r="12" />
          <text x={bx} y={by + 4}>{n}</text>
        </g>
      ))}
      <text className="pl-general" x="420" y="330">P-2210 · REV C</text>
    </svg>
  )
}

function ManufacturingVisual() {
  const rows = [
    ['1', 'PCD Ø190', '190.02', 'ok'],
    ['2', 'Bore Ø80 H7', '80.018', 'ok'],
    ['3', '8× Ø20 thru', '20.05', 'ok'],
    ['4', 'Flatness 0.05', '0.07', 'nc'],
  ]
  return (
    <div className="ind-v ind-v--manufacturing">
      <div className="ind-v__drawing"><FlangePart /></div>
      <aside className="ind-card ind-card--table">
        <p className="ind-card__k">First-article inspection <span className="inst__chip">1 NC</span></p>
        <table className="inst__table">
          <thead><tr><th scope="col">#</th><th scope="col">Characteristic</th><th scope="col">Actual</th></tr></thead>
          <tbody>
            {rows.map(([n, c, a, s]) => (
              <tr key={n} className={s === 'nc' ? 'is-accent' : undefined}><th scope="row">{n}</th><td>{c}</td><td>{a}</td></tr>
            ))}
          </tbody>
        </table>
      </aside>
    </div>
  )
}

function NestingSheet() {
  const parts: [number, number, number, number, string][] = [
    [24, 24, 150, 96, 'PL-01'],
    [184, 24, 150, 96, 'PL-01'],
    [344, 24, 110, 150, 'PL-04'],
    [24, 130, 96, 96, 'PL-02'],
    [130, 130, 96, 96, 'PL-02'],
    [236, 130, 98, 58, 'PL-03'],
    [236, 198, 98, 58, 'PL-03'],
    [24, 236, 202, 56, 'PL-05'],
    [344, 184, 110, 108, 'PL-06'],
  ]
  return (
    <svg className="nest" viewBox="0 0 480 316" role="img" aria-label="Illustrative nesting layout of nine plate parts on a 3000 by 1500 millimetre stock sheet">
      <rect className="pl-paper" width="480" height="316" />
      <rect className="nest__stock" x="12" y="12" width="456" height="292" />
      {parts.map(([x, y, w, h, k], i) => (
        <g key={i} className={`nest__part${k === 'PL-04' ? ' is-accent' : ''}`}>
          <rect x={x} y={y} width={w} height={h} />
          <circle cx={x + 12} cy={y + 12} r="3" />
          <text x={x + w / 2} y={y + h / 2 + 3}>{k}</text>
        </g>
      ))}
      <text className="pl-general" x="18" y="312">STOCK 3000 × 1500 × 12 · S355 · YIELD 86%</text>
    </svg>
  )
}

function FabricationVisual() {
  return (
    <div className="ind-v ind-v--fabrication">
      <div className="ind-v__drawing"><NestingSheet /></div>
      <aside className="ind-card ind-card--table">
        <p className="ind-card__k">Cut list · F-031 Rev 02</p>
        <table className="inst__table">
          <thead><tr><th scope="col">Part</th><th scope="col">Qty</th><th scope="col">Size</th></tr></thead>
          <tbody>
            <tr><th scope="row">PL-01</th><td>2</td><td>600 × 380</td></tr>
            <tr><th scope="row">PL-02</th><td>2</td><td>380 × 380</td></tr>
            <tr><th scope="row">PL-03</th><td>2</td><td>390 × 230</td></tr>
            <tr className="is-accent"><th scope="row">PL-04</th><td>1</td><td>440 × 600</td></tr>
          </tbody>
        </table>
        <p className="inst__foot">Measured from calibrated shop drawing</p>
      </aside>
    </div>
  )
}

const visuals: Record<string, () => ReactNode> = {
  construction: ConstructionVisual,
  engineering: EngineeringVisual,
  manufacturing: ManufacturingVisual,
  fabrication: FabricationVisual,
}

export function IndustryScenario({ industry, headingLevel = 3, compact = false }: { industry: Industry; headingLevel?: 2 | 3; compact?: boolean }) {
  const Visual = visuals[industry.id]
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className={`ind ind--${industry.id}`} id={industry.id} aria-labelledby={`${industry.id}-title`}>
      <header className="ind__head">
        <span className="ind__name">{industry.name}</span>
        {!compact && <span className="ind__sheet">{industry.sheet}</span>}
      </header>
      <div className="ind__body">
        <div className="ind__copy">
          <H id={`${industry.id}-title`} className="ind__statement">{industry.statement}</H>
          {!compact && <p>{industry.body}</p>}
          <ol className="ind__flow" aria-label={`${industry.name} workflow`}>
            {industry.flow.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ol>
        </div>
        <div className="ind__visual">
          <Visual />
        </div>
      </div>
    </article>
  )
}
