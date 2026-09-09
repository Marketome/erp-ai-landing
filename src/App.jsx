import Header from './components/layout/Header'
import AutomationUseCases from './sections/AutomationUseCases'
import BusinessOutcomes from './sections/BusinessOutcomes'
import ControlAndTrust from './sections/ControlAndTrust'
import ExistingSystems from './sections/ExistingSystems'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import ManualVsAutomated from './sections/ManualVsAutomated'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AutomationUseCases />
        <ManualVsAutomated />
        <HowItWorks />
        <ExistingSystems />
        <BusinessOutcomes />
        <ControlAndTrust />
      </main>
    </>
  )
}

export default App
