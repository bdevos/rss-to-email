import dayjs, { Dayjs } from 'dayjs'
import { Item } from 'rss-parser'
import { CustomItem, SettledFeed } from './parseFeeds'

const filterItems = (items: (Item & CustomItem)[], from: Dayjs, limit?: number) =>
  items.filter(({ pubDate }) => pubDate && dayjs(pubDate).isAfter(from)).slice(0, limit)

export const filterItemsFromFeed = (feeds: SettledFeed[], from: Dayjs, limit?: number) => {
  const filteredFeeds = feeds
    .map((feed) => {
      switch (feed.status) {
        case 'fulfilled':
          return { ...feed, value: { ...feed.value, items: filterItems(feed.value.items, from, limit) } }
        case 'rejected':
          return feed
      }
    })
    .filter((feed) => (feed.status === 'fulfilled' ? feed.value.items.length > 0 : true))

  if (filteredFeeds.length === 0 || filteredFeeds.some(({ status }) => status === 'fulfilled')) {
    return filteredFeeds
  }

  // At this point we have no updated items and one or more failed feeds
  filteredFeeds.forEach((feed) => {
    if (feed.status === 'rejected') {
      console.log(`Feed ${feed.feed} failed, reason: ${feed.reason}`)
    }
  })

  throw new Error('One or more feeds failed while no new items!')
}

export const getItemCount = (feeds: SettledFeed[]) => feeds.reduce((acc, feed) => acc + (feed.status === 'fulfilled' ? feed.value.items.length : 0), 0)
