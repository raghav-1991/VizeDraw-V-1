import { useId, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { firstOf, getPage, section } from '../content'
import { uiCopy } from '../content/ui'
import { getResources, matches, resourceTypes, type Resource, type ResourceType } from '../content/resources'
import { utility } from '../content/site'
import { Actions } from '../components/Action'
import { Hero, Meta } from '../components/content'

const page = getPage(12)
const resources = getResources()
const groups = ['Start with the essentials', 'Evaluate the technology']

function ResourceRow({ r }: { r: Resource }) {
  return (
    <li>
      <Link to={r.route} className="resource">
        <span className="resource__body">
          <span className="resource__type">{r.type}</span>
          <h3>{r.item.term}</h3>
          <p>{r.item.text}</p>
        </span>
        <svg className="resource__arrow" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
          <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </Link>
    </li>
  )
}

export default function Resources() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<ResourceType | 'All'>('All')
  const navigate = useNavigate()
  const searchId = useId()
  const cta = firstOf(section(page, 'Evaluate the technology'), 'cta')

  const filtered = useMemo(
    () => resources.filter((r) => (type === 'All' || r.type === type) && matches(r, query)),
    [query, type],
  )
  const filtering = query.trim() !== '' || type !== 'All'

  const reset = () => {
    setQuery('')
    setType('All')
    navigate(utility.noResults.action.to)
  }

  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: page.name }]} variant="stacked" />

      <div className="band band--top-rule">
        <div className="container">
          <div className="finder" role="search">
            <div className="finder__search">
              <label htmlFor={searchId} className="label">{uiCopy.resources.searchLabel}</label>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
            <fieldset className="finder__filters">
              <legend className="label">{uiCopy.resources.filterLabel}</legend>
              <div className="segmented">
                {(['All', ...resourceTypes] as const).map((t) => (
                  <label key={t} className="segmented__opt">
                    <input type="radio" name="resource-type" checked={type === t} onChange={() => setType(t)} />
                    <span>{t === 'All' ? uiCopy.resources.all : t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="finder__count" aria-live="polite">{uiCopy.resources.results(filtered.length)}</p>
          </div>

          {filtered.length === 0 ? (
            <div className="empty" role="status">
              <p>{utility.noResults.copy}</p>
              <button type="button" className="btn btn--secondary" onClick={reset}>
                {utility.noResults.action.label}
              </button>
            </div>
          ) : filtering ? (
            <ul className="resources">
              {filtered.map((r) => (
                <ResourceRow key={r.route} r={r} />
              ))}
            </ul>
          ) : (
            groups.map((g) => {
              const s = section(page, g)
              return (
                <section key={g} id={s.id} className="resources-group" aria-labelledby={`${s.id}-h`}>
                  <h2 id={`${s.id}-h`}>{s.heading}</h2>
                  <ul className="resources">
                    {resources.filter((r) => r.group === g).map((r) => (
                      <ResourceRow key={r.route} r={r} />
                    ))}
                  </ul>
                </section>
              )
            })
          )}

          <Actions primary={cta.primary} secondary={cta.secondary} className="actions--after" />
        </div>
      </div>
    </>
  )
}
