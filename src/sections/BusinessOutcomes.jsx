import { useRef, useState } from 'react'
import {
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
  Workflow,
} from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import { businessOutcomes } from '../data/businessOutcomes'

const iconMap = {
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
  Workflow,
}

const ease = [0.22, 1, 0.36, 1]

/** Editorial rails from ERP + AI toward each outcome (viewBox 0 0 100 100).
 * Cardinal only — short intentional spans in the hub↔outcome gap.
 * No diagonal / floating decorative segments.
 */
const LINE_COORDS = {
  top: { x1: 50, y1: 39.5, x2: 50, y2: 21 },
  left: { x1: 37, y1: 50, x2: 21.5, y2: 50 },
  right: { x1: 63, y1: 50, x2: 78.5, y2: 50 },
  bottom: { x1: 50, y1: 60.5, x2: 50, y2: 79 },
}

const ACCENT_STROKE = {
  blue: 'url(#outcomes-line-blue)',
  cyan: 'url(#outcomes-line-cyan)',
  violet: 'url(#outcomes-line-violet)',
  emerald: 'url(#outcomes-line-emerald)',
}

const ENTRANCE_DELAY = {
  top: 0.38,
  left: 0.52,
  right: 0.58,
  bottom: 0.72,
}

function OutcomeBlock({ item, index, active, highlighted, onHover, reduceMotion }) {
  const Icon = iconMap[item.icon] ?? ClipboardCheck
  const delay = ENTRANCE_DELAY[item.position] ?? 0.4 + index * 0.1

  return (
    <motion.li
      className={`outcomes-item outcomes-item--${item.position} outcomes-item--${item.accent}${highlighted ? ' outcomes-item--hot' : ''}`}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={
        reduceMotion || active
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 12 }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.42, delay, ease }
      }
      onMouseEnter={() => onHover?.(item.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(item.id)}
      onBlur={() => onHover?.(null)}
    >
      <div className="outcomes-item__meta">
        <span className="outcomes-item__number" aria-hidden="true">
          {item.number}
        </span>
        <span className="outcomes-item__icon" aria-hidden="true">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
      </div>
      <h3 className="outcomes-item__title">{item.title}</h3>
      <p className="outcomes-item__desc">{item.description}</p>
      <span className="outcomes-item__accent" aria-hidden="true" />
    </motion.li>
  )
}

function BusinessOutcomes() {
  const reduceMotion = useReducedMotion()
  const stageRef = useRef(null)
  const inView = useInView(stageRef, { once: true, amount: 0.28 })
  const active = reduceMotion || inView
  const [hoverId, setHoverId] = useState(null)
  const hovered = businessOutcomes.find((item) => item.id === hoverId)

  return (
    <section
      id="outcomes"
      className="outcomes-section relative overflow-hidden"
      aria-labelledby="outcomes-heading"
    >
      <div className="pointer-events-none absolute inset-0 outcomes-backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 outcomes-atmosphere" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 outcomes-words" aria-hidden="true">
        <span>Process</span>
        <span>Data</span>
        <span>Control</span>
        <span>Focus</span>
      </div>

      <Container className="relative outcomes-section__inner">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#8fd4ff] uppercase">
              Business outcomes
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="outcomes-heading"
              className="mt-3.5 text-[1.9rem] font-semibold tracking-tight text-[#f5f8ff] sm:text-4xl"
            >
              Less Repetitive Work. More Operational Control.
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#c5d5ee] sm:text-[1.05rem] sm:leading-7">
              AI automation helps teams reduce manual processing, move
              information through workflows more consistently and keep people
              focused on the decisions that require human judgment.
            </p>
          </Reveal>
        </div>

        <div className="outcomes-stage-wrap mt-7 sm:mt-8">
          <div
            ref={stageRef}
            className={`outcomes-stage${active ? ' outcomes-stage--live' : ''}`}
          >
            <svg
              className="outcomes-stage__lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="outcomes-line-blue" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="rgba(79,107,255,0.55)" />
                  <stop offset="100%" stopColor="rgba(61,139,255,0.85)" />
                </linearGradient>
                <linearGradient id="outcomes-line-cyan" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="rgba(79,107,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(0,186,255,0.85)" />
                </linearGradient>
                <linearGradient id="outcomes-line-violet" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="rgba(79,107,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(137,81,255,0.85)" />
                </linearGradient>
                <linearGradient id="outcomes-line-emerald" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="rgba(79,107,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(34,201,151,0.75)" />
                </linearGradient>
              </defs>
              {businessOutcomes.map((item, index) => {
                const line = LINE_COORDS[item.position]
                if (!line) return null
                const hot = hovered?.position === item.position
                return (
                  <line
                    key={item.id}
                    className={`outcomes-line outcomes-line--${item.accent}${active ? ' outcomes-line--visible' : ''}${hot ? ' outcomes-line--hot' : ''}`}
                    style={{ '--line-delay': `${0.95 + index * 0.06}s` }}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={ACCENT_STROKE[item.accent] ?? 'url(#outcomes-line-blue)'}
                  />
                )
              })}
            </svg>

            <motion.div
              className="outcomes-core"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
              animate={
                reduceMotion || active
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.94 }
              }
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.48, delay: 0.12, ease }
              }
            >
              <div className="outcomes-core__glow" aria-hidden="true" />
              <div className="outcomes-core__panel">
                <span className="outcomes-core__node outcomes-core__node--top" aria-hidden="true" />
                <span className="outcomes-core__node outcomes-core__node--left" aria-hidden="true" />
                <span className="outcomes-core__node outcomes-core__node--right" aria-hidden="true" />
                <span className="outcomes-core__node outcomes-core__node--bottom" aria-hidden="true" />
                <p className="outcomes-core__label">ERP + AI</p>
                <p className="outcomes-core__lead">Automate the repetitive.</p>
                <p className="outcomes-core__sub">Keep control of the important.</p>
              </div>
            </motion.div>

            <ul className="outcomes-stage__items">
              {businessOutcomes.map((item, index) => (
                <OutcomeBlock
                  key={item.id}
                  item={item}
                  index={index}
                  active={active}
                  highlighted={hoverId === item.id}
                  onHover={setHoverId}
                  reduceMotion={reduceMotion}
                />
              ))}
            </ul>
          </div>
        </div>

        <Reveal delay={0.28} className="outcomes-closer mt-6 sm:mt-7">
          <p className="outcomes-closer__title">
            Start with one process. Expand as the workflow proves its value.
          </p>
          <p className="outcomes-closer__text">
            AI automation can be introduced around specific operational pain
            points instead of requiring a complete transformation on day one.
          </p>
        </Reveal>

        <div className="outcomes-bottom relative mt-7 sm:mt-8" aria-hidden="true">
          <div className="outcomes-bottom__fade" />
        </div>
      </Container>
    </section>
  )
}

export default BusinessOutcomes
