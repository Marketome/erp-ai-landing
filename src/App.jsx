import Button from './components/ui/Button'
import Container from './components/ui/Container'
import SectionHeading from './components/ui/SectionHeading'
import { siteData } from './data/siteData'

const previewCards = [
  {
    title: 'Order Processing',
    description: 'Surface card styling for operational automation previews.',
  },
  {
    title: 'Quotation & RFQ',
    description: 'Check spacing, borders, and muted supporting text.',
  },
  {
    title: 'Procurement',
    description: 'Confirm responsive layout inside the shared Container.',
  },
]

function App() {
  return (
    <main className="min-h-screen bg-site py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Design system preview"
          title={siteData.siteName}
          description={siteData.tagline}
          centered
        />

        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted">
          {siteData.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="#demo">{siteData.primaryCTA}</Button>
          <Button href="#explore" variant="secondary">
            {siteData.secondaryCTA}
          </Button>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previewCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-brand bg-surface p-6 transition-colors hover:bg-surface-light"
            >
              <h3 className="text-lg font-semibold text-main">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </main>
  )
}

export default App
