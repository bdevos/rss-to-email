import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { createServer as createViteServer } from 'vite'

const outputDir = './dist'

async function createEmail() {
  const vite = await createViteServer({
    appType: 'custom',
  })

  const cron = '0 7 * * *'

  try {
    const { renderEmail } = await vite.ssrLoadModule('/src/renderEmail.tsx')

    const { html, itemCount } = await renderEmail({ cron })

    if (itemCount === 0) {
      console.log('No new items in feed, skipping email')
      process.exit(0)
    }

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir)
    }

    writeFileSync(`${outputDir}/email.html`, html, { flag: 'w' })

    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

createEmail()
