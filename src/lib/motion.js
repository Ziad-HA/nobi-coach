// Shared animation settings.

export const EASE = [0.22, 1, 0.36, 1]

// A group fades its items in one after another.
export const groupVariants = (stagger = 0.12) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
})

export const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
}
