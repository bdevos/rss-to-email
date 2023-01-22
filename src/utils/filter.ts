import dayjs from 'dayjs'
import { Item, Output } from 'rss-parser'
import { CustomItem } from '../renderEmail'

const filterItems = (items: (Item & CustomItem)[], from: dayjs.Dayjs, limit?: number) =>
  items.filter(({ pubDate }) => pubDate && dayjs(pubDate).isAfter(from)).slice(0, limit)

export const filterItemsFromFeed = (feeds: Output<CustomItem>[], from: dayjs.Dayjs, limit?: number) =>
  feeds.map((feed) => ({ ...feed, items: filterItems(feed.items, from, limit) })).filter(({ items }) => items.length > 0)

export const getItemCount = (feeds: Output<CustomItem>[]) => feeds.reduce((acc, current) => acc + current.items.length, 0)
