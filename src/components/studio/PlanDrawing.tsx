// An original, illustrative structural framing plan (fictional sheet S-101).
// Drawn as SVG so overlays — revisions, measurements, markups, search hits —
// can be layered and animated precisely. Not a product screenshot.
import { useId } from 'react'
import { cloud } from './geometry'

export type PlanOverlay = 'none' | 'revision' | 'measure' | 'markup' | 'search' | 'collab' | 'access'

interface PlanDrawingProps {
  overlay?: PlanOverlay
  /** Show the previous revision as a ghost layer under the current one. */
  ghost?: boolean
  /** Crop: "x y w h" in plan units. */
  viewBox?: string
  label: string
  className?: string
}

const GRID_X = [90, 220, 350, 480, 610]
const GRID_Y = [96, 196, 296, 396]
const COLS = ['A', 'B', 'C', 'D', 'E']
const ROWS = ['1', '2', '3', '4']

function Beams({ className = 'pl-beam' }: { className?: string }) {
  const lines: [number, number, number, number, string][] = []
  GRID_Y.forEach((y, r) =>
    GRID_X.slice(0, -1).forEach((x, c) => lines.push([x, y, GRID_X[c + 1], y, `h${r}${c}`])),
  )
  GRID_X.forEach((x, c) =>
    GRID_Y.slice(0, -1).forEach((y, r) => lines.push([x, y, x, GRID_Y[r + 1], `v${c}${r}`])),
  )
  return (
    <g className={className}>
      {lines.map(([x1, y1, x2, y2, k]) => (
        <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
    </g>
  )
}

export function PlanDrawing({ overlay = 'none', ghost = false, viewBox = '0 0 800 520', label, className = '' }: PlanDrawingProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const hatch = `pl-hatch-${uid}`
  const tick = `pl-tick-${uid}`
  const accentTick = `pl-atick-${uid}`

  return (
    <svg className={`plandraw plandraw--${overlay} ${className}`.trim()} viewBox={viewBox} role={label ? 'img' : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true} preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id={hatch} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="pl-hatch-line" />
        </pattern>
        <marker id={tick} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M2 8L8 2" className="pl-tick" />
        </marker>
        <marker id={accentTick} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="9" markerHeight="9" orient="auto">
          <path d="M2 8L8 2" className="pl-tick pl-tick--accent" />
        </marker>
      </defs>

      {/* Sheet */}
      <rect className="pl-paper" x="0" y="0" width="800" height="520" />
      <rect className="pl-border" x="14" y="14" width="772" height="492" />
      <g className="pl-zones">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <g key={n}>
            <line x1={14 + (772 / 6) * n} y1="14" x2={14 + (772 / 6) * n} y2="8" />
            <text x={14 + (772 / 6) * (n - 0.5)} y="11">{n}</text>
          </g>
        ))}
      </g>

      {/* Structural grid */}
      <g className="pl-grid">
        {GRID_X.map((x, i) => (
          <g key={COLS[i]}>
            <line x1={x} y1="58" x2={x} y2="440" />
            <circle cx={x} cy="44" r="10" />
            <text x={x} y="48">{COLS[i]}</text>
          </g>
        ))}
        {GRID_Y.map((y, i) => (
          <g key={ROWS[i]}>
            <line x1="52" y1={y} x2="648" y2={y} />
            <circle cx="38" cy={y} r="10" />
            <text x="38" y={y + 4}>{ROWS[i]}</text>
          </g>
        ))}
      </g>

      {/* Slab edge and core */}
      <rect className="pl-slab" x="72" y="80" width="556" height="332" />
      <rect className="pl-core" x="232" y="206" width="106" height="80" fill={`url(#${hatch})`} />
      <text className="pl-room" x="285" y="250">CORE</text>

      {/* Previous revision as ghost */}
      {ghost && (
        <g className="pl-ghost">
          <line x1="480" y1="246" x2="610" y2="246" />
          <rect x="474" y="240" width="12" height="12" />
        </g>
      )}

      <Beams />

      {/* Columns */}
      <g className="pl-col">
        {GRID_X.flatMap((x) => GRID_Y.map((y) => <rect key={`${x}-${y}`} x={x - 6} y={y - 6} width="12" height="12" />))}
      </g>

      {/* Beam marks */}
      <g className="pl-mark">
        <text x="155" y="90">W12×26</text>
        <text x="415" y="90">W12×26</text>
        <text x="155" y="390">W14×30</text>
        <text x="545" y="390">W14×30</text>
        <text x="415" y="190">W16×31</text>
      </g>

      {/* Dimensions along the top */}
      <g className="pl-dim">
        {GRID_X.slice(0, -1).map((x, i) => (
          <g key={x}>
            <line x1={x} y1="66" x2={GRID_X[i + 1]} y2="66" markerStart={`url(#${tick})`} markerEnd={`url(#${tick})`} />
            <text x={(x + GRID_X[i + 1]) / 2} y="62">7200</text>
          </g>
        ))}
        <g>
          <line x1="660" y1={GRID_Y[0]} x2="660" y2={GRID_Y[3]} markerStart={`url(#${tick})`} markerEnd={`url(#${tick})`} />
          <text x="668" y="250" transform="rotate(90 668 250)">3 × 6000 = 18000</text>
        </g>
      </g>

      {/* North arrow and section mark */}
      <g className="pl-north" transform="translate(720 90)">
        <circle r="18" />
        <path d="M0 -14 L6 8 L0 3 L-6 8Z" />
        <text y="-22">N</text>
      </g>
      <g className="pl-section" transform="translate(720 170)">
        <circle r="13" />
        <line x1="-13" y1="0" x2="13" y2="0" />
        <text y="-3">A</text>
        <text y="9">S-301</text>
      </g>

      {/* Title block */}
      <g className="pl-title">
        <rect x="620" y="420" width="166" height="86" />
        <line x1="620" y1="446" x2="786" y2="446" />
        <line x1="620" y1="476" x2="786" y2="476" />
        <line x1="703" y1="476" x2="703" y2="506" />
        <text className="pl-title__k" x="628" y="432">PROJECT</text>
        <text className="pl-title__v" x="628" y="442">HARBOUR WORKS — BLOCK C</text>
        <text className="pl-title__k" x="628" y="458">TITLE</text>
        <text className="pl-title__v" x="628" y="470">LEVEL 02 FRAMING PLAN</text>
        <text className="pl-title__k" x="628" y="488">SHEET</text>
        <text className="pl-title__big" x="628" y="502">S-101</text>
        <text className="pl-title__k" x="711" y="488">REV</text>
        <text className="pl-title__big pl-title__rev" x="711" y="502">04</text>
      </g>
      <text className="pl-general" x="30" y="470">GENERAL NOTES</text>
      <text className="pl-general pl-general--sm" x="30" y="484">1. ALL STEEL GRADE S355 U.N.O.</text>
      <text className="pl-general pl-general--sm" x="30" y="496">2. TOP OF STEEL +7.450 U.N.O.</text>

      {/* ---------- Overlays ---------- */}
      {overlay === 'revision' && (
        <g className="ov ov-revision">
          <path className="ov-cloud" d={cloud(466, 226, 158, 42)} pathLength={1} />
          <line className="ov-changed" x1="480" y1="266" x2="610" y2="266" />
          <rect className="ov-changed-col" x="474" y="260" width="12" height="12" />
          <g className="ov-delta" transform="translate(624 222)">
            <path d="M0 0 L10 -16 L20 0Z" />
            <text x="10" y="-4">4</text>
          </g>
          <g className="ov-diff-legend" transform="translate(470 142)">
            <rect width="126" height="30" />
            <text x="8" y="12">W16×31 MOVED</text>
            <text x="8" y="24" className="ov-diff-legend__sm">GRID 2.5 → 2.7 · REV 03→04</text>
          </g>
        </g>
      )}

      {overlay === 'measure' && (
        <g className="ov ov-measure">
          <line className="ov-m-line" x1={GRID_X[1]} y1="336" x2={GRID_X[3]} y2="336" markerStart={`url(#${accentTick})`} markerEnd={`url(#${accentTick})`} pathLength={1} />
          <line className="ov-m-ext" x1={GRID_X[1]} y1="302" x2={GRID_X[1]} y2="344" />
          <line className="ov-m-ext" x1={GRID_X[3]} y1="302" x2={GRID_X[3]} y2="344" />
          <g className="ov-m-chip" transform={`translate(${(GRID_X[1] + GRID_X[3]) / 2} 336)`}>
            <rect x="-40" y="-11" width="80" height="22" />
            <text y="4">14 400 mm</text>
          </g>
          <path className="ov-m-area" d={`M${GRID_X[3]} ${GRID_Y[1]} H${GRID_X[4]} V${GRID_Y[3]} H${GRID_X[3]}Z`} />
          <g className="ov-m-chip ov-m-chip--area" transform={`translate(${(GRID_X[3] + GRID_X[4]) / 2} ${(GRID_Y[1] + GRID_Y[3]) / 2})`}>
            <rect x="-38" y="-11" width="76" height="22" />
            <text y="4">86.4 m²</text>
          </g>
          <g className="ov-m-cal" transform="translate(72 430)">
            <text>CALIBRATED 1:100 · A1</text>
          </g>
        </g>
      )}

      {(overlay === 'markup' || overlay === 'collab') && (
        <g className="ov ov-markup">
          <path className="ov-cloud" d={cloud(336, 180, 156, 36)} pathLength={1} />
          <g className="ov-pin" transform="translate(500 176)">
            <circle r="11" />
            <text y="4">1</text>
          </g>
          <rect className="ov-box" x="224" y="200" width="122" height="94" />
          <g className="ov-pin ov-pin--2" transform="translate(224 200)">
            <circle r="11" />
            <text y="4">2</text>
          </g>
          <g className="ov-pin ov-pin--3" transform={`translate(${GRID_X[0]} ${GRID_Y[3]})`}>
            <circle r="11" />
            <text y="4">3</text>
          </g>
          <path className="ov-arrow" d={`M${GRID_X[0] + 50} ${GRID_Y[3] + 30} Q ${GRID_X[0] + 20} ${GRID_Y[3] + 30} ${GRID_X[0] + 8} ${GRID_Y[3] + 10}`} />
        </g>
      )}

      {overlay === 'search' && (
        <g className="ov ov-search">
          {[[155, 90], [415, 90]].map(([x, y]) => (
            <rect key={`${x}`} className="ov-hit" x={x - 30} y={y - 10} width="60" height="14" />
          ))}
          <Beams className="ov-hit-beams" />
        </g>
      )}

      {overlay === 'access' && (
        <g className="ov ov-access">
          <rect className="ov-lock" x="72" y="80" width="278" height="332" />
          <g transform="translate(211 330)" className="ov-lock-tag">
            <rect x="-62" y="-12" width="124" height="24" />
            <text y="4">RESTRICTED · STEEL PKG</text>
          </g>
        </g>
      )}
    </svg>
  )
}
