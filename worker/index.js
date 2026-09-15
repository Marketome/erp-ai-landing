/**
 * Marketome AI Automation landing — Cloudflare Worker entrypoint.
 * Serves API routes for Workers + Static Assets deployments.
 *
 * Required runtime env (Cloudflare dashboard / secrets):
 * - FORMSPREE_FORM_ID
 */

const MAX = {
  name: 120,
  phone: 40,
  email: 254,
  website: 500,
  ctaSource: 80,
  pageUrl: 2000,
  submittedAt: 80,
  formOpenedAt: 80,
  companyFax: 200,
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

function successResponse() {
  return jsonResponse({ success: true }, 200)
}

function invalidResponse() {
  return jsonResponse(
    { success: false, message: 'Invalid submission.' },
    400,
  )
}

function failureResponse(status = 502) {
  return jsonResponse(
    { success: false, message: 'Unable to submit lead.' },
    status,
  )
}

function methodNotAllowedResponse() {
  return jsonResponse(
    { success: false, message: 'Method not allowed.' },
    405,
  )
}

function notFoundResponse() {
  return jsonResponse(
    { success: false, message: 'Not found.' },
    404,
  )
}

function sanitizeText(value) {
  return String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanHeaderValue(value) {
  return sanitizeText(value).replace(/[\r\n%0a%0d%0A%0D]/gi, '')
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

function normalizeWebsite(value) {
  let website = sanitizeText(value).replace(/\s+/g, '')
  if (!website) return ''
  if (!/^https?:\/\//i.test(website)) {
    website = `https://${website}`
  }
  return website
}

function isValidWebsite(website) {
  let url
  try {
    url = new URL(website)
  } catch {
    return false
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return false
  }

  const host = url.hostname
  if (!host || !host.includes('.') || host.startsWith('.') || host.endsWith('.')) {
    return false
  }

  if (/^(localhost|127\.0\.0\.1)$/i.test(host)) {
    return false
  }

  return true
}

function withinMax(value, max) {
  return value.length <= max
}

function parseLead(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { ok: false }
  }

  const companyFax = sanitizeText(data.companyFax)
  if (!withinMax(companyFax, MAX.companyFax)) {
    return { ok: false }
  }

  if (companyFax !== '') {
    return { ok: true, honeypot: true }
  }

  const name = sanitizeText(data.name)
  const phone = sanitizeText(data.phone)
  const email = sanitizeText(data.email)
  let website = sanitizeText(data.website)
  const ctaSource = sanitizeText(data.ctaSource || 'unknown')
  const pageUrl = sanitizeText(data.pageUrl)
  const submittedAt = sanitizeText(data.submittedAt)
  const formOpenedAt = sanitizeText(data.formOpenedAt)

  if (
    !withinMax(name, MAX.name) ||
    !withinMax(phone, MAX.phone) ||
    !withinMax(email, MAX.email) ||
    !withinMax(website, MAX.website) ||
    !withinMax(ctaSource, MAX.ctaSource) ||
    !withinMax(pageUrl, MAX.pageUrl) ||
    !withinMax(submittedAt, MAX.submittedAt) ||
    !withinMax(formOpenedAt, MAX.formOpenedAt)
  ) {
    return { ok: false }
  }

  if (name.length < 2 || !/[A-Za-z\u00C0-\u024F]/.test(name)) {
    return { ok: false }
  }

  if (!/^[+\d\s().-]+$/.test(phone)) {
    return { ok: false }
  }
  const phoneDigits = phone.replace(/\D/g, '')
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return { ok: false }
  }

  if (!email || !isValidEmail(email)) {
    return { ok: false }
  }

  website = normalizeWebsite(website)
  if (!website || !isValidWebsite(website)) {
    return { ok: false }
  }

  return {
    ok: true,
    honeypot: false,
    fields: {
      name,
      phone,
      email,
      website,
      ctaSource: ctaSource || 'unknown',
      pageUrl,
      submittedAt,
      formOpenedAt,
    },
  }
}

async function handleSendDemoLead(request, env) {
  try {
    let data
    try {
      data = await request.json()
    } catch {
      return invalidResponse()
    }

    const parsed = parseLead(data)
    if (!parsed.ok) {
      return invalidResponse()
    }

    if (parsed.honeypot) {
      return successResponse()
    }

    const formId =
      typeof env.FORMSPREE_FORM_ID === 'string'
        ? env.FORMSPREE_FORM_ID.trim()
        : ''
    if (!formId) {
      console.error('FORMSPREE_FORM_ID is not configured')
      return failureResponse(500)
    }

    const safeName = cleanHeaderValue(parsed.fields.name)
    const subject =
      cleanHeaderValue(`New AI Automation Demo Lead - ${safeName}`) ||
      'New AI Automation Demo Lead'

    const formspreeResponse = await fetch(
      `https://formspree.io/f/${formId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: parsed.fields.name,
          phone: parsed.fields.phone,
          email: parsed.fields.email,
          website: parsed.fields.website,
          ctaSource: parsed.fields.ctaSource,
          pageUrl: parsed.fields.pageUrl,
          submittedAt: parsed.fields.submittedAt,
          formOpenedAt: parsed.fields.formOpenedAt,
          _subject: subject,
        }),
      },
    )

    if (!formspreeResponse.ok) {
      console.error('Formspree submission failed', {
        status: formspreeResponse.status,
      })
      return failureResponse(502)
    }

    return successResponse()
  } catch (error) {
    console.error('Demo lead endpoint error:', error?.name || 'unknown')
    return failureResponse(500)
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const pathname = url.pathname.replace(/\/+$/, '') || '/'

    if (pathname === '/api/send-demo-lead') {
      if (request.method !== 'POST') {
        return methodNotAllowedResponse()
      }
      return handleSendDemoLead(request, env)
    }

    if (pathname.startsWith('/api/')) {
      return notFoundResponse()
    }

    return notFoundResponse()
  },
}
