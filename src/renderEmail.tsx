import { render } from '@react-email/render'
import Email from './email/Email'
import { filterItemsFromFeed } from './filterItems'
import { parseLastSuccess } from './parseLastSuccess'
import { parseFeeds, SettledFeed } from './parseFeeds'
import { getItemCount } from './getItemCount'

interface Props {
  actionUrl: string
  cache: SettledFeed[]
  lastSuccess: string
  pretty: boolean
}

const ITEMS_ON_INITIAL_RUN = 3
const FALLBACK_ACTION_URL = 'https://github.com/bdevos/rss-to-email'

export async function renderEmail({ actionUrl = FALLBACK_ACTION_URL, cache, lastSuccess, pretty = false }: Partial<Props>) {
  const { from, initialRun } = parseLastSuccess(lastSuccess)

  const parsedFeeds = cache ?? (await parseFeeds())

  const filteredFeeds = filterItemsFromFeed(parsedFeeds, from, initialRun ? ITEMS_ON_INITIAL_RUN : undefined)

  const itemCount = getItemCount(filteredFeeds)

  const html = render(<Email actionUrl={actionUrl} feeds={filteredFeeds} from={from} initialRun={initialRun} itemCount={itemCount} />, {
    pretty,
  })

  return { html, itemCount, feeds: parsedFeeds }
}
