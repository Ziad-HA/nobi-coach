import { Link } from 'react-router-dom'
import { CHAT_TO, SOCIALS } from '../config'
import { t } from '../text'

const ICONS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" />
    </>
  ),
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" />,
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9.5 5 2.5-5 2.5Z" />
    </>
  ),
}

export default function Footer() {
  const socials = Object.entries(SOCIALS).filter(([, url]) => url)
  return (
    <footer className="footer-nobi">
      <div className="footer-grid">
        <div>
          <p className="footer-logo">
            <span className="logo-red">NOBI</span> COACH
          </p>
          <p className="footer-tag">{t('footer.tag')}</p>
          {socials.length ? (
            <div className="socials">
              {socials.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name}>
                  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                    {ICONS[name]}
                  </svg>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <nav aria-label="Footer">
          <h3>{t('footer.quick')}</h3>
          <Link to="/#program">{t('nav.features')}</Link>
          <Link to="/#results">{t('nav.results')}</Link>
          <Link to="/#feedback">{t('nav.feedback')}</Link>
          <Link to="/#packages">{t('nav.packages')}</Link>
          <Link to="/faq">{t('nav.faq')}</Link>
        </nav>

        <nav aria-label="More">
          <h3>{t('footer.more')}</h3>
          <Link to="/about">{t('about.eyebrow')}</Link>
          <Link to="/transformations">{t('tfp.eyebrow')}</Link>
          <Link to="/#calc">{t('calc.eyebrow').split(' /')[0]}</Link>
          <Link to="/#payment">{t('pay.eyebrow')}</Link>
        </nav>

        <div>
          <h3>{t('footer.contact')}</h3>
          <Link className="footer-chat" to={CHAT_TO}>
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 20.5l1.6-5.3A8.4 8.4 0 1 1 21 11.5Z" />
            </svg>
            {t('footer.chat')}
          </Link>
          <p className="footer-note">{t('footer.chatText')}</p>
        </div>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} NOBI Coach. {t('footer.rights')}
      </p>
    </footer>
  )
}
