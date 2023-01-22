import { render } from '@react-email/render'
import Parser, { Output } from 'rss-parser'
import { feeds } from './feeds'
import Email from './email/Email'
import { cronToEarliestDate } from './utils/cron'
import { filterItemsFromFeed, getItemCount } from './utils/filter'

// rss-parser has this sorta funky parsing when `keepArray: true` is set
export interface ItemLink {
  $: {
    rel: 'alternate' | 'shorturl' | 'related'
    href: string
  }
}

// Daring Fireball uses id instead of guid, so had to append that as a custom type for parsing
export type CustomItem = {
  id: string
  link: string
  links: ItemLink[]
}

const parser: Parser = new Parser<{}, CustomItem>({
  customFields: {
    item: [
      ['id', 'id'],
      ['link', 'links', { keepArray: true }],
    ],
  },
})

interface Props {
  actionUrl?: string
  cron?: string
  limit?: number
  pretty?: boolean
  cache?: Output<CustomItem>[]
}

const parseFeeds = async (earliestDate: Date | undefined, limit?: number) => {
  const settledFeeds = await Promise.allSettled(feeds.map((feed) => parser.parseURL(feed)))

  const fulfilledFeeds = settledFeeds.reduce((acc, current, i) => {
    switch (current.status) {
      case 'fulfilled':
        return [...acc, current.value as Output<CustomItem>]
      case 'rejected':
        console.error(`Could not settle feed ${feeds[i]}, reason: ${current.reason}`)
        return acc
    }
  }, [] as Output<CustomItem>[])

  return filterItemsFromFeed(fulfilledFeeds, earliestDate, limit)
}

export async function renderEmail({ pretty = false, cron, limit, actionUrl, cache }: Props) {
  const earliestDate = cronToEarliestDate(cron)

  const parsedFeeds = cache ?? (await parseFeeds(earliestDate, limit))

  const itemCount = getItemCount(parsedFeeds)

  const html = render(<Email feeds={parsedFeeds} itemCount={itemCount} actionUrl={actionUrl} />, {
    pretty,
  })

  return { html, itemCount, feeds: parsedFeeds }
}
