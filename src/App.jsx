import { useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Calc from './components/Calc'
import Booking from './components/Booking'
import { FEEDBACK, IMAGES, PACKAGES, PROGRAMS, RESULTS, STATS } from './data'

const WORDS = [
  'DISCIPLINE',
  'TECHNIQUE',
  'CONSISTENCY',
  'SHOW UP',
  'NO EXCUSES',
  'EARN IT',
]

const EASE = [0.2, 0.8, 0.2, 1]

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Stats />
        <Story />
        <Technique />
        <Programs />
        <Packages />
        <Results />
        <Feedback />
        <Calc />
        <Booking />
        <Closer />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

/* One orchestrated moment: the photo settles, then each headline line
   rises out of its mask, then the copy and buttons arrive. */
function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '16%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-14%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0])

  const stage = {
    hidden: {},
    show: { transition: { delayChildren: 0.45, staggerChildren: 0.14 } },
  }
  const line = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 0.95, ease: EASE } },
  }
  const fade = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div
        className="hero-media"
        aria-hidden="true"
        style={{ y: imgY, backgroundImage: `url(${IMAGES.hero})` }}
        initial={reduce ? false : { scale: 1.18, filter: 'grayscale(1) brightness(0.45)' }}
        animate={{ scale: 1, filter: 'grayscale(0.8) brightness(0.8)' }}
        transition={{ duration: 1.9, ease: EASE }}
      />
      <div className="hero-shade" aria-hidden="true" />
      <motion.div
        className="hero-inner"
        style={{ y: textY, opacity: textOpacity }}
        variants={stage}
        initial={reduce ? 'show' : 'hidden'}
        animate="show"
      >
        <motion.p className="hero-kicker" variants={fade}>
          Online coaching. Form first, then load.
        </motion.p>
        <h1>
          <span className="line">
            <motion.span variants={line}>Start your</motion.span>
          </span>
          <span className="line">
            <motion.span variants={line}>
              transformation<i>.</i>
            </motion.span>
          </span>
        </h1>
        <motion.p className="hero-copy" variants={fade}>
          Programming, nutrition, and eyes on your technique — without the gym
          bro theatre. Show up. We handle the map.
        </motion.p>
        <motion.div className="hero-actions" variants={fade}>
          <a className="btn btn-primary" href="#packages">
            Start your transformation
          </a>
          <a className="btn btn-ghost" href="#book">
            Book a call
          </a>
        </motion.div>
      </motion.div>
      <motion.dl
        className="hero-strip"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
      >
        {STATS.slice(0, 3).map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  )
}

