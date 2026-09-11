import { useId, useRef } from 'react'
import { ShieldCheck } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import DemoCTA from '../components/demo/DemoCTA'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'

const ease = [0.22, 1, 0.36, 1]

const ctaContent = {
  eyebrow: 'Start with one process',
  headline: 'Find the Right Workflow to Automate First',
  description:
    'Show us where your team is spending time on repetitive operational work. We can review the process, understand how information moves today, and explore which existing workflow should be automated first.',
  primaryCTA: 'Book a Demo',
  support:
    'Keep your existing ERP. Start with the workflow creating the most manual work.',
}

function FinalCTA() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.32 })
  const gradId = useId().replace(/:/g, '')

  return (
    <section
      id="demo"
      ref={ref}
      className={`cta-section relative overflow-hidden${inView ? ' cta-section--live' : ''}${
        reduceMotion ? ' cta-section--static' : ''
      }`}
      aria-labelledby="demo-heading"
    >
      <div className="pointer-events-none absolute inset-0 cta-backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 cta-atmosphere" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 cta-fade" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 cta-decor" aria-hidden="true">
        <span className="cta-decor__glow" />
        <span className="cta-decor__ring" />
        <svg
          className="cta-decor__flow"
          viewBox="0 0 1200 520"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id={`${gradId}-l`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,186,255,0.02)" />
              <stop offset="55%" stopColor="rgba(79,107,255,0.38)" />
              <stop offset="100%" stopColor="rgba(137,81,255,0.55)" />
            </linearGradient>
            <linearGradient id={`${gradId}-r`} x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,186,255,0.02)" />
              <stop offset="50%" stopColor="rgba(32,215,255,0.32)" />
              <stop offset="100%" stopColor="rgba(137,81,255,0.5)" />
            </linearGradient>
          </defs>

          <path
            className="cta-decor__path"
            d="M20 160 C 180 120, 280 150, 400 210 S 520 300, 600 260"
            stroke={`url(#${gradId}-l)`}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <path
            className="cta-decor__path"
            d="M30 300 C 170 340, 290 280, 410 240 S 530 190, 600 250"
            stroke={`url(#${gradId}-l)`}
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            className="cta-decor__path"
            d="M40 420 C 200 390, 320 330, 450 280 S 540 250, 600 255"
            stroke={`url(#${gradId}-l)`}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.45"
          />

          <path
            className="cta-decor__path"
            d="M1180 150 C 1020 110, 900 160, 780 210 S 680 290, 600 260"
            stroke={`url(#${gradId}-r)`}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <path
            className="cta-decor__path"
            d="M1170 310 C 1030 350, 910 280, 790 235 S 680 200, 600 250"
            stroke={`url(#${gradId}-r)`}
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            className="cta-decor__path"
            d="M1160 430 C 1000 400, 880 340, 750 285 S 660 250, 600 255"
            stroke={`url(#${gradId}-r)`}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.45"
          />

          <circle cx="600" cy="255" r="3.5" fill="rgba(32,215,255,0.55)" />
          <circle cx="600" cy="255" r="10" fill="rgba(137,81,255,0.12)" />

          {!reduceMotion && inView ? (
            <>
              <circle r="2.6" fill="rgba(32,215,255,0.95)" className="cta-decor__particle">
                <animateMotion
                  dur="4.2s"
                  repeatCount="1"
                  path="M20 160 C 180 120, 280 150, 400 210 S 520 300, 600 260"
                />
              </circle>
              <circle r="2.2" fill="rgba(137,81,255,0.9)" className="cta-decor__particle">
                <animateMotion
                  dur="4.6s"
                  begin="0.35s"
                  repeatCount="1"
                  path="M1180 150 C 1020 110, 900 160, 780 210 S 680 290, 600 260"
                />
              </circle>
            </>
          ) : null}
        </svg>
        <span className="cta-decor__nodes" />
      </div>

      <Container className="relative cta-section__inner">
        <motion.div
          className="cta-panel"
          initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
          animate={
            reduceMotion || inView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 26, scale: 0.985 }
          }
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.6, ease }
          }
        >
          <div className="cta-panel__rim" aria-hidden="true" />
          <div className="cta-panel__edge" aria-hidden="true" />
          <div className="cta-panel__glow" aria-hidden="true" />
          <div className="cta-panel__sheen" aria-hidden="true" />

          <Reveal delay={0.06}>
            <p className="cta-eyebrow text-xs font-semibold tracking-[0.22em] uppercase">
              {ctaContent.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h2
              id="demo-heading"
              className="cta-headline mt-4 text-[1.9rem] font-semibold tracking-tight sm:text-4xl lg:text-[2.55rem] lg:leading-[1.15]"
            >
              {ctaContent.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="cta-desc mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-[1.05rem] sm:leading-7">
              {ctaContent.description}
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-col items-center gap-4">
              <DemoCTA source="final-cta" className="cta-panel__button">
                <span className="cta-panel__button-label">{ctaContent.primaryCTA}</span>
                <span className="cta-panel__button-sweep" aria-hidden="true" />
              </DemoCTA>
              <p className="cta-support inline-flex max-w-lg items-start justify-center gap-2 text-center text-sm leading-relaxed">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-green/80"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <span>{ctaContent.support}</span>
              </p>
            </div>
          </Reveal>
        </motion.div>
      </Container>
    </section>
  )
}

export default FinalCTA
