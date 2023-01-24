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

const LIMIT_ITEMS_INITIAL_RUN = 3

export async function renderEmail({ actionUrl, cache, lastSuccess, pretty = false }: Partial<Props>) {
  const { from, initialRun } = parseLastSuccess(lastSuccess)

  const feeds = cache ?? (await parseFeeds())

  const filteredFeeds = filterItemsFromFeed(feeds, from, initialRun ? LIMIT_ITEMS_INITIAL_RUN : undefined)

  const itemCount = getItemCount(filteredFeeds)

  const html = render(<Email actionUrl={actionUrl} feeds={filteredFeeds} from={from} initialRun={initialRun} itemCount={itemCount} />, {
    pretty,
  })

  return { html, itemCount, feeds }
}
