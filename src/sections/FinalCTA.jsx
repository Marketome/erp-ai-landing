import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import { companyData } from '../data/companyData'

const ease = [0.22, 1, 0.36, 1]

const ctaContent = {
  eyebrow: 'Start with one process',
  headline: 'Find the Right Workflow to Automate First',
  description:
    'Show us where your team is spending time on repetitive operational work. We can review the process, understand how information moves today, and explore where ERP + AI automation may fit.',
  primaryCTA: 'Book a Demo',
  support:
    'Keep your existing ERP. Start with the workflow creating the most manual work.',
}

function FinalCTA() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const demoHref = `mailto:${companyData.email}?subject=${encodeURIComponent('Book a Demo')}`

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
      <div className="pointer-events-none absolute inset-0 cta-decor" aria-hidden="true">
        <span className="cta-decor__glow" />
        <svg
          className="cta-decor__flow"
          viewBox="0 0 900 420"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            className="cta-decor__path"
            d="M40 210 C 140 140, 220 120, 320 160 S 480 280, 560 240 S 700 140, 860 180"
            stroke="url(#cta-flow-grad)"
            strokeWidth="1.4"
            strokeLinecap="round"
            pathLength="100"
          />
          <path
            className="cta-decor__path cta-decor__path--b"
            d="M60 280 C 180 300, 260 260, 360 220 S 540 150, 640 190 S 780 260, 870 230"
            stroke="url(#cta-flow-grad)"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.55"
            pathLength="100"
          />
          <defs>
            <linearGradient id="cta-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,186,255,0.05)" />
              <stop offset="45%" stopColor="rgba(79,107,255,0.35)" />
              <stop offset="100%" stopColor="rgba(137,81,255,0.45)" />
            </linearGradient>
          </defs>
          {!reduceMotion && inView ? (
            <circle r="3" fill="rgba(32,215,255,0.9)" className="cta-decor__particle">
              <animateMotion
                dur="3.8s"
                repeatCount="1"
                path="M40 210 C 140 140, 220 120, 320 160 S 480 280, 560 240 S 700 140, 860 180"
              />
            </circle>
          ) : null}
        </svg>
        <span className="cta-decor__nodes" />
      </div>

      <Container className="relative cta-section__inner">
        <motion.div
          className="cta-panel"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={
            reduceMotion || inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 22 }
          }
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.55, ease }
          }
        >
          <div className="cta-panel__edge" aria-hidden="true" />
          <div className="cta-panel__glow" aria-hidden="true" />

          <Reveal delay={0.05}>
            <p className="cta-eyebrow text-xs font-semibold tracking-[0.22em] uppercase">
              {ctaContent.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              id="demo-heading"
              className="cta-headline mt-3.5 text-[1.85rem] font-semibold tracking-tight sm:text-4xl"
            >
              {ctaContent.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="cta-desc mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-[1.05rem] sm:leading-7">
              {ctaContent.description}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-col items-center gap-4">
              <Button href={demoHref} className="cta-panel__button">
                {ctaContent.primaryCTA}
              </Button>
              <p className="cta-support max-w-md text-center text-sm leading-relaxed">
                {ctaContent.support}
              </p>
            </div>
          </Reveal>
        </motion.div>
      </Container>
    </section>
  )
}

export default FinalCTA
