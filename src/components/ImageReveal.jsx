import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE } from '../lib/motion'

// A photo that wipes open when scrolled into view, settles from a zoom, then drifts slightly as you scroll.
export default function ImageReveal({ src, alt, className = '', drift = 36, children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift])

  return (
    <motion.figure
      ref={ref}
      className={`img-reveal ${className}`}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.15, ease: EASE }}
    >
      <motion.div
        className="img-reveal-zoom"
        initial={{ scale: 1.4 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <motion.img src={src} alt={alt} loading="lazy" style={{ y, scale: 1.16 }} />
      </motion.div>
      {children}
    </motion.figure>
  )
}
