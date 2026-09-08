import Header from './components/layout/Header'
import AutomationUseCases from './sections/AutomationUseCases'
import Hero from './sections/Hero'
import ManualVsAutomated from './sections/ManualVsAutomated'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AutomationUseCases />
        <ManualVsAutomated />
      </main>
    </>
  )
}

export default App
