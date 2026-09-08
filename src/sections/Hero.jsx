import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import { siteData } from '../data/siteData'

const inputSources = [
  { label: 'Email', tone: 'from-primary/25 to-primary/5' },
  { label: 'PDF', tone: 'from-accent-cyan/20 to-accent-cyan/5' },
  { label: 'Excel', tone: 'from-accent-green/20 to-accent-green/5' },
  { label: 'WhatsApp', tone: 'from-primary/20 to-accent-cyan/10' },
]

const aiSteps = ['Read', 'Understand', 'Validate', 'Process']

const erpOutputs = [
  { label: 'Order Created', status: 'Synced' },
  { label: 'Quote Ready', status: 'Ready' },
  { label: 'Inventory Updated', status: 'Live' },
]

function SourceCard({ label, tone }) {
  return (
    <div
      className={`rounded-xl border border-brand/90 bg-gradient-to-br ${tone} px-3.5 py-3 shadow-[inset_0_1px_0_rgba(247,249,252,0.04)]`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan/90 animate-status-pulse"
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

  return (
    <div
      className="hidden w-8 shrink-0 items-center justify-center self-center xl:flex"
      aria-hidden="true"
    >
      <div className={`flow-connector relative h-px w-full bg-gradient-to-r ${lineClass}`}>
        <span
          className={`flow-connector-dot absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${dotClass}`}
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
          {/* Inputs */}
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

          {/* AI layer */}
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
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-primary/35 bg-primary/15 text-[10px] font-semibold tracking-wide text-accent-cyan animate-soft-float"
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
                    className="rounded-lg border border-brand/80 bg-site/65 px-3.5 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          index < 3
                            ? 'bg-accent-green'
                            : 'bg-primary animate-status-pulse'
                        }`}
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

          {/* ERP outputs */}
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
                      className="h-1 w-1 rounded-full bg-accent-green"
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

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 hero-backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-grid-mask" aria-hidden="true" />

      <Container className="relative">
        <div className="grid min-h-[calc(100vh-4.25rem)] items-center gap-10 py-14 sm:gap-12 sm:py-16 xl:grid-cols-[minmax(17rem,24rem)_minmax(0,1fr)] xl:gap-10 xl:py-20">
          <div className="max-w-xl xl:max-w-none">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/80 bg-surface/70 px-3 py-1.5 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-status-pulse"
                aria-hidden="true"
              />
              <span className="text-[11px] font-medium tracking-[0.14em] text-accent-cyan uppercase sm:text-xs">
                {siteData.eyebrow}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mt-6 text-4xl font-semibold tracking-tight text-main sm:text-5xl xl:text-[3.25rem] xl:leading-[1.12]"
            >
              <span className="block">{siteData.headlineLine1}</span>
              <span className="mt-1 block bg-gradient-to-r from-primary via-accent-cyan to-accent-cyan bg-clip-text text-transparent">
                {siteData.headlineLine2}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-[1.05rem] sm:leading-7">
              {siteData.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button href="#demo">{siteData.primaryCTA}</Button>
              <Button href="#solutions" variant="secondary">
                {siteData.secondaryCTA}
              </Button>
            </div>

            <p className="mt-5 text-sm text-muted/90">{siteData.trustLine}</p>
          </div>

          <div className="min-w-0">
            <WorkflowVisual />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
