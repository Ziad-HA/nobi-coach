import { jsPDF } from 'jspdf'

const BG = [9, 9, 9]
const VOLT = [214, 255, 58]
const TEXT = [244, 244, 240]
const MUTED = [140, 140, 134]
const LINE = [35, 35, 35]
const SURFACE = [18, 18, 18]

export function downloadNumbersPdf(report) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const W = 210
  const H = 297
  const m = 16

  paintPage(doc, W, H)
  header(doc, m, W, report)

  doc.setTextColor(...TEXT)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.text('TAKE YOUR NUMBERS', m, 46)
  doc.text('WITH YOU.', m, 58)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...MUTED)
  const subtitle =
    'Snapshot for training — not a medical diagnosis. Recalculate as your weight and measurements change.'
  doc.text(doc.splitTextToSize(subtitle, W - m * 2), m, 68)

  const profileY = 82
  card(doc, m, profileY, W - m * 2, 28)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...VOLT)
  doc.text('ATHLETE PROFILE', m + 6, profileY + 8)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...TEXT)
  const profile = [
    report.name || 'Athlete',
    `${report.sex === 'female' ? 'Female' : 'Male'}  ·  ${report.age} yrs`,
    `${report.kg} kg  ·  ${report.cm} cm`,
    ACTIVITY_LABEL[report.activity] || report.activity,
  ]
  doc.text(profile.join('     '), m + 6, profileY + 18)

  const stats = [
    { k: 'BMR', v: `${report.calories.bmr}`, u: 'kcal' },
    { k: 'TDEE', v: `${report.calories.tdee}`, u: 'kcal' },
    { k: 'CUT', v: `${report.calories.cut}`, u: 'kcal' },
    { k: 'MAINTAIN', v: `${report.calories.maintain}`, u: 'kcal' },
    { k: 'BUILD', v: `${report.calories.bulk}`, u: 'kcal' },
  ]

  const boxW = (W - m * 2 - 8) / 5
  stats.forEach((s, i) => {
    const x = m + i * (boxW + 2)
    const y = 118
    card(doc, x, y, boxW, 32)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(...VOLT)
    doc.text(s.k, x + 4, y + 8)
    doc.setTextColor(...TEXT)
    doc.setFontSize(16)
    doc.text(String(s.v), x + 4, y + 20)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...MUTED)
    doc.text(s.u, x + 4, y + 26)
  })

  card(doc, m, 158, 88, 62)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...VOLT)
  doc.text('BODY COMPOSITION', m + 6, 166)

  const bf = report.bodyFat
  const lines = [
    ['Body fat (US Navy)', bf != null ? `${bf}%` : 'Need waist + neck'],
    ['Category', report.bodyFatCategory],
    ['Lean mass', report.lean != null ? `${report.lean} kg` : '—'],
    ['BMI', String(report.bmi)],
    ['Waist / neck', `${report.waist || '—'} / ${report.neck || '—'} cm`],
  ]
  lines.forEach((row, i) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...MUTED)
    doc.text(row[0], m + 6, 178 + i * 8)
    doc.setTextColor(...TEXT)
    doc.setFont('helvetica', 'bold')
    doc.text(String(row[1]), m + 82, 178 + i * 8, { align: 'right' })
  })

  card(doc, 110, 158, 84, 62)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...VOLT)
  doc.text('MACRO STARTING POINT', 116, 166)
  const macros = [
    ['Protein', `${report.calories.protein} g`],
    ['Fat', `${report.calories.fat} g`],
    ['Carbs (cut)', `${Math.max(report.calories.carbsCut, 0)} g`],
    ['Carbs (maintain)', `${Math.max(report.calories.carbsMaintain, 0)} g`],
  ]
  macros.forEach((row, i) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...MUTED)
    doc.text(row[0], 116, 178 + i * 10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...TEXT)
    doc.text(row[1], 188, 178 + i * 10, { align: 'right' })
  })

  card(doc, m, 228, W - m * 2, 36)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...VOLT)
  doc.text('COACH NOTE', m + 6, 236)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...TEXT)
  const note =
    'Discipline is showing up. Technique is what keeps you in the game. Hit protein, sleep, and the sessions — the numbers on this sheet are a starting point, not a prison.'
  doc.text(doc.splitTextToSize(note, W - m * 2 - 12), m + 6, 244)

  doc.setFillColor(...VOLT)
  doc.rect(0, H - 10, W, 10, 'F')
  doc.setTextColor(16, 20, 0)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('NOBI COACH  ·  START YOUR TRANSFORMATION', m, H - 4)
  doc.text('nobicoach.com', W - m, H - 4, { align: 'right' })

  const stamp = report.createdAt.replace(/[/:]/g, '-')
  const slug = (report.name || 'athlete').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  doc.save(`nobi-coach-numbers-${slug || 'athlete'}-${stamp}.pdf`)
}

function paintPage(doc, W, H) {
  doc.setFillColor(...BG)
  doc.rect(0, 0, W, H, 'F')
  doc.setFillColor(...VOLT)
  doc.rect(0, 0, W, 7, 'F')
}

function header(doc, m, W, report) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(16, 20, 0)
  doc.text('NOBI COACH  /  TRAINING REPORT', m, 5)

  doc.setTextColor(...MUTED)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(report.createdAt, W - m, 18, { align: 'right' })
}

function card(doc, x, y, w, h) {
  doc.setFillColor(...SURFACE)
  doc.setDrawColor(...LINE)
  doc.setLineWidth(0.3)
  doc.roundedRect(x, y, w, h, 2, 2, 'FD')
}

const ACTIVITY_LABEL = {
  sedentary: 'Sedentary',
  light: 'Light training',
  moderate: 'Moderate training',
  active: 'Active',
  extra: 'Extra active',
}