function Marquee() {
  const loop = [...WORDS, ...WORDS, ...WORDS, ...WORDS]
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
  return (
    <section className="stats" aria-label="Coaching stats">
      {STATS.map((s) => (
        <div className="stat" key={s.label}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </section>
  )
}

/* Full-bleed photo with a slow parallax drift. Scroll-driven, so it only
   moves when the person does. */
function PhotoBand({ image, position = 'center', tall = false, children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ['0%', '0%'] : ['-9%', '9%'],
  )

  return (
    <section className={tall ? 'band tall' : 'band'} ref={ref}>
      <motion.div
        className="band-img"
        aria-hidden="true"
        style={{ y, backgroundImage: `url(${image})`, backgroundPosition: position }}
      />
      <div className="band-shade" aria-hidden="true" />
      <div className="band-body">{children}</div>
    </section>
  )
}

function Story() {
  return (
    <section className="section" id="story">
      <div className="split">
        <div>
          <h2>I did not get here by feeling ready.</h2>
          <p className="lede" style={{ marginTop: '1.4rem' }}>
            I started as the kid who trained loud and moved badly. Injuries
            taught me that load without technique is just ego with a barcode.
            Online coaching is how I scale the same standard: honest numbers,
            ruthless form, and a plan you can keep on a messy week.
          </p>
          <ul className="story-list">
            <li>
              <b>8</b> years on the floor before the first remote client.
            </li>
            <li>
              <b>240+</b> people coached through cut, rebuild, and first muscle
              that actually showed.
            </li>
            <li>
              <b>11pm</b> and still filming cues, because the lift matters more
              than the aesthetic of coaching.
            </li>
          </ul>
        </div>
        <div
          className="story-photo"
          role="img"
          aria-label="Coach training"
          style={{ backgroundImage: `url(${IMAGES.story})` }}
        />
      </div>
    </section>
  )
}

function Technique() {
  return (
    <>
      <PhotoBand image={IMAGES.technique} position="center 40%" tall>
        <h2>
          If it does not look clean,
          <br />
          it does not count.
        </h2>
      </PhotoBand>
      <section className="section" id="technique">
        <div className="section-head">
          <h2>Technique is the real intensity.</h2>
          <p className="lede muted">
            Anyone can add plates. Few people can own the path of the bar. That
            is why every package includes form reviews — because the
            transformation you want is built on joints that still work in year
            five.
          </p>
        </div>
        <div className="cues">
          <article>
            <h3>Brace, then move</h3>
            <p className="muted">
              Ribs down. Floor through the midfoot. Then we talk about load.
            </p>
          </article>
          <article>
            <h3>Two angles, one truth</h3>
            <p className="muted">
              Side and 45°. I mark the miss, you fix it next session. No
              mystery.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}

function Programs() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="program">
      <div className="section-head">
        <h2>Pick the block. We write the days.</h2>
      </div>
      <ul className="rows">
        {PROGRAMS.map((p, i) => {
          const isOpen = open === i
          return (
            <li className={isOpen ? 'row open' : 'row'} key={p.code}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`program-${p.code}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="row-title">{p.title}</span>
                <span className="row-meta">{p.weeks}</span>
                <span className="row-icon" aria-hidden="true" />
              </button>
              <div className="row-body" id={`program-${p.code}`}>
                <div>
                  <p>{p.copy}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Packages() {
  return (
    <section className="section" id="packages">
      <div className="section-head">
        <h2>Subscriptions that actually coach.</h2>
        <p className="lede muted">
          Weekly billing. Pause anytime after week four. This is not a dump of
          PDFs — it is eyes on your training.
        </p>
      </div>
      <div className="pack-grid">
        {PACKAGES.map((p) => (
          <article className={p.featured ? 'pack featured' : 'pack'} key={p.id}>
            <p className="tag">{p.tag}</p>
            <h3>{p.name}</h3>
            <p className="price">
              ${p.price}
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
            <a
              className="btn btn-primary"
              href="#book"
              onClick={() => sessionStorage.setItem('nobi-pack', p.id)}
            >
              Subscribe
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

function Results() {
  return (
    <section className="section" id="results">
      <div className="section-head">
        <h2>Transformations, not filters.</h2>
      </div>
      <div className="result-grid">
        {RESULTS.map((r) => {
          const [main, sub] = r.change.split('·').map((s) => s.trim())
          return (
            <article className="result" key={r.name}>
              <p className="result-main">{main}</p>
              {sub ? <p className="result-sub">{sub}</p> : null}
              <p className="result-quote">{r.quote}</p>
              <p className="result-who">
                {r.name}, {r.span}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Feedback() {
  return (
    <section className="section" id="feedback">
      <div className="section-head">
        <h2>What they say when the camera is off.</h2>
      </div>
      <div className="feed">
        {FEEDBACK.map((f, i) => (
          <figure className={i === 0 ? 'feed-item lead' : 'feed-item'} key={f.name}>
            <blockquote>“{f.text}”</blockquote>
            <figcaption>
              {f.name}, {f.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function Closer() {
  return (
    <PhotoBand image={IMAGES.hero} position="center 18%">
      <h2>
        Show up.
        <br />
        We handle the map<span className="dot">.</span>
      </h2>
      <div className="hero-actions" style={{ marginTop: '2rem' }}>
        <a className="btn btn-primary" href="#packages">
          Choose a package
        </a>
        <a className="btn btn-ghost" href="#book">
          Book a call
        </a>
      </div>
    </PhotoBand>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  if (sent) {
    return (
      <section className="section" id="contact">
        <div className="success">
          <p className="eyebrow">Contact</p>
          <h2>Got it. I will answer like a human.</h2>
        </div>
      </section>
    )
  }

  return (
    <section className="section" id="contact">
      <div className="contact-grid">
        <div>
          <h2>Talk before you pay.</h2>
          <p className="lede" style={{ marginTop: '1rem' }}>
            Questions about injuries, time zones, or whether Spark is enough —
            send it. Instagram DMs get lost. This does not.
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
            Name
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label className="span-2">
            Message
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <button className="btn btn-primary span-2" type="submit">
            Send
          </button>
        </form>
      </div>
    </section>
  )
}
