import { Output } from 'rss-parser'
import { CustomItem } from '../renderEmail'
import DaringFireballFeed from './DaringFireballFeed'
import GenericFeed from './GenericFeed'

interface Props {
  feed: Output<CustomItem>
}

export default ({ feed }: Props) => {
  switch (feed.title) {
    case 'Daring Fireball':
      return <DaringFireballFeed key={feed.link} feed={feed} />
    default:
      return <GenericFeed key={feed.link} feed={feed} />
  }
}
