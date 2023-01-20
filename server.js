import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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

      const { html } = await renderEmail({ pretty: true, cron: '0 7 * * *' })

      // const { html } = await renderEmail({ pretty: true, limit: 3 })

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.use('/', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(5173)

  console.log('Preview started on: http://localhost:5173')
}

createServer()
