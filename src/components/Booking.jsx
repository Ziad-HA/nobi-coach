import { useEffect, useMemo, useState } from 'react'
import { PACKAGES, SLOTS } from '../data'
import { t } from '../text'

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
  const [done, setDone] = useState(null)

  // A "Subscribe" button on the packages saves the choice, then we pick it up.
  useEffect(() => {
    const apply = () => {
      const saved = sessionStorage.getItem('nobi-pack')
      if (saved && PACKAGES.some((p) => p.id === saved)) {
        setForm((f) => ({ ...f, packageId: saved }))
      }
    }
    apply()
    window.addEventListener('nobi-pack', apply)
    return () => window.removeEventListener('nobi-pack', apply)
  }, [])

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
          <p className="eyebrow">{t('book.done.eyebrow')}</p>
          <h2>{t('book.done.title')}</h2>
          <p className="lede" style={{ marginTop: '1rem' }}>
            {t('book.done.text', {
              name: done.name,
              pack: done.packageName,
              date: done.date,
              time: done.time,
              ref: done.ref,
              email: done.email,
            })}
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
            {t('book.another')}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="section" id="book">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('book.eyebrow')}</p>
          <h2>{t('book.title')}</h2>
        </div>
        <p className="lede muted">{t('book.copy')}</p>
      </div>

      <div className="calc-wrap">
        <form className="book-card form-grid" onSubmit={submit}>
          <label>
            {t('book.name')}
            <input
              required
              value={form.name}
              autoComplete="name"
              onChange={(e) => set('name', e.target.value)}
            />
          </label>
          <label>
            {t('book.email')}
            <input
              required
              type="email"
             
              value={form.email}
              autoComplete="email"
              onChange={(e) => set('email', e.target.value)}
            />
          </label>
          <label>
            {t('book.package')}
            <select
              value={form.packageId}
              onChange={(e) => set('packageId', e.target.value)}
            >
              {PACKAGES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ${p.price} {p.cadence}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t('book.goal')}
            <select value={form.goal} onChange={(e) => set('goal', e.target.value)}>
              {['recomp', 'cut', 'build', 'performance'].map((g) => (
                <option key={g} value={g}>
                  {t(`book.goal.${g}`)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t('book.date')}
            <input
              required
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
            />
          </label>
          <label>
            {t('book.time')}
            <select value={form.time} onChange={(e) => set('time', e.target.value)}>
              {SLOTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="span-2">
            {t('book.note')}
            <textarea
              value={form.note}
              onChange={(e) => set('note', e.target.value)}
              placeholder={t('book.notePh')}
            />
          </label>
          <button className="btn btn-primary span-2" type="submit">
            {t('book.confirm')}
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
          <p className="notice">{t('book.renew')}</p>
        </div>
      </div>
    </section>
  )
}
