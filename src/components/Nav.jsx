import { useEffect, useState } from 'react'

const LINKS = [
  ['#program', 'Program'],
  ['#packages', 'Packages'],
  ['#results', 'Results'],
  ['#calc', 'Calc'],
  ['#contact', 'Contact'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cls = ['nav', open && 'open', scrolled && 'scrolled']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={cls}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="nav-inner">
        <a className="logo" href="#top">
          NOBI<i>.</i>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <a className="btn btn-ghost ghost-hide" href="#book">
            Book
          </a>
          <a className="btn btn-primary" href="#packages">
            Subscribe
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
