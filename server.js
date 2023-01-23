import express from 'express'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer as createViteServer } from 'vite'

const port = 5173
const cachePath = './cache.json'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Using cache to reload parsed feeds from disk instead of remote
// Since every change of the email is a full render it feels wasteful retrieving the RSS
const getCache = () => {
  try {
    let cache = readFileSync(cachePath, 'utf-8')
    return JSON.parse(cache)
  } catch {
    return
  }
}

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use('/preview.html', async (_, res, next) => {
    try {
      const { renderEmail } = await vite.ssrLoadModule('/src/renderEmail.tsx')

      if (import.meta.hot) {
        import.meta.hot.accept('*', (newFoo) => {
          console.log('TSNEIRNTIRS?')
        })
      }

      const { html, feeds } = await renderEmail({
        pretty: true,
        cache: getCache(),
      })

      writeFileSync(cachePath, JSON.stringify(feeds), { flag: 'w' })

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.use('/', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template = readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(port)

  console.log(`Preview started on: http://localhost:${port}`)
}

createServer()
