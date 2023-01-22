import { Container } from '@react-email/container'
import { Head } from '@react-email/head'
import { Html } from '@react-email/html'
import { Link } from '@react-email/link'
import { Preview } from '@react-email/preview'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Output } from 'rss-parser'
import FeedSwitch from './FeedSwitch'
import { formatDate } from '../utils/formatter'
import { CustomItem } from '../renderEmail'
import { Heading } from '@react-email/heading'
import { Column } from '@react-email/column'

interface Props {
  feeds: Output<CustomItem>[]
  itemCount: number
  actionUrl?: string
}

export default function Email({ feeds, itemCount, actionUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview children={`RSS to Email with ${itemCount} updates`} />
      <Section style={main}>
        <Container style={container}>
          <Text style={sectionText}>RSS to Email with {itemCount} updates</Text>

          {feeds.map((feed, i) => (
            <FeedSwitch key={feed.link} feed={feed} hasBottomSeparator={i < feeds.length - 1} />
          ))}

          <Text style={sectionText}>
            {actionUrl && (
              <Link style={link} href={actionUrl}>
                {formatDate(new Date().toISOString())}
              </Link>
            )}
          </Text>
        </Container>
      </Section>
    </Html>
  )
}

const main = {
  backgroundColor: '#f8f9fa',
}

const container = {
  backgroundColor: '#fff',
  margin: '0 auto',
  padding: '0',
}

const section = {}

const sectionText = {
  color: '#495057',
  fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0',
  padding: '16px 48px',
  backgroundColor: '#e9ecef',
}

const link = {
  color: '#495057',
  textDecoration: 'underline',
}
