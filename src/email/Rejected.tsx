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
  padding: '16px 32px',
  backgroundColor: '#c92a2a',
}

const text = {
  color: '#fff',
  fontFamily: 'Dank Mono,Operator Mono,Inconsolata,Fira Mono,ui-monospace,SF Mono,Monaco,Droid Sans Mono,Source Code Pro,monospace',
  fontSize: '12px',
  wordBreak: 'break-word' as const,
  margin: '16px 0',
}

const link = {
  color: '#fff',
  textDecoration: 'underline',
}
