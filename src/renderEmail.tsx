import { render } from '@react-email/render'
import Email from './email/Email'
import { filterItemsFromFeed, getItemCount } from './filterItems'
import { parseLastSuccess } from './parseLastSuccess'
import { parseFeeds, SettledFeed } from './parseFeeds'

interface Props {
  actionUrl: string
  cache: SettledFeed[]
  lastSuccess: string
  limit: number
  pretty: boolean
}

const ITEMS_ON_INITIAL_RUN = 1
const FALLBACK_ACTION_URL = 'https://github.com/bdevos/rss-to-email'

export async function renderEmail({ actionUrl = FALLBACK_ACTION_URL, cache, lastSuccess, limit, pretty = false }: Partial<Props>) {
  const { from, initialRun } = parseLastSuccess(lastSuccess)

  const parsedFeeds = cache ?? (await parseFeeds())

  const filteredFeeds = filterItemsFromFeed(parsedFeeds, from, limit ?? initialRun ? ITEMS_ON_INITIAL_RUN : undefined)

  const itemCount = getItemCount(filteredFeeds)

  const html = render(<Email actionUrl={actionUrl} feeds={filteredFeeds} from={from} initialRun={initialRun} itemCount={itemCount} />, {
    pretty,
  })

  return { html, itemCount, feeds: parsedFeeds }
}
