import { getPage, pages, section } from '.'
import type { Item } from './types'

/** Resource type labels come from the Resources dropdown in the primary navigation table. */
export type ResourceType = 'Guides' | 'Checklist' | 'Comparison' | 'Worked example'

export const resourceTypes: ResourceType[] = ['Guides', 'Checklist', 'Comparison', 'Worked example']

export interface Resource {
  pageId: number
  route: string
  type: ResourceType
  group: string
  item: Item
  /** Searchable text: the card copy plus the target page's headings and metadata. */
  index: string
}

const typeByPage: Record<number, ResourceType> = {
  13: 'Checklist',
  14: 'Guides',
  15: 'Guides',
  16: 'Guides',
  17: 'Comparison',
  18: 'Worked example',
}

// Resources page list order maps to these pages.
const order = [13, 14, 15, 16, 17, 18]

export function getResources(): Resource[] {
  const hub = getPage(12)
  const groups = ['Start with the essentials', 'Evaluate the technology']
  const items = groups.flatMap((g) =>
    section(hub, g).blocks.flatMap((b) => (b.type === 'list' ? b.items.map((item) => ({ group: g, item })) : [])),
  )
  return items.map(({ group, item }, i) => {
    const target = pages.find((p) => p.id === order[i])!
    const index = [item.term, item.text, target.name, target.title, target.description, ...target.sections.map((s) => s.heading)]
      .join(' ')
      .toLowerCase()
    return { pageId: target.id, route: target.route, type: typeByPage[target.id], group, item, index }
  })
}

export function resourceType(pageId: number): ResourceType | undefined {
  return typeByPage[pageId]
}

/** Every query word must match; a trailing plural "s" is ignored. */
export function matches(resource: Resource, query: string) {
  const words = query.toLowerCase().split(/[^a-z0-9-]+/).filter(Boolean)
  return words.every((w) => {
    const stem = w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w
    return resource.index.includes(stem)
  })
}
