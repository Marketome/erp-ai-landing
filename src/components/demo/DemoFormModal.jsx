import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { siteData } from '../../data/siteData'
import { useDemoModal } from '../../context/DemoModalContext'
import {
  hasValidationErrors,
  normalizeWebsite,
  validateDemoLead,
} from './demoLeadValidation'

const ease = [0.22, 1, 0.36, 1]

const initialFields = {
  name: '',
  phone: '',
  email: '',
  website: '',
  companyFax: '',
}

function Field({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  inputMode,
  inputRef,
}) {
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="demo-field">
      <label className="demo-field__label" htmlFor={id}>
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        className={`demo-field__input${error ? ' demo-field__input--error' : ''}`}
      />
      {error ? (
        <p id={`${id}-error`} className="demo-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function DemoFormModal() {
  const reduceMotion = useReducedMotion()
  const { isOpen, ctaSource, formOpenedAt, closeDemoModal } = useDemoModal()
  const titleId = useId()
  const descId = useId()
  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)

  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined

    setFields(initialFields)
    setErrors({})
    setSubmitError('')
    setSubmitting(false)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      firstFieldRef.current?.focus()
    }, 40)

    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDemoModal()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeDemoModal])

  const updateField = (name) => (event) => {
    const { value } = event.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (submitError) setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitting) return

    const nextErrors = validateDemoLead(fields)
    setErrors(nextErrors)
    if (hasValidationErrors(nextErrors)) {
      const order = ['name', 'phone', 'email', 'website']
      const firstInvalid = order.find((key) => nextErrors[key])
      const focusId =
        firstInvalid === 'name'
          ? 'demo-name'
          : firstInvalid === 'phone'
            ? 'demo-phone'
            : firstInvalid === 'email'
              ? 'demo-email'
              : firstInvalid === 'website'
                ? 'demo-website'
                : null
      window.requestAnimationFrame(() => {
        if (focusId) document.getElementById(focusId)?.focus()
      })
      return
    }

    setSubmitting(true)
    setSubmitError('')

    const payload = {
      name: fields.name.trim(),
      phone: fields.phone.trim(),
      email: fields.email.trim(),
      website: normalizeWebsite(fields.website),
      ctaSource,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      submittedAt: new Date().toISOString(),
      formOpenedAt,
      companyFax: fields.companyFax,
    }

    try {
      const response = await fetch(siteData.demoBooking.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      let data = null
      try {
        data = await response.json()
      } catch {
        data = null
      }

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Unable to submit lead.')
      }

      window.location.href = siteData.demoBooking.calendarUrl
    } catch {
      setSubmitError("We couldn't submit your details. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="demo-modal-root"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.22, ease }
          }
        >
          <button
            type="button"
            className="demo-modal-overlay"
            aria-label="Close demo form"
            onClick={closeDemoModal}
          />

          <motion.div
            ref={dialogRef}
            className="demo-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.26, ease }
            }
            onClick={(event) => event.stopPropagation()}
          >
            <div className="demo-modal__glow" aria-hidden="true" />
            <div className="demo-modal__edge" aria-hidden="true" />

            <button
              type="button"
              className="demo-modal__close"
              onClick={closeDemoModal}
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <p className="demo-modal__eyebrow">Book an Automation Demo</p>
            <h2 id={titleId} className="demo-modal__title">
              Tell Us About Your Business
            </h2>
            <p id={descId} className="demo-modal__desc">
              Share a few details first, then choose a convenient time for the
              conversation.
            </p>

            <form className="demo-modal__form" onSubmit={handleSubmit} noValidate>
              <div className="demo-honeypot" aria-hidden="true">
                <label htmlFor="companyFax">Company fax</label>
                <input
                  id="companyFax"
                  name="companyFax"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={fields.companyFax}
                  onChange={updateField('companyFax')}
                />
              </div>

              <Field
                id="demo-name"
                label="Name"
                name="name"
                value={fields.name}
                onChange={updateField('name')}
                placeholder="John Smith"
                autoComplete="name"
                error={errors.name}
                inputRef={firstFieldRef}
              />

              <Field
                id="demo-phone"
                label="Phone Number"
                name="phone"
                type="tel"
                value={fields.phone}
                onChange={updateField('phone')}
                placeholder="+1 555 123 4567"
                autoComplete="tel"
                inputMode="tel"
                error={errors.phone}
              />

              <Field
                id="demo-email"
                label="Email Address"
                name="email"
                type="email"
                value={fields.email}
                onChange={updateField('email')}
                placeholder="john@company.com"
                autoComplete="email"
                inputMode="email"
                error={errors.email}
              />

              <Field
                id="demo-website"
                label="Business Website"
                name="website"
                type="text"
                value={fields.website}
                onChange={updateField('website')}
                placeholder="company.com"
                autoComplete="url"
                inputMode="url"
                error={errors.website}
              />

              {submitError ? (
                <p className="demo-modal__submit-error" role="alert">
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                className="demo-modal__submit"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Continue to Calendar'}
              </button>

              <p className="demo-modal__support">
                Your current systems stay in place. We are here to explore where
                AI automation can remove repetitive work.
              </p>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default DemoFormModal
