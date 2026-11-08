import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

// Counts from 0 up to `to` when it scrolls into view.
// While counting it shakes and glows red; when it lands it slams and sends out a shockwave.
// The look lives in CSS: .count[data-state='counting'] and .count[data-state='done'].
export default function CountUp({ to, suffix = '', duration = 2.8, className = '' }) {
  const root = useRef(null)
  const num = useRef(null)
  const inView = useInView(root, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return undefined
    const el = root.current
    const out = num.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      out.textContent = String(to)
      el.dataset.state = 'static'
      return undefined
    }
    el.dataset.state = 'counting'
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        out.textContent = String(Math.round(v))
        el.style.setProperty('--p', String(v / to))
      },
      onComplete: () => {
        out.textContent = String(to)
        el.dataset.state = 'done'
      },
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={root} className={`count ${className}`} data-state="idle">
      <span className="sr-only">
        {to}
        {suffix}
      </span>
      <span aria-hidden="true">
        <span ref={num} className="count-num">
          0
        </span>
        <span className="count-suffix">{suffix}</span>
      </span>
    </span>
  )
}
