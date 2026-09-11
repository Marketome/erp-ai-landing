import { motion, useReducedMotion } from 'motion/react'
import DemoCTA from '../components/demo/DemoCTA'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import { siteData } from '../data/siteData'

const inputSources = [
  { label: 'Email', tone: 'from-primary/25 to-primary/5' },
  { label: 'PDF', tone: 'from-accent-cyan/20 to-accent-cyan/5' },
  { label: 'Excel', tone: 'from-accent-green/20 to-accent-green/5' },
  { label: 'WhatsApp', tone: 'from-primary/20 to-accent-cyan/10' },
]

const aiSteps = ['Read', 'Understand', 'Validate', 'Process']

const erpOutputs = [
  { label: 'Order Created', status: 'Synced', pulseDelay: '0s' },
  { label: 'Quote Ready', status: 'Ready', pulseDelay: '1.4s' },
  { label: 'Inventory Updated', status: 'Live', pulseDelay: '2.8s' },
]

function SourceCard({ label, tone }) {
  return (
    <div
      className={`rounded-xl border border-brand/90 bg-gradient-to-br ${tone} px-3.5 py-3 shadow-[inset_0_1px_0_rgba(247,249,252,0.04)]`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan/90"
          aria-hidden="true"
        />
        <span className="text-xs font-medium leading-snug tracking-wide text-main">
          {label}
        </span>
      </div>
    </div>
  )
}

function FlowConnector({ variant = 'inbound' }) {
  const lineClass =
    variant === 'inbound'
      ? 'from-brand via-primary/80 to-primary/50'
      : 'from-primary/50 via-accent-cyan/80 to-accent-green/70'
  const dotClass =
    variant === 'inbound'
      ? 'bg-primary shadow-[0_0_8px_rgba(79,107,255,0.7)]'
      : 'bg-accent-green shadow-[0_0_8px_rgba(34,230,167,0.55)]'
  const arrowClass =
    variant === 'inbound' ? 'border-l-primary/80' : 'border-l-accent-green/80'
  const delayClass =
    variant === 'inbound' ? 'flow-connector-dot--in' : 'flow-connector-dot--out'

  return (
    <div
      className="hidden w-8 shrink-0 items-center justify-center self-center xl:flex"
      aria-hidden="true"
    >
      <div className={`flow-connector relative h-px w-full bg-gradient-to-r ${lineClass}`}>
        <span
          className={`flow-connector-dot absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${dotClass} ${delayClass}`}
        />
        <span
          className={`absolute top-1/2 right-0 h-0 w-0 -translate-y-1/2 border-y-[3px] border-y-transparent border-l-[5px] ${arrowClass}`}
        />
      </div>
    </div>
  )
}

function WorkflowVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-3xl xl:max-w-none"
      role="img"
      aria-label="Workflow diagram showing Email, PDF, Excel, and WhatsApp flowing into an AI operations layer that updates your ERP with order, quote, and inventory outcomes"
    >
      <div
        className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(79,107,255,0.16),transparent_62%)] animate-glow-breathe sm:-inset-6"
        aria-hidden="true"
      />

      <div className="relative rounded-2xl border border-brand/90 bg-surface/85 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-5 xl:p-6">
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.28] hero-panel-grid"
          aria-hidden="true"
        />

        <div className="relative mb-4 flex items-start justify-between gap-3 border-b border-brand/70 pb-3.5 sm:mb-5 sm:items-center">
          <div className="min-w-0">
            <p className="text-[10px] font-medium tracking-[0.18em] text-muted uppercase">
              Operations console
            </p>
            <p className="mt-1 text-sm font-semibold text-main">
              Automation workflow
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-brand/80 bg-site/60 px-2.5 py-1">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent-green animate-status-pulse"
              aria-hidden="true"
            />
            <span className="text-[10px] font-medium tracking-wide text-muted uppercase">
              Live
            </span>
          </div>
        </div>

        <div className="relative flex flex-col gap-4 xl:flex-row xl:items-stretch xl:gap-3">
          <div className="flex w-full flex-col gap-2.5 xl:w-[9.25rem] xl:shrink-0">
            <p className="text-[10px] font-medium tracking-[0.16em] text-muted uppercase">
              Input sources
            </p>
            <div className="grid grid-cols-2 gap-2 xl:grid-cols-1 xl:gap-2.5">
              {inputSources.map((source) => (
                <SourceCard key={source.label} {...source} />
              ))}
            </div>
          </div>

          <FlowConnector variant="inbound" />

          <div className="relative w-full xl:min-w-[17rem] xl:flex-1">
            <div
              className="pointer-events-none absolute -inset-2 rounded-[1.35rem] bg-[radial-gradient(circle_at_center,rgba(32,215,255,0.14),transparent_68%)] animate-glow-breathe sm:-inset-3"
              aria-hidden="true"
            />
            <div className="relative rounded-2xl border border-primary/40 bg-gradient-to-b from-[#152240] via-surface-light/95 to-surface p-4 shadow-[0_0_0_1px_rgba(79,107,255,0.08),0_0_36px_rgba(79,107,255,0.14)]">
              <div
                className="pointer-events-none absolute inset-px rounded-[0.95rem] bg-[linear-gradient(180deg,rgba(79,107,255,0.1),transparent_42%)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent"
                aria-hidden="true"
              />

              <div className="relative mb-3.5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium tracking-[0.16em] text-accent-cyan uppercase">
                    AI operations layer
                  </p>
                  <p className="mt-1 text-sm font-semibold text-main">
                    Interpreting documents
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-primary/35 bg-primary/15 text-[10px] font-semibold tracking-wide text-accent-cyan"
                    aria-hidden="true"
                  >
                    AI
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-medium tracking-wide text-accent-cyan/90 uppercase">
                    <span
                      className="h-1 w-1 rounded-full bg-accent-cyan animate-status-pulse"
                      aria-hidden="true"
                    />
                    Active
                  </span>
                </div>
              </div>

              <div className="relative grid grid-cols-2 gap-2.5">
                {aiSteps.map((step, index) => (
                  <div
                    key={step}
                    className="ai-step rounded-lg border border-brand/80 bg-site/65 px-3.5 py-3"
                    style={{ '--ai-step-index': index }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="ai-step-dot h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-medium leading-snug text-main">
                        {step}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mt-3.5 rounded-lg border border-brand/70 bg-site/50 px-3 py-2.5">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <p className="text-[10px] font-medium tracking-[0.14em] text-muted uppercase">
                    Processing
                  </p>
                  <div
                    className="flow-meter flex h-1 w-14 overflow-hidden rounded-full bg-brand/80"
                    aria-hidden="true"
                  >
                    <span className="flow-meter-bar h-full w-1/2 rounded-full bg-gradient-to-r from-primary to-accent-cyan" />
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed text-muted sm:text-xs">
                  Extracting line items, validating SKUs, preparing ERP-ready
                  payloads.
                </p>
              </div>
            </div>
          </div>

          <FlowConnector variant="outbound" />

          <div className="flex w-full flex-col gap-2.5 xl:w-[11.25rem] xl:shrink-0">
            <p className="text-[10px] font-medium tracking-[0.16em] text-muted uppercase">
              Your ERP
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 xl:!grid-cols-1 xl:gap-2.5">
              {erpOutputs.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-brand/90 bg-surface-light/75 px-3 py-2.5"
                >
                  <p className="text-xs font-medium leading-snug text-main">
                    {item.label}
                  </p>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-medium text-accent-green">
                    <span
                      className="erp-status-dot h-1 w-1 rounded-full bg-accent-green"
                      style={{ animationDelay: item.pulseDelay }}
                      aria-hidden="true"
                    />
                    {item.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="relative mt-4 text-center text-[10px] tracking-wide text-muted uppercase xl:hidden">
          Inputs → AI layer → ERP outcomes
        </p>
      </div>
    </div>
  )
}

function HeroAtmosphere({ reduceMotion }) {
  return (
    <div
      className={`hero-env${reduceMotion ? ' hero-env--static' : ' hero-env--live'}`}
      aria-hidden="true"
    >
      {/* Left: fragmented manual complexity */}
      <div className="hero-env__chaos">
        <span className="hero-frag hero-frag--sheet" />
        <span className="hero-frag hero-frag--sheet-b" />
        <span className="hero-frag hero-frag--doc" />
        <span className="hero-frag hero-frag--doc-b" />
        <span className="hero-frag hero-frag--cells" />
        <span className="hero-frag hero-frag--cells-b" />
        <span className="hero-frag hero-frag--lines" />
        <span className="hero-frag hero-frag--scatter" />
        <span className="hero-frag hero-frag--scatter-b" />
        <span className="hero-frag hero-frag--path" />
      </div>

      {/* Center → right: large curved data ribbon (fragmented → ordered) */}
      <svg
        className="hero-env__ribbon"
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-ribbon-stroke" x1="0" y1="320" x2="1200" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(79,107,255,0.08)" />
            <stop offset="28%" stopColor="rgba(79,107,255,0.22)" />
            <stop offset="52%" stopColor="rgba(137,81,255,0.35)" />
            <stop offset="78%" stopColor="rgba(0,186,255,0.4)" />
            <stop offset="100%" stopColor="rgba(32,215,255,0.28)" />
          </linearGradient>
          <linearGradient id="hero-ribbon-soft" x1="200" y1="0" x2="1000" y2="640" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(79,107,255,0.0)" />
            <stop offset="40%" stopColor="rgba(137,81,255,0.12)" />
            <stop offset="100%" stopColor="rgba(32,215,255,0.08)" />
          </linearGradient>
        </defs>
        <path
          className="hero-env__ribbon-glow"
          d="M40 420 C 180 390, 260 340, 340 300 S 480 240, 560 260 S 720 320, 820 300 S 980 220, 1160 200"
          stroke="url(#hero-ribbon-soft)"
          strokeWidth="48"
          strokeLinecap="round"
        />
        <path
          className="hero-env__ribbon-path"
          d="M40 420 C 180 390, 260 340, 340 300 S 480 240, 560 260 S 720 320, 820 300 S 980 220, 1160 200"
          stroke="url(#hero-ribbon-stroke)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="3 14 6 18 2 22 8 10 4 16"
          pathLength="100"
        />
        <path
          className="hero-env__ribbon-path hero-env__ribbon-path--solid"
          d="M560 260 C 680 290, 760 310, 820 300 S 980 220, 1160 200"
          stroke="url(#hero-ribbon-stroke)"
          strokeWidth="1.8"
          strokeLinecap="round"
          pathLength="100"
        />
        {!reduceMotion ? (
          <circle className="hero-env__pulse" r="3.5" fill="rgba(32,215,255,0.85)">
            <animateMotion
              dur="11s"
              repeatCount="indefinite"
              path="M340 300 S 480 240, 560 260 S 720 320, 820 300 S 980 220, 1160 200"
            />
          </circle>
        ) : null}
      </svg>

      {/* Right: structured technical environment behind diagram */}
      <div className="hero-env__structure">
        <span className="hero-struct hero-struct--grid" />
        <span className="hero-struct hero-struct--matrix" />
        <span className="hero-struct hero-struct--arc" />
        <span className="hero-struct hero-struct--arc-b" />
        <span className="hero-struct hero-struct--nodes" />
        <span className="hero-struct hero-struct--rails" />
      </div>
    </div>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="top"
      className="hero-section relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 hero-backdrop animate-backdrop-drift" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-atmosphere" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-grid-mask animate-grid-drift" aria-hidden="true" />
      <HeroAtmosphere reduceMotion={Boolean(reduceMotion)} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hero-fade" aria-hidden="true" />

      <Container className="relative">
        <div className="grid min-h-[calc(100vh-3.5rem)] items-center gap-10 pt-10 pb-14 sm:min-h-[calc(100vh-4rem)] sm:gap-12 sm:pt-11 sm:pb-16 lg:min-h-[calc(100vh-4.25rem)] xl:grid-cols-[minmax(17rem,24rem)_minmax(0,1fr)] xl:gap-10 xl:pt-[3.125rem] xl:pb-20">
          <div className="hero-copy relative max-w-xl xl:max-w-none">
            <Reveal immediate delay={0.05} y={10} className="inline-flex">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/80 bg-surface/70 px-3 py-1.5 backdrop-blur-sm">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-status-pulse"
                  aria-hidden="true"
                />
                <span className="text-[11px] font-medium tracking-[0.14em] text-accent-cyan uppercase sm:text-xs">
                  {siteData.eyebrow}
                </span>
              </div>
            </Reveal>

            <Reveal immediate delay={0.14} y={16}>
              <h1
                id="hero-heading"
                className="mt-6 text-4xl font-semibold tracking-tight text-main sm:text-5xl xl:text-[3.25rem] xl:leading-[1.12]"
              >
                <span className="block">{siteData.headlineLine1}</span>
                <span className="mt-1 block bg-gradient-to-r from-primary via-accent-cyan to-accent-cyan bg-clip-text text-transparent">
                  {siteData.headlineLine2}
                </span>
              </h1>
            </Reveal>

            <Reveal immediate delay={0.24} y={14}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-[1.05rem] sm:leading-7">
                {siteData.description}
              </p>
            </Reveal>

            <Reveal immediate delay={0.34} y={12}>
              <div className="mt-8">
                <DemoCTA
                  source="hero"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-main transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-site"
                >
                  {siteData.primaryCTA}
                </DemoCTA>
              </div>
            </Reveal>

            <Reveal immediate delay={0.44} y={10}>
              <p className="mt-5 text-sm text-muted/90">{siteData.trustLine}</p>
            </Reveal>
          </div>

          <div className="hero-diagram relative min-w-0">
            {reduceMotion ? (
              <WorkflowVisual />
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 28, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <WorkflowVisual />
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
