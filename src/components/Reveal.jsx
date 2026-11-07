import { motion } from 'framer-motion'

// Fades and lifts its children in when scrolled into view.
// Give images a larger delay than the text above them so words land first.
export default function Reveal({ children, delay = 0, y = 26, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
