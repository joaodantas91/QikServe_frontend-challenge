/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/vitest.setup.ts'],
    css: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with /api to the external API
      '/api': {
        target: 'https://cdn-dev.preoday.com/challenge', // Your external API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api from the request
      },
    },
  },
})


