import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { t } from '../text'

const ease = [0.22, 1, 0.36, 1]

// Full-screen "I accept the terms" gate shown before the intro.
export default function Terms({ onAccept }) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <motion.div
      className="terms"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease }}
    >
      <motion.div
        className="terms-card"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
      >
        <p className="terms-logo">
          <span className="logo-red">NOBI</span> COACH
        </p>
        <h1 id="terms-title">{t('terms.title')}</h1>
        <div className="terms-body" tabIndex={0}>
          <p>{t('terms.p1')}</p>
          <p>{t('terms.p2')}</p>
          <p className="terms-note">{t('terms.p3')}</p>
        </div>
        <label className="terms-check">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span>{t('terms.agree')}</span>
        </label>
        <button type="button" className="btn-main-nobi terms-btn" disabled={!checked} onClick={onAccept}>
          {t('terms.btn')}
        </button>
      </motion.div>
    </motion.div>
  )
}
