import { Item, Output } from 'rss-parser'
import { CustomItem } from '../renderEmail'

const filterItems = (items: (Item & CustomItem)[], earliestDate: Date | undefined, limit?: number) =>
  items
    .filter(({ pubDate }) => {
      if (!pubDate || !earliestDate) {
        // If no pubDate, only return if there is also no earliestDate
        return !earliestDate
      }

      return new Date(pubDate) >= earliestDate
    })
    .slice(0, limit)

export const filterItemsFromFeed = (feeds: Output<CustomItem>[], earliestDate: Date | undefined, limit?: number) =>
  feeds.map((feed) => ({ ...feed, items: filterItems(feed.items, earliestDate, limit) })).filter(({ items }) => items.length > 0)

export const getItemCount = (feeds: Output<CustomItem>[]) => feeds.reduce((acc, current) => acc + current.items.length, 0)
