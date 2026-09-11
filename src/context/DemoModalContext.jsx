import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import DemoFormModal from '../components/demo/DemoFormModal'

const DemoModalContext = createContext(null)

export function DemoModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [ctaSource, setCtaSource] = useState('unknown')
  const [formOpenedAt, setFormOpenedAt] = useState(0)
  const triggerRef = useRef(null)

  const openDemoModal = useCallback(({ source = 'unknown', triggerEl } = {}) => {
    triggerRef.current = triggerEl ?? document.activeElement
    setCtaSource(source)
    setFormOpenedAt(Date.now())
    setIsOpen(true)
  }, [])

  const closeDemoModal = useCallback(() => {
    setIsOpen(false)
    window.requestAnimationFrame(() => {
      const trigger = triggerRef.current
      if (trigger && typeof trigger.focus === 'function') {
        trigger.focus()
      }
    })
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      ctaSource,
      formOpenedAt,
      openDemoModal,
      closeDemoModal,
    }),
    [isOpen, ctaSource, formOpenedAt, openDemoModal, closeDemoModal],
  )

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <DemoFormModal />
    </DemoModalContext.Provider>
  )
}

export function useDemoModal() {
  const context = useContext(DemoModalContext)
  if (!context) {
    throw new Error('useDemoModal must be used within DemoModalProvider')
  }
  return context
}
