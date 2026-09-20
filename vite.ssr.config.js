import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Second build, used only by scripts/prerender-routes.mjs to render the real
// React pages to static HTML. Kept apart from vite.config.js on purpose: that
// one splits vendor chunks for the browser, which means nothing on the server.
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    target: 'node20',
  },
})
