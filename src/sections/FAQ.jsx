import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import { faqIntro, faqs } from '../data/faqs'

const ease = [0.22, 1, 0.36, 1]

function FaqItem({ item, open, onToggle, reduceMotion }) {
  const panelId = useId()
  const buttonId = useId()

  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <h3 className="faq-item__heading">
        <button
          id={buttonId}
          type="button"
          className="faq-item__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onToggle(item.id)}
        >
          <span className="faq-item__question">{item.question}</span>
          <span className="faq-item__icon" aria-hidden="true">
            <ChevronDown className="h-4 w-4" strokeWidth={1.9} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="faq-item__panel"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.32, ease }
            }
          >
            <div className="faq-item__answer">
              <p>{item.answer}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function FAQ() {
  const reduceMotion = useReducedMotion()
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null)

  const onToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      className="faq-section relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="pointer-events-none absolute inset-0 faq-backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 faq-atmosphere" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 faq-decor" aria-hidden="true">
        <span className="faq-decor__mark">?</span>
        <span className="faq-decor__line" />
      </div>

      <Container className="relative faq-section__inner">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="faq-eyebrow text-xs font-semibold tracking-[0.22em] text-[#8fd4ff] uppercase">
              {faqIntro.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="faq-heading"
              className="mt-3.5 text-[1.9rem] font-semibold tracking-tight text-[#f5f8ff] sm:text-4xl"
            >
              {faqIntro.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#c5d5ee] sm:text-[1.05rem] sm:leading-7">
              {faqIntro.description}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mx-auto mt-10 max-w-[920px] sm:mt-11">
          <div className="faq-list">
            {faqs.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                open={openId === item.id}
                onToggle={onToggle}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export default FAQ
