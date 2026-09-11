import { useDemoModal } from '../../context/DemoModalContext'

/**
 * Shared booking CTA — opens the lead form modal with a source id.
 * Renders a <button> so it can adopt any existing CTA className.
 */
function DemoCTA({
  source,
  className = '',
  children,
  type = 'button',
  onClick,
  ...props
}) {
  const { openDemoModal } = useDemoModal()

  return (
    <button
      type={type}
      className={className}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        openDemoModal({ source, triggerEl: event.currentTarget })
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default DemoCTA
