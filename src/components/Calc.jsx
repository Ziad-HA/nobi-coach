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
import { Link } from 'react-router-dom'
import { Lines, useLang } from '../i18n'

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
  const { t, pick } = useLang()
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
      setError(t('calc.err'))
      return
    }
    setBusy(true)
    setError('')
    try {
      downloadNumbersPdf({
        name: form.name.trim() || t('calc.defaultName'),
        sex: form.sex,
        activity: form.activity,
        createdAt: new Date().toLocaleString('en-GB'),
        ...nums,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : t('calc.pdfErr'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="section" id="calc">
      <div className="section-head">
        <div>
          <p className="eyebrow">{t('calc.eyebrow')}</p>
          <h2>
            <Lines text={t('calc.title')} />
          </h2>
        </div>
        <p className="lede muted">{t('calc.copy')}</p>
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
              {t('calc.name')}
              <input
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder={t('calc.namePh')}
                autoComplete="name"
              />
            </label>
            <label>
              {t('calc.sex')}
              <select
                value={form.sex}
                onChange={(e) => set('sex', e.target.value)}
              >
                <option value="male">{t('calc.male')}</option>
                <option value="female">{t('calc.female')}</option>
              </select>
            </label>
            <label>
              {t('calc.age')}
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
              {t('calc.kg')}
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
              {t('calc.cm')}
              <input
                type="number"
                min="130"
                value={form.cm}
                onChange={(e) => set('cm', e.target.value)}
                required
              />
            </label>
            <label className="span-2">
              {t('calc.load')}
              <select
                value={form.activity}
                onChange={(e) => set('activity', e.target.value)}
              >
                {Object.entries(ACTIVITY_OPTIONS).map(([id, opt]) => (
                  <option key={id} value={id}>
                    {pick(opt.label)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t('calc.neck')}
              <input
                type="number"
                min="20"
                step="0.1"
                value={form.neck}
                onChange={(e) => set('neck', e.target.value)}
              />
            </label>
            <label>
              {t('calc.waist')}
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
                {t('calc.hip')}
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
                {t('calc.hint')} {t('calc.pdfNote')}
              </p>
            )}
            <div className="span-2" style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" type="submit" disabled={busy}>
                {busy ? t('calc.busy') : t('calc.pdf')}
              </button>
              <Link className="btn btn-ghost" to="/#book">
                {t('calc.consult')}
              </Link>
            </div>
          </form>
        </div>

        <div className="calc-card calc-out">
          <p className="eyebrow">{t('calc.live')}</p>
          {nums ? (
            <>
              <div className="metric-row">
                <div className="metric">
                  <span>{t('calc.cut')}</span>
                  <b>{nums.calories.cut}</b>
                </div>
                <div className="metric">
                  <span>{t('calc.maintain')}</span>
                  <b>{nums.calories.maintain}</b>
                </div>
                <div className="metric">
                  <span>{t('calc.build')}</span>
                  <b>{nums.calories.bulk}</b>
                </div>
              </div>
              <div className="metric-row">
                <div className="metric">
                  <span>{t('calc.bf')}</span>
                  <b>{nums.bodyFat != null ? `${nums.bodyFat}%` : '—'}</b>
                </div>
                <div className="metric">
                  <span>{t('calc.lean')}</span>
                  <b>{nums.lean != null ? `${nums.lean} ${t('tfp.kg')}` : '—'}</b>
                </div>
                <div className="metric">
                  <span>{t('calc.bmr')}</span>
                  <b>{nums.calories.bmr}</b>
                </div>
              </div>
              <p className="muted">
                {t('calc.result', {
                  c: t(`bf.${nums.bodyFatCategory}`),
                  p: nums.calories.protein,
                  f: nums.calories.fat,
                })}
              </p>
            </>
          ) : (
            <p className="muted">{t('calc.empty')}</p>
          )}
        </div>
      </div>
    </section>
  )
}
