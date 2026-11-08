import { motion } from 'framer-motion'
import { EASE, groupVariants, itemVariants } from '../lib/motion'

// Fades and lifts its children in when scrolled into view.
// Give images a larger delay than the text above them so words land first.
export default function Reveal({ children, delay = 0, y = 30, x = 0, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

// A container whose RevealItem children arrive one after another.
export function RevealGroup({ children, className, stagger = 0.12, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={groupVariants(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function RevealItem({ children, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  )
}
