import DemoCTA from '../demo/DemoCTA'
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
  const hq = `${companyData.headquarters.city}, ${companyData.headquarters.state}, ${companyData.headquarters.country}`

  return (
    <footer className="site-footer relative overflow-hidden" aria-labelledby="footer-heading">
      <div className="pointer-events-none absolute inset-0 site-footer__backdrop" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 site-footer__decor" aria-hidden="true">
        <span className="site-footer__glow" />
        <span className="site-footer__mesh" />
        <img
          src={companyData.logo.mark}
          alt=""
          className="site-footer__watermark"
          width={220}
          height={220}
          decoding="async"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 site-footer__edge" aria-hidden="true" />

      <div className="relative site-footer__shell">
        <div className="site-footer__layout">
          <div className="site-footer__brand">
            <a
              href="#top"
              className="site-footer__logo-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040812]"
              aria-label={`${companyData.companyName} home`}
            >
              <img
                src={companyData.logo.mark}
                alt=""
                className="site-footer__mark-icon"
                width={44}
                height={44}
                decoding="async"
                aria-hidden="true"
              />
              <span className="site-footer__wordmark">
                {companyData.companyName.toLowerCase()}
              </span>
            </a>

            <p id="footer-heading" className="site-footer__descriptor">
              {siteData.brandDescriptor}
            </p>

            <p className="site-footer__blurb">
              Marketome helps businesses add AI automation to the ERP systems,
              tools and workflows they already use.
            </p>

            <DemoCTA source="footer" className="site-footer__cta">
              {siteData.headerCta}
              <span aria-hidden="true">→</span>
            </DemoCTA>
          </div>

          <div className="site-footer__col site-footer__col--contact">
            <p className="site-footer__col-title">Contact</p>
            <ul className="site-footer__contact-list">
              <li>
                <a
                  href={`mailto:${companyData.email}`}
                  className="site-footer__contact-link"
                >
                  {companyData.email}
                </a>
              </li>
              <li>
                <p className="site-footer__hq">{hq}</p>
              </li>
              {companyData.phones.map((phone) => (
                <li key={phone.id} className="site-footer__phone-row">
                  <span className="site-footer__phone-label">{phone.label}</span>
                  <a href={phone.href} className="site-footer__contact-link">
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="site-footer__col site-footer__col--solutions" aria-label="Solutions">
            <p className="site-footer__col-title">Solutions</p>
            <ul>
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__col site-footer__col--platform" aria-label="Platform">
            <p className="site-footer__col-title">Platform</p>
            <ul>
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__col site-footer__col--company" aria-label="Company">
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
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 {companyData.legalName}.</p>
          <p className="site-footer__bottom-tag">{siteData.brandDescriptor}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
