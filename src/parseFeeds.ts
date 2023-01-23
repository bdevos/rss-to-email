import { Dayjs } from 'dayjs'
import Parser, { Output } from 'rss-parser'
import { feeds } from './feeds'

// rss-parser has this sorta funky parsing when `keepArray: true` is set
export interface ItemLink {
  $: {
    rel: 'alternate' | 'shorturl' | 'related'
    href: string
  }
}

export type CustomItem = {
  id: string // Daring Fireball uses id instead of guid, so had to append that as a custom type for parsing
  link: string
  links: ItemLink[] // Daring Fireball uses rel= in multiple links so have to do some specific parsing
}

export type SettledFeed =
  | {
      status: 'fulfilled'
      value: Output<CustomItem>
    }
  | {
      status: 'rejected'
      feed: string
      reason: any
    }

const parser: Parser = new Parser<{}, CustomItem>({
  customFields: {
    item: [
      ['id', 'id'],
      ['link', 'links', { keepArray: true }],
    ],
  },
})

export const parseFeeds = async () => {
  const settledFeeds = await Promise.allSettled(feeds.map((feed) => parser.parseURL(feed)))

  return settledFeeds.reduce((acc, current, i) => {
    switch (current.status) {
      case 'fulfilled':
        return [...acc, { ...current, value: current.value as Output<CustomItem> }]
      case 'rejected':
        console.error(`Could not settle feed ${feeds[i]}, reason: ${current.reason}`)

        return [
          ...acc,
          {
            ...current,
            feed: feeds[i],
          },
        ]
    }
  }, [] as SettledFeed[])
}
