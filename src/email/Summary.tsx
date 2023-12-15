import { CSSProperties } from 'react'
import parse from 'node-html-parser'
import { Link } from '@react-email/link'
import { Text } from '@react-email/text'

interface Props {
  content: string
  href: string | undefined
  paragraphStyle: CSSProperties
  blockquoteStyle: CSSProperties
}

export default ({ content, href, paragraphStyle, blockquoteStyle }: Props) => {
  const root = parse(content)
  const elements = root.querySelectorAll('> p, > blockquote')

  if (elements.length === 0) {
    return null
  }

  return (
    <>
      <Text style={elements.at(0)?.localName === 'blockquote' ? blockquoteStyle : paragraphStyle}>{elements.at(0)?.text}</Text>
      {elements.length > 1 && (
        <Text style={paragraphStyle}>
          <Link href={href}>…</Link>
        </Text>
      )}
    </>
  )
}
