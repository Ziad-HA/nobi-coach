import { useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Calc from './components/Calc'
import Booking from './components/Booking'
import { FEEDBACK, PACKAGES, PROGRAMS, RESULTS, STATS } from './data'

const WORDS = [
  'DISCIPLINE',
  'TECHNIQUE',
  'CONSISTENCY',
  'SHOW UP',
  'NO EXCUSES',
  'EARN IT',
]

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
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media" aria-hidden="true" />
      <div>
        <p className="hero-kicker">Season 01 — Online coaching</p>
        <h1>
          Start your
          <br />
          transformation<span>.</span>
        </h1>
        <p className="hero-copy">
          Programming, nutrition, and eyes on your technique — without the gym
          bro theatre. Show up. We handle the map.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#packages">
            Start your transformation
          </a>
          <a className="btn btn-ghost" href="#book">
            Book a call
          </a>
        </div>
      </div>
      <p className="hero-rail">NOBI / COACH / 240+</p>
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

function Story() {
  return (
    <section className="section" id="story">
      <div className="split">
        <div>
          <p className="eyebrow">My story / 02</p>
          <h2>I did not get here by feeling ready.</h2>
          <p className="lede" style={{ marginTop: '1.2rem' }}>
            I started as the kid who trained loud and moved badly. Injuries
            taught me that load without technique is just ego with a barcode.
            Online coaching is how I scale the same standard: honest numbers,
            ruthless form, and a plan you can keep on a messy week.
          </p>
          <ul className="story-list">
            <li>
              <b>01</b> Eight years on the floor before the first remote client.
            </li>
            <li>
              <b>02</b> 240+ people coached through cut, rebuild, and first
              muscle that actually showed.
            </li>
            <li>
              <b>03</b> Still filming cues at 11pm because the lift matters more
              than the aesthetic of coaching.
            </li>
          </ul>
        </div>
        <div className="story-photo" role="img" aria-label="Coach training" />
      </div>
    </section>
  )
}

function Technique() {
  return (
    <section className="section" id="technique">
      <div className="section-head">
        <div>
          <p className="eyebrow">Standard / 03</p>
          <h2>Technique is the real intensity.</h2>
        </div>
        <p className="lede muted">
          Anyone can add plates. Few people can own the path of the bar. That is
          why every package includes form reviews — because the transformation
          you want is built on joints that still work in year five.
        </p>
      </div>
      <div className="tech-grid">
        <article className="tech-card lead">
          <p className="eyebrow">The rule</p>
          <h3 style={{ fontSize: '2.6rem' }}>
            If it does not look clean, it does not count.
          </h3>
        </article>
        <article className="tech-card">
          <p className="eyebrow">Cue</p>
          <h3>Brace, then move</h3>
          <p className="muted" style={{ marginTop: '0.8rem' }}>
            Ribs down. Floor through the midfoot. Then we talk about load.
          </p>
        </article>
        <article className="tech-card">
          <p className="eyebrow">Film</p>
          <h3>Two angles, one truth</h3>
          <p className="muted" style={{ marginTop: '0.8rem' }}>
            Side and 45°. I mark the miss, you fix it next session. No mystery.
          </p>
        </article>
      </div>
    </section>
  )
}

function Programs() {
  return (
    <section className="section" id="program">
      <div className="section-head">
        <div>
          <p className="eyebrow">Program / 04</p>
          <h2>Pick the block. We write the days.</h2>
        </div>
      </div>
      <div className="program-grid">
        {PROGRAMS.map((p) => (
          <article className="program-card" key={p.code}>
            <code>{p.code} / {p.weeks}</code>
            <h3>{p.title}</h3>
            <p className="muted">{p.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Packages() {
  return (
    <section className="section" id="packages">
      <div className="section-head">
        <div>
          <p className="eyebrow">Packages / 05</p>
          <h2>Subscriptions that actually coach.</h2>
        </div>
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
        <div>
          <p className="eyebrow">Results</p>
          <h2>Transformations, not filters.</h2>
        </div>
      </div>
      <div className="result-grid">
        {RESULTS.map((r) => (
          <article className="result-card" key={r.name}>
            <p className="eyebrow">{r.span}</p>
            <h3>{r.name}</h3>
            <p className="change">{r.change}</p>
            <p className="muted">{r.quote}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Feedback() {
  return (
    <section className="section" id="feedback">
      <div className="section-head">
        <div>
          <p className="eyebrow">Clients</p>
          <h2>What they say when the camera is off.</h2>
        </div>
      </div>
      <div className="feed-grid">
        {FEEDBACK.map((f) => (
          <article className="feed-card" key={f.name}>
            <p>“{f.text}”</p>
            <p className="eyebrow" style={{ margin: 0 }}>
              {f.name} — {f.role}
            </p>
          </article>
        ))}
      </div>
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
          <p className="eyebrow">Contact / 08</p>
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
