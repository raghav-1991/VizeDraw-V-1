import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { headerActions, primaryNav, type NavItem } from '../content/site'
import { uiCopy } from '../content/ui'
import { Action } from './Action'
import { Wordmark } from './Wordmark'

const Chevron = () => (
  <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
    <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

function childRoutes(item: NavItem): string[] {
  // Anchors on the homepage ("/#integrations") never mark a section active.
  return (item.groups ?? []).flatMap((g) => g.links.map((l) => l.to.split('#')[0])).filter((to) => to !== '/')
}

function isSectionActive(item: NavItem, pathname: string) {
  if (pathname === item.to || pathname.startsWith(item.to + '/')) return true
  return childRoutes(item).includes(pathname)
}

function DesktopItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const active = isSectionActive(item, pathname)

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const hoverCapable = () => window.matchMedia('(hover: hover)').matches

  return (
    <li
      className={`nav__item${open ? ' is-open' : ''}${item.groups ? '' : ' nav__item--plain'}`}
      onMouseEnter={() => {
        if (!hoverCapable()) return
        window.clearTimeout(closeTimer.current)
        setOpen(true)
      }}
      onMouseLeave={() => {
        if (!hoverCapable()) return
        closeTimer.current = window.setTimeout(() => setOpen(false), 140)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          buttonRef.current?.focus()
        }
      }}
    >
      <NavLink
        to={item.to}
        className={() => `nav__link${active ? ' is-active' : ''}`}
        aria-current={pathname === item.to ? 'page' : undefined}
        onClick={() => setOpen(false)}
      >
        {item.label}
      </NavLink>
      {item.groups && (
        <>
          <button
            ref={buttonRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${item.label} menu`}
            onClick={() => setOpen((v) => !v)}
          >
            <Chevron />
          </button>
          <div id={panelId} className="nav__panel glass" hidden={!open}>
            {item.groups.map((group, i) => (
              <div className="nav__group" key={i}>
                {group.heading && <span className="label">{group.heading}</span>}
                <ul>
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="nav__panel-link"
                        aria-current={pathname === link.to ? 'page' : undefined}
                        onClick={() => setOpen(false)}
                      >
                        <span className="nav__panel-text">
                          <span className="nav__panel-label">{link.label}</span>
                          {link.note && <span className="nav__panel-note">{link.note}</span>}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </li>
  )
}

function MobileGroup({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <li className="mnav__item">
      <div className="mnav__row">
        <Link
          to={item.to}
          className={`mnav__link${isSectionActive(item, pathname) ? ' is-active' : ''}`}
          aria-current={pathname === item.to ? 'page' : undefined}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
        {item.groups && (
          <button
            type="button"
            className="mnav__toggle"
            aria-expanded={open}
            aria-controls={id}
            aria-label={`${item.label} menu`}
            onClick={() => setOpen((v) => !v)}
          >
            <Chevron />
          </button>
        )}
      </div>
      {item.groups && (
        <div id={id} className="mnav__sub" hidden={!open}>
          {item.groups.map((group, i) => (
            <div key={i}>
              {group.heading && <span className="label">{group.heading}</span>}
              <ul>
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} onClick={onNavigate} aria-current={pathname === link.to ? 'page' : undefined}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  )
}

export function Header() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const menuButton = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close the mobile menu whenever the route changes.
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return
    document.body.classList.add('menu-open')
    // Position the fixed panel directly under the header, wherever it sits.
    const bottom = panelRef.current?.parentElement?.getBoundingClientRect().bottom ?? 0
    panelRef.current?.style.setProperty('--mnav-top', `${Math.max(0, bottom)}px`)
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 1100px)').matches) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.classList.remove('menu-open')
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="VizeDraw home">
          <Wordmark />
        </Link>

        <nav className="nav" aria-label="Main">
          <ul className="nav__list">
            {primaryNav.map((item) => (
              <DesktopItem key={item.label} item={item} pathname={pathname} />
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <Action cta={headerActions.signIn} variant="text" className="site-header__signin" />
          <Action cta={headerActions.startFree} variant="primary" className="btn--small" />
          <button
            ref={menuButton}
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span>{menuOpen ? uiCopy.close : uiCopy.menu}</span>
            <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
              {menuOpen ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panelRef} className="mnav" hidden={!menuOpen}>
        <nav aria-label="Mobile">
          <ul className="mnav__list">
            {primaryNav.map((item) => (
              <MobileGroup key={item.label} item={item} pathname={pathname} onNavigate={closeMenu} />
            ))}
          </ul>
          <div className="mnav__actions">
            <Action cta={headerActions.startFree} variant="primary" onNavigate={closeMenu} />
            <Action cta={headerActions.signIn} variant="secondary" onNavigate={closeMenu} />
          </div>
        </nav>
      </div>
    </header>
  )
}
