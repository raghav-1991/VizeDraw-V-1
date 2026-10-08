export interface Cta {
  label: string
  /** Internal route, route with anchor, or an unresolved {{key}} destination. */
  to: string
}

export interface Item {
  /** Bold lead-in from the source document, when present. */
  term?: string
  text: string
}

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: Item[] }
  | { type: 'steps'; items: Item[] }
  | { type: 'cta'; primary: Cta; secondary?: Cta }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'kv'; key: string; value: string }

export interface Section {
  heading: string
  id: string
  blocks: Block[]
}

export interface Page {
  id: number
  name: string
  route: string
  purpose: string
  title: string
  description: string
  searchTheme: string
  sections: Section[]
}
