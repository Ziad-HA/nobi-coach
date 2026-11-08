import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CHAT_TO } from '../config'
import { t } from '../text'

// [route, copy key]. Hash links work from any page because ScrollManager (App.jsx) handles them.
const LINKS = [
  ['/#program', 'nav.features'],
  ['/#results', 'nav.results'],
  ['/#feedback', 'nav.feedback'],
  ['/#packages', 'nav.packages'],
  ['/faq', 'nav.faq'],
]

function ChatIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 20.5l1.6-5.3A8.4 8.4 0 1 1 21 11.5Z" />
    </svg>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const cls = ['nav-nobi', open ? 'open' : '', scrolled ? 'scrolled' : ''].filter(Boolean).join(' ')

  return (
    <header className={cls}>
      <a className="skip" href="#main">
        {t('nav.skip')}
      </a>
      <div className="nav-inner-nobi">
        <Link className="logo-nobi" to="/" onClick={close}>
          <span className="logo-red">NOBI</span>
          <span>COACH</span>
        </Link>

        <nav id="primary-nav" className="nav-links-nobi" aria-label="Primary">
          {LINKS.map(([to, key]) => (
            <Link key={to} to={to} onClick={close}>
              {t(key)}
            </Link>
          ))}
          <Link className="btn-chat-nobi chat-in-menu" to={CHAT_TO} onClick={close}>
            <ChatIcon />
            {t('nav.chat')}
          </Link>
        </nav>

        <div className="nav-cta-nobi">
          <Link className="btn-chat-nobi chat-in-bar" to={CHAT_TO}>
            <ChatIcon />
            {t('nav.chat')}
          </Link>
          <button
            className="nav-toggle-nobi"
            type="button"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </div>
    </header>
  )
}
