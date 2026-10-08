// Enterprise governance drawn as architecture: an axonometric stack of
// information levels with role access passing through them, plus a
// specification schedule instead of a feature grid.

const controls = [
  { code: 'G-01', k: 'Role-based access', d: 'Owner, reviewer, contributor and guest roles defined per project.' },
  { code: 'G-02', k: 'Permissions', d: 'Control who can view, mark up, issue revisions or share each set.' },
  { code: 'G-03', k: 'Audit trails', d: 'Every issue, view, download and decision recorded with time and author.' },
  { code: 'G-04', k: 'Controlled sharing', d: 'Share sheets externally as view-only, time-limited links.' },
  { code: 'G-05', k: 'Project organisation', d: 'Projects, sets and disciplines structured the way teams already work.' },
  { code: 'G-06', k: 'Review workflows', d: 'Named reviewers, required approvals and visible review status.' },
  { code: 'G-07', k: 'Team collaboration', d: 'Threads, mentions and decisions kept on the drawing they concern.' },
  { code: 'G-08', k: 'Enterprise governance', d: 'Consistent policy across projects, teams and external partners.' },
]

const levels = [
  { y: 0, k: 'Organisation', m: 'Policy · SSO · retention' },
  { y: 1, k: 'Project', m: 'Members · roles' },
  { y: 2, k: 'Drawing set', m: 'Discipline permissions' },
  { y: 3, k: 'Sheet', m: 'Markups · revisions · audit' },
]

export function GovernanceDiagram() {
  // Isometric plate: width 300, depth 150, drawn from an origin.
  const plate = (ox: number, oy: number) =>
    `M${ox} ${oy} L${ox + 180} ${oy - 60} L${ox + 330} ${oy - 10} L${ox + 150} ${oy + 50} Z`
  return (
    <svg className="gov" viewBox="0 0 560 470" role="img" aria-label="Diagram of four governance levels — organisation, project, drawing set and sheet — with owner, reviewer and guest access reaching different depths">
      <g className="gov__levels">
        {levels.map((l, i) => {
          const oy = 110 + i * 92
          return (
            <g key={l.k} className={`gov__level${i === 3 ? ' is-sheet' : ''}`}>
              <path className="gov__plate" d={plate(40, oy)} />
              <path className="gov__edge" d={`M40 ${oy} L40 ${oy + 6} L190 ${oy + 56} L370 ${oy - 4} L370 ${oy - 10}`} />
              <text className="gov__k" x="392" y={oy - 2}>{l.k}</text>
              <text className="gov__m" x="392" y={oy + 13}>{l.m}</text>
              <line className="gov__leader" x1="372" y1={oy - 6} x2="388" y2={oy - 6} />
            </g>
          )
        })}
      </g>
      {/* Role access shafts */}
      <g className="gov__shafts">
        <g className="gov__shaft is-owner">
          <line x1="130" y1="40" x2="130" y2="410" />
          <circle cx="130" cy="40" r="15" />
          <text x="130" y="44">O</text>
        </g>
        <g className="gov__shaft">
          <line x1="205" y1="40" x2="205" y2="330" />
          <circle cx="205" cy="40" r="15" />
          <text x="205" y="44">R</text>
        </g>
        <g className="gov__shaft is-guest">
          <line x1="280" y1="40" x2="280" y2="355" strokeDasharray="4 4" />
          <circle cx="280" cy="40" r="15" />
          <text x="280" y="44">G</text>
        </g>
      </g>
      <g className="gov__legend">
        <text x="40" y="455">O Owner · full depth</text>
        <text x="200" y="455">R Reviewer · to set</text>
        <text x="350" y="455">G Guest · shared sheets only</text>
      </g>
    </svg>
  )
}

export function ControlSchedule({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <ul className="controls" aria-label="Enterprise controls">
        {controls.map((c) => (
          <li key={c.code}>{c.k}</li>
        ))}
      </ul>
    )
  }
  return (
    <div className="schedule">
      <div className="schedule__head" aria-hidden="true">
        <span>Ref</span><span>Control</span><span>Specification</span>
      </div>
      <ul>
        {controls.map((c) => (
          <li key={c.code}>
            <h3>{c.k}</h3>
            <p>{c.d}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
