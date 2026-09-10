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
  systemNodeCoords,
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

const HUB = systemNodeCoords.hub
/** Hub half-extents in viewBox % (matches ~9% smaller hub surface) */
const HUB_HALF_W = 14.2
const HUB_HALF_H = 13.4
/** Extra gap so arrowheads sit just outside the hub edge */
const HUB_EDGE_GAP = 0.85
/** Approximate node half-size in viewBox % */
const NODE_INSET = 7.6

function hubEdgeInset(dx, dy) {
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const tx = Math.abs(ux) < 1e-8 ? Number.POSITIVE_INFINITY : HUB_HALF_W / Math.abs(ux)
  const ty = Math.abs(uy) < 1e-8 ? Number.POSITIVE_INFINITY : HUB_HALF_H / Math.abs(uy)
  return Math.min(tx, ty) + HUB_EDGE_GAP
}

function shortenLine(x1, y1, x2, y2, startInset, endInset) {
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

const CAP_FOR_FLOW = {
  'email-hub': 'Read',
  'pdf-hub': 'Read',
  'excel-hub': 'Read',
  'whatsapp-hub': 'Connect',
  'hub-erp': 'Act',
  'hub-crm': 'Connect',
  'hub-accounting': 'Validate',
  'hub-ecommerce': 'Act',
}

function SystemNode({ item, index, active, highlighted, onHover, reduceMotion }) {
  const Icon = iconMap[item.icon] ?? Database
  const group = item.flow === 'in' ? 'source' : 'system'

  return (
    <motion.li
      className={`systems-node systems-node--${item.position} systems-node--${item.flow} systems-node--${group} systems-node--${item.accent}${highlighted ? ' systems-node--hot' : ''}`}
      style={{
        '--node-x': `${systemNodeCoords[item.position]?.x ?? 50}%`,
        '--node-y': `${systemNodeCoords[item.position]?.y ?? 50}%`,
      }}
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
      tabIndex={0}
    >
      <span className="systems-node__icon" aria-hidden="true">
        <Icon className="h-5 w-5" strokeWidth={1.85} />
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
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="systems-line-in" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(110,160,255,0.98)" />
          <stop offset="50%" stopColor="rgba(130,120,255,0.88)" />
          <stop offset="100%" stopColor="rgba(150,100,255,0.78)" />
        </linearGradient>
        <linearGradient id="systems-line-out" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,200,255,0.88)" />
          <stop offset="100%" stopColor="rgba(40,220,170,0.95)" />
        </linearGradient>
        <marker
          id="systems-arrow-in"
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="3.6"
          markerHeight="3.6"
          orient="auto-start-reverse"
          markerUnits="strokeWidth"
        >
          <path d="M 0 1.2 L 8.5 5 L 0 8.8 Z" fill="rgba(150,180,255,0.95)" />
        </marker>
        <marker
          id="systems-arrow-out"
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="3.6"
          markerHeight="3.6"
          orient="auto-start-reverse"
          markerUnits="strokeWidth"
        >
          <path d="M 0 1.2 L 8.5 5 L 0 8.8 Z" fill="rgba(60,230,185,0.95)" />
        </marker>
      </defs>

      {systemConnections.map((item) => {
        const point = systemNodeCoords[item.position]
        if (!point) return null

        const isHot =
          hoverId === item.id ||
          (activeFlow &&
            ((activeFlow.from === item.id && activeFlow.to === 'hub') ||
              (activeFlow.to === item.id && activeFlow.from === 'hub')))

        const fromHub = item.flow === 'out'
        const from = fromHub ? HUB : point
        const to = fromHub ? point : HUB
        const peri = fromHub ? to : from
        const hubInset = hubEdgeInset(peri.x - HUB.x, peri.y - HUB.y)
        const line = shortenLine(
          from.x,
          from.y,
          to.x,
          to.y,
          fromHub ? hubInset : NODE_INSET,
          fromHub ? NODE_INSET : hubInset,
        )
        const gradient = item.flow === 'in' ? 'url(#systems-line-in)' : 'url(#systems-line-out)'
        const marker =
          item.flow === 'in' ? 'url(#systems-arrow-in)' : 'url(#systems-arrow-out)'

        return (
          <g
            key={item.id}
            className={`systems-line-group systems-line-group--${item.flow}${isHot ? ' systems-line-group--hot' : ''}`}
          >
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
          className={`systems-pulse systems-pulse--${activeFlow.from === 'hub' ? 'out' : 'in'}`}
          r="1.3"
        >
          <animateMotion
            dur="1.35s"
            fill="freeze"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
            path={`M ${systemNodeCoords[activeFlow.from]?.x ?? HUB.x},${systemNodeCoords[activeFlow.from]?.y ?? HUB.y} L ${systemNodeCoords[activeFlow.to]?.x ?? HUB.x},${systemNodeCoords[activeFlow.to]?.y ?? HUB.y}`}
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
  const hoverItem = systemConnections.find((item) => item.id === hoverId)
  const hoverCap =
    hoverItem?.flow === 'in'
      ? 'Read'
      : hoverItem?.flow === 'out'
        ? 'Connect'
        : null

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
              AI automation works around the tools, documents and operational
              systems already used across your business, helping information move
              between people, workflows and your ERP without forcing a complete
              technology replacement.
            </p>
          </Reveal>
        </div>

        <div className="systems-eco-stage">
          <div
            ref={ecoRef}
            className={`systems-eco mt-7 sm:mt-8${active ? ' systems-eco--live' : ''}${hubHot ? ' systems-eco--hub-hot' : ''}`}
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
              <div className="systems-hub__halo" aria-hidden="true" />
              <div className="systems-hub__core">
                <span className="systems-hub__status" aria-hidden="true" />
                <p className="systems-hub__label">ERP + AI</p>
                <p className="systems-hub__sub">Operations Intelligence Layer</p>
                <ul className="systems-hub__caps" aria-label="Intelligence capabilities">
                  {hubCaps.map((cap) => (
                    <li
                      key={cap}
                      className={
                        activeCap === cap || hoverCap === cap
                          ? 'systems-hub__cap--active'
                          : undefined
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
        </div>

        <Reveal delay={0.22} className="mt-5 sm:mt-6">
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
