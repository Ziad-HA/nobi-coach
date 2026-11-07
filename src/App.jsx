import { useState } from 'react'
import Nav, { Arrow } from './components/Nav'
import Footer from './components/Footer'
import Calc from './components/Calc'
import Booking from './components/Booking'
import { FEEDBACK, PACKAGES, PROGRAMS, STATS } from './data'

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
  const [sent, setSent] = useState(false)
  const [lead, setLead] = useState({ name: '', email: '' })

  return (
    <section className="hero" id="top">
      <div className="hero-media" aria-hidden="true" />
      <div>
        <p className="hero-kicker">Online coaching</p>
        <h1>
          Stronger
          <br />
          <em>Everyday</em>
          <br />
          A Better You
        </h1>
        <p className="hero-copy">
          Personalized programming, nutrition, and eyes on your technique to
          help you reach your goals — wherever you train.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#packages">
            Start Your Journey <Arrow />
          </a>
          <a className="btn btn-ghost" href="#program">
            Explore Programs
          </a>
        </div>
        <p className="hero-tags" aria-hidden="true">
          <span>Train</span>
          <span>Belong</span>
          <span>Achieve</span>
        </p>
      </div>
      <aside className="hero-side">
        <div className="glass">
          <div className="glass-top">
            <div>
              <strong>240+</strong>
              <small>Clients Coached</small>
            </div>
            <div className="glass-thumb" aria-hidden="true" />
          </div>
          <div className="avatars">
            <i />
            <i />
            <i />
            <span>
              <b>94%+</b>
              Still training at week 8
            </span>
          </div>
          <a className="btn btn-primary" href="#book">
            Book a Free Call <Arrow />
          </a>
        </div>
        <div className="glass consult">
          <h4>Get a Free Consultation</h4>
          <p>Enter your details and I will contact you.</p>
          {sent ? (
            <p role="status">Got it. I will get back to you soon.</p>
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
                  placeholder="Your Name"
                  aria-label="Your name"
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
                  placeholder="Your Email"
                  aria-label="Your email"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                />
                <button className="go-btn" type="submit" aria-label="Send">
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
    <section className="section" aria-label="Coaching stats" style={{ paddingBottom: 0 }}>
      <div className="impact" style={{ margin: 0 }}>
        <div className="impact-head">
          <div>
            <p className="eyebrow">Our impact</p>
            <h2>
              Real Results.
              <br />
              Real People.
            </h2>
          </div>
          <p className="lede">
            Online coaching focused on measurable progress — helping people
            build stronger, healthier and more confident lives.
          </p>
        </div>
        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="section" id="story">
      <div className="community">
        <div>
          <p className="eyebrow">Online community</p>
          <h2>
            A Stronger
            <br />
            Community
          </h2>
          <p className="lede" style={{ marginTop: '1.2rem' }}>
            Training online does not mean training alone. You get a coach who
            knows your numbers, your schedule and your goals — and a standard
            you can follow from anywhere, at home or in any gym.
          </p>
          <ul className="story-list">
            <li>
              <b>01</b> Sign up online, get your plan, start the same week.
            </li>
            <li>
              <b>02</b> Weekly check-ins with real numbers and form feedback.
            </li>
            <li>
              <b>03</b> {STATS[0].value} clients coached — and a coach who still
              films cues at 11pm.
            </li>
          </ul>
          <a className="btn btn-primary" href="#packages" style={{ marginTop: '1.6rem' }}>
            See the Packages <Arrow />
          </a>
        </div>
        <div className="collage">
          <div className="shot tall" role="img" aria-label="Coach training">
            <span className="shot-label">Personal Coaching</span>
          </div>
          <div className="shot a" role="img" aria-label="Form review">
            <span className="shot-label">Form Reviews</span>
          </div>
          <div className="shot b" role="img" aria-label="Training" />
        </div>
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
          <h3 style={{ fontSize: '2.2rem' }}>
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

const TRANSFORMATIONS = [
  { src: '/results/tr1.jpg', alt: 'Client transformation, before and after' },
  { src: '/results/tr2.jpg', alt: 'Client transformation, before and after' },
  { src: '/results/tr3.jpg', alt: 'Client transformation, before and after' },
  { src: '/results/tr4.jpg', alt: 'Client transformation, before and after' },
]

function Results() {
  return (
    <section className="section" id="results">
      <div className="section-head">
        <div>
          <p className="eyebrow">Results</p>
          <h2>Transformations, not filters.</h2>
        </div>
        <p className="lede muted">
          Real clients. Real before and after. Same standard on every plan.
        </p>
      </div>
      <div className="transform-grid">
        {TRANSFORMATIONS.map((t, i) => (
          <figure className="transform" key={t.src}>
            <img src={t.src} alt={`${t.alt} ${i + 1}`} loading="lazy" />
            <figcaption>
              <span>Transformation 0{i + 1}</span>
              <span className="ba">Before / After</span>
            </figcaption>
          </figure>
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
