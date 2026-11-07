// Bilingual content. Anything shaped { en, ar } is picked with useLang().pick.

export const PACKAGES = [
  {
    id: 'spark',
    tag: { en: '04 WEEKS', ar: '4 أسابيع' },
    name: 'Spark',
    price: 49,
    cadence: { en: '/ week', ar: '/ أسبوع' },
    blurb: {
      en: 'Start the engine. Form, food, and a plan you can actually keep.',
      ar: 'ابدأ المحرك. فورم، أكل، وخطة تقدر تلتزم بيها فعلًا.',
    },
    features: {
      en: [
        'Custom 4-day program',
        'Weekly check-in',
        'Calorie & protein targets',
        'Form notes on 2 lifts',
      ],
      ar: [
        'برنامج مخصص 4 أيام',
        'متابعة أسبوعية',
        'أهداف السعرات والبروتين',
        'ملاحظات فورم على حركتين',
      ],
    },
  },
  {
    id: 'forge',
    tag: { en: 'MOST BOOKED', ar: 'الأكتر حجزًا' },
    name: 'Forge',
    price: 79,
    cadence: { en: '/ week', ar: '/ أسبوع' },
    featured: true,
    blurb: {
      en: 'The full online coaching lane. Subscription with real coaching, not a PDF dump.',
      ar: 'مسار الكوتشينج الأونلاين الكامل. اشتراك بمتابعة حقيقية، مش ملف PDF.',
    },
    features: {
      en: [
        'Unlimited form reviews',
        'Weekly programming updates',
        'Nutrition + steps + sleep',
        'Priority booking slots',
        'WhatsApp / voice notes',
      ],
      ar: [
        'مراجعات فورم بلا حدود',
        'تحديث أسبوعي للبرنامج',
        'أكل + خطوات + نوم',
        'أولوية في مواعيد الحجز',
        'واتساب / رسائل صوتية',
      ],
    },
  },
  {
    id: 'elite',
    tag: { en: '12 WEEKS', ar: '12 أسبوع' },
    name: 'Elite',
    price: 119,
    cadence: { en: '/ week', ar: '/ أسبوع' },
    blurb: {
      en: 'Transformation block. Technique first, then load, then the photos.',
      ar: 'بلوك التحويل. التكنيك الأول، بعدين الوزن، وبعدين الصور.',
    },
    features: {
      en: [
        '2 live sessions / month',
        'Full physique plan',
        'Contest or photoshoot prep option',
        'Daily accountability',
      ],
      ar: [
        'حصتين لايف في الشهر',
        'خطة جسم كاملة',
        'تحضير بطولة أو فوتو شوت (اختياري)',
        'متابعة ومحاسبة يومية',
      ],
    },
  },
]

export const PROGRAMS = [
  {
    code: '01',
    title: { en: 'Rebuild', ar: 'إعادة بناء' },
    weeks: { en: '8 weeks', ar: '8 أسابيع' },
    copy: {
      en: 'Come back from chaos. Joint-friendly strength, walking, protein. You will look like you train again.',
      ar: 'ارجع من الفوضى. قوة بتراعي المفاصل، مشي، وبروتين. هتبان إنك بتتمرن تاني.',
    },
  },
  {
    code: '02',
    title: { en: 'Hypertrophy Lab', ar: 'معمل التضخيم' },
    weeks: { en: '12 weeks', ar: '12 أسبوع' },
    copy: {
      en: 'Volume with intent. Every set has a reason. Technique is the load before the load.',
      ar: 'حجم تمرين بغرض. كل سيت له سبب. التكنيك هو الحِمل قبل الحِمل.',
    },
  },
  {
    code: '03',
    title: { en: 'Cut Clean', ar: 'تنشيف نضيف' },
    weeks: { en: '10 weeks', ar: '10 أسابيع' },
    copy: {
      en: 'Drop fat without dropping your lifts. Deficit, steps, and sessions that still feel like training.',
      ar: 'اخسر الدهون من غير ما تخسر أوزانك. عجز سعرات، خطوات، وحصص لسه حاسسها تمرين.',
    },
  },
  {
    code: '04',
    title: { en: 'Athlete Base', ar: 'أساس الرياضي' },
    weeks: { en: 'Ongoing', ar: 'مستمر' },
    copy: {
      en: 'For people who already train. We clean the pattern, then we add weight. Quietly violent.',
      ar: 'للي بيتمرن أصلًا. بننضّف الحركة الأول وبعدين نزوّد الوزن. هادي وقوي.',
    },
  },
]

// Sample reviews — replace with words from your real clients.
export const FEEDBACK = [
  {
    name: { en: 'Nour', ar: 'نور' },
    role: { en: 'Forge · 6 months', ar: 'Forge · 6 شهور' },
    text: {
      en: 'I have had “programs”. This is coaching. He rewrote my hinge in week two and my back stopped screaming.',
      ar: 'جربت “برامج” كتير قبل كده. ده تدريب بجد. صلّح لي حركة الهينج في تاني أسبوع وضهري بطّل يوجعني.',
    },
  },
  {
    name: { en: 'Youssef', ar: 'يوسف' },
    role: { en: 'Elite · contest prep', ar: 'Elite · تحضير بطولة' },
    text: {
      en: 'Technique before load is not a slogan here. I added 20kg to my bench because the bar path finally made sense.',
      ar: 'التكنيك قبل الوزن مش مجرد شعار هنا. زوّدت 20 كيلو على البنش لما مسار البار بقى منطقي.',
    },
  },
  {
    name: { en: 'Hana', ar: 'هنا' },
    role: { en: 'Spark · first block', ar: 'Spark · أول بلوك' },
    text: {
      en: 'I was scared of online coaching. The booking was easy, the plan was human, the check-ins were real.',
      ar: 'كنت خايفة من التدريب أونلاين. الحجز كان سهل، والخطة مراعية ظروفي، والمتابعات حقيقية.',
    },
  },
]

export const STATS = [
  { value: '240+', label: { en: 'Clients coached', ar: 'عميل اتدرّب' } },
  { value: '12k+', label: { en: 'Sessions delivered', ar: 'حصة اتسلّمت' } },
  {
    value: '94%',
    label: { en: 'Still training at week 8', ar: 'لسه ملتزمين بعد الأسبوع 8' },
  },
  {
    value: { en: '8 yrs', ar: '8 سنين' },
    label: { en: 'On the floor & online', ar: 'خبرة في الجيم وأونلاين' },
  },
]

export const SLOTS = ['07:00', '08:30', '12:00', '17:00', '18:30', '20:00']

// One entry per photo in /public/results. Everything except `src` is optional
// and only shown when filled in:
//   name     — client name, e.g. { en: 'Omar H.', ar: 'عمر هـ.' } or a plain string
//   age      — number
//   weeks    — number
//   startKg / endKg — numbers
//   program  — e.g. { en: 'Cut Clean', ar: 'تنشيف نضيف' }
export const TRANSFORMATIONS = [
  { src: '/results/tr1.jpg' },
  { src: '/results/tr2.jpg' },
  { src: '/results/tr3.jpg' },
  { src: '/results/tr4.jpg' },
]
