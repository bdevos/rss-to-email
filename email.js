import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { createServer as createViteServer } from 'vite'

const outputDir = './dist'

const getFromArgv = (key) => process.argv.find((arg) => arg.startsWith(`${key}=`))?.replaceAll(`${key}=`, '')

async function createEmail() {
  const vite = await createViteServer({
    appType: 'custom',
  })

  const actionUrl = getFromArgv('actionUrl')
  const lastSuccess = getFromArgv('lastSuccess')

  try {
    const { renderEmail } = await vite.ssrLoadModule('/src/renderEmail.tsx')

    const { html, itemCount } = await renderEmail({ actionUrl, lastSuccess })

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
