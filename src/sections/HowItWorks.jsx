import { useRef } from 'react'
import {
  ArrowRight,
  Database,
  Inbox,
  ListChecks,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import { howItWorksSteps } from '../data/howItWorksSteps'

const iconMap = {
  Inbox,
  ListChecks,
  Sparkles,
  Database,
}

const ease = [0.22, 1, 0.36, 1]
const SEQUENCE_MS = 2400

function StepStation({ step, index, active, reduceMotion, showArrow }) {
  const Icon = iconMap[step.icon] ?? Sparkles
  const isAi = step.id === 'ai-processes'

  return (
    <motion.li
      className={`hiw-step hiw-step--${step.accent}${isAi ? ' hiw-step--ai' : ''}${active ? ' hiw-step--active' : ''}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={
        reduceMotion || active
          ? { opacity: 1, y: 0 }
          : { opacity: 0.28, y: 10 }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.38,
              delay: active ? index * 0.5 : 0,
              ease,
            }
      }
    >
      <div className="hiw-step__node" aria-hidden="true">
        <span className="hiw-step__ring" />
        <span className="hiw-step__number">{step.number}</span>
        <span className="hiw-step__icon">
          <Icon className="hiw-step__icon-svg" strokeWidth={1.75} />
        </span>
        {isAi ? <span className="hiw-step__pulse" /> : null}
      </div>

      {showArrow ? (
        <span className="hiw-step__arrow" aria-hidden="true">
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      ) : null}

      <div className="hiw-step__body">
        <h3 className="hiw-step__title">{step.title}</h3>
        <p className="hiw-step__desc">{step.description}</p>
        <ul className="hiw-step__chips">
          {step.items.map((item, chipIndex) => (
            <motion.li
              key={item}
              className="hiw-step__chip"
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={
                reduceMotion || active
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.2, y: 2 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.24,
                      delay: active ? index * 0.5 + 0.14 + chipIndex * 0.045 : 0,
                      ease,
                    }
              }
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.li>
  )
}

function HowItWorks() {
  const reduceMotion = useReducedMotion()
  const timelineRef = useRef(null)
  const inView = useInView(timelineRef, { once: true, amount: 0.26 })
  const sequenceActive = reduceMotion || inView

  return (
    <section
      id="how-it-works"
      className="hiw-section relative overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <div className="pointer-events-none absolute inset-0 hiw-backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hiw-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hiw-stage-glows" aria-hidden="true" />

      <Container className="relative hiw-section__inner">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#9adbff] uppercase">
              How it works
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="how-it-works-heading"
              className="mt-3.5 text-[2rem] font-semibold tracking-tight text-[#f5f8ff] sm:text-[2.35rem] lg:text-[2.6rem]"
            >
              Add AI to Your Operations Without Replacing Your ERP
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#c5d5ee] sm:text-[1.05rem] sm:leading-7">
              Connect the documents and workflows your team already uses, define
              how each process should work, and let AI handle repetitive
              operational tasks while your ERP remains the system at the center
              of the business.
            </p>
          </Reveal>
        </div>

        <div
          ref={timelineRef}
          className={`hiw-timeline mt-12 sm:mt-14${sequenceActive ? ' hiw-timeline--live' : ''}${reduceMotion ? ' hiw-timeline--instant' : ''}`}
          style={{ '--hiw-sequence': `${SEQUENCE_MS}ms` }}
        >
          <div className="hiw-timeline__track" aria-hidden="true">
            <span className="hiw-timeline__base" />
            <span className="hiw-timeline__progress" />
            <span className="hiw-timeline__dot hiw-timeline__dot--entrance" />
            <span className="hiw-timeline__dot hiw-timeline__dot--loop" />
          </div>

          <ol className="hiw-timeline__steps">
            {howItWorksSteps.map((step, index) => (
              <StepStation
                key={step.id}
                step={step}
                index={index}
                active={sequenceActive}
                reduceMotion={reduceMotion}
                showArrow={index < howItWorksSteps.length - 1}
              />
            ))}
          </ol>
        </div>

        <Reveal delay={0.4} className="hiw-reassure-wrap mt-8 sm:mt-9">
          <div className="hiw-reassure__connector" aria-hidden="true" />
          <aside className="hiw-reassure" aria-label="ERP reassurance">
            <span className="hiw-reassure__icon" aria-hidden="true">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div className="hiw-reassure__copy">
              <p className="hiw-reassure__title">Your ERP stays at the center.</p>
              <p className="hiw-reassure__text">
                AI works around your existing operational systems to reduce
                repetitive work without forcing your team to replace the tools
                they already depend on.
              </p>
            </div>
          </aside>
        </Reveal>

        <div className="hiw-bottom relative mt-8 sm:mt-9" aria-hidden="true">
          <div className="hiw-bottom__fade" />
        </div>
      </Container>
    </section>
  )
}

export default HowItWorks
