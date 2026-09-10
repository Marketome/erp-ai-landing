import { useEffect, useId, useRef, useState } from 'react'
import {
  Activity,
  ChartNoAxesCombined,
  CheckCircle2,
  Database,
  FileInput,
  FileSearch,
  FileText,
  Mail,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Table2,
} from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import { automationPaths } from '../data/automationPaths'

const iconMap = {
  Activity,
  ChartNoAxesCombined,
  Database,
  FileInput,
  FileSearch,
  FileText,
  ShoppingCart,
  Scale,
  Table2,
}

const ease = [0.22, 1, 0.36, 1]
const SWITCH_MS = 0.5
const LOOP_MS = 1700

function PathSelector({ paths, activeId, onSelect, labelledBy, reduceMotion }) {
  const listRef = useRef(null)

  const focusPath = (index) => {
    const buttons = listRef.current?.querySelectorAll('[role="tab"]')
    buttons?.[index]?.focus()
  }

  const onKeyDown = (event) => {
    const index = paths.findIndex((path) => path.id === activeId)
    if (index < 0) return

    let next = index
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      next = (index + 1) % paths.length
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      next = (index - 1 + paths.length) % paths.length
    } else if (event.key === 'Home') {
      next = 0
    } else if (event.key === 'End') {
      next = paths.length - 1
    } else {
      return
    }

    event.preventDefault()
    onSelect(paths[next].id)
    focusPath(next)
  }

  return (
    <div
      ref={listRef}
      className="paths-selector"
      role="tablist"
      aria-labelledby={labelledBy}
      onKeyDown={onKeyDown}
    >
      {paths.map((path) => {
        const selected = path.id === activeId
        const Icon = iconMap[path.icon] ?? FileInput

        return (
          <button
            key={path.id}
            type="button"
            role="tab"
            id={`path-tab-${path.id}`}
            aria-selected={selected}
            aria-controls={`path-panel-${path.id}`}
            tabIndex={selected ? 0 : -1}
            className={`paths-row paths-row--${path.accent}${selected ? ' paths-row--active' : ''}`}
            onClick={() => onSelect(path.id)}
          >
            {selected ? (
              <motion.span
                className="paths-row__glow"
                layoutId={reduceMotion ? undefined : 'paths-active-glow'}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 380, damping: 34 }
                }
                aria-hidden="true"
              />
            ) : null}
            <span className="paths-row__rail" aria-hidden="true" />
            <div className="paths-row__meta">
              <span className="paths-row__number">{path.number}</span>
              <span className="paths-row__icon" aria-hidden="true">
                <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />
              </span>
            </div>
            <div className="paths-row__body">
              <h3 className="paths-row__title">
                <span className="paths-row__title-full">{path.title}</span>
                <span className="paths-row__title-short">{path.shortLabel}</span>
              </h3>
              <p className="paths-row__desc">{path.description}</p>
              <ul className="paths-row__examples">
                {path.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </div>
            <span className="paths-row__line" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}

function OrderDataVisual({ path, phase, reduceMotion, live }) {
  const { visual } = path
  const complete = reduceMotion || !live
  const showDoc = complete || phase >= 0
  const showAi = complete || phase >= 1
  const showFields = complete || phase >= 2
  const showValidate = complete || phase >= 3
  const showOutput = complete || phase >= 4

  return (
    <div
      className={`paths-board paths-board--order${live ? ' paths-board--live' : ''}${showAi ? ' paths-board--ai-lit' : ''}${showOutput ? ' paths-board--success' : ''}`}
    >
      <div className="paths-board__glow" aria-hidden="true" />
      <div className="paths-board__halo" aria-hidden="true" />
      <div className="paths-board__matrix" aria-hidden="true" />
      <svg
        className="paths-board__arcs"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <marker id="paths-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="3.2" markerHeight="3.2" orient="auto-start-reverse">
            <path d="M 0 1.2 L 8 5 L 0 8.8 Z" fill="rgba(0,186,255,0.75)" />
          </marker>
          <marker id="paths-arrow-success" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="3.2" markerHeight="3.2" orient="auto-start-reverse">
            <path d="M 0 1.2 L 8 5 L 0 8.8 Z" fill="rgba(34,201,151,0.8)" />
          </marker>
        </defs>
        <path
          className={`paths-arc${showAi ? ' paths-arc--on' : ''}`}
          d="M18 28 C 32 28, 38 42, 48 48"
          fill="none"
          markerEnd={showAi ? 'url(#paths-arrow)' : undefined}
        />
        <path
          className={`paths-arc${showValidate ? ' paths-arc--on' : ''}`}
          d="M56 62 C 62 68, 66 72, 72 76"
          fill="none"
          markerEnd={showValidate ? 'url(#paths-arrow)' : undefined}
        />
        <path
          className={`paths-arc${showOutput ? ' paths-arc--success' : ''}`}
          d="M64 70 C 72 76, 78 80, 86 84"
          fill="none"
          markerEnd={showOutput ? 'url(#paths-arrow-success)' : undefined}
        />
        {showAi && !reduceMotion ? (
          <circle key={`p-ai-${phase}`} className="paths-particle" r="1.15" fill="#00baff">
            <animateMotion dur="1.35s" repeatCount="1" path="M18 28 C 32 28, 38 42, 48 48" />
          </circle>
        ) : null}
        {showOutput && !reduceMotion ? (
          <circle key={`p-out-${phase}`} className="paths-particle paths-particle--success" r="1.15" fill="#22c997">
            <animateMotion dur="1.35s" repeatCount="1" path="M64 70 C 72 76, 78 80, 86 84" />
          </circle>
        ) : null}
      </svg>

      <article className={`paths-node paths-node--doc${showDoc ? ' paths-node--on' : ''}`}>
        <p className="paths-node__label">{visual.incoming.label}</p>
        <div className="paths-node__file">
          <FileText className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
          <span className="paths-node__filename">{visual.incoming.file}</span>
        </div>
        <p className="paths-node__meta">
          <Mail className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
          Source: {visual.incoming.source}
        </p>
      </article>

      <div className={`paths-ai paths-ai--order${showAi ? ' paths-ai--on' : ''}`}>
        <span className="paths-ai__halo" aria-hidden="true" />
        <div className="paths-ai__head">
          <span className="paths-ai__pulse" aria-hidden="true" />
          <p className="paths-ai__title">AI Operations</p>
          <span className="paths-ai__live">Live</span>
        </div>
        <p className="paths-ai__subtitle">Reading purchase order</p>
        <ul className="paths-extract">
          {visual.fields.map((field, index) => {
            const lit =
              complete ||
              (showFields && phase > 2) ||
              (showFields && index <= Math.min(phase, visual.fields.length - 1))
            return (
              <li
                key={field}
                className={lit ? 'paths-extract__item--on' : undefined}
                style={{ '--i': String(index) }}
              >
                <span>{field}</span>
                <CheckCircle2
                  className="paths-extract__check"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </li>
            )
          })}
        </ul>
      </div>

      <div className={`paths-gate${showValidate ? ' paths-gate--on' : ''}`}>
        <ShieldCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
        <span>Validated</span>
      </div>

      <article
        className={`paths-node paths-node--erp${showOutput ? ' paths-node--on paths-node--success' : ''}`}
      >
        <p className="paths-node__label">{visual.output.label}</p>
        <p className="paths-node__order">{visual.output.order}</p>
        <p className="paths-node__status">
          <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
          {visual.output.status}
        </p>
      </article>
    </div>
  )
}

function ProcurementVisual({ path, phase, reduceMotion, live }) {
  const { visual } = path
  const complete = reduceMotion || !live
  const showDoc = complete || phase >= 0
  const showAi = complete || phase >= 1
  const showCompare = complete || phase >= 2
  const showOutput = complete || phase >= 3

  return (
    <div
      className={`paths-board paths-board--rfq${live ? ' paths-board--live' : ''}${showAi ? ' paths-board--ai-lit' : ''}${showOutput ? ' paths-board--success' : ''}`}
    >
      <div className="paths-board__glow paths-board__glow--violet" aria-hidden="true" />
      <div className="paths-board__halo" aria-hidden="true" />
      <div className="paths-board__matrix" aria-hidden="true" />
      <svg
        className="paths-board__arcs"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className={`paths-arc${showAi ? ' paths-arc--on' : ''}`}
          d="M20 36 C 34 36, 40 44, 48 50"
          fill="none"
        />
        <path
          className={`paths-arc${showCompare ? ' paths-arc--on' : ''}`}
          d="M58 48 C 68 42, 74 38, 82 34"
          fill="none"
        />
        <path
          className={`paths-arc${showOutput ? ' paths-arc--success' : ''}`}
          d="M78 52 C 78 60, 78 68, 78 74"
          fill="none"
        />
        {showCompare && !reduceMotion ? (
          <circle key={`rfq-p-${phase}`} className="paths-particle" r="1.15" fill="#8951ff">
            <animateMotion dur="1.35s" repeatCount="1" path="M58 48 C 68 42, 74 38, 82 34" />
          </circle>
        ) : null}
        {showOutput && !reduceMotion ? (
          <circle key={`rfq-out-${phase}`} className="paths-particle paths-particle--success" r="1.15" fill="#22c997">
            <animateMotion dur="1.2s" repeatCount="1" path="M78 52 C 78 60, 78 68, 78 74" />
          </circle>
        ) : null}
      </svg>

      <article className={`paths-node paths-node--rfq${showDoc ? ' paths-node--on' : ''}`}>
        <p className="paths-node__label">{visual.incoming.label}</p>
        <div className="paths-node__file">
          <FileSearch className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
          <span className="paths-node__filename">{visual.incoming.file}</span>
        </div>
      </article>

      <div className={`paths-ai paths-ai--rfq${showAi ? ' paths-ai--on' : ''}`}>
        <span className="paths-ai__halo" aria-hidden="true" />
        <div className="paths-ai__head">
          <span className="paths-ai__pulse" aria-hidden="true" />
          <p className="paths-ai__title">AI Requirement Engine</p>
          <span className="paths-ai__live">Live</span>
        </div>
        <ul className="paths-req">
          {visual.fields.map((field, index) => (
            <li
              key={field}
              className={showAi ? 'paths-req__item--on' : undefined}
              style={{ '--i': String(index) }}
            >
              {field}
            </li>
          ))}
        </ul>
      </div>

      <div className={`paths-compare${showCompare ? ' paths-compare--on' : ''}`}>
        <p className="paths-compare__label">
          <Scale className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
          {visual.comparisonLabel}
        </p>
        <ul className="paths-suppliers">
          {visual.suppliers.map((supplier, index) => (
            <li
              key={supplier}
              className={`paths-supplier${showCompare ? ' paths-supplier--on' : ''}`}
              style={{ '--fan': String(index), '--i': String(index) }}
            >
              <div className="paths-supplier__row">
                <ShoppingCart className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                <span>{supplier}</span>
                <span className="paths-supplier__mark" aria-hidden="true" />
              </div>
              <span className="paths-supplier__meter" aria-hidden="true">
                <i />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <article
        className={`paths-node paths-node--ready${showOutput ? ' paths-node--on paths-node--success' : ''}`}
      >
        <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
        <p className="paths-node__label">{visual.output.label}</p>
      </article>
    </div>
  )
}

function OpsWidget({ type, label, active }) {
  return (
    <article className={`paths-widget paths-widget--${type}${active ? ' paths-widget--on' : ''}`}>
      <p className="paths-widget__title">{label}</p>
      {type === 'production' ? (
        <div className="paths-chart" aria-hidden="true">
          <div className="paths-bars">
            <span style={{ '--h': '38%' }} />
            <span style={{ '--h': '62%' }} />
            <span style={{ '--h': '48%' }} />
            <span style={{ '--h': '74%' }} />
            <span style={{ '--h': '56%' }} />
            <span style={{ '--h': '68%' }} />
          </div>
          <svg className="paths-trend" viewBox="0 0 100 28" preserveAspectRatio="none">
            <path d="M0 22 C 18 18, 28 12, 42 14 S 68 8, 100 6" fill="none" />
          </svg>
        </div>
      ) : null}
      {type === 'status' ? (
        <ol className="paths-progress paths-progress--segments" aria-hidden="true">
          <li className="paths-progress__step--done">Received</li>
          <li className="paths-progress__step--current">Processing</li>
          <li>Ready</li>
        </ol>
      ) : null}
      {type === 'inventory' ? (
        <ul className="paths-stock" aria-hidden="true">
          <li>
            <span className="paths-stock__label">
              <i className="paths-stock__dot paths-stock__dot--ok" />
              SKU family A
            </span>
            <span className="paths-stock__bar">
              <i style={{ width: '72%' }} />
            </span>
          </li>
          <li>
            <span className="paths-stock__label">
              <i className="paths-stock__dot paths-stock__dot--mid" />
              SKU family B
            </span>
            <span className="paths-stock__bar">
              <i style={{ width: '48%' }} />
            </span>
          </li>
          <li>
            <span className="paths-stock__label">
              <i className="paths-stock__dot paths-stock__dot--low" />
              SKU family C
            </span>
            <span className="paths-stock__bar paths-stock__bar--low">
              <i style={{ width: '28%' }} />
            </span>
          </li>
        </ul>
      ) : null}
    </article>
  )
}

function OperationsVisual({ path, phase, reduceMotion, live }) {
  const { visual } = path
  const complete = reduceMotion || !live
  const showSources = complete || phase >= 0
  const showHub = complete || phase >= 1
  const showOutputs = complete || phase >= 2

  const sourceIcons = {
    ERP: Database,
    Excel: Table2,
    'Operational Data': Activity,
  }

  const widgetType = {
    production: 'production',
    status: 'status',
    inventory: 'inventory',
  }

  return (
    <div
      className={`paths-board paths-board--ops${live ? ' paths-board--live' : ''}${showHub ? ' paths-board--ai-lit' : ''}${showOutputs ? ' paths-board--success' : ''}`}
    >
      <div className="paths-board__glow paths-board__glow--ops" aria-hidden="true" />
      <div className="paths-board__halo" aria-hidden="true" />
      <div className="paths-board__matrix" aria-hidden="true" />
      <svg
        className="paths-board__arcs"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className={`paths-arc${showHub ? ' paths-arc--on' : ''}`}
          d="M20 22 C 34 34, 42 42, 50 48"
          fill="none"
        />
        <path
          className={`paths-arc${showHub ? ' paths-arc--on' : ''}`}
          d="M50 18 C 50 30, 50 38, 50 46"
          fill="none"
        />
        <path
          className={`paths-arc${showHub ? ' paths-arc--on' : ''}`}
          d="M80 22 C 66 34, 58 42, 50 48"
          fill="none"
        />
        <path
          className={`paths-arc${showOutputs ? ' paths-arc--success' : ''}`}
          d="M42 58 C 28 68, 22 76, 18 84"
          fill="none"
        />
        <path
          className={`paths-arc${showOutputs ? ' paths-arc--success' : ''}`}
          d="M50 60 C 50 70, 50 78, 50 86"
          fill="none"
        />
        <path
          className={`paths-arc${showOutputs ? ' paths-arc--success' : ''}`}
          d="M58 58 C 72 68, 78 76, 82 84"
          fill="none"
        />
      </svg>

      <ul className="paths-sources">
        {visual.sources.map((source) => {
          const Icon = sourceIcons[source] ?? Activity
          return (
            <li
              key={source}
              className={`paths-source${showSources ? ' paths-source--on' : ''}`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              <span>{source}</span>
            </li>
          )
        })}
      </ul>

      <div className={`paths-ai paths-ai--ops${showHub ? ' paths-ai--on' : ''}`}>
        <span className="paths-ai__halo" aria-hidden="true" />
        <span className="paths-ai__pulse" aria-hidden="true" />
        <ChartNoAxesCombined className="paths-ai__mark" strokeWidth={1.7} aria-hidden="true" />
        <p className="paths-ai__title">{visual.hubLabel}</p>
        <span className="paths-ai__live">Live</span>
        <ul className="paths-caps">
          <li>Monitor</li>
          <li>Interpret</li>
          <li>Respond</li>
        </ul>
      </div>

      <div className="paths-widgets">
        {visual.outputs.map((item) => (
          <OpsWidget
            key={item.id}
            type={widgetType[item.id] ?? 'production'}
            label={item.label}
            active={showOutputs}
          />
        ))}
      </div>
    </div>
  )
}

function PathVisual({ path, phase, reduceMotion, live }) {
  if (path.visualType === 'rfq-procurement') {
    return (
      <ProcurementVisual
        path={path}
        phase={phase}
        reduceMotion={reduceMotion}
        live={live}
      />
    )
  }

  if (path.visualType === 'operations-intelligence') {
    return (
      <OperationsVisual
        path={path}
        phase={phase}
        reduceMotion={reduceMotion}
        live={live}
      />
    )
  }

  return (
    <OrderDataVisual
      path={path}
      phase={phase}
      reduceMotion={reduceMotion}
      live={live}
    />
  )
}

function AutomationPaths() {
  const headingId = useId()
  const reduceMotion = useReducedMotion()
  const stageRef = useRef(null)
  const inView = useInView(stageRef, { once: true, amount: 0.26 })
  const [activeId, setActiveId] = useState(automationPaths[0].id)
  const [phase, setPhase] = useState(0)
  const [entered, setEntered] = useState(false)

  const activePath =
    automationPaths.find((path) => path.id === activeId) ?? automationPaths[0]

  const maxPhase =
    activePath.visualType === 'order-data'
      ? 4
      : activePath.visualType === 'rfq-procurement'
        ? 3
        : 2

  useEffect(() => {
    if (!inView) return undefined
    setEntered(true)
    return undefined
  }, [inView])

  useEffect(() => {
    setPhase(0)
  }, [activeId])

  useEffect(() => {
    if (!entered) return undefined
    if (reduceMotion) {
      setPhase(maxPhase)
      return undefined
    }

    const timer = window.setInterval(() => {
      setPhase((prev) => (prev >= maxPhase ? 0 : prev + 1))
    }, LOOP_MS)

    return () => window.clearInterval(timer)
  }, [entered, reduceMotion, activeId, maxPhase])

  return (
    <section
      id="automation-paths"
      className="paths-section relative overflow-hidden"
      aria-labelledby={headingId}
    >
      <div className="pointer-events-none absolute inset-0 paths-backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 paths-atmosphere" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 paths-decor" aria-hidden="true">
        <span className="paths-decor__arc" />
        <span className="paths-decor__field" />
        <span className="paths-decor__dots" />
      </div>

      <Container className="relative paths-section__inner">
        <div className="paths-intro">
          <Reveal>
            <p className="paths-intro__eyebrow text-xs font-semibold tracking-[0.22em] text-[#8fd4ff] uppercase">
              Automation paths
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id={headingId}
              className="paths-intro__title mt-3.5 text-[2rem] font-semibold tracking-tight text-[#f5f8ff] sm:text-[2.35rem]"
            >
              Choose the Automation Your Business Needs
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="paths-intro__desc mt-4 max-w-xl text-base leading-relaxed text-[#c5d5ee] sm:text-[1.05rem] sm:leading-7">
              Start with the operational process creating the most manual work.
              AI automation can handle document-heavy workflows while keeping
              your existing ERP and business systems at the center.
            </p>
          </Reveal>
        </div>

        <div
          ref={stageRef}
          className={`paths-stage mt-9 sm:mt-10${entered ? ' paths-stage--live' : ''}`}
        >
          <PathSelector
            paths={automationPaths}
            activeId={activeId}
            onSelect={setActiveId}
            labelledBy={headingId}
            reduceMotion={reduceMotion}
          />

          <div
            className="paths-stage__panel"
            role="tabpanel"
            id={`path-panel-${activePath.id}`}
            aria-labelledby={`path-tab-${activePath.id}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activePath.id}
                className="paths-stage__visual"
                initial={reduceMotion ? false : { opacity: 0, x: 16, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -12, y: -6 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: SWITCH_MS, ease }
                }
              >
                <PathVisual
                  path={activePath}
                  phase={phase}
                  reduceMotion={reduceMotion}
                  live={entered}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default AutomationPaths
