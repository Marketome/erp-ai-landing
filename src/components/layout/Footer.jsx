import Container from '../ui/Container'
import { companyData } from '../../data/companyData'
import { siteData } from '../../data/siteData'

const solutionLinks = [
  { label: 'Automation Paths', href: '#automation-paths' },
  { label: 'Automation Use Cases', href: '#solutions' },
  { label: 'How It Works', href: '#how-it-works' },
]

const platformLinks = [
  { label: 'Existing Systems', href: '#integrations' },
  { label: 'Business Outcomes', href: '#outcomes' },
  { label: 'Control & Review', href: '#control' },
]

function Footer() {
  return (
    <footer className="site-footer relative overflow-hidden" aria-labelledby="footer-heading">
      <div className="pointer-events-none absolute inset-0 site-footer__backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 site-footer__decor" aria-hidden="true">
        <span className="site-footer__glow" />
        <img
          src={companyData.logo.mark}
          alt=""
          className="site-footer__mark"
          width={180}
          height={180}
          decoding="async"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 site-footer__edge" aria-hidden="true" />

      <Container className="relative site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <a
              href="#top"
              className="site-footer__logo-link inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-site"
              aria-label={`${companyData.companyName} home`}
            >
              <span className="site-footer__logo-shell">
                <img
                  src={companyData.logo.wordmark}
                  alt={companyData.logo.alt}
                  className="site-footer__logo"
                  width={168}
                  height={36}
                  decoding="async"
                />
              </span>
            </a>

            <p id="footer-heading" className="site-footer__descriptor">
              {siteData.brandDescriptor}
            </p>

            <p className="site-footer__blurb">
              Marketome helps businesses improve digital and operational workflows
              through technology, automation and AI-driven solutions.
            </p>

            <div className="site-footer__contact">
              <a href={`mailto:${companyData.email}`} className="site-footer__contact-link">
                {companyData.email}
              </a>
              <p className="site-footer__hq">{companyData.headquarters.display}</p>
              <ul className="site-footer__phones">
                {companyData.phones.map((phone) => (
                  <li key={phone.id}>
                    <span className="site-footer__phone-label">{phone.label}</span>
                    <a href={phone.href} className="site-footer__contact-link">
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <a href="#demo" className="site-footer__cta">
              {siteData.headerCta}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <nav className="site-footer__nav" aria-label="Footer">
            <div className="site-footer__col">
              <p className="site-footer__col-title">Solutions</p>
              <ul>
                {solutionLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="site-footer__col">
              <p className="site-footer__col-title">Platform</p>
              <ul>
                {platformLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="site-footer__col">
              <p className="site-footer__col-title">Company</p>
              <ul>
                <li>
                  <a
                    href={companyData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Marketome Website
                  </a>
                </li>
                <li>
                  <a href={`mailto:${companyData.email}`}>Email / Contact</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 {companyData.legalName}.</p>
          <p className="site-footer__bottom-tag">{siteData.brandDescriptor}</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
