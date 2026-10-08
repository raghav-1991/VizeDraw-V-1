// Solutions content: the four industry workflows shown on the homepage and
// the Solutions hub. Written for the 2026 redesign (not part of the original
// content document).

export interface Industry {
  id: string
  name: string
  statement: string
  body: string
  flow: string[]
  sheet: string
}

export const industries: Industry[] = [
  {
    id: 'construction',
    name: 'Construction',
    statement: 'The current set, on every desk and every site.',
    body: 'Issue drawing sets by discipline, raise RFIs against the exact grid line they concern and make sure site builds from the revision that was actually approved.',
    flow: ['Issue set', 'Raise RFI', 'Respond on sheet', 'Re-issue'],
    sheet: 'S-101 · Structural',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    statement: 'Design review with the evidence on the drawing.',
    body: 'Run review gates on released drawings, compare revisions before approval and keep every comment tied to the feature it questions — not a spreadsheet row.',
    flow: ['Submit', 'Review gate', 'Compare revision', 'Approve'],
    sheet: 'DEMO-104 · Rev B',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    statement: 'From released drawing to first-article inspection.',
    body: 'Balloon characteristics, hand quality the controlled revision and record inspection results against the same sheet production is working from.',
    flow: ['Release', 'Balloon', 'Inspect', 'Hand off'],
    sheet: 'P-2210 · Flange',
  },
  {
    id: 'fabrication',
    name: 'Fabrication',
    statement: 'Shop drawings that turn straight into cut lists.',
    body: 'Measure plate and member sizes from calibrated shop drawings, extract quantities for nesting and track which revision each part was cut from.',
    flow: ['Shop drawing', 'Measure', 'Take off', 'Nest & cut'],
    sheet: 'F-031 · Plate set',
  },
]
