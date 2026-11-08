import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Arrow } from '../components/Arrow'
import Booking from '../components/Booking'
import Payment from '../components/Payment'
import ImageReveal from '../components/ImageReveal'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import SpotCard from '../components/SpotCard'
import SplitText from '../components/SplitText'
import StatsGrid from '../components/StatsGrid'
import TransformCard from '../components/TransformCard'
import { CHAT_TO } from '../config'
import { FEEDBACK, PACKAGES, PROGRAMS, TRANSFORMATIONS, money } from '../data'
import { t } from '../text'

const STEPS = ['s1', 's2', 's3', 's4']

// Fixed values (not random) so the hero renders the same every time.
const EMBERS = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37 + 8) % 100}%`,
  '--s': `${3 + ((i * 5) % 6)}px`,
  '--t': `${7 + ((i * 3) % 7)}s`,
  '--w': `${-((i * 1.7) % 9)}s`,
}))

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Technique />
      <Programs />
      <HowItWorks />
      <Packages />
      <Payment />
      <TransformationsTeaser />
      <Feedback />
      <CtaGym />
      <Booking />
      <Contact />
    </>
  )
}

function Hero() {
  return (
    <section className="hero-nobi" id="top">
      <div className="hero-bg" aria-hidden="true">
        <img src="/images/hero-duo.jpg" alt="" fetchPriority="high" />
      </div>
      <div className="hero-overlay-nobi" aria-hidden="true" />
      <div className="embers" aria-hidden="true">
        {EMBERS.map((e, i) => (
          <i key={i} style={e} />
        ))}
      </div>

      <div className="hero-container-nobi">
        <div className="tag-nobi rise" style={{ '--i': 0 }}>
          <span className="red-dot" aria-hidden="true" />
          {t('hero.eyebrow')}
        </div>

        <SplitText as="h1" trigger="load" delay={0.15} className="title-nobi" text={t('hero.title')} />

        <p className="desc-nobi rise" style={{ '--i': 3 }}>
          {t('hero.lede')}
        </p>

        <div className="actions-nobi rise" style={{ '--i': 4 }}>
          <Link className="btn-main-nobi" to="/#packages">
            {t('hero.join')} <Arrow />
          </Link>
          <Link className="btn-ghost-nobi" to="/#book">
            {t('hero.book')}
          </Link>
        </div>
      </div>

      <div className="scroll-cue-nobi rise-late" aria-hidden="true">
        {t('hero.scroll')}
        <i />
      </div>

      <div className="badge-nobi" aria-hidden="true">
        <svg className="badge-ring" viewBox="0 0 120 120">
          <defs>
            <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text>
            <textPath href="#badge-circle" textLength="284" lengthAdjust="spacing">
              NOBI COACH • NO EXCUSES •
            </textPath>
          </text>
        </svg>
        <svg className="badge-icon" viewBox="0 0 24 24">
          <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />
        </svg>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="section" style={{ paddingBottom: 0 }}>
      <Reveal className="impact" y={30}>
        <div className="impact-head">
          <div>
            <p className="eyebrow">{t('impact.eyebrow')}</p>
            <SplitText text={t('impact.title')} />
          </div>
          <p className="lede">{t('impact.copy')}</p>
        </div>
        <StatsGrid />
      </Reveal>
    </section>
  )
}

function Technique() {
  return (
    <section className="section" id="technique">
      <div className="tech-wrap">
        <ImageReveal
          className="tech-photo"
          src="/images/squat.jpg"
          alt="Athlete mid-squat, from the first squat to forever"
        >
          <span className="shot-label">{t('tech.photo')}</span>
        </ImageReveal>

        <div className="tech-side">
          <div>
            <p className="eyebrow">{t('tech.eyebrow')}</p>
            <SplitText text={t('tech.title')} />
            <Reveal delay={0.2}>
              <p className="lede muted" style={{ marginTop: '1.2rem' }}>
                {t('tech.copy')}
              </p>
            </Reveal>
          </div>
          <RevealGroup className="tech-grid" stagger={0.14}>
            <RevealItem className="tech-card lead" as="article">
              <p className="eyebrow">{t('tech.rule.eyebrow')}</p>
              <h3 style={{ fontSize: '2.2rem' }}>{t('tech.rule')}</h3>
            </RevealItem>
            <RevealItem className="tech-card" as="article">
              <p className="eyebrow">{t('tech.cue.eyebrow')}</p>
              <h3>{t('tech.cue.title')}</h3>
              <p className="muted" style={{ marginTop: '0.8rem' }}>
                {t('tech.cue.text')}
              </p>
            </RevealItem>
            <RevealItem className="tech-card" as="article">
              <p className="eyebrow">{t('tech.film.eyebrow')}</p>
              <h3>{t('tech.film.title')}</h3>
              <p className="muted" style={{ marginTop: '0.8rem' }}>
                {t('tech.film.text')}
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

function Programs() {
  return (
    <section className="section" id="program">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('programs.eyebrow')}</p>
          <SplitText text={t('programs.title')} />
        </div>
      </div>
      <RevealGroup className="program-grid" stagger={0.13}>
        {PROGRAMS.map((p) => (
          <SpotCard key={p.code}>
            <span className="spot-num">{p.code}</span>
            <span className="spot-pill">{p.weeks}</span>
            <h3>{p.title}</h3>
            <p className="muted">{p.copy}</p>
          </SpotCard>
        ))}
      </RevealGroup>
    </section>
  )
}




function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('how.eyebrow')}</p>
          <SplitText text={t('how.title')} />
        </div>
        <p className="lede muted">{t('how.copy')}</p>
      </div>
      <RevealGroup as="ol" className="steps" stagger={0.18}>
        {STEPS.map((s, i) => (
          <RevealItem as="li" className="step" key={s}>
            <motion.span
              className="step-line"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, delay: 0.2 } } }}
              aria-hidden="true"
            />
            <span className="step-num">0{i + 1}</span>
            <h3>{t(`about.${s}.title`)}</h3>
            <p className="muted">{t(`about.${s}.text`)}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}

function Packages() {
  return (
    <section className="section" id="packages">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('packages.eyebrow')}</p>
          <SplitText text={t('packages.title')} />
        </div>
        <p className="lede muted">{t('packages.copy')}</p>
      </div>
      <RevealGroup className="pack-grid" stagger={0.15}>
        {PACKAGES.map((p) => (
          <SpotCard className={p.featured ? 'pack featured' : 'pack'} key={p.id}>
            <p className="tag">{p.tag}</p>
            <h3>{p.name}</h3>
            <p className="price">
              {money(p.price)}
              <small>{p.cadence}</small>
            </p>
            <p className="muted" style={{ margin: '0.8rem 0' }}>
              {p.blurb}
            </p>
            <ul>
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link
              className="btn btn-primary"
              to="/#book"
              onClick={() => {
                try {
                  sessionStorage.setItem('nobi-pack', p.id)
                } catch {
                  /* storage unavailable */
                }
                window.dispatchEvent(new Event('nobi-pack'))
              }}
            >
              {t('packages.subscribe')}
            </Link>
          </SpotCard>
        ))}
      </RevealGroup>
    </section>
  )
}

function TransformationsTeaser() {
  return (
    <section className="section" id="results">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('tf.eyebrow')}</p>
          <SplitText text={t('tf.title')} />
        </div>
        <p className="lede muted">{t('tf.sub')}</p>
      </div>
      <Reveal className="transform-grid" delay={0.2} y={34}>
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
  return (
    <section className="section" id="feedback">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('feedback.eyebrow')}</p>
          <SplitText text={t('feedback.title')} />
        </div>
      </div>
      <RevealGroup className="feed-grid" stagger={0.15}>
        {FEEDBACK.map((f) => (
          <SpotCard className="feed-card" key={f.name}>
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <p>{f.text}</p>
            <p className="eyebrow" style={{ margin: 0 }}>
              {f.name} — {f.role}
            </p>
          </SpotCard>
        ))}
      </RevealGroup>
    </section>
  )
}

function CtaGym() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="cta-gym" ref={ref}>
      <motion.img className="cta-gym-bg" src="/images/gym.jpg" alt="" loading="lazy" style={{ y }} />
      <div className="cta-gym-shade" aria-hidden="true" />
      <SplitText text={t('cta.title')} />
      <Reveal delay={0.2}>
        <p className="lede">{t('cta.text')}</p>
        <div className="actions-nobi">
          <Link className="btn-main-nobi" to="/#packages">
            {t('hero.join')} <Arrow />
          </Link>
          <Link className="btn-ghost-nobi" to={CHAT_TO}>
            {t('cta.btn')}
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

function Contact() {
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
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label>
            {t('contact.email')}
            <input
              required
              type="email"
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
