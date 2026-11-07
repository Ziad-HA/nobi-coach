import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from '../components/Nav'
import Calc from '../components/Calc'
import Booking from '../components/Booking'
import Reveal from '../components/Reveal'
import TransformCard from '../components/TransformCard'
import { FEEDBACK, PACKAGES, PROGRAMS, STATS, TRANSFORMATIONS } from '../data'
import { Lines, useLang } from '../i18n'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Community />
      <Technique />
      <Programs />
      <Packages />
      <TransformationsTeaser />
      <Feedback />
      <Calc />
      <Booking />
      <Contact />
    </>
  )
}

const rise = (i) => ({ className: 'rise', style: { '--i': i } })

function Hero() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  const [lead, setLead] = useState({ name: '', email: '' })

  return (
    <section className="hero" id="top">
      <div className="hero-media" aria-hidden="true" />
      <div>
        <p className="hero-kicker rise" style={{ '--i': 0 }}>
          {t('hero.kicker')}
        </p>
        <h1>
          <span {...rise(1)}>{t('hero.l1')}</span>
          <span {...rise(2)}>
            <em>{t('hero.l2')}</em>
          </span>
          <span {...rise(3)}>{t('hero.l3')}</span>
        </h1>
        <p className="hero-copy rise" style={{ '--i': 4 }}>
          {t('hero.copy')}
        </p>
        <div className="hero-actions rise" style={{ '--i': 5 }}>
          <Link className="btn btn-primary" to="/#packages">
            {t('hero.start')} <Arrow />
          </Link>
          <Link className="btn btn-ghost" to="/#program">
            {t('hero.explore')}
          </Link>
        </div>
        <p className="hero-tags rise" style={{ '--i': 6 }} aria-hidden="true">
          <span>{t('hero.tag1')}</span>
          <span>{t('hero.tag2')}</span>
          <span>{t('hero.tag3')}</span>
        </p>
      </div>
      <aside className="hero-side">
        <div className="glass rise-late" style={{ '--i': 0 }}>
          <div className="glass-top">
            <div>
              <strong dir="ltr">{STATS[0].value}</strong>
              <small>{t('hero.clients')}</small>
            </div>
            <div className="glass-thumb" aria-hidden="true" />
          </div>
          <div className="avatars">
            <i />
            <i />
            <i />
            <span>
              <b dir="ltr">{STATS[2].value}</b>
              {t('hero.still')}
            </span>
          </div>
          <Link className="btn btn-primary" to="/#book">
            {t('hero.bookcall')} <Arrow />
          </Link>
        </div>
        <div className="glass consult rise-late" style={{ '--i': 1 }}>
          <h4>{t('hero.consult.title')}</h4>
          <p>{t('hero.consult.sub')}</p>
          {sent ? (
            <p role="status">{t('hero.thanks')}</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <label className="pill-field">
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
                <input
                  required
                  placeholder={t('hero.name')}
                  aria-label={t('hero.name')}
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                />
              </label>
              <label className="pill-field">
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <input
                  required
                  type="email"
                  dir="ltr"
                  placeholder={t('hero.email')}
                  aria-label={t('hero.email')}
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                />
                <button className="go-btn" type="submit" aria-label={t('hero.send')}>
                  <Arrow />
                </button>
              </label>
            </form>
          )}
        </div>
      </aside>
    </section>
  )
}

function Marquee() {
  const { t } = useLang()
  const words = t('marquee.words').split('|')
  const loop = [...words, ...words, ...words, ...words]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((w, i) => (
          <span key={`${w}-${i}`}>
            {i % 2 === 0 ? <b>{w}</b> : w} ·
          </span>
        ))}
      </div>
    </div>
  )
}

function Stats() {
  const { t, pick } = useLang()
  return (
    <section
      className="section"
      aria-label={t('stats.aria')}
      style={{ paddingBottom: 0 }}
    >
      <Reveal className="impact" y={30}>
        <div className="impact-head">
          <div>
            <p className="eyebrow">{t('impact.eyebrow')}</p>
            <h2>
              <Lines text={t('impact.title')} />
            </h2>
          </div>
          <p className="lede">{t('impact.copy')}</p>
        </div>
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
  )
}

function Community() {
  const { t } = useLang()
  return (
    <section className="section" id="story">
      <div className="community">
        <Reveal>
          <p className="eyebrow">{t('community.eyebrow')}</p>
          <h2>
            <Lines text={t('community.title')} />
          </h2>
          <p className="lede" style={{ marginTop: '1.2rem' }}>
            {t('community.copy')}
          </p>
          <ul className="story-list">
            <li>
              <b>01</b> {t('community.li1')}
            </li>
            <li>
              <b>02</b> {t('community.li2')}
            </li>
            <li>
              <b>03</b> {t('community.li3', { n: STATS[0].value })}
            </li>
          </ul>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/#packages">
              {t('community.packages')} <Arrow />
            </Link>
            <Link className="btn btn-ghost" to="/about">
              {t('community.about')}
            </Link>
          </div>
        </Reveal>
        <Reveal className="collage" delay={0.3} y={34}>
          <div className="shot tall" role="img" aria-label={t('community.shot1')}>
            <span className="shot-label">{t('community.shot1')}</span>
          </div>
          <div className="shot a" role="img" aria-label={t('community.shot2')}>
            <span className="shot-label">{t('community.shot2')}</span>
          </div>
          <div className="shot b" role="img" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  )
}

