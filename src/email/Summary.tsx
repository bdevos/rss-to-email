import { CSSProperties } from 'react'
import parse from 'node-html-parser'
import { Link } from '@react-email/link'
import { Text } from '@react-email/text'

interface Props {
  content: string
  href: string
  style: CSSProperties | undefined
}

export default ({ content, href, style }: Props) => {
  const root = parse(content)
  const elements = root.querySelectorAll('> p')

  if (elements.length === 0) {
    return null
  }

  return (
    <>
      <Text style={style}>{elements[0].text}</Text>
      {elements.length > 1 && (
        <Text style={style}>
          <Link href={href}>…</Link>
        </Text>
      )}
    </>
  )
}
