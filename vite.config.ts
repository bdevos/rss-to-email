import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, unlinkSync } from 'fs'

const cachePath = './cache.json'

const FeedCacheHmr = () => ({
  name: 'feed-cache-hmr',
  enforce: 'pre' as const,
  handleHotUpdate({ file }) {
    if (file.endsWith('src/feeds.ts') && existsSync(cachePath)) {
      // If the feeds.ts file is updated, remove the cached version
      console.log('REMOVE CACHE!')
      unlinkSync(cachePath)
    }
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), FeedCacheHmr()],
})
