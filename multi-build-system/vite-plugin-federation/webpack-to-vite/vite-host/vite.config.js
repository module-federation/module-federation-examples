import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'vite',      
      remotes: {
        nav: {
          external: 'http://localhost:3003/remoteEntry.js',
          format: 'var'
        }
      },
      shared: []
    })
  ],
  preview: {
    host: 'localhost',
    port: 5003,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'esm',
      },
    }
  },
  server: {
    port: 5003,
  },
})
