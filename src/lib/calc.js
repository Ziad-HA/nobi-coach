const ACTIVITY = {
  sedentary: { label: 'Sedentary (desk, little training)', factor: 1.2 },
  light: { label: 'Light (1–3 sessions / week)', factor: 1.375 },
  moderate: { label: 'Moderate (4–5 sessions / week)', factor: 1.55 },
  active: { label: 'Active (6–7 sessions / week)', factor: 1.725 },
  extra: { label: 'Extra (two-a-days / physical job)', factor: 1.9 },
}

export const ACTIVITY_OPTIONS = ACTIVITY

export function mifflinBmr({ kg, cm, age, sex }) {
  const base = 10 * kg + 6.25 * cm - 5 * age
  return sex === 'female' ? base - 161 : base + 5
}

export function caloriePlan(input) {
  const bmr = mifflinBmr(input)
  const tdee = bmr * ACTIVITY[input.activity].factor
  const cut = tdee - 500
  const bulk = tdee + 300
  return {
    bmr: round(bmr),
    tdee: round(tdee),
    cut: round(Math.max(cut, bmr * 1.05)),
    maintain: round(tdee),
    bulk: round(bulk),
    protein: round(input.kg * 1.8),
    fat: round(input.kg * 0.8),
    carbsCut: round((Math.max(cut, bmr * 1.05) - input.kg * 1.8 * 4 - input.kg * 0.8 * 9) / 4),
    carbsMaintain: round((tdee - input.kg * 1.8 * 4 - input.kg * 0.8 * 9) / 4),
  }
}

export function navyBodyFat({ sex, cm, neck, waist, hip }) {
  const heightIn = cm / 2.54
  const neckIn = neck / 2.54
  const waistIn = waist / 2.54
  const hipIn = hip / 2.54

  let densityTerm
  if (sex === 'female') {
    const circ = waistIn + hipIn - neckIn
    if (circ <= 0 || heightIn <= 0) return null
    densityTerm =
      1.29579 - 0.35004 * Math.log10(circ) + 0.221 * Math.log10(heightIn)
  } else {
    const circ = waistIn - neckIn
    if (circ <= 0 || heightIn <= 0) return null
    densityTerm =
      1.0324 - 0.19077 * Math.log10(circ) + 0.15456 * Math.log10(heightIn)
  }

  const bf = 495 / densityTerm - 450
  if (!Number.isFinite(bf) || bf < 2 || bf > 70) return null
  return round(bf, 1)
}

export function leanMass(kg, bodyFatPct) {
  if (bodyFatPct == null) return null
  return round(kg * (1 - bodyFatPct / 100), 1)
}

export function bmi(kg, cm) {
  const m = cm / 100
  return round(kg / (m * m), 1)
}

export function bodyFatCategory(sex, pct) {
  if (pct == null) return '—'
  if (sex === 'female') {
    if (pct < 14) return 'Athletic'
    if (pct < 21) return 'Fit'
    if (pct < 25) return 'Average'
    if (pct < 32) return 'Above average'
    return 'High'
  }
  if (pct < 6) return 'Essential'
  if (pct < 14) return 'Athletic'
  if (pct < 18) return 'Fit'
  if (pct < 25) return 'Average'
  return 'Above average'
}

function round(n, d = 0) {
  const p = 10 ** d
  return Math.round(n * p) / p
}
