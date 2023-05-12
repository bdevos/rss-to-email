import { ItemLink } from '../parseFeeds'

type Rel = 'alternate' | 'related'

const hrefByRel = (links: ItemLink[], rel: Rel) => links.map(({ $: link }) => link).find((link) => link.rel === rel)?.href

export const parseLinks = (links: ItemLink[]) => {
  if (links.length === 0) {
    throw new Error('Empty links array cannot be parsed')
  }

  const validLinks = links.filter((link) => link.$)

  if (validLinks.length === 0) {
    // The RSS parsers result is weird, when the links are just a string we can use the first without parsing
    return `${links[0]}`
  }

  return hrefByRel(links, 'related') ?? hrefByRel(links, 'alternate') ?? links[0].$.href
}
