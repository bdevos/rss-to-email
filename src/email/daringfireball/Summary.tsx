import { Fragment } from 'react'
import { parse } from 'node-html-parser'
import { Text } from '@react-email/text'
import { Link } from '@react-email/link'

interface Props {
  content: string
  href: string
}

export default ({ content, href }: Props) => {
  const root = parse(content)
  const elements = root.querySelectorAll('> p:first-of-type, > blockquote:first-of-type')

  // If blockquote exists and contains more than one <p>
  const blockquoteHasMore =
    root.querySelectorAll('> blockquote').length > 0 && root.querySelectorAll('> blockquote:first-of-type > p:nth-of-type(2)').length > 0

  return (
    <>
      {elements.map((element) => {
        switch (element.localName) {
          case 'p':
            return (
              <Text key="p" style={text}>
                {element.text}
              </Text>
            )
          case 'blockquote':
            const paragraphs = element.querySelectorAll('> p')
            return (
              <Fragment key="blockquote">
                <Text style={blockquote}>{paragraphs[0].text ?? ''}</Text>
                {blockquoteHasMore && (
                  <Text style={blockquote}>
                    <Link style={link} href={href}>
                      …
                    </Link>
                  </Text>
                )}
              </Fragment>
            )
        }
      })}
      {!blockquoteHasMore && root.querySelectorAll('> p').length > 1 && (
        <Link href={href} style={text}>
          …
        </Link>
      )}
    </>
  )
}

const text = {
  fontFamily: 'Verdana, system-ui, Helvetica, sans-serif',
  fontSize: '12px',
  color: '#eee',
  lineHeight: '21.6px',
  margin: '12px 0 20px',
}

const blockquote = {
  fontFamily: 'Verdana, system-ui, Helvetica, sans-serif',
  fontSize: '12px',
  color: '#eee',
  lineHeight: '21.6px',
  margin: '0 0 0 12px',
  borderLeft: '1px solid #777',
  padding: '0 0 0 15px',
}

const link = {
  fontFamily: 'Verdana, system-ui, Helvetica, sans-serif',
  fontSize: '12px',
  color: '#eee',
  lineHeight: '21.6px',
}
