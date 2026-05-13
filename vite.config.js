import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['three'],
  },
  build: {
    // Split vendor chunks for better long-term caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/.test(id)) return 'react-vendor'
          if (/[\\/]node_modules[\\/]framer-motion[\\/]/.test(id)) return 'motion-vendor'
          if (/[\\/]node_modules[\\/](three|@react-three[\\/]fiber|@react-three[\\/]drei)[\\/]/.test(id)) return 'three-vendor'
          return 'vendor'
        },
      },
    },
    chunkSizeWarningLimit: 2000,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
  },
})
