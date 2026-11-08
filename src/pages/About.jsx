import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from '../components/Arrow'
import Reveal from '../components/Reveal'
import { STATS } from '../data'
import { Lines, useLang } from '../i18n'

const VALUES = ['v1', 'v2', 'v3']
const STEPS = ['s1', 's2', 's3', 's4']

export default function About() {
  const { t, pick } = useLang()
  const [noPhoto, setNoPhoto] = useState(false)

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-grid">
          <div>
            <p className="eyebrow rise" style={{ '--i': 0 }}>
              {t('about.eyebrow')}
            </p>
            <h1 className="rise" style={{ '--i': 1 }}>
              <Lines text={t('about.h1')} />
            </h1>
            <p className="hero-copy rise" style={{ '--i': 2 }}>
              {t('about.lead')}
            </p>
            <div className="btn-row rise" style={{ '--i': 3 }}>
              <Link className="btn btn-primary" to="/#packages">
                {t('about.cta.packages')} <Arrow />
              </Link>
              <Link className="btn btn-ghost" to="/#book">
                {t('about.cta.book')}
              </Link>
            </div>
          </div>
          <div className="portrait rise-late" style={{ '--i': 0 }}>
            {/* Drop a photo at public/nobi.jpg and it shows here automatically. */}
            {noPhoto ? null : (
              <img
                src="/nobi.jpg"
                alt="Nobi"
                onError={() => setNoPhoto(true)}
              />
            )}
            <span className="portrait-mark" dir="ltr" aria-hidden="true">
              N
            </span>
            <span className="shot-label">{t('about.portrait')}</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <Reveal className="impact" y={30}>
          <div className="stats">
            {STATS.map((s) => (
              <div className="stat" key={pick(s.label)}>
                <strong dir="ltr">{pick(s.value)}</strong>
                <span>{pick(s.label)}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="story-grid">
          <Reveal>
            <p className="eyebrow">{t('about.story.eyebrow')}</p>
            <h2>{t('about.story.title')}</h2>
          </Reveal>
          <Reveal delay={0.15} className="story-text">
            <p className="lede">{t('about.story.p1')}</p>
            <p className="lede">{t('about.story.p2')}</p>
            <p className="lede">{t('about.story.p3')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">{t('about.values.eyebrow')}</p>
            <h2>{t('about.values.title')}</h2>
          </div>
        </Reveal>
        <Reveal className="value-grid" delay={0.15}>
          {VALUES.map((v, i) => (
            <article className="program-card" key={v}>
              <code>0{i + 1}</code>
              <h3>{t(`about.${v}.title`)}</h3>
              <p className="muted">{t(`about.${v}.text`)}</p>
            </article>
          ))}
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">{t('about.how.eyebrow')}</p>
            <h2>{t('about.how.title')}</h2>
          </div>
        </Reveal>
        <Reveal className="program-grid" delay={0.15}>
          {STEPS.map((s, i) => (
            <article className="program-card" key={s}>
              <code>0{i + 1}</code>
              <h3>{t(`about.${s}.title`)}</h3>
              <p className="muted">{t(`about.${s}.text`)}</p>
            </article>
          ))}
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="cta-band">
          <h2>{t('about.cta.title')}</h2>
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
    </>
  )
}
