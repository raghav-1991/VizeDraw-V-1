import type { CSSProperties } from 'react'
// Before / after: a scattered, hand-carried workflow resolving into one
// registered line. Decorative geometry is aria-hidden; the steps are lists.

const before = [
  { k: 'Email', glyph: 'mail' },
  { k: 'PDF files', glyph: 'doc' },
  { k: 'Folders', glyph: 'folder' },
  { k: 'Spreadsheets', glyph: 'grid' },
  { k: 'Manual revision tracking', glyph: 'rev' },
  { k: 'Disconnected comments', glyph: 'note' },
]

const after = [
  { k: 'Project Workspace' },
  { k: 'Organised Drawings' },
  { k: 'Revision Control' },
  { k: 'Review' },
  { k: 'Measurement' },
  { k: 'Collaboration' },
  { k: 'Controlled Information' },
]

const glyphs: Record<string, string> = {
  mail: 'M2 4h14v10H2zM2 4l7 6 7-6',
  doc: 'M4 2h7l3 3v11H4zM11 2v3h3',
  folder: 'M2 5h5l2 2h7v8H2z',
  grid: 'M2 3h14v12H2zM2 7h14M2 11h14M7 3v12M12 3v12',
  rev: 'M9 3a6 6 0 1 1-6 6M3 3v6h6',
  note: 'M3 3h12v9H8l-4 3v-3H3z',
}

export function Transformation() {
  return (
    <div className="xform">
      <div className="xform__lane xform__lane--before">
        <div className="xform__lane-head">
          <h3>Traditional workflow</h3>
        </div>
        <div className="xform__scatter">
          <svg className="xform__tangle" viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true">
            <path d="M70 70 C 220 200, 260 -20, 400 120 S 620 30, 560 160 S 820 40, 930 150" />
            <path d="M90 160 C 250 40, 330 210, 480 60 S 700 190, 760 70 S 900 190, 950 60" />
            <path d="M140 110 C 300 110, 380 30, 520 140 S 760 100, 880 110" />
          </svg>
          <ol className="xform__nodes">
            {before.map((n, i) => (
              <li key={n.k} className="xform__node" style={{ '--i': i } as CSSProperties}>
                <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true"><path d={glyphs[n.glyph]} /></svg>
                <span className="xform__k">{n.k}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="xform__resolve" aria-hidden="true">
        <span className="xform__resolve-line" />
        <span className="xform__resolve-label">One workspace</span>
        <span className="xform__resolve-line" />
      </div>

      <div className="xform__lane xform__lane--after">
        <div className="xform__lane-head">
          <h3>VizeDraw</h3>
        </div>
        <ol className="xform__line">
          {after.map((n, i) => (
            <li key={n.k} style={{ '--i': i } as CSSProperties}>
              <span className="xform__station" aria-hidden="true" />
              <span className="xform__k">{n.k}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
