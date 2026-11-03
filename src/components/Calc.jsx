import { useMemo, useState } from 'react'
import {
  ACTIVITY_OPTIONS,
  bmi,
  bodyFatCategory,
  caloriePlan,
  leanMass,
  navyBodyFat,
} from '../lib/calc'
import { downloadNumbersPdf } from '../lib/pdf'

const empty = {
  name: '',
  sex: 'male',
  age: '28',
  kg: '78',
  cm: '178',
  activity: 'moderate',
  neck: '38',
  waist: '86',
  hip: '98',
}

export default function Calc() {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const nums = useMemo(() => {
    const age = Number(form.age)
    const kg = Number(form.kg)
    const cm = Number(form.cm)
    const neck = Number(form.neck)
    const waist = Number(form.waist)
    const hip = Number(form.hip)
    if (![age, kg, cm].every((n) => n > 0)) return null
    const calories = caloriePlan({
      kg,
      cm,
      age,
      sex: form.sex,
      activity: form.activity,
    })
    const bf = navyBodyFat({
      sex: form.sex,
      cm,
      neck,
      waist,
      hip,
    })
    return {
      calories,
      bodyFat: bf,
      bodyFatCategory: bodyFatCategory(form.sex, bf),
      lean: leanMass(kg, bf),
      bmi: bmi(kg, cm),
      age,
      kg,
      cm,
      neck,
      waist,
      hip,
    }
  }, [form])

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
    setError('')
  }

  function exportPdf() {
    if (!nums) {
      setError('Fill age, weight, and height first.')
      return
    }
    setBusy(true)
    setError('')
    try {
      downloadNumbersPdf({
        name: form.name.trim() || 'Athlete',
        sex: form.sex,
        activity: form.activity,
        createdAt: new Date().toLocaleString(),
        ...nums,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not build the PDF.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="section" id="calc">
      <div className="section-head">
        <div>
          <p className="eyebrow">Calc / 06</p>
          <h2>
            Take your numbers
            <br />
            with you.
          </h2>
        </div>
        <p className="lede muted">
          Calories from Mifflin-St Jeor. Body fat from the US Navy tape method.
          Then a branded A4 PDF — drawn, not screenshotted, so it actually
          prints.
        </p>
      </div>

      <div className="calc-wrap">
        <div className="calc-card">
          <form
            className="form-grid"
            onSubmit={(e) => {
              e.preventDefault()
              exportPdf()
            }}
          >
            <label className="span-2">
              Name on the PDF
              <input
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label>
              Sex
              <select
                value={form.sex}
                onChange={(e) => set('sex', e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label>
              Age
              <input
                type="number"
                min="14"
                max="90"
                value={form.age}
                onChange={(e) => set('age', e.target.value)}
                required
              />
            </label>
            <label>
              Weight (kg)
              <input
                type="number"
                min="35"
                step="0.1"
                value={form.kg}
                onChange={(e) => set('kg', e.target.value)}
                required
              />
            </label>
            <label>
              Height (cm)
              <input
                type="number"
                min="130"
                value={form.cm}
                onChange={(e) => set('cm', e.target.value)}
                required
              />
            </label>
            <label className="span-2">
              Training load
              <select
                value={form.activity}
                onChange={(e) => set('activity', e.target.value)}
              >
                {Object.entries(ACTIVITY_OPTIONS).map(([id, opt]) => (
                  <option key={id} value={id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Neck (cm)
              <input
                type="number"
                min="20"
                step="0.1"
                value={form.neck}
                onChange={(e) => set('neck', e.target.value)}
              />
            </label>
            <label>
              Waist (cm)
              <input
                type="number"
                min="40"
                step="0.1"
                value={form.waist}
                onChange={(e) => set('waist', e.target.value)}
              />
            </label>
            {form.sex === 'female' ? (
              <label className="span-2">
                Hip (cm)
                <input
                  type="number"
                  min="50"
                  step="0.1"
                  value={form.hip}
                  onChange={(e) => set('hip', e.target.value)}
                />
              </label>
            ) : null}
            {error ? (
              <p className="notice span-2" role="alert">
                {error}
              </p>
            ) : (
              <p className="notice span-2">
                Tape the neck just below the larynx, waist at navel, hips at the
                widest point. Estimates only — coaching still beats a formula.
              </p>
            )}
            <div className="span-2" style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" type="submit" disabled={busy}>
                {busy ? 'Building PDF…' : 'Download PDF'}
              </button>
              <a className="btn btn-ghost" href="#book">
                Book a consult
              </a>
            </div>
          </form>
        </div>

        <div className="calc-card calc-out">
          <p className="eyebrow">Live readout</p>
          {nums ? (
            <>
              <div className="metric-row">
                <div className="metric">
                  <span>Cut</span>
                  <b>{nums.calories.cut}</b>
                </div>
                <div className="metric">
                  <span>Maintain</span>
                  <b>{nums.calories.maintain}</b>
                </div>
                <div className="metric">
                  <span>Build</span>
                  <b>{nums.calories.bulk}</b>
                </div>
              </div>
              <div className="metric-row">
                <div className="metric">
                  <span>Body fat</span>
                  <b>{nums.bodyFat != null ? `${nums.bodyFat}%` : '—'}</b>
                </div>
                <div className="metric">
                  <span>Lean mass</span>
                  <b>{nums.lean != null ? `${nums.lean} kg` : '—'}</b>
                </div>
                <div className="metric">
                  <span>BMR</span>
                  <b>{nums.calories.bmr}</b>
                </div>
              </div>
              <p className="muted">
                {nums.bodyFatCategory} range · protein {nums.calories.protein}g ·
                fat {nums.calories.fat}g. Download the sheet and bring it to
                session one.
              </p>
            </>
          ) : (
            <p className="muted">Enter the basics and the board fills in.</p>
          )}
        </div>
      </div>
    </section>
  )
}
