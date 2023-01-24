import { Container } from '@react-email/container'
import { Head } from '@react-email/head'
import { Html } from '@react-email/html'
import { Link } from '@react-email/link'
import { Preview } from '@react-email/preview'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Dayjs } from 'dayjs'
import FeedSwitch from './FeedSwitch'
import { formatDate } from '../utils/formatter'
import { SettledFeed } from '../parseFeeds'
import Rejected from './Rejected'
import { parseIntro } from './parseIntro'

interface Props {
  feeds: SettledFeed[]
  itemCount: number
  actionUrl: string
  from: Dayjs
  initialRun: boolean
}

export default function Email({ feeds, itemCount, actionUrl, from, initialRun }: Props) {
  const intro = parseIntro(initialRun, itemCount, from)

  return (
    <Html>
      <Head />
      <Preview children={intro} />
      <Section style={main}>
        <Container style={container}>
          <Text style={section}>{intro}</Text>

          {feeds.map((feed, i) => {
            switch (feed.status) {
              case 'fulfilled':
                return <FeedSwitch key={feed.value.link} feed={feed.value} hasBottomSeparator={i < feeds.length - 1} />
              case 'rejected':
                return <Rejected key={feed.feed} feed={feed.feed} reason={feed.reason} />
            }
          })}

          <Text style={{ ...section, marginTop: '64px' }}>
            <Link style={link} href={actionUrl}>
              {formatDate(new Date().toISOString())}
            </Link>
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

const section = {
  color: '#495057',
  fontFamily: 'Dank Mono,Operator Mono,Inconsolata,Fira Mono,ui-monospace,SF Mono,Monaco,Droid Sans Mono,Source Code Pro,monospace',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0',
  padding: '16px 48px',
  backgroundColor: '#e9ecef',
}

const link = {
  color: '#495057',
  textDecoration: 'underline',
  textDecorationColor: '#1098ad',
  textDecorationStyle: 'solid' as const,
  textUnderlineOffset: '1px',
}
