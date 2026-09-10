import { useRef, useState } from 'react'
import {
  ArrowDown,
  Bot,
  CheckCircle,
  Clipboard,
  ClipboardList,
  Database,
  FileCheck,
  FileText,
  Keyboard,
  Mail,
  ReceiptText,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TableProperties,
  Workflow,
} from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import { workflowComparisons } from '../data/workflowComparisons'

const iconMap = {
  Bot,
  CheckCircle,
  Clipboard,
  ClipboardList,
  Database,
  FileCheck,
  FileText,
  Keyboard,
  Mail,
  ReceiptText,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TableProperties,
  Workflow,
}

const aiCapabilities = ['Read', 'Structure', 'Validate', 'Prepare']
const ease = [0.22, 1, 0.36, 1]

function StepNode({
  step,
  index,
  variant,
  animate,
  reduceMotion,
  baseDelay = 0,
  total,
}) {
  const Icon = iconMap[step.icon] ?? FileText
  const offsetClass =
    variant === 'manual' && (index === 1 || index === 3 || index === 5)
      ? 'workflow-node--offset'
      : ''

  return (
    <motion.li
      className={`workflow-node workflow-node--${variant} ${offsetClass}`}
      initial={reduceMotion || !animate ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.3, delay: baseDelay + index * 0.05, ease }
      }
      style={{ '--node-i': index, '--node-total': total }}
    >
      {index > 0 ? (
        <span
          className={`workflow-node__connector workflow-node__connector--${variant}`}
          aria-hidden="true"
        >
          {variant === 'manual' ? (
            <>
              <span className="workflow-node__gap-dot" />
              <span className="workflow-node__gap-line" />
              <span className="workflow-node__gap-dot" />
            </>
          ) : (
            <span className="workflow-node__flow-track">
              <span className="workflow-node__flow-pulse" />
            </span>
          )}
        </span>
      ) : null}

      <div className="workflow-node__card">
        <span className="workflow-node__badge" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="workflow-node__icon" aria-hidden="true">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.85} />
        </span>
        <p className="workflow-node__text">{step.text}</p>
        <span className="workflow-node__status" aria-hidden="true" />
      </div>
    </motion.li>
  )
}

function WorkflowColumn({
  variant,
  heading,
  support,
  steps,
  summary,
  animate,
  reduceMotion,
  baseDelay = 0,
  processKey,
}) {
  return (
    <motion.div
      key={processKey}
      className={`workflow-panel workflow-panel--${variant}`}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.32, ease }}
    >
      <div className="workflow-panel__header">
        <p className="workflow-panel__eyebrow">{heading}</p>
        <p className="workflow-panel__support">{support}</p>
      </div>

      <ol className="workflow-panel__steps">
        {steps.map((step, index) => (
          <StepNode
            key={`${processKey}-${step.id}`}
            step={step}
            index={index}
            variant={variant}
            animate={animate}
            reduceMotion={reduceMotion}
            baseDelay={baseDelay}
            total={steps.length}
          />
        ))}
      </ol>

      <div className="workflow-panel__summary">
        {variant === 'auto' ? (
          <Sparkles className="workflow-panel__summary-icon" strokeWidth={1.75} aria-hidden="true" />
        ) : null}
        <p>{summary}</p>
      </div>
    </motion.div>
  )
}

