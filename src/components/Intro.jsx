import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { t } from '../text'
import CountUp from './CountUp'

const ease = [0.76, 0, 0.24, 1]

const PLATES = [
  { x: 126, h: 74, c: 'red' },
  { x: 114, h: 62, c: 'white' },
  { x: 102, h: 50, c: 'red' },
  { x: 90, h: 38, c: 'white' },
]

// A barbell that gets loaded plate by plate while the percentage counts up.
function Barbell() {
  return (
    <svg className="intro-bell" viewBox="0 0 320 90" aria-hidden="true">
      <motion.rect
        className="bell-bar"
        x="6"
        y="43"
        width="308"
        height="4"
        rx="2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ transformOrigin: '160px 45px' }}
        transition={{ duration: 0.5, ease }}
      />
      {PLATES.flatMap((p, i) =>
        [-1, 1].map((side) => {
          const x = side < 0 ? p.x : 320 - p.x - 9
          return (
            <motion.rect
              key={`${i}${side}`}
              className={`bell-plate ${p.c}`}
              x={x}
              y={45 - p.h / 2}
              width="9"
              height={p.h}
              rx="2"
              initial={{ opacity: 0, x: side * 46 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.55 + i * 0.5, ease }}
            />
          )
        }),
      )}
    </svg>
  )
}

export default function Intro({ onDone }) {

  useEffect(() => {
    const id = setTimeout(onDone, 3200)
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
        <Barbell />
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
        <p className="intro-count" aria-hidden="true">
          <CountUp to={100} suffix="%" duration={2.4} />
        </p>
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
        transition={{ duration: 2.7, ease: 'linear' }}
      />
    </motion.div>
  )
}
