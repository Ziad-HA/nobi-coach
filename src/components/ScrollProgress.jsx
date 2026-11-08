import { motion, useScroll, useSpring } from 'framer-motion'

// Thin red bar across the top that fills as you scroll.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
