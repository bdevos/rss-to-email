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

interface Props {
  feeds: Output<CustomItem>[]
  itemCount: number
}

export default function Email({ feeds, itemCount }: Props) {
  return (
    <Html>
      <Head />
      <Preview children={`RSS to Email with ${itemCount} updates`} />
      <Section style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={sectionText}>RSS to Email with {itemCount} updates</Text>
          </Section>

          {feeds.map((feed) => (
            <FeedSwitch key={feed.link} feed={feed} />
          ))}

          <Section style={section}>
            <Text style={sectionText}>
              <Link style={link} href="https://appjeniksaan.nl">
                {formatDate(new Date().toISOString())}
              </Link>
            </Text>
          </Section>
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

const section = {
  padding: '16px 48px',
  backgroundColor: '#e9ecef',
}

const sectionText = {
  color: '#495057',
  fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0',
}

const link = {
  color: '#495057',
  textDecoration: 'underline',
}
