import { Container } from '@react-email/container'
import { Link } from '@react-email/link'
import { Text } from '@react-email/text'

interface Props {
  feed: string
  reason: any
}

export default ({ feed, reason }: Props) => {
  return (
    <Container style={box}>
      <Text style={text}>
        <Link style={link} href={feed}>
          {feed}
        </Link>
      </Text>
      <Text style={text}>Reason: {JSON.stringify(reason)}</Text>
    </Container>
  )
}

const box = {
  padding: '32px 48px',
  backgroundColor: '#c92a2a',
}

const text = {
  color: '#fff',
  fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  wordBreak: 'break-word' as const,
}

const link = {
  color: '#fff',
  textDecoration: 'underline',
}
