import { render } from '@react-email/render'
import Parser, { Output } from 'rss-parser'
import { feeds } from './feeds'
import Email from './email/Email'
import { filterItemsFromFeed, getItemCount } from './utils/filter'
import dayjs from 'dayjs'

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

const ITEMS_ON_INITIAL_RUN = 3

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
  cache?: Output<CustomItem>[]
  lastSuccess?: string
  limit?: number
  pretty?: boolean
}

const parseLastSuccess = (lastSuccess: string | undefined) => {
  if (lastSuccess) {
    const parsed = dayjs(lastSuccess)

    if (parsed.isValid()) {
      return {
        from: parsed,
        initialRun: false,
      }
    }
  }

  return {
    from: dayjs().subtract(7, 'days'),
    initialRun: true,
  }
}

const parseFeeds = async (lastSuccess: string | undefined, limit?: number) => {
  const { from, initialRun } = parseLastSuccess(lastSuccess)

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

  return filterItemsFromFeed(fulfilledFeeds, from, limit ?? initialRun ? ITEMS_ON_INITIAL_RUN : undefined)
}

export async function renderEmail({ actionUrl, cache, lastSuccess, limit, pretty = false }: Props) {
  const parsedFeeds = cache ?? (await parseFeeds(lastSuccess, limit))

  const itemCount = getItemCount(parsedFeeds)

  const html = render(<Email feeds={parsedFeeds} itemCount={itemCount} actionUrl={actionUrl} />, {
    pretty,
  })

  return { html, itemCount, feeds: parsedFeeds }
}
