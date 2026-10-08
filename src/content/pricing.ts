// VizeDraw pricing configuration and team cost calculation.
// Every commercial assumption lives in PRICING so prices, allowances and
// add-on packs can change without editing the calculator logic. Plan cards
// read the same values through catalogueFields (src/content/commercial.ts).

export interface Pack {
  /** Capacity the pack adds (TB for storage, credits for AI). */
  size: number
  /** Annual price in USD. */
  price: number
}

export const PRICING = {
  controlAnnual: 99,
  proAnnual: 199,

  controlStorageGB: 50,
  proStorageGB: 100,

  proIncludedAICredits: 3000,

  storagePacks: [
    { size: 10, price: 1699 },
    { size: 5, price: 899 },
    { size: 1, price: 199 },
  ] as Pack[],

  aiPacks: [
    { size: 10000, price: 70 },
    { size: 5000, price: 40 },
    { size: 1000, price: 10 },
  ] as Pack[],
}

export const fmtMoney = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
export const fmtNumber = (n: number) => Math.round(n).toLocaleString('en-US')

export interface PackResult {
  cost: number
  capacity: number
  /** e.g. "1 × 10,000 + 1 × 1,000"; empty when nothing is needed. */
  summary: string
}

/**
 * Lowest-cost combination of packs that provides at least the requested
 * capacity (small dynamic-programming optimiser over the smallest pack size).
 */
export function optimizePack(required: number, packs: Pack[]): PackResult {
  if (required <= 0) return { cost: 0, capacity: 0, summary: '' }

  const smallest = Math.min(...packs.map((p) => p.size))
  const steps = packs.map((p) => Math.ceil(p.size / smallest))
  const target = Math.ceil(required / smallest)
  const limit = target + Math.max(...steps) + 10

  const dp: ({ cost: number; counts: number[] } | null)[] = Array(limit + 1).fill(null)
  dp[0] = { cost: 0, counts: packs.map(() => 0) }

  for (let i = 0; i <= limit; i++) {
    const cur = dp[i]
    if (!cur) continue
    packs.forEach((p, idx) => {
      const next = Math.min(limit, i + steps[idx])
      const cost = cur.cost + p.price
      const existing = dp[next]
      if (!existing || cost < existing.cost) {
        const counts = cur.counts.slice()
        counts[idx] += 1
        dp[next] = { cost, counts }
      }
    })
  }

  let best: { cost: number; counts: number[] } | null = null
  for (let i = target; i <= limit; i++) {
    const cur = dp[i]
    if (cur && (!best || cur.cost < best.cost)) best = cur
  }
  if (!best) return { cost: 0, capacity: 0, summary: '' }

  const capacity = best.counts.reduce((sum, count, idx) => sum + count * packs[idx].size, 0)
  const summary = best.counts
    .map((count, idx) => (count ? `${count} × ${packs[idx].size.toLocaleString('en-US')}` : ''))
    .filter(Boolean)
    .join(' + ')
  return { cost: best.cost, capacity, summary }
}

export interface CalculatorInput {
  team: number
  control: number
  pro: number
  storageTB: number
  aiCredits: number
}

export interface Estimate {
  team: number
  paid: number
  reviewers: number
  /** Control + Pro users exceed the team size. */
  overAllocated: boolean
  controlCost: number
  proCost: number
  includedStorageGB: number
  extraStorageTB: number
  storage: PackResult
  includedAI: number
  extraAI: number
  ai: PackResult
  annual: number
  monthly: number
  perMemberMonthly: number
}

const whole = (n: number) => (Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0)
const positive = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0)

export function estimate(input: CalculatorInput): Estimate {
  const team = Math.max(1, whole(input.team))
  const control = whole(input.control)
  const pro = whole(input.pro)
  const storageTB = positive(input.storageTB)
  const aiCredits = whole(input.aiCredits)

  const paid = control + pro
  const reviewers = Math.max(0, team - paid)

  const controlCost = control * PRICING.controlAnnual
  const proCost = pro * PRICING.proAnnual

  const includedStorageGB = control * PRICING.controlStorageGB + pro * PRICING.proStorageGB
  const extraStorageTB = Math.max(0, storageTB * 1024 - includedStorageGB) / 1024
  const storage = optimizePack(extraStorageTB, PRICING.storagePacks)

  const includedAI = pro * PRICING.proIncludedAICredits
  const extraAI = Math.max(0, aiCredits - includedAI)
  const ai = optimizePack(extraAI, PRICING.aiPacks)

  const annual = controlCost + proCost + storage.cost + ai.cost
  const monthly = annual / 12

  return {
    team,
    paid,
    reviewers,
    overAllocated: paid > team,
    controlCost,
    proCost,
    includedStorageGB,
    extraStorageTB,
    storage,
    includedAI,
    extraAI,
    ai,
    annual,
    monthly,
    perMemberMonthly: monthly / team,
  }
}

/** "1.5 TB" from 1,536 GB; values under 1 TB stay in GB. */
export function fmtStorage(gb: number) {
  return gb >= 1024 ? (gb / 1024).toFixed(2).replace(/\.00$/, '') + ' TB' : fmtNumber(gb) + ' GB'
}

export const presets: { id: string; label: string; values: CalculatorInput }[] = [
  { id: 'small', label: 'Small team', values: { team: 15, control: 1, pro: 2, storageTB: 0.25, aiCredits: 5000 } },
  { id: '100', label: '100-person team', values: { team: 100, control: 2, pro: 5, storageTB: 1, aiCredits: 15000 } },
  { id: 'large', label: 'Large team', values: { team: 250, control: 5, pro: 12, storageTB: 5, aiCredits: 50000 } },
]
