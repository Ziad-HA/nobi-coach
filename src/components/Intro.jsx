import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { t } from '../text'

const ease = [0.76, 0, 0.24, 1]

export default function Intro({ onDone }) {

  useEffect(() => {
    const id = setTimeout(onDone, 2500)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(id)
      document.body.style.overflow = ''
    }
  }, [onDone])

  return (
    <motion.div
      className="intro"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.85, ease }}
    >
      <button className="intro-skip" type="button" onClick={onDone}>
        {t('intro.skip')}
      </button>
      <div className="intro-center">
        <div className="intro-word" aria-label="NOBI COACH">
          {'NOBI'.split('').map((ch, i) => (
            <span className="intro-mask" key={i}>
              <motion.span
                initial={{ y: '115%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </div>
        <span className="intro-mask intro-sub">
          <motion.span
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
          >
            COACH
          </motion.span>
        </span>
      </div>
      <motion.p
        className="intro-tag"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        {t('intro.tag')}
      </motion.p>
      <motion.span
        className="intro-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.2, ease: 'linear' }}
      />
    </motion.div>
  )
}
