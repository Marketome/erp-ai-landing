import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import MidPageCTA from './components/demo/MidPageCTA'
import { DemoModalProvider } from './context/DemoModalContext'
import AutomationPaths from './sections/AutomationPaths'
import AutomationUseCases from './sections/AutomationUseCases'
import BusinessOutcomes from './sections/BusinessOutcomes'
import ControlAndTrust from './sections/ControlAndTrust'
import ExistingSystems from './sections/ExistingSystems'
import FAQ from './sections/FAQ'
import FinalCTA from './sections/FinalCTA'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import ManualVsAutomated from './sections/ManualVsAutomated'

function App() {
  return (
    <DemoModalProvider>
      <Header />
      <main>
        <Hero />
        <AutomationPaths />
        <AutomationUseCases />
        <MidPageCTA
          source="use-cases-mid-cta"
          eyebrow="Ready to Remove Manual Work?"
          heading="Start With One Workflow"
          description="Show us where your team is spending time on repetitive work. We can explore how AI automation can fit into the systems and processes you already use."
          supportingText="Keep your current systems. Automate the work around them."
        />
        <ManualVsAutomated />
        <HowItWorks />
        <ExistingSystems />
        <MidPageCTA
          source="existing-systems-mid-cta"
          eyebrow="Keep Your Systems. Add Automation."
          heading="See Where AI Can Fit Into Your Operations"
          description="We can review how work moves between your ERP, documents, email, spreadsheets and other tools, then identify where automation can remove repetitive steps."
          supportingText="No ERP replacement required."
        />
        <BusinessOutcomes />
        <ControlAndTrust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </DemoModalProvider>
  )
}

export default App
