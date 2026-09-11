import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import DemoCTA from '../demo/DemoCTA'
import Container from '../ui/Container'
import { companyData } from '../../data/companyData'
import { siteData } from '../../data/siteData'

function BrandMark({ scrolled }) {
  return (
    <a
      href="#top"
      className="site-brand group inline-flex max-w-[min(100%,18rem)] items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-site sm:max-w-none sm:gap-3"
      aria-label={`${companyData.companyName} home`}
    >
      <span className="site-brand__logo-shell">
        <img
          src={companyData.logo.wordmark}
          alt={companyData.logo.alt}
          className="site-brand__logo"
          width={168}
          height={36}
          decoding="async"
        />
      </span>

      <span
        className={`site-brand__descriptor hidden min-[420px]:block ${
          scrolled ? 'site-brand__descriptor--scrolled' : 'site-brand__descriptor--top'
        }`}
      >
        {siteData.brandDescriptor}
      </span>
    </a>
  )
}

function HeaderCta({ scrolled }) {
  return (
    <DemoCTA
      source="header"
      className={[
        'header-cta group inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold sm:px-4 sm:text-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        scrolled
          ? 'header-cta--scrolled focus-visible:ring-white/70 focus-visible:ring-offset-[#8951ff]'
          : 'header-cta--top focus-visible:ring-primary/60 focus-visible:ring-offset-site',
      ].join(' ')}
    >
      <span>{siteData.headerCta}</span>
      <span
        className="header-cta-arrow translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        →
      </span>
    </DemoCTA>
  )
}

function PromotionalBanner({ barRef }) {
  return (
    <div
      ref={barRef}
      className="promo-banner relative z-40 overflow-hidden text-white"
      role="region"
      aria-label="Product highlight"
    >
      <div className="promo-banner__highlight pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden="true" />
      <div className="promo-banner__sheen pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <div className="promo-banner__row flex h-9 items-center justify-center sm:h-10">
          <div className="promo-banner__group flex min-w-0 max-w-full items-center justify-center gap-2 sm:gap-2.5 md:gap-3">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green shadow-[0_0_8px_rgba(34,230,167,0.55)]"
              aria-hidden="true"
            />
            <p className="min-w-0 truncate text-center text-[11px] tracking-wide sm:text-xs">
              <span className="font-semibold text-white">
                {siteData.announcementTitle}
              </span>
              <span className="mx-2 hidden text-white/40 sm:inline" aria-hidden="true">
                •
              </span>
              <span className="hidden font-normal text-white/85 md:inline">
                {siteData.announcementSupport}
              </span>
            </p>
            <a
              href="#solutions"
              className="inline-flex shrink-0 items-center gap-1 rounded-md text-[11px] font-semibold tracking-wide whitespace-nowrap text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-xs"
            >
              {siteData.announcementCta}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}

function Header() {
  const reduceMotion = useReducedMotion()
  const promoRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const target = promoRef.current
    if (!target) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }

  return (
    <>
      <PromotionalBanner barRef={promoRef} />

      <motion.header
        className={`sticky top-0 z-50 overflow-hidden ${
          scrolled ? 'site-header--scrolled' : 'site-header--top'
        }`}
        initial={false}
        animate={{
          backdropFilter: scrolled ? 'blur(14px)' : 'blur(10px)',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'blur(10px)',
        }}
        transition={transition}
      >
        {/* Top state: dark professional header */}
        <motion.div
          className="absolute inset-0 bg-site"
          initial={false}
          animate={{ opacity: scrolled ? 0 : 0.82 }}
          transition={transition}
          aria-hidden="true"
        />

        {/* Scrolled state: exact multi-stop sticky Header gradient */}
        <motion.div
          className="site-header-sticky-fill absolute inset-0"
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={transition}
          aria-hidden="true"
        />

        <motion.div
          className="absolute inset-x-0 bottom-0 h-px"
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? 'rgba(255,255,255,0.22)'
              : 'rgba(29,43,67,0.85)',
            boxShadow: scrolled
              ? '0 10px 28px rgba(20, 40, 120, 0.28)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={transition}
          aria-hidden="true"
        />

        <Container className="relative">
          <div className="flex h-14 items-center justify-between gap-4 sm:h-16 lg:h-[4.25rem]">
            <BrandMark scrolled={scrolled} />
            <HeaderCta scrolled={scrolled} />
          </div>
        </Container>
      </motion.header>
    </>
  )
}

export default Header
