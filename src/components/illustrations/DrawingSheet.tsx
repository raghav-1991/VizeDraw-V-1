// Original illustration of a fictional drawing sheet (DEMO-104, the document's
// illustrative example). Not a product screenshot.
import { useId } from 'react'

export type Rev = 'A' | 'B'

interface DrawingSheetProps {
  rev?: Rev
  /** Draw a revision cloud around note 3. */
  cloud?: boolean
  /** Show the numbered markup pin beside note 3. */
  pin?: boolean
  /** Highlight the changed note (revision comparison). */
  changed?: boolean
  /** Crop to a region: "x y w h". Defaults to the full sheet. */
  viewBox?: string
  label: string
  className?: string
}

/** Scalloped revision-cloud path around a rectangle. */
function cloudPath(x: number, y: number, w: number, h: number, bump = 7) {
  const seg = (len: number) => Math.max(2, Math.round(len / (bump * 2)))
  const nx = seg(w)
  const ny = seg(h)
  const dx = w / nx
  const dy = h / ny
  const r = bump
  let d = `M${x} ${y}`
  for (let i = 0; i < nx; i++) d += ` a${r} ${r} 0 0 1 ${dx} 0`
  for (let i = 0; i < ny; i++) d += ` a${r} ${r} 0 0 1 0 ${dy}`
  for (let i = 0; i < nx; i++) d += ` a${r} ${r} 0 0 1 ${-dx} 0`
  for (let i = 0; i < ny; i++) d += ` a${r} ${r} 0 0 1 0 ${-dy}`
  return d + 'Z'
}

const NOTE3: Record<Rev, string> = {
  A: '3. COVER ACCESS THIS SIDE.',
  B: '3. COVER ACCESS SIDE PER CHANGE-DEMO-07.',
}

function Dim({ x1, y1, x2, y2, text, marker, vertical = false }: { x1: number; y1: number; x2: number; y2: number; text: string; marker: string; vertical?: boolean }) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return (
    <g className="ds-dim">
      <line x1={x1} y1={y1} x2={x2} y2={y2} markerStart={`url(#${marker})`} markerEnd={`url(#${marker})`} />
      {vertical ? (
        <text x={mx - 6} y={my} transform={`rotate(-90 ${mx - 6} ${my})`} textAnchor="middle">{text}</text>
      ) : (
        <text x={mx} y={my - 5} textAnchor="middle">{text}</text>
      )}
    </g>
  )
}

