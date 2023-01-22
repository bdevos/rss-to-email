import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const port = 5173

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

      const { html } = await renderEmail({
        pretty: true,
        // cron: '0 7 * * *', // Limit to the time period from previous to next cron job running
        limit: 3, // Limit to the last n posts of every feed in feeds.ts
        actionUrl: 'http://localhost:5173',
      })

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

  app.listen(port)

  console.log(`Preview started on: http://localhost:${port}`)
}

createServer()
