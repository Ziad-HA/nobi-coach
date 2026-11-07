import { useState } from 'react'

const LINKS = [
  ['#top', 'Home'],
  ['#program', 'Programs'],
  ['#packages', 'Packages'],
  ['#results', 'Results'],
  ['#calc', 'Calc'],
  ['#contact', 'Contact'],
]

export function Arrow() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className={open ? 'nav open' : 'nav'}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="nav-inner">
        <a className="logo" href="#top">
          NOBI<span>COACH</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <a className="icon-btn" href="#calc" aria-label="Calculator">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </a>
          <a className="icon-btn" href="#contact" aria-label="Contact">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </a>
          <a className="btn btn-primary nav-join" href="#packages">
            Join Now <Arrow />
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  )
}
