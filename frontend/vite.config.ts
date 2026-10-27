/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
        name: 'fullstackTemplate',
        filename: 'remoteEntry.js',
        exposes: {
            './fullstackTemplateApp': './src/App.tsx'
        },
        shared: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled', '@mui/icons-material']
    })
  ],
  server: {
    port: 6600,
    host: true
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    include: ['tests/**/*.test.{ts,tsx}'],
  },
})
