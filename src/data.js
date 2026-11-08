// Site content that is not plain page text. Edit the numbers, names and reviews here.

// Prices are in Egyptian pounds. Change them here.
export const money = (n) => `${n.toLocaleString('en-US')} EGP`

export const PACKAGES = [
  {
    id: 'spark',
    tag: '04 WEEKS',
    name: 'Spark',
    price: 999,
    cadence: '/ month',
    blurb: 'Start the engine. Form, food, and a plan you can actually keep.',
    features: [
      'Custom 4-day program',
      'Weekly check-in',
      'Calorie & protein targets',
      'Form notes on 2 lifts',
    ],
  },
  {
    id: 'forge',
    tag: 'MOST BOOKED',
    name: 'Forge',
    price: 1999,
    cadence: '/ month',
    featured: true,
    blurb: 'The full online coaching lane. Subscription with real coaching, not a PDF dump.',
    features: [
      'Unlimited form reviews',
      'Weekly programming updates',
      'Nutrition + steps + sleep',
      'Priority booking slots',
      'WhatsApp / voice notes',
    ],
  },
  {
    id: 'elite',
    tag: '12 WEEKS',
    name: 'Elite',
    price: 3499,
    cadence: '/ month',
    blurb: 'Transformation block. Technique first, then load, then the photos.',
    features: [
      '2 live sessions / month',
      'Full physique plan',
      'Contest or photoshoot prep option',
      'Daily accountability',
    ],
  },
]

export const PROGRAMS = [
  {
    code: '01',
    title: 'Rebuild',
    weeks: '8 weeks',
    copy: 'Come back from chaos. Joint-friendly strength, walking, protein. You will look like you train again.',
  },
  {
    code: '02',
    title: 'Hypertrophy Lab',
    weeks: '12 weeks',
    copy: 'Volume with intent. Every set has a reason. Technique is the load before the load.',
  },
  {
    code: '03',
    title: 'Cut Clean',
    weeks: '10 weeks',
    copy: 'Drop fat without dropping your lifts. Deficit, steps, and sessions that still feel like training.',
  },
  {
    code: '04',
    title: 'Athlete Base',
    weeks: 'Ongoing',
    copy: 'For people who already train. We clean the pattern, then we add weight. Quietly violent.',
  },
]

// Sample reviews — replace with words from your real clients.
export const FEEDBACK = [
  {
    name: 'Nour',
    role: 'Forge · 6 months',
    text: 'I have had “programs”. This is coaching. He rewrote my hinge in week two and my back stopped screaming.',
  },
  {
    name: 'Youssef',
    role: 'Elite · contest prep',
    text: 'Technique before load is not a slogan here. I added 20kg to my bench because the bar path finally made sense.',
  },
  {
    name: 'Hana',
    role: 'Spark · first block',
    text: 'I was scared of online coaching. The booking was easy, the plan was human, the check-ins were real.',
  },
]

// Each number counts up from 0 to `to` when it scrolls into view.
export const STATS = [
  { to: 240, suffix: '+', label: 'Clients coached' },
  { to: 12, suffix: 'k+', label: 'Sessions delivered' },
  { to: 94, suffix: '%', label: 'Still training at week 8' },
  { to: 8, suffix: ' yrs', label: 'Years of experience' },
]

export const SLOTS = ['07:00', '08:30', '12:00', '17:00', '18:30', '20:00']

// One entry per photo in /public/results. Everything except `src` is optional
// and only shown when filled in:
//   name     — client name, e.g. 'Omar H.'
//   age      — number
//   weeks    — number
//   startKg / endKg — numbers
//   program  — e.g. 'Cut Clean'
export const TRANSFORMATIONS = [
  { src: '/results/tr1.jpg' },
  { src: '/results/tr2.jpg' },
  { src: '/results/tr3.jpg' },
  { src: '/results/tr4.jpg' },
]

// Draft answers built from what the rest of the site already says. Edit them so they match how you really work.
export const FAQ = [
  {
    q: 'How does online coaching work?',
    a: 'You pick a package, book a short intro call, and get training and nutrition built around your goal, your schedule and what you have access to. After that it is weekly check-ins, form feedback on your videos, and adjustments to the plan.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Strength, energy and how your clothes fit usually move first. Visible body changes take weeks of consistent training and food, so we set realistic milestones together and track them with real numbers every week.',
  },
  {
    q: 'Do I need gym equipment?',
    a: 'No. You can train at home or in any gym. The plan is written around what you actually have, so tell me about your setup on the intro call.',
  },
  {
    q: 'How do form reviews work?',
    a: 'Film your sets from the side and at 45° and send the clips. I mark what to fix, and you apply it in your next session. No mystery.',
  },
  {
    q: 'What happens in a weekly check-in?',
    a: 'You send your numbers and notes: training, food, steps, sleep and how the week felt. I look at the trend, give feedback and update the plan for the next week.',
  },
  {
    q: 'What if I have an injury or a busy schedule?',
    a: 'Tell me before we start. Plans are built around injuries and real life: on a messy week the plan bends, the standard does not.',
  },
  {
    q: 'Can I pause my subscription?',
    a: 'Subscriptions renew monthly until you pause, and there is no lock-in after the first month.',
  },
  {
    q: 'How accurate is the calculator?',
    a: 'Calories use the Mifflin-St Jeor formula and body fat uses the US Navy tape method. They are estimates only, and coaching still beats a formula.',
  },
  {
    q: 'How do I get started?',
    a: 'Pick a package, then book an intro call. We talk goals, injuries and your schedule, and your plan is built from there.',
  },
]
