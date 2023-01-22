import { Output } from 'rss-parser'
import { CustomItem } from '../renderEmail'
import DaringFireballFeed from './DaringFireballFeed'
import GenericFeed from './GenericFeed'

interface Props {
  feed: Output<CustomItem>
  hasBottomSeparator: boolean
}

export default ({ feed, hasBottomSeparator }: Props) => {
  switch (feed.link) {
    case 'https://daringfireball.net/':
      return <DaringFireballFeed key={feed.link} feed={feed} />
    default:
      return <GenericFeed key={feed.link} feed={feed} hasBottomSeparator={hasBottomSeparator} />
  }
}
