import { Link } from 'react-router-dom'
import { useLang } from '../i18n'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <span>{t('footer.a')}</span>
      <span>{t('footer.b')}</span>
      <span className="footer-links">
        <Link to="/about">{t('nav.about')}</Link>
        <Link to="/transformations">{t('nav.transformations')}</Link>
        <span dir="ltr">© {new Date().getFullYear()}</span>
      </span>
    </footer>
  )
}
