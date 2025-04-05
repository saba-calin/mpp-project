import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add fallbacks for Node.js globals
      process: 'process/browser',
      buffer: 'buffer',
    }
  },
  define: {
    global: 'globalThis', // 👈 This fixes "global is not defined"
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill()
      ]
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js"
  }
})
