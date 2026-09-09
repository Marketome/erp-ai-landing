/**
 * Verified Marketome company information from https://meet.marketome.com/
 * Central source for future Footer / CTA — do not hardcode elsewhere.
 */
export const companyData = {
  companyName: 'Marketome',
  legalName: 'Marketome Inc.',
  website: 'https://meet.marketome.com/',
  email: 'Support@marketome.com',
  headquarters: {
    display:
      'Marketome Inc, 10301 Northwest Freeway, Suite # 314, Houston, TX 77092, USA',
    line1: '10301 Northwest Freeway, Suite # 314',
    city: 'Houston',
    state: 'TX',
    postalCode: '77092',
    country: 'USA',
  },
  phones: [
    {
      id: 'usa',
      label: 'USA',
      display: '+1 800 325 6364',
      href: 'tel:+18003256364',
    },
    {
      id: 'aus',
      label: 'AUS',
      display: '+61 272527860',
      href: 'tel:+61272527860',
    },
    {
      id: 'ind',
      label: 'IND',
      display: '+91 9717096812',
      href: 'tel:+919717096812',
    },
  ],
  logo: {
    wordmark: '/brand/marketome-logo.webp',
    mark: '/brand/marketome-mark.webp',
    alt: 'Marketome',
    sourceWordmark:
      'https://meet.marketome.com/wp-content/uploads/2025/08/logo-marketome.webp',
    sourceMark:
      'https://meet.marketome.com/wp-content/uploads/2026/06/favicon-marketome.webp',
  },
}
