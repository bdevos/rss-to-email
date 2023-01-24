import { SettledFeed } from './parseFeeds'

export const getItemCount = (feeds: SettledFeed[]) => feeds.reduce((acc, feed) => acc + (feed.status === 'fulfilled' ? feed.value.items.length : 0), 0)
