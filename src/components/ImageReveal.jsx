import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE } from '../lib/motion'

// A photo that fades and slides up when scrolled into view, settles from a zoom, then drifts slightly as you scroll.
export default function ImageReveal({ src, alt, className = '', drift = 24, children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift])

  return (
    <motion.figure
      ref={ref}
      className={`img-reveal ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <motion.div
        className="img-reveal-zoom"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <motion.img src={src} alt={alt} loading="lazy" style={{ y, scale: 1.1 }} />
      </motion.div>
      {children}
    </motion.figure>
  )
}
