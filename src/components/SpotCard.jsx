import { motion } from 'framer-motion'
import { itemVariants } from '../lib/motion'

// A card that arrives with its RevealGroup and lights up red under the cursor.
export default function SpotCard({ as = 'article', className = '', children, ...rest }) {
  const Tag = motion[as]

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Tag className={`spot ${className}`} variants={itemVariants} onMouseMove={onMove} {...rest}>
      {children}
    </Tag>
  )
}
