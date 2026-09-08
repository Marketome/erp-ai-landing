import Header from './components/layout/Header'
import AutomationUseCases from './sections/AutomationUseCases'
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
      </main>
    </>
  )
}

export default App
