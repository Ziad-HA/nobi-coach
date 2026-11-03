import { useEffect, useMemo, useState } from 'react'
import { PACKAGES, SLOTS } from '../data'

const empty = {
  name: '',
  email: '',
  packageId: 'forge',
  date: '',
  time: '18:30',
  goal: 'recomp',
  note: '',
}

export default function Booking() {
  const [form, setForm] = useState(empty)

  useEffect(() => {
    const saved = sessionStorage.getItem('nobi-pack')
    if (saved && PACKAGES.some((p) => p.id === saved)) {
      setForm((f) => ({ ...f, packageId: saved }))
    }
  }, [])
  const [done, setDone] = useState(null)
  const pack = useMemo(
    () => PACKAGES.find((p) => p.id === form.packageId) || PACKAGES[1],
    [form.packageId],
  )

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function submit(e) {
    e.preventDefault()
    const booking = {
      ...form,
      packageName: pack.name,
      ref: `NOBI-${Date.now().toString().slice(-6)}`,
    }
    const prev = JSON.parse(localStorage.getItem('nobi-bookings') || '[]')
    localStorage.setItem('nobi-bookings', JSON.stringify([booking, ...prev]))
    setDone(booking)
  }

  if (done) {
    return (
      <section className="section" id="book">
        <div className="success">
          <p className="eyebrow">Locked in</p>
          <h2>See you on the floor — even if the floor is your living room.</h2>
          <p className="lede" style={{ marginTop: '1rem' }}>
            {done.name}, your {done.packageName} intro is held for {done.date} at{' '}
            {done.time}. Reference {done.ref}. Check {done.email} — in this demo
            the hold lives in your browser until we wire payments.
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: '1.4rem' }}
            type="button"
            onClick={() => {
              setDone(null)
              setForm(empty)
            }}
          >
            Book another slot
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="section" id="book">
      <div className="section-head">
        <div>
          <p className="eyebrow">Booking / 07</p>
          <h2>Claim a slot.</h2>
        </div>
        <p className="lede muted">
          Intro call, then the subscription starts. Bring the PDF from the
          calculator if you already ran your numbers.
        </p>
      </div>

      <div className="calc-wrap">
        <form className="book-card form-grid" onSubmit={submit}>
          <label>
            Name
            <input
              required
              value={form.name}
              autoComplete="name"
              onChange={(e) => set('name', e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={form.email}
              autoComplete="email"
              onChange={(e) => set('email', e.target.value)}
            />
          </label>
          <label>
            Package
            <select
              value={form.packageId}
              onChange={(e) => set('packageId', e.target.value)}
            >
              {PACKAGES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ${p.price}
                  {p.cadence}
                </option>
              ))}
            </select>
          </label>
          <label>
            Goal
            <select value={form.goal} onChange={(e) => set('goal', e.target.value)}>
              <option value="recomp">Recomp / shape</option>
              <option value="cut">Fat loss</option>
              <option value="build">Build muscle</option>
              <option value="performance">Strength & technique</option>
            </select>
          </label>
          <label>
            Date
            <input
              required
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
            />
          </label>
          <label>
            Time
            <select value={form.time} onChange={(e) => set('time', e.target.value)}>
              {SLOTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="span-2">
            Anything I should know
            <textarea
              value={form.note}
              onChange={(e) => set('note', e.target.value)}
              placeholder="Injuries, schedule, previous training…"
            />
          </label>
          <button className="btn btn-primary span-2" type="submit">
            Confirm booking
          </button>
        </form>

        <div className="book-card">
          <p className="eyebrow">{pack.tag}</p>
          <h3>{pack.name}</h3>
          <p className="price">
            ${pack.price}
            <small>{pack.cadence}</small>
          </p>
          <p className="muted" style={{ margin: '0.8rem 0 1rem' }}>
            {pack.blurb}
          </p>
          <ul>
            {pack.features.map((f) => (
              <li key={f} style={{ listStyle: 'none' }}>
                {f}
              </li>
            ))}
          </ul>
          <p className="notice">
            Subscriptions renew weekly until you pause. No lock-in after the
            first 4 weeks.
          </p>
        </div>
      </div>
    </section>
  )
}
