/** Shared client-side validation for the Book a Demo lead form */

export function validateName(value) {
  const trimmed = value.trim()
  if (trimmed.length < 2) {
    return 'Please enter your name.'
  }
  if (!/[A-Za-z\u00C0-\u024F]/.test(trimmed)) {
    return 'Please enter a valid name.'
  }
  return ''
}

export function validatePhone(value) {
  const trimmed = value.trim()
  if (!trimmed) {
    return 'Please enter your phone number.'
  }
  if (!/^[+\d\s().-]+$/.test(trimmed)) {
    return 'Phone can include digits, spaces, +, (), and hyphens.'
  }
  const digits = trimmed.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) {
    return 'Please enter a phone number with 7–15 digits.'
  }
  return ''
}

export function validateEmail(value) {
  const trimmed = value.trim()
  if (!trimmed) {
    return 'Please enter your email address.'
  }
  // Practical email check — not overly strict
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return 'Please enter a valid email address.'
  }
  return ''
}

export function normalizeWebsite(value) {
  let trimmed = value.trim()
  if (!trimmed) return ''
  trimmed = trimmed.replace(/\s+/g, '')
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`
  }
  return trimmed
}

export function validateWebsite(value) {
  const trimmed = value.trim()
  if (!trimmed) {
    return 'Please enter your business website.'
  }

  const normalized = normalizeWebsite(trimmed)

  let url
  try {
    url = new URL(normalized)
  } catch {
    return 'Please enter a valid website such as company.com.'
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    return 'Please enter a valid website such as company.com.'
  }

  const host = url.hostname
  if (!host.includes('.') || host.startsWith('.') || host.endsWith('.')) {
    return 'Please enter a valid website such as company.com.'
  }

  if (/^(localhost|127\.0\.0\.1)$/i.test(host)) {
    return 'Please enter a public business website.'
  }

  return ''
}

export function validateDemoLead(fields) {
  return {
    name: validateName(fields.name ?? ''),
    phone: validatePhone(fields.phone ?? ''),
    email: validateEmail(fields.email ?? ''),
    website: validateWebsite(fields.website ?? ''),
  }
}

export function hasValidationErrors(errors) {
  return Object.values(errors).some(Boolean)
}
