import { Container } from '@react-email/container'
import { Img } from '@react-email/img'
import { Link } from '@react-email/link'
import { Text } from '@react-email/text'
import { Output } from 'rss-parser'
import { CustomItem } from '../../parseFeeds'
import Summary from './Summary'
import { parseLinks } from '../parseLinks'

interface Props {
  feed: Output<CustomItem>
}

export default ({ feed }: Props) => {
  return (
    <Container style={box}>
      <Link href={feed.link}>
        <Img src="https://daringfireball.net/graphics/logos/" style={logo} />
      </Link>
      {feed.items.map((item) => {
        const href = parseLinks(item.links)
        return (
          <Container key={item.guid ?? item.id} style={section}>
            <Text style={title}>
              <Link style={titleLink} href={href}>
                {item.title}
              </Link>
            </Text>
            {item.content && <Summary href={href} content={item.content} />}
          </Container>
        )
      })}
    </Container>
  )
}

const box = {
  padding: '32px 32px 32px 17px',
  backgroundColor: '#4a525a',
}

const logo = {
  width: '240px',
}

const section = {
  padding: '32px 0 32px 15px',
}

const title = {
  margin: '0',
}

const titleLink = {
  color: '#ccc',
  textDecoration: 'underline',
  textDecorationColor: '#72767A',
  textDecorationStyle: 'solid' as const,
  textUnderlineOffset: '4px',
  fontFamily: '"Gill Sans MT", "Gill Sans", "Gill Sans Std", Verdana, "Bitstream Vera Sans", sans-serif',
  fontSize: '12.6px',
  fontWeight: 400,
  letterSpacing: '1.89px',
  textTransform: 'uppercase' as const,
}
