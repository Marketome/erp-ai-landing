import { useEffect, useRef, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Database,
  ListChecks,
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
} from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import {
  aiProcessingSteps,
  controlGateItems,
  controlPrinciples,
  readyPath,
  reviewPath,
} from '../data/controlPrinciples'

const iconMap = {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Database,
  ListChecks,
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
}

const ease = [0.22, 1, 0.36, 1]
const PHASE_MS = 1400

/** Alternating ready / review scenario phases */
const FLOW_PHASES = [
  { kind: 'ai', step: 0 },
  { kind: 'ai', step: 1 },
  { kind: 'ai', step: 2 },
  { kind: 'ai', step: 3 },
  { kind: 'control' },
  { kind: 'branch', path: 'ready' },
  { kind: 'outcome', path: 'ready' },
  { kind: 'ai', step: 0 },
  { kind: 'ai', step: 1 },
  { kind: 'ai', step: 2 },
  { kind: 'ai', step: 3 },
  { kind: 'control' },
  { kind: 'branch', path: 'review' },
  { kind: 'outcome', path: 'review' },
]

function PrincipleItem({ item, index, active, reduceMotion }) {
  const Icon = iconMap[item.icon] ?? ShieldCheck

  return (
    <motion.li
      className={`control-principle control-principle--${item.accent}`}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={
        reduceMotion || active
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 12 }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.4, delay: 0.55 + index * 0.08, ease }
      }
    >
      <div className="control-principle__meta">
        <span className="control-principle__number" aria-hidden="true">
          {item.number}
        </span>
        <span className="control-principle__icon" aria-hidden="true">
          <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />
        </span>
      </div>
      <h3 className="control-principle__title">{item.title}</h3>
      <p className="control-principle__desc">{item.description}</p>
      <span className="control-principle__accent" aria-hidden="true" />
    </motion.li>
  )
}

