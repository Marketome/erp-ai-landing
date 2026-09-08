import Button from '../ui/Button'
import Container from '../ui/Container'
import { siteData } from '../../data/siteData'

function BrandMark() {
  return (
    <a
      href="#top"
      className="group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-site"
      aria-label={`${siteData.brandShort} home`}
    >
      <span
        className="relative flex h-7 w-7 items-center justify-center rounded-md border border-brand bg-surface-light"
        aria-hidden="true"
      >
        <span className="absolute inset-[5px] rounded-sm bg-gradient-to-br from-primary to-accent-cyan opacity-90" />
        <span className="absolute right-1 bottom-1 h-1.5 w-1.5 rounded-full bg-accent-green" />
      </span>
      <span className="text-sm font-semibold tracking-tight text-main transition-colors group-hover:text-white sm:text-[0.95rem]">
        {siteData.brandShort}
      </span>
    </a>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand/70 bg-site/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
          <BrandMark />

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {siteData.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-site"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={siteData.signInHref}
              className="hidden rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-site sm:inline-flex"
            >
              {siteData.signInLabel}
            </a>
            <Button href="#demo" className="px-4 py-2 text-sm">
              {siteData.headerCta}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
