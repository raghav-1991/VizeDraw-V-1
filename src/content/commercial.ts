// Double-brace fields from the approved content document.
// Destinations come from deployment config (src/config.ts). Prices and
// allowances come from the pricing configuration (src/content/pricing.ts);
// a field without a value renders as a dash rather than an invented figure.
import { destinations } from '../config'
import { PRICING, fmtMoney, fmtNumber } from './pricing'

export const catalogueFields: Record<string, string | null> = {
  'control.annual_price': fmtMoney(PRICING.controlAnnual),
  'control.storage_gb': fmtNumber(PRICING.controlStorageGB),
  'pro.annual_price': fmtMoney(PRICING.proAnnual),
  'pro.storage_gb': fmtNumber(PRICING.proStorageGB),
  'pro.ai_credits': fmtNumber(PRICING.proIncludedAICredits),
}

/** Legal link keys (the document names the links, not their keys). */
export const legalFields = {
  privacy: 'legal.privacy_url',
  terms: 'legal.terms_url',
  cookies: 'consent.cookie_preferences',
} as const

export type LegalKey = keyof typeof legalFields

export const isField = (to: string) => to.includes('{{')

export const fieldKey = (to: string) => to.replace(/[{}]/g, '').trim()

/** The configured URL for a {{field}} destination, if any. */
export const destinationFor = (key: string) => destinations[key] ?? null

const TOKEN = /\{\{\s*([\w.]+)\s*\}\}/g

export interface TextPart {
  text: string
  /** Set when this part is a catalogue value that has not been entered yet. */
  missingKey?: string
}

/** Split copy containing {{fields}} into text and resolved or missing values. */
export function resolveFields(copy: string): TextPart[] {
  const parts: TextPart[] = []
  let last = 0
  for (const match of copy.matchAll(TOKEN)) {
    const index = match.index ?? 0
    if (index > last) parts.push({ text: copy.slice(last, index) })
    const key = match[1]
    if (key === 'current_year') {
      parts.push({ text: String(new Date().getFullYear()) })
    } else {
      const value = catalogueFields[key] ?? destinations[key] ?? null
      parts.push(value ? { text: value } : { text: '—', missingKey: key })
    }
    last = index + match[0].length
  }
  if (last < copy.length) parts.push({ text: copy.slice(last) })
  return parts
}
