import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
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
    <>
      <Header />
      <main>
        <Hero />
        <AutomationPaths />
        <AutomationUseCases />
        <ManualVsAutomated />
        <HowItWorks />
        <ExistingSystems />
        <BusinessOutcomes />
        <ControlAndTrust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
