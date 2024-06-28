import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

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
  server: {
    fs: {
			allow: ['.'],
		},
  },
  build: {
    target: 'esnext'
  }
})
