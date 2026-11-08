import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Arrow } from '../components/Arrow'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import SplitText from '../components/SplitText'
import { CHAT_TO } from '../config'
import { FAQ } from '../data'
import { EASE } from '../lib/motion'
import { t } from '../text'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <>
      <section className="page-hero faq-hero">
        <p className="eyebrow rise" style={{ '--i': 0 }}>
          {t('faq.eyebrow')}
        </p>
        <SplitText
          as="h1"
          trigger="load"
          delay={0.1}
          className="faq-title"
          text="FREQUENTLY ASKED *QUESTIONS*"
        />
        <p className="hero-copy rise" style={{ '--i': 3 }}>
          {t('faq.sub')}
        </p>
      </section>

      <section className="section faq-section">
        <RevealGroup className="faq-list" stagger={0.08}>
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <RevealItem className={isOpen ? 'faq-item is-open' : 'faq-item'} key={item.q}>
                <h2 className="faq-q">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <svg className="icon faq-chevron" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </h2>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </section>

      <section className="section">
        <Reveal className="cta-band">
          <div>
            <h2>{t('faq.cta.title')}</h2>
            <p className="lede muted" style={{ marginTop: '0.8rem' }}>
              {t('faq.cta.text')}
            </p>
          </div>
          <div className="btn-row">
            <Link className="btn btn-primary" to={CHAT_TO}>
              {t('faq.cta.btn')} <Arrow />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
