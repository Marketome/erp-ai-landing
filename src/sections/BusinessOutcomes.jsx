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

const LINE_COORDS = {
  top: { x1: 50, y1: 38, x2: 50, y2: 22 },
  left: { x1: 38, y1: 50, x2: 24, y2: 50 },
  right: { x1: 62, y1: 50, x2: 76, y2: 50 },
  bottom: { x1: 50, y1: 62, x2: 50, y2: 78 },
}

function OutcomeBlock({ item, index, active, highlighted, onHover, reduceMotion }) {
  const Icon = iconMap[item.icon] ?? ClipboardCheck

  return (
    <motion.li
      className={`outcomes-item outcomes-item--${item.position} outcomes-item--${item.accent}${highlighted ? ' outcomes-item--hot' : ''}`}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={
        reduceMotion || active
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 14 }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.4, delay: 0.28 + index * 0.1, ease }
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
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
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
              ERP + AI helps teams reduce manual processing, move information
              through workflows more consistently and keep people focused on the
              decisions that require human judgment.
            </p>
          </Reveal>
        </div>

        <div
          ref={stageRef}
          className={`outcomes-stage mt-10 sm:mt-12${active ? ' outcomes-stage--live' : ''}`}
        >
          <svg
            className="outcomes-stage__lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="outcomes-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(79,107,255,0.55)" />
                <stop offset="50%" stopColor="rgba(0,186,255,0.4)" />
                <stop offset="100%" stopColor="rgba(34,201,151,0.45)" />
              </linearGradient>
            </defs>
            {businessOutcomes.map((item) => {
              const line = LINE_COORDS[item.position]
              if (!line) return null
              const hot = hovered?.position === item.position
              return (
                <line
                  key={item.id}
                  className={`outcomes-line${active ? ' outcomes-line--visible' : ''}${hot ? ' outcomes-line--hot' : ''}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="url(#outcomes-line)"
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
              reduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.12, ease }
            }
          >
            <div className="outcomes-core__panel">
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

        <Reveal delay={0.3} className="outcomes-closer mt-10 sm:mt-12">
          <p className="outcomes-closer__title">
            Start with one process. Expand as the workflow proves its value.
          </p>
          <p className="outcomes-closer__text">
            ERP + AI can be introduced around specific operational pain points
            instead of requiring a complete transformation on day one.
          </p>
        </Reveal>

        <div className="outcomes-bottom relative mt-8 sm:mt-9" aria-hidden="true">
          <div className="outcomes-bottom__fade" />
        </div>
      </Container>
    </section>
  )
}

export default BusinessOutcomes