export function DrawingSheet({ rev = 'A', cloud = false, pin = false, changed = false, viewBox = '0 0 600 400', label, className = '' }: DrawingSheetProps) {
  const zones = [0, 1, 2, 3]
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const arrow = `ds-arrow-${uid}`
  const hatch = `ds-hatch-${uid}`
  return (
    <svg className={`ds ${className}`.trim()} viewBox={viewBox} role={label ? 'img' : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true} preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id={arrow} viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 1 L7 4 L0 7 Z" className="ds-arrowhead" />
        </marker>
        <pattern id={hatch} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="ds-hatch" />
        </pattern>
      </defs>

      {/* Sheet and borders */}
      <rect x="0" y="0" width="600" height="400" className="ds-paper" />
      <rect x="10" y="10" width="580" height="380" className="ds-border-outer" />
      <rect x="22" y="22" width="556" height="356" className="ds-border" />
      {zones.map((i) => (
        <g key={i} className="ds-zone">
          <line x1={22 + 139 * (i + 1)} y1="10" x2={22 + 139 * (i + 1)} y2="22" />
          <line x1={22 + 139 * (i + 1)} y1="378" x2={22 + 139 * (i + 1)} y2="390" />
          <text x={22 + 139 * i + 69} y="19" textAnchor="middle">{4 - i}</text>
          <text x={22 + 139 * i + 69} y="387" textAnchor="middle">{4 - i}</text>
        </g>
      ))}
      {['C', 'B', 'A'].map((l, i) => (
        <g key={l} className="ds-zone">
          <line x1="10" y1={22 + 119 * (i + 1)} x2="22" y2={22 + 119 * (i + 1)} />
          <text x="16" y={22 + 119 * i + 62} textAnchor="middle">{l}</text>
          <text x="584" y={22 + 119 * i + 62} textAnchor="middle">{l}</text>
        </g>
      ))}

      {/* Front view: cover plate */}
      <g className="ds-part">
        <line x1="42" y1="160" x2="318" y2="160" className="ds-center" />
        <line x1="180" y1="52" x2="180" y2="268" className="ds-center" />
        <rect x="60" y="70" width="240" height="180" rx="8" className="ds-outline" />
        <rect x="120" y="118" width="120" height="84" rx="5" className="ds-outline" />
        {[[80, 90], [280, 90], [80, 230], [280, 230]].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="6" className="ds-outline ds-thin" />
            <line x1={cx - 11} y1={cy} x2={cx + 11} y2={cy} className="ds-center" />
            <line x1={cx} y1={cy - 11} x2={cx} y2={cy + 11} className="ds-center" />
          </g>
        ))}
      </g>

      {/* Side view */}
      <g className="ds-part">
        <line x1="352" y1="52" x2="352" y2="268" className="ds-center" />
        <rect x="342" y="70" width="20" height="180" className="ds-outline" />
        <rect x="342" y="70" width="20" height="180" fill={`url(#${hatch})`} className="ds-section" />
        <line x1="342" y1="118" x2="362" y2="118" className="ds-hidden" />
        <line x1="342" y1="202" x2="362" y2="202" className="ds-hidden" />
      </g>

      {/* Dimensions */}
      {/* Original axonometric detail of the same fictional cover plate. */}
      <g transform="translate(465 115)">
        <path d="M-58 0 L28 -30 L78 6 L-8 37 Z" fill="#e7ebef" stroke="#66717b" strokeWidth="1" />
        <path d="M-58 0 L-8 37 L-8 47 L-58 10 Z" fill="#b4bdc7" stroke="#66717b" strokeWidth="1" />
        <path d="M-8 37 L78 6 L78 16 L-8 47 Z" fill="#d0d7de" stroke="#66717b" strokeWidth="1" />
        <path d="M-18 1 L18 -12 L42 5 L6 18 Z" fill="#fafbf9" stroke="#66717b" strokeWidth="1" />
        <path d="M-18 1 L-18 8 L6 25 L6 18 Z" fill="#a5b0bc" stroke="#66717b" strokeWidth=".7" />
        <path d="M6 18 L42 5 L42 12 L6 25 Z" fill="#c5ced7" stroke="#66717b" strokeWidth=".7" />
        {[[-43, 1], [26, -22], [-7, 30], [64, 6]].map(([cx, cy]) => <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="3.7" ry="2" fill="#87929d" stroke="#66717b" strokeWidth=".6" />)}
        <text x="7" y="77" textAnchor="middle" fontSize="7" fill="#66717b">ISOMETRIC VIEW</text>
        <text x="7" y="88" textAnchor="middle" fontSize="6" fill="#87929d">ILLUSTRATIVE · NOT TO SCALE</text>
      </g>
      <g className="ds-ext">
        <line x1="60" y1="254" x2="60" y2="292" />
        <line x1="300" y1="254" x2="300" y2="292" />
        <line x1="56" y1="70" x2="34" y2="70" />
        <line x1="56" y1="250" x2="34" y2="250" />
      </g>
      <Dim x1={60} y1={286} x2={300} y2={286} text="240" marker={arrow} />
      <Dim x1={40} y1={70} x2={40} y2={250} text="180" marker={arrow} vertical />
      <Dim x1={120} y1={110} x2={240} y2={110} text="120" marker={arrow} />
      <g className="ds-leader">
        <polyline points="286,95 318,62 346,62" />
        <text x="320" y="57">4× Ø12</text>
      </g>

      {/* Notes */}
      <g className="ds-notes">
        <text x="40" y="314" className="ds-notes-title">NOTES</text>
        <text x="40" y="328">1. REMOVE ALL BURRS.</text>
        <text x="40" y="341">2. DIMENSIONS IN MM.</text>
        <text x="40" y="363" className={changed ? 'ds-changed' : undefined}>{NOTE3[rev]}</text>
        {rev === 'B' && (
          <g className="ds-delta">
            <path d="M244 365 l7 -12 l7 12 Z" />
            <text x="251" y="363" textAnchor="middle">B</text>
          </g>
        )}
      </g>
      {changed && <rect x="36" y="353" width={rev === 'B' ? 200 : 132} height="14" className="ds-highlight" />}
      {cloud && (
        <path
          d={cloudPath(33, 353, rev === 'B' ? 232 : 146, 14, 5)}
          className="ds-cloud"
          pathLength={1}
        />
      )}
      {pin && (
        <g className="ds-pin" transform={`translate(${rev === 'B' ? 290 : 206} 360)`}>
          <line x1="-14" y1="0" x2="-4" y2="0" />
          <circle r="10" />
          <text y="4" textAnchor="middle">1</text>
        </g>
      )}

      {/* Title block */}
      <g className="ds-title">
        <rect x="392" y="300" width="186" height="78" />
        <line x1="392" y1="326" x2="578" y2="326" />
        <line x1="392" y1="352" x2="578" y2="352" />
        <line x1="496" y1="326" x2="496" y2="378" />
        <line x1="540" y1="326" x2="540" y2="378" />
        <text x="400" y="311" className="ds-title-key">TITLE</text>
        <text x="400" y="321" className="ds-title-val">ACCESS COVER</text>
        <text x="400" y="336" className="ds-title-key">DWG NO</text>
        <text x="400" y="347" className="ds-title-val">DEMO-104</text>
        <text x="502" y="336" className="ds-title-key">SCALE</text>
        <text x="502" y="347" className="ds-title-val">1:2</text>
        <text x="546" y="336" className="ds-title-key">REV</text>
        <text x="546" y="347" className="ds-title-val ds-rev">{rev}</text>
        <text x="400" y="362" className="ds-title-key">STATUS</text>
        <text x="400" y="373" className="ds-title-val">FOR REVIEW</text>
        <text x="502" y="362" className="ds-title-key">SHEET</text>
        <text x="502" y="373" className="ds-title-val">1/1</text>
        <text x="546" y="362" className="ds-title-key">SIZE</text>
        <text x="546" y="373" className="ds-title-val">A3</text>
      </g>
    </svg>
  )
}
