import { motion, useReducedMotion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

function Reveal({
  children,
  delay = 0,
  duration = 0.55,
  immediate = false,
  y = 14,
  className = '',
  as = 'div',
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (reduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  const transition = {
    duration,
    delay,
    ease,
  }

  if (immediate) {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        {...props}
      >
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={transition}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

export default Reveal
