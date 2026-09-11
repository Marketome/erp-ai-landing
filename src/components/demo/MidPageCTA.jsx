import { ShieldCheck } from 'lucide-react'
import Container from '../ui/Container'
import Reveal from '../ui/Reveal'
import DemoCTA from './DemoCTA'

function MidPageCTA({
  eyebrow,
  heading,
  description,
  buttonLabel = 'Book a Demo',
  supportingText,
  source,
}) {
  return (
    <section
      className="mid-cta relative overflow-hidden"
      aria-labelledby={`mid-cta-${source}`}
    >
      <div className="pointer-events-none absolute inset-0 mid-cta__backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 mid-cta__glow" aria-hidden="true" />

      <Container className="relative mid-cta__inner">
        <div className="mid-cta__panel">
          <div className="mid-cta__rim" aria-hidden="true" />
          <div className="mid-cta__line" aria-hidden="true" />

          <Reveal>
            <p className="mid-cta__eyebrow">{eyebrow}</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 id={`mid-cta-${source}`} className="mid-cta__heading">
              {heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mid-cta__desc">{description}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mid-cta__actions">
              <DemoCTA source={source} className="mid-cta__button">
                <span>{buttonLabel}</span>
                <span aria-hidden="true">→</span>
              </DemoCTA>
              {supportingText ? (
                <p className="mid-cta__support">
                  <ShieldCheck
                    className="mid-cta__support-icon"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>{supportingText}</span>
                </p>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

export default MidPageCTA
