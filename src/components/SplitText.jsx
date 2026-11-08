import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

const wordVariants = {
  hidden: { y: '112%' },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
}

// Headline whose words slide up from behind a mask.
//   trigger="view": plays when scrolled into view.
//   trigger="load": plays by CSS once the intro has finished (.site.ready), for the hero.
// Wrap a word in *asterisks* to colour it red. Use "\n" for a line break.
export default function SplitText({
  text,
  as = 'h2',
  className,
  trigger = 'view',
  delay = 0,
  stagger = 0.07,
}) {
  const onView = trigger === 'view'
  const Tag = onView ? motion[as] : as
  const plain = String(text).replaceAll('*', '').replaceAll('\n', ' ')
  const lines = String(text).split('\n')
  let n = 0

  const motionProps = onView
    ? {
        variants: { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } },
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-80px' },
      }
    : {}

  return (
    <Tag
      className={className}
      aria-label={plain}
      style={onView ? undefined : { '--d': `${delay}s` }}
      {...motionProps}
    >
      {lines.map((line, li) => (
        <Fragment key={li}>
          {line
            .split(' ')
            .filter(Boolean)
            .map((raw) => {
              const accent = raw.length > 2 && raw.startsWith('*') && raw.endsWith('*')
              const word = accent ? raw.slice(1, -1) : raw
              const i = n++
              const cls = accent ? 'w w-accent' : 'w'
              return (
                <Fragment key={i}>
                  <span className="w-mask" aria-hidden="true">
                    {onView ? (
                      <motion.span className={cls} variants={wordVariants}>
                        {word}
                      </motion.span>
                    ) : (
                      <span className={`${cls} w-css`} style={{ '--i': i }}>
                        {word}
                      </span>
                    )}
                  </span>{' '}
                </Fragment>
              )
            })}
          {li < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </Tag>
  )
}
