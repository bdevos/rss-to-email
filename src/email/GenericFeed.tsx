import { Container } from '@react-email/container'
import { Hr } from '@react-email/hr'
import { Link } from '@react-email/link'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Output } from 'rss-parser'
import { CustomItem } from '../parseFeeds'
import { formatDate } from '../utils/formatter'

interface Props {
  feed: Output<CustomItem>
  hasBottomSeparator: boolean
}

export default ({ feed, hasBottomSeparator }: Props) => {
  return (
    <Container style={box}>
      <Text style={header}>
        <Link style={headerLink} href={feed.link}>
          {feed.title}
        </Link>
      </Text>
      {feed.items.map((item) => (
        <Container key={item.guid} style={section}>
          <Link style={anchor} href={item.link}>
            {item.title}
          </Link>
          {item.pubDate && <Text style={date}>{formatDate(item.pubDate)}</Text>}
          <Text style={paragraph}>{item.contentSnippet}</Text>
        </Container>
      ))}
      {hasBottomSeparator && (
        <Section>
          <Hr style={hr} />
        </Section>
      )}
    </Container>
  )
}

const box = {
  padding: '32px 48px',
}

const header = {
  color: '#212529',
  fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
  fontSize: '16px',
}

const headerLink = {
  color: '#212529',
  textDecoration: 'underline',
}

const section = {
  margin: '32px 0',
}

const anchor = {
  fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
  color: '#556cd6',
  fontSize: '20px',
}

const date = {
  color: '#495057',
  fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
  fontSize: '12px',
  fontStyle: 'italic',
  margin: 0,
}

const paragraph = {
  color: '#495057',
  fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  margin: 0,
}

const hr = {
  marginTop: '48px',
  borderTopColor: '#f8f9fa',
}
