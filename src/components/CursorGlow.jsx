import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A soft red light that follows the mouse. Only on devices with a real pointer.
export default function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    const move = (e) => {
      x.set(e.clientX - 260)
      y.set(e.clientY - 260)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} aria-hidden="true" />
}
