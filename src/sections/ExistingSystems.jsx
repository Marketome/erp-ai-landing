import { useEffect, useRef, useState } from 'react'
import {
  Cable,
  Calculator,
  Database,
  FileText,
  ListChecks,
  Mail,
  MessageCircle,
  ShoppingBag,
  Table2,
  Users,
} from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import {
  systemConnections,
  systemFlowSequence,
  systemPrinciples,
} from '../data/systemConnections'

const iconMap = {
  Cable,
  Calculator,
  Database,
  FileText,
  ListChecks,
  Mail,
  MessageCircle,
  ShoppingBag,
  Table2,
  Users,
}

const hubCaps = ['Read', 'Connect', 'Validate', 'Act']
const ease = [0.22, 1, 0.36, 1]

/** Desktop network anchors — tightened toward hub for clearer connections */
const ECO_COORDS = {
  top: { x: 50, y: 12 },
  'top-left': { x: 20, y: 26 },
  'top-right': { x: 80, y: 26 },
  left: { x: 12, y: 50 },
  right: { x: 88, y: 50 },
  'bottom-left': { x: 20, y: 74 },
  'bottom-right': { x: 80, y: 74 },
  bottom: { x: 50, y: 88 },
  hub: { x: 50, y: 50 },
}

const HUB = ECO_COORDS.hub
const HUB_RADIUS = 11

const CAP_FOR_FLOW = {
  'email-hub': 'Read',
  'pdf-hub': 'Read',
  'excel-hub': 'Connect',
  'whatsapp-hub': 'Connect',
  'hub-erp': 'Act',
  'hub-crm': 'Connect',
  'hub-accounting': 'Validate',
  'hub-ecommerce': 'Act',
}

function shortenLine(x1, y1, x2, y2, startInset = 5.5, endInset = HUB_RADIUS) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const sx = dx / len
  const sy = dy / len
  return {
    x1: x1 + sx * startInset,
    y1: y1 + sy * startInset,
    x2: x2 - sx * endInset,
    y2: y2 - sy * endInset,
  }
}

function SystemNode({ item, index, active, highlighted, onHover, reduceMotion }) {
  const Icon = iconMap[item.icon] ?? Database

  return (
    <motion.li
      className={`systems-node systems-node--${item.position} systems-node--${item.flow} systems-node--${item.accent}${highlighted ? ' systems-node--hot' : ''}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
      animate={
        reduceMotion || active
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.92 }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.38, delay: 0.32 + index * 0.065, ease }
      }
      onMouseEnter={() => onHover?.(item.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(item.id)}
      onBlur={() => onHover?.(null)}
    >
      <span className="systems-node__icon" aria-hidden="true">
        <Icon className="h-[17px] w-[17px]" strokeWidth={1.85} />
      </span>
      <span className="systems-node__copy">
        <span className="systems-node__label">{item.label}</span>
        <span className="systems-node__category">{item.category}</span>
      </span>
    </motion.li>
  )
}

function ConnectionLines({ activeFlow, flowIndex, hoverId, reduceMotion, visible }) {
  return (
    <svg
      className="systems-eco__lines"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="systems-line-in" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(90,140,255,0.75)" />
          <stop offset="100%" stopColor="rgba(137,81,255,0.45)" />
        </linearGradient>
        <linearGradient id="systems-line-out" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,186,255,0.5)" />
          <stop offset="100%" stopColor="rgba(34,201,151,0.7)" />
        </linearGradient>
        <marker
          id="systems-arrow-in"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="3.2"
          markerHeight="3.2"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.2 L 8 5 L 0 8.8 Z" fill="rgba(120,160,255,0.85)" />
        </marker>
        <marker
          id="systems-arrow-out"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="3.2"
          markerHeight="3.2"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.2 L 8 5 L 0 8.8 Z" fill="rgba(50,220,180,0.85)" />
        </marker>
      </defs>

      {systemConnections.map((item) => {
        const point = ECO_COORDS[item.position]
        if (!point) return null

        const isHot =
          hoverId === item.id ||
          (activeFlow &&
            ((activeFlow.from === item.id && activeFlow.to === 'hub') ||
              (activeFlow.to === item.id && activeFlow.from === 'hub')))

        const from = item.flow === 'in' ? point : HUB
        const to = item.flow === 'in' ? HUB : point
        const line = shortenLine(from.x, from.y, to.x, to.y)
        const gradient = item.flow === 'in' ? 'url(#systems-line-in)' : 'url(#systems-line-out)'
        const marker =
          item.flow === 'in' ? 'url(#systems-arrow-in)' : 'url(#systems-arrow-out)'

        return (
          <g key={item.id} className={isHot ? 'systems-line-group--hot' : undefined}>
            <line
              className={`systems-line systems-line--${item.flow}${visible ? ' systems-line--visible' : ''}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={gradient}
              markerEnd={marker}
            />
          </g>
        )
      })}

      {!reduceMotion && activeFlow ? (
        <circle
          key={`${activeFlow.from}-${activeFlow.to}-${flowIndex}`}
          className="systems-pulse"
          r="0.9"
        >
          <animateMotion
            dur="1.4s"
            fill="freeze"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
            path={`M ${ECO_COORDS[activeFlow.from]?.x ?? HUB.x},${ECO_COORDS[activeFlow.from]?.y ?? HUB.y} L ${ECO_COORDS[activeFlow.to]?.x ?? HUB.x},${ECO_COORDS[activeFlow.to]?.y ?? HUB.y}`}
          />
        </circle>
      ) : null}
    </svg>
  )
}

