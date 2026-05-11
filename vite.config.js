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
        manualChunks: {
          'react-vendor':  ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor': ['framer-motion'],
          'three-vendor':  ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    chunkSizeWarningLimit: 2000,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
  },
})
