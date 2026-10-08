import { pages } from './pages'
import type { Block, Page, Section } from './types'

export function getPage(id: number): Page {
  const page = pages.find((p) => p.id === id)
  if (!page) throw new Error(`Missing content for page ${id}`)
  return page
}

export function section(page: Page, heading: string): Section {
  const found = page.sections.find((s) => s.heading === heading)
  if (!found) throw new Error(`Missing section "${heading}" on ${page.route}`)
  return found
}

/** Sections after the hero, optionally excluding some headings. */
export function bodySections(page: Page, exclude: string[] = []): Section[] {
  return page.sections.filter((s) => s.heading !== 'Hero' && !exclude.includes(s.heading))
}

export function paragraphs(s: Section): string[] {
  return s.blocks.filter((b): b is Extract<Block, { type: 'p' }> => b.type === 'p').map((b) => b.text)
}

export function blocksOf<T extends Block['type']>(s: Section, type: T): Extract<Block, { type: T }>[] {
  return s.blocks.filter((b): b is Extract<Block, { type: T }> => b.type === type)
}

export function firstOf<T extends Block['type']>(s: Section, type: T): Extract<Block, { type: T }> {
  const found = blocksOf(s, type)[0]
  if (!found) throw new Error(`Section "${s.heading}" has no ${type} block`)
  return found
}

export const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** "1 Define the next action" -> { num: '1', title: 'Define the next action' } */
export function splitNumbered(heading: string): { num?: string; title: string } {
  const m = heading.match(/^(\d+)\s+(.*)$/)
  return m ? { num: m[1], title: m[2] } : { title: heading }
}

export { pages }
export type { Page, Section, Block }

/**
 * Presentation trim: the first sentence of a paragraph. The approved copy
 * stays verbatim in pages.ts; pages show this shorter form so layouts stay
 * visual-first. Returns the text unchanged when it has no sentence break.
 */
export function brief(text: string): string {
  const m = text.match(/^.*?[.!?](?=\s+[A-Z0-9(“"‘']|$)/)
  return m ? m[0] : text
}
