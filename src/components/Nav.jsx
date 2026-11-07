import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n'

const LINKS = [
  ['/', 'nav.home'],
  ['/about', 'nav.about'],
  ['/#program', 'nav.programs'],
  ['/#packages', 'nav.packages'],
  ['/transformations', 'nav.transformations'],
  ['/#calc', 'nav.calc'],
  ['/#contact', 'nav.contact'],
]

export function Arrow() {
  return (
    <svg className="icon arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export default function Nav() {
  const { t, toggle } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cls = ['nav', open ? 'open' : '', scrolled ? 'scrolled' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={cls}>
      <a className="skip" href="#main">
        {t('nav.skip')}
      </a>
      <div className="nav-inner">
        <Link className="logo" to="/" dir="ltr" onClick={() => setOpen(false)}>
          NOBI<span>COACH</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(([to, key]) => {
            const active = !to.includes('#') && to === pathname && to !== '/'
            return (
              <Link
                key={to}
                to={to}
                className={active ? 'active' : undefined}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {t(key)}
              </Link>
            )
          })}
        </nav>
        <div className="nav-cta">
          <button
            className="lang-btn"
            type="button"
            onClick={toggle}
            aria-label={t('nav.langLabel')}
          >
            {t('nav.lang')}
          </button>
          <Link className="btn btn-primary nav-join" to="/#packages">
            {t('nav.join')} <Arrow />
          </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-label={open ? t('nav.close') : t('nav.menu')}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </div>
    </header>
  )
}