function ExistingSystems() {
  const reduceMotion = useReducedMotion()
  const ecoRef = useRef(null)
  const inView = useInView(ecoRef, { once: true, amount: 0.26 })
  const active = reduceMotion || inView
  const [hoverId, setHoverId] = useState(null)
  const [flowIndex, setFlowIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion || !active) return undefined

    const timer = window.setInterval(() => {
      setFlowIndex((prev) => (prev + 1) % systemFlowSequence.length)
    }, 1750)

    return () => window.clearInterval(timer)
  }, [active, reduceMotion])

  const activeFlow = reduceMotion ? null : systemFlowSequence[flowIndex]
  const flowKey = activeFlow ? `${activeFlow.from}-${activeFlow.to}` : ''
  const activeCap = CAP_FOR_FLOW[flowKey] ?? null
  const hubHot = Boolean(hoverId || activeFlow)

  return (
    <section
      id="integrations"
      className="systems-section relative overflow-hidden"
      aria-labelledby="systems-heading"
    >
      <div className="pointer-events-none absolute inset-0 systems-backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 systems-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 systems-hub-glow" aria-hidden="true" />

      <Container className="relative systems-section__inner">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#8fd4ff] uppercase">
              Works with your operations
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="systems-heading"
              className="mt-3.5 text-[1.9rem] font-semibold tracking-tight text-[#f5f8ff] sm:text-4xl"
            >
              Keep the Systems Your Business Already Relies On
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#c5d5ee] sm:text-[1.05rem] sm:leading-7">
              ERP + AI works around the tools, documents and operational systems
              already used across your business, helping information move between
              people, workflows and your ERP without forcing a complete
              technology replacement.
            </p>
          </Reveal>
        </div>

        <div
          ref={ecoRef}
          className={`systems-eco mt-9 sm:mt-10${active ? ' systems-eco--live' : ''}${hubHot ? ' systems-eco--hub-hot' : ''}`}
        >
          <ConnectionLines
            activeFlow={activeFlow}
            flowIndex={flowIndex}
            hoverId={hoverId}
            reduceMotion={reduceMotion}
            visible={active}
          />

          <div className="systems-hub">
            <motion.div
              className="systems-hub__motion"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={
                reduceMotion || active
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.45, delay: 0.1, ease }
              }
            >
              <div className="systems-hub__core">
                <span className="systems-hub__status" aria-hidden="true" />
                <p className="systems-hub__label">ERP + AI</p>
                <p className="systems-hub__sub">Operations Intelligence Layer</p>
                <ul className="systems-hub__caps" aria-label="Intelligence capabilities">
                  {hubCaps.map((cap) => (
                    <li
                      key={cap}
                      className={
                        activeCap === cap ? 'systems-hub__cap--active' : undefined
                      }
                    >
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <ol className="systems-eco__nodes">
            {systemConnections.map((item, index) => (
              <SystemNode
                key={item.id}
                item={item}
                index={index}
                active={active}
                highlighted={
                  hoverId === item.id ||
                  activeFlow?.from === item.id ||
                  activeFlow?.to === item.id
                }
                onHover={setHoverId}
                reduceMotion={reduceMotion}
              />
            ))}
          </ol>
        </div>

        <Reveal delay={0.26} className="mt-8 sm:mt-9">
          <ul className="systems-principles">
            {systemPrinciples.map((item) => {
              const Icon = iconMap[item.icon] ?? Database
              return (
                <li key={item.id} className="systems-principle">
                  <span className="systems-principle__icon" aria-hidden="true">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="systems-principle__title">{item.title}</p>
                    <p className="systems-principle__text">{item.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>

        <p className="systems-note mt-5 text-center text-[11px] leading-relaxed text-[#7f93b0] sm:text-xs">
          Integration approach depends on your existing systems, workflow
          requirements and available interfaces.
        </p>

        <div className="systems-bottom relative mt-6 sm:mt-7" aria-hidden="true">
          <div className="systems-bottom__fade" />
        </div>
      </Container>
    </section>
  )
}

export default ExistingSystems
