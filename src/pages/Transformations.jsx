import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from '../components/Arrow'
import Reveal from '../components/Reveal'
import TransformCard from '../components/TransformCard'
import { TRANSFORMATIONS } from '../data'
import { Lines, useLang } from '../i18n'

export default function Transformations() {
  const { t } = useLang()
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (open === null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow rise" style={{ '--i': 0 }}>
          {t('tfp.eyebrow')}
        </p>
        <h1 className="rise" style={{ '--i': 1 }}>
          <Lines text={t('tfp.h1')} />
        </h1>
        <p className="hero-copy rise" style={{ '--i': 2 }}>
          {t('tfp.lead')}
        </p>
        <p className="count-chip rise" style={{ '--i': 3 }}>
          {t('tfp.count', { n: TRANSFORMATIONS.length })}
        </p>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <Reveal className="transform-page-grid" delay={0.2} y={34}>
          {TRANSFORMATIONS.map((item, i) => (
            <TransformCard
              key={item.src}
              item={item}
              index={i}
              detailed
              onOpen={setOpen}
            />
          ))}
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="cta-band">
          <div>
            <h2>{t('tfp.cta.title')}</h2>
            <p className="lede muted" style={{ marginTop: '0.8rem' }}>
              {t('tfp.cta.text')}
            </p>
          </div>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/#packages">
              {t('about.cta.packages')} <Arrow />
            </Link>
            <Link className="btn btn-ghost" to="/#book">
              {t('about.cta.book')}
            </Link>
          </div>
        </Reveal>
      </section>

      {open !== null ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <button
            className="lightbox-close"
            type="button"
            autoFocus
            onClick={() => setOpen(null)}
          >
            {t('tfp.close')}
          </button>
          <img
            src={TRANSFORMATIONS[open].src}
            alt={`${t('tf.alt')} ${open + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  )
}
