import { Link } from 'react-router'
import { footer } from '../content/site'
import { destinationFor, legalFields, resolveFields } from '../content/commercial'
import { legalDoc } from '../content/legal'
import { Wordmark } from './Wordmark'

export function Footer() {
  const copyright = resolveFields(footer.copyright).map((p) => p.text).join('')

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link to="/" aria-label={`${footer.brand} home`}>
              <Wordmark inverse />
            </Link>
            <p>{footer.tagline}</p>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.heading} className="site-footer__col" aria-label={`${col.heading} links`}>
              <h2 className="label">{col.heading}</h2>
              <ul>
                {col.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p>{copyright}</p>
          <ul className="site-footer__legal" aria-label="Legal">
            {footer.legal.map((item) => {
              // A configured external URL wins; otherwise the site's own legal page.
              const external = destinationFor(legalFields[item.key])
              return (
                <li key={item.key}>
                  {external ? <a href={external}>{item.label}</a> : <Link to={legalDoc(item.key).route}>{item.label}</Link>}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}
