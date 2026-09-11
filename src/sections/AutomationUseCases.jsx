import {
  ArrowDown,
  ChartColumn,
  ClipboardList,
  FileText,
  MessagesSquare,
  PackageSearch,
  ReceiptText,
  ScrollText,
  ShoppingCart,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import { automationUseCases } from '../data/automationUseCases'

const iconMap = {
  ClipboardList,
  FileText,
  ShoppingCart,
  ScrollText,
  ReceiptText,
  ChartColumn,
  MessagesSquare,
  PackageSearch,
}

function UseCaseCard({ item, index }) {
  const reduceMotion = useReducedMotion()
  const Icon = iconMap[item.icon] ?? ClipboardList

  return (
    <Reveal delay={0.06 + index * 0.07} y={16} className="h-full">
      <motion.article
        className={`use-case-card use-case-card--${item.accent} group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 sm:p-6`}
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -5,
                transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
              }
        }
      >
        <div className="use-case-card__glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <Icon
          className="use-case-card__watermark pointer-events-none absolute -right-3 -bottom-2 h-28 w-28"
          strokeWidth={1}
          aria-hidden="true"
        />

        <div className="relative flex items-start justify-between gap-3">
          <span className="use-case-card__number text-xs font-semibold tracking-[0.18em]">
            {item.number}
          </span>
          <span className="use-case-card__icon inline-flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </span>
        </div>

        <h3 className="relative mt-5 text-[1.125rem] font-semibold tracking-tight text-white sm:text-lg">
          {item.title}
        </h3>

        <div className="relative mt-5 flex flex-1 flex-col">
          <div className="use-case-card__manual">
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.16em] text-[#9aa8c2] uppercase">
              <span className="use-case-card__manual-dot h-1.5 w-1.5 rounded-full" aria-hidden="true" />
              Current manual work
            </p>
            <p className="mt-2.5 text-[13px] leading-relaxed text-[#a9b7cf] sm:text-sm">
              {item.problem}
            </p>
          </div>

          <div className="use-case-card__flow my-4" aria-hidden="true">
            <div className="flex items-center gap-2">
              <span className="use-case-card__flow-line h-px flex-1" />
              <span className="use-case-card__flow-dot h-1.5 w-1.5 rounded-full" />
              <span className="use-case-card__flow-line h-px flex-1" />
            </div>
            <div className="mt-1.5 flex justify-center">
              <ArrowDown className="use-case-card__flow-arrow h-3.5 w-3.5" strokeWidth={2} />
            </div>
          </div>

          <div className="use-case-card__ai relative flex flex-1 flex-col rounded-xl px-3.5 py-3.5">
            <p className="text-[10px] font-semibold tracking-[0.16em] text-[#7ee7ff] uppercase">
              With AI Automation
            </p>
            <p className="mt-2.5 text-[13px] leading-relaxed text-[#e2ecfb] sm:text-sm">
              {item.automation}
            </p>
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}

function AutomationUseCases() {
  return (
    <section
      id="solutions"
      className="use-cases-section relative overflow-hidden"
      aria-labelledby="use-cases-heading"
    >
      <div className="pointer-events-none absolute inset-0 use-cases-backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 use-cases-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 use-cases-center-glow" aria-hidden="true" />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#8fd4ff] uppercase">
              Automation use cases
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="use-cases-heading"
              className="mt-4 text-[1.85rem] font-semibold tracking-tight text-white sm:text-4xl"
            >
              Choose the Process You Want to Automate
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#c5d5ee] sm:text-[1.05rem] sm:leading-7">
              From incoming orders and RFQs to procurement, reporting and
              customer follow-up, AI automation helps remove repetitive
              operational work while keeping your existing systems at the center
              of the process.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5 xl:gap-6">
          {automationUseCases.map((item, index) => (
            <UseCaseCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="use-cases-bottom relative mt-16 sm:mt-20" aria-hidden="true">
          <div className="use-cases-bottom__fade" />
        </div>
      </Container>
    </section>
  )
}

export default AutomationUseCases
