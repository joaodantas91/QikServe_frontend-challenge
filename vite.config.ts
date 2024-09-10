/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/vitest.setup.ts'],
  },
  plugins: [react()],
})