function ControlAndTrust() {
  const reduceMotion = useReducedMotion()
  const stageRef = useRef(null)
  const inView = useInView(stageRef, { once: true, amount: 0.24 })
  const entered = reduceMotion || inView
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [hoverGate, setHoverGate] = useState(null)
  const [showPrinciples, setShowPrinciples] = useState(false)

  useEffect(() => {
    if (!entered) return undefined
    if (reduceMotion) {
      setShowPrinciples(true)
      return undefined
    }

    const revealTimer = window.setTimeout(() => setShowPrinciples(true), 900)
    return () => window.clearTimeout(revealTimer)
  }, [entered, reduceMotion])

  useEffect(() => {
    if (reduceMotion || !entered) return undefined

    const timer = window.setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % FLOW_PHASES.length)
    }, PHASE_MS)

    return () => window.clearInterval(timer)
  }, [entered, reduceMotion])

  const phase = reduceMotion ? null : FLOW_PHASES[phaseIndex]
  const aiStepActive =
    phase?.kind === 'ai' ? phase.step : phase ? aiProcessingSteps.length - 1 : -1
  const controlActive =
    reduceMotion ||
    phase?.kind === 'control' ||
    phase?.kind === 'branch' ||
    phase?.kind === 'outcome'
  const activePath = phase?.path ?? null
  const readyLit =
    reduceMotion || activePath === 'ready'
  const reviewLit =
    reduceMotion || activePath === 'review'
  const readyOutcomeLit =
    reduceMotion || (phase?.kind === 'outcome' && phase.path === 'ready')
  const reviewOutcomeLit =
    reduceMotion || (phase?.kind === 'outcome' && phase.path === 'review')

  return (
    <section
      id="control"
      className="control-section relative overflow-hidden"
      aria-labelledby="control-heading"
    >
      <div className="pointer-events-none absolute inset-0 control-backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 control-atmosphere" aria-hidden="true" />

      <Container className="relative control-section__inner">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#8fd4ff] uppercase">
              Control built into the workflow
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="control-heading"
              className="mt-3.5 text-[1.9rem] font-semibold tracking-tight text-[#f5f8ff] sm:text-4xl"
            >
              Automate the Routine. Keep People in Control.
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#c5d5ee] sm:text-[1.05rem] sm:leading-7">
              AI automation can handle repetitive document processing and
              workflow preparation while your team remains involved where
              approvals, exceptions and business judgment matter.
            </p>
          </Reveal>
        </div>

        <div
          ref={stageRef}
          className={`control-flow mt-10 sm:mt-11${entered ? ' control-flow--live' : ''}${
            readyLit && !reviewLit ? ' control-flow--ready' : ''
          }${reviewLit && !readyLit ? ' control-flow--review' : ''}${
            reduceMotion ? ' control-flow--static' : ''
          }`}
          aria-label="Control, review and trust workflow"
        >
          {/* LEFT: AI Processing */}
          <motion.div
            className="control-ai"
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            animate={
              reduceMotion || entered
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -16 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.45, delay: 0.12, ease }
            }
          >
            <p className="control-panel__eyebrow">AI Processing</p>
            <ol className="control-ai__steps">
              {aiProcessingSteps.map((step, index) => {
                const lit =
                  reduceMotion ||
                  (entered &&
                    (phase?.kind === 'ai'
                      ? index <= aiStepActive
                      : Boolean(phase)))
                const current =
                  !reduceMotion && phase?.kind === 'ai' && index === aiStepActive

                return (
                  <li
                    key={step.id}
                    className={`control-ai__step control-ai__step--${step.accent}${
                      lit ? ' control-ai__step--lit' : ''
                    }${current ? ' control-ai__step--current' : ''}`}
                  >
                    <span className="control-ai__dot" aria-hidden="true" />
                    <span className="control-ai__label">{step.label}</span>
                    {index < aiProcessingSteps.length - 1 ? (
                      <span className="control-ai__connector" aria-hidden="true" />
                    ) : null}
                  </li>
                )
              })}
            </ol>
          </motion.div>

          <span className="control-flow__arrow control-flow__arrow--to-gate" aria-hidden="true">
            →
          </span>

          {/* CENTER: Control Gate */}
          <motion.div
            className={`control-gate${controlActive ? ' control-gate--active' : ''}`}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={
              reduceMotion || entered
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.94 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.48, delay: 0.28, ease }
            }
          >
            <div className="control-gate__panel">
              <span className="control-gate__status" aria-hidden="true" />
              <div className="control-gate__heading">
                <ShieldCheck
                  className="control-gate__heading-icon"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <p className="control-gate__label">Control Layer</p>
              </div>
              <p className="control-gate__sub">
                Validation before important actions continue
              </p>
              <ul className="control-gate__items">
                {controlGateItems.map((item) => {
                  const Icon = iconMap[item.icon] ?? ListChecks
                  const hot = hoverGate === item.id || controlActive

                  return (
                    <li
                      key={item.id}
                      className={`control-gate__item${hot ? ' control-gate__item--hot' : ''}`}
                      onMouseEnter={() => setHoverGate(item.id)}
                      onMouseLeave={() => setHoverGate(null)}
                      onFocus={() => setHoverGate(item.id)}
                      onBlur={() => setHoverGate(null)}
                    >
                      <Icon
                        className="control-gate__item-icon"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>

          <span className="control-flow__arrow control-flow__arrow--to-branch" aria-hidden="true">
            →
          </span>

          {/* RIGHT: Decision branches + outcomes */}
          <motion.div
            className="control-branches"
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            animate={
              reduceMotion || entered
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 16 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.45, delay: 0.4, ease }
            }
          >
            <div
              className={`control-path control-path--ready${
                readyLit ? ' control-path--lit' : ''
              }`}
            >
              <div className="control-path__header">
                <CheckCircle2
                  className="control-path__icon"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p className="control-path__title">{readyPath.title}</p>
              </div>
              <ul className="control-path__tags">
                {readyPath.labels.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
              <div
                className={`control-outcome control-outcome--ready${
                  readyOutcomeLit ? ' control-outcome--lit' : ''
                }`}
              >
                <Database
                  className="control-outcome__icon"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <div>
                  <p className="control-outcome__title">
                    {readyPath.outcome.title}
                  </p>
                  <ul className="control-outcome__tags">
                    {readyPath.outcome.labels.map((label) => (
                      <li key={label}>{label}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p className="control-branches__or" aria-hidden="true">
              or
            </p>

            <div
              className={`control-path control-path--review${
                reviewLit ? ' control-path--lit' : ''
              }`}
            >
              <div className="control-path__header">
                <AlertTriangle
                  className="control-path__icon"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p className="control-path__title">{reviewPath.title}</p>
              </div>
              <ul className="control-path__tags">
                {reviewPath.labels.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
              <div
                className={`control-outcome control-outcome--review${
                  reviewOutcomeLit ? ' control-outcome--lit' : ''
                }`}
              >
                <UserCheck
                  className="control-outcome__icon"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <div>
                  <p className="control-outcome__title">
                    {reviewPath.outcome.title}
                  </p>
                  <ul className="control-outcome__tags">
                    {reviewPath.outcome.labels.map((label) => (
                      <li key={label}>{label}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <ol className="control-principles mt-10 sm:mt-11">
          {controlPrinciples.map((item, index) => (
            <PrincipleItem
              key={item.id}
              item={item}
              index={index}
              active={showPrinciples}
              reduceMotion={reduceMotion}
            />
          ))}
        </ol>

        <div className="control-bottom relative mt-7 sm:mt-8" aria-hidden="true">
          <div className="control-bottom__fade" />
        </div>
      </Container>
    </section>
  )
}

export default ControlAndTrust