function Technique() {
  const { t } = useLang()
  return (
    <section className="section" id="technique">
      <Reveal className="section-head">
        <div>
          <p className="eyebrow">{t('tech.eyebrow')}</p>
          <h2>{t('tech.title')}</h2>
        </div>
        <p className="lede muted">{t('tech.copy')}</p>
      </Reveal>
      <Reveal className="tech-grid" delay={0.2}>
        <article className="tech-card lead">
          <p className="eyebrow">{t('tech.rule.eyebrow')}</p>
          <h3 style={{ fontSize: '2.2rem' }}>{t('tech.rule')}</h3>
        </article>
        <article className="tech-card">
          <p className="eyebrow">{t('tech.cue.eyebrow')}</p>
          <h3>{t('tech.cue.title')}</h3>
          <p className="muted" style={{ marginTop: '0.8rem' }}>
            {t('tech.cue.text')}
          </p>
        </article>
        <article className="tech-card">
          <p className="eyebrow">{t('tech.film.eyebrow')}</p>
          <h3>{t('tech.film.title')}</h3>
          <p className="muted" style={{ marginTop: '0.8rem' }}>
            {t('tech.film.text')}
          </p>
        </article>
      </Reveal>
    </section>
  )
}

function Programs() {
  const { t, pick } = useLang()
  return (
    <section className="section" id="program">
      <Reveal className="section-head">
        <div>
          <p className="eyebrow">{t('programs.eyebrow')}</p>
          <h2>{t('programs.title')}</h2>
        </div>
      </Reveal>
      <Reveal className="program-grid" delay={0.15}>
        {PROGRAMS.map((p) => (
          <article className="program-card" key={p.code}>
            <code>
              {p.code} / {pick(p.weeks)}
            </code>
            <h3>{pick(p.title)}</h3>
            <p className="muted">{pick(p.copy)}</p>
          </article>
        ))}
      </Reveal>
    </section>
  )
}

function Packages() {
  const { t, pick } = useLang()
  return (
    <section className="section" id="packages">
      <Reveal className="section-head">
        <div>
          <p className="eyebrow">{t('packages.eyebrow')}</p>
          <h2>{t('packages.title')}</h2>
        </div>
        <p className="lede muted">{t('packages.copy')}</p>
      </Reveal>
      <Reveal className="pack-grid" delay={0.15}>
        {PACKAGES.map((p) => (
          <article className={p.featured ? 'pack featured' : 'pack'} key={p.id}>
            <p className="tag">{pick(p.tag)}</p>
            <h3>{p.name}</h3>
            <p className="price" dir="ltr">
              ${p.price}
              <small>{pick(p.cadence)}</small>
            </p>
            <p className="muted" style={{ margin: '0.8rem 0' }}>
              {pick(p.blurb)}
            </p>
            <ul>
              {pick(p.features).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link
              className="btn btn-primary"
              to="/#book"
              onClick={() => {
                sessionStorage.setItem('nobi-pack', p.id)
                window.dispatchEvent(new Event('nobi-pack'))
              }}
            >
              {t('packages.subscribe')}
            </Link>
          </article>
        ))}
      </Reveal>
    </section>
  )
}

function TransformationsTeaser() {
  const { t } = useLang()
  return (
    <section className="section" id="results">
      <Reveal className="section-head">
        <div>
          <p className="eyebrow">{t('tf.eyebrow')}</p>
          <h2>{t('tf.title')}</h2>
        </div>
        <p className="lede muted">{t('tf.sub')}</p>
      </Reveal>
      <Reveal className="transform-grid" delay={0.3} y={34}>
        {TRANSFORMATIONS.map((item, i) => (
          <TransformCard key={item.src} item={item} index={i} />
        ))}
      </Reveal>
      <Reveal className="btn-row center" delay={0.1}>
        <Link className="btn btn-ghost" to="/transformations">
          {t('tf.all')} <Arrow />
        </Link>
      </Reveal>
    </section>
  )
}

function Feedback() {
  const { t, pick } = useLang()
  return (
    <section className="section" id="feedback">
      <Reveal className="section-head">
        <div>
          <p className="eyebrow">{t('feedback.eyebrow')}</p>
          <h2>{t('feedback.title')}</h2>
        </div>
      </Reveal>
      <Reveal className="feed-grid" delay={0.15}>
        {FEEDBACK.map((f) => (
          <article className="feed-card" key={pick(f.name)}>
            <p>“{pick(f.text)}”</p>
            <p className="eyebrow" style={{ margin: 0 }}>
              {pick(f.name)} — {pick(f.role)}
            </p>
          </article>
        ))}
      </Reveal>
    </section>
  )
}

function Contact() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  if (sent) {
    return (
      <section className="section" id="contact">
        <div className="success">
          <p className="eyebrow">{t('contact.done.eyebrow')}</p>
          <h2>{t('contact.done.title')}</h2>
        </div>
      </section>
    )
  }

  return (
    <section className="section" id="contact">
      <div className="contact-grid">
        <div>
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h2>{t('contact.title')}</h2>
          <p className="lede" style={{ marginTop: '1rem' }}>
            {t('contact.copy')}
          </p>
        </div>
        <form
          className="form-grid"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <label>
            {t('contact.name')}
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            {t('contact.email')}
            <input
              required
              type="email"
              dir="ltr"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label className="span-2">
            {t('contact.message')}
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <button className="btn btn-primary span-2" type="submit">
            {t('contact.send')}
          </button>
        </form>
      </div>
    </section>
  )
}