function AiCore({ visible, reduceMotion, flowActive, processKey }) {
  return (
    <motion.div
      className={`workflow-ai${flowActive ? ' workflow-ai--flowing' : ''}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={
        visible || reduceMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.94 }
      }
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.16, ease }
      }
    >
      <p className="workflow-ai__direction workflow-ai__direction--top">
        Manual data
      </p>
      <ArrowDown
        className="workflow-ai__v-arrow workflow-ai__v-arrow--top"
        strokeWidth={2}
        aria-hidden="true"
      />

      <div className="workflow-ai__bridge" aria-hidden="true">
        <span className="workflow-ai__h-line workflow-ai__h-line--in">
          <span key={`in-${processKey}`} className="workflow-ai__h-pulse workflow-ai__h-pulse--in" />
        </span>
        <span className="workflow-ai__h-line workflow-ai__h-line--out">
          <span key={`out-${processKey}`} className="workflow-ai__h-pulse workflow-ai__h-pulse--out" />
        </span>
      </div>

      <div className="workflow-ai__orb-wrap">
        <div className="workflow-ai__glow" aria-hidden="true" />
        <div className="workflow-ai__orb">
          <span className="workflow-ai__orb-ring" aria-hidden="true" />
          <span className="workflow-ai__orb-pulse" aria-hidden="true" />
          <Bot className="workflow-ai__orb-icon" strokeWidth={1.7} aria-hidden="true" />
        </div>
      </div>

      <div className="workflow-ai__titles">
        <p className="workflow-ai__label">ERP + AI</p>
        <p className="workflow-ai__sublabel">AI Transform</p>
      </div>

      <ul className="workflow-ai__caps" aria-label="AI transformation stages">
        {aiCapabilities.map((item, index) => (
          <li
            key={item}
            className="workflow-ai__cap"
            style={{ '--cap-i': index }}
          >
            <span className="workflow-ai__cap-dot" aria-hidden="true" />
            <span>{item}</span>
            {index < aiCapabilities.length - 1 ? (
              <span className="workflow-ai__cap-link" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ul>

      <ArrowDown
        className="workflow-ai__v-arrow workflow-ai__v-arrow--bottom"
        strokeWidth={2}
        aria-hidden="true"
      />
      <p className="workflow-ai__direction workflow-ai__direction--bottom">
        ERP-ready flow
      </p>
    </motion.div>
  )
}

function ManualVsAutomated() {
  const [activeId, setActiveId] = useState(workflowComparisons[0].id)
  const reduceMotion = useReducedMotion()
  const comparisonRef = useRef(null)
  const tablistRef = useRef(null)
  const inView = useInView(comparisonRef, { once: true, amount: 0.16 })
  const activeIndex = workflowComparisons.findIndex((item) => item.id === activeId)
  const active = workflowComparisons[activeIndex] ?? workflowComparisons[0]

  function selectProcess(id) {
    setActiveId(id)
  }

  function onTabKeyDown(event) {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
    if (!keys.includes(event.key)) return

    event.preventDefault()
    let nextIndex = activeIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (activeIndex + 1) % workflowComparisons.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex =
        (activeIndex - 1 + workflowComparisons.length) % workflowComparisons.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = workflowComparisons.length - 1
    }

    const next = workflowComparisons[nextIndex]
    setActiveId(next.id)

    const buttons = tablistRef.current?.querySelectorAll('[role="tab"]')
    buttons?.[nextIndex]?.focus()
  }

  return (
    <section
      id="workflow"
      className="workflow-section relative overflow-hidden"
      aria-labelledby="workflow-heading"
    >
      <div className="pointer-events-none absolute inset-0 workflow-backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 workflow-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 workflow-side-glows" aria-hidden="true" />

      <Container className="relative workflow-section__inner">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#8fd4ff] uppercase">
              Before & After
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="workflow-heading"
              className="mt-3.5 text-[1.85rem] font-semibold tracking-tight text-white sm:text-4xl"
            >
              From Manual Work to Automated Operations
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#c5d5ee] sm:text-[1.05rem] sm:leading-7">
              See how repetitive operational workflows change when AI works
              alongside your existing ERP, handling document-heavy tasks while
              your team stays in control of important decisions and exceptions.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mt-8 sm:mt-9">
          <div
            ref={tablistRef}
            className="workflow-tabs"
            role="tablist"
            aria-label="Select an operational process"
            onKeyDown={onTabKeyDown}
          >
            {workflowComparisons.map((item) => {
              const TabIcon = iconMap[item.icon] ?? ClipboardList
              const isActive = item.id === activeId

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`workflow-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls="workflow-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`workflow-tab${isActive ? ' workflow-tab--active' : ''}`}
                  onClick={() => selectProcess(item.id)}
                >
                  {isActive && !reduceMotion ? (
                    <motion.span
                      layoutId="workflow-tab-pill"
                      className="workflow-tab__pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  ) : isActive ? (
                    <span className="workflow-tab__pill" />
                  ) : null}
                  <TabIcon
                    className="relative z-[1] h-3.5 w-3.5 shrink-0"
                    strokeWidth={1.85}
                    aria-hidden="true"
                  />
                  <span className="relative z-[1]">{item.title}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <div
          ref={comparisonRef}
          className="mt-8 sm:mt-10"
          id="workflow-panel"
          role="tabpanel"
          aria-labelledby={`workflow-tab-${activeId}`}
        >
          <div className="workflow-compare">
            <div className="workflow-compare__side">
              <AnimatePresence mode="wait">
                <WorkflowColumn
                  key={`${active.id}-manual`}
                  processKey={`${active.id}-manual`}
                  variant="manual"
                  heading="The Manual Way"
                  support="Multiple handoffs. Repetitive entry. More checking."
                  steps={active.manualSteps}
                  summary={active.manualSummary}
                  animate={inView}
                  reduceMotion={reduceMotion}
                  baseDelay={0.04}
                />
              </AnimatePresence>
            </div>

            <div className="workflow-compare__center">
              <AiCore
                visible={inView}
                reduceMotion={reduceMotion}
                flowActive={inView && !reduceMotion}
                processKey={active.id}
              />
            </div>

            <div className="workflow-compare__side">
              <AnimatePresence mode="wait">
                <WorkflowColumn
                  key={`${active.id}-auto`}
                  processKey={`${active.id}-auto`}
                  variant="auto"
                  heading="With AI Automation"
                  support="Structured workflows. AI-assisted processing. Human control where it matters."
                  steps={active.automatedSteps}
                  summary={active.automatedSummary}
                  animate={inView}
                  reduceMotion={reduceMotion}
                  baseDelay={0.24}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="workflow-bottom relative mt-12 sm:mt-14" aria-hidden="true">
          <div className="workflow-bottom__fade" />
        </div>
      </Container>
    </section>
  )
}

export default ManualVsAutomated
