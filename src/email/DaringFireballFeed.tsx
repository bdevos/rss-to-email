import { Img } from '@react-email/img'
import { Link } from '@react-email/link'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Output } from 'rss-parser'
import { CustomItem, ItemLink } from '../renderEmail'

interface Props {
  feed: Output<CustomItem>
}

const findRelatedLink = (links: ItemLink[]) => links.map(({ $: link }) => link).find(({ rel }) => rel === 'related')?.href

export default ({ feed }: Props) => {
  return (
    <Section style={box}>
      <Link href={feed.link}>
        <Img src="https://daringfireball.net/graphics/logos/" style={logo} />
      </Link>
      {feed.items.map((item) => (
        <Section key={item.guid ?? item.id} style={section}>
          <Text style={title}>
            <Link style={titleLink} href={findRelatedLink(item.links) ?? item.link}>
              {item.title}
            </Link>
          </Text>
          <Text style={content}>{item.contentSnippet?.replaceAll('★', '')}</Text>
        </Section>
      ))}
    </Section>
  )
}

const box = {
  padding: '48px 32px 16px 17px',
  backgroundColor: '#4a525a',
}

const logo = {
  width: '240px',
}

const section = {
  padding: '32px 0 48px 15px',
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

const title = {
  margin: '0 0 12px',
}

const content = {
  fontFamily: 'Verdana, system-ui, Helvetica, sans-serif',
  fontSize: '12px',
  color: '#eee',
  lineHeight: '21.6px',
  fontWeight: 'normal',
  margin: 0,
}
