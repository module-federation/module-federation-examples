import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import dns from 'dns'
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'vite',      
      exposes: {
        './Button': './src/components/Button'
      },
    }),
  ],
  preview: {
    host: 'localhost',
    port: 5000,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'system',
        chunkFileNames: '[name].js',
      },
      input: './src/index.js',
      preserveEntrySignatures: false,
      plugins: [
        resolve({
          browser: true,
          transformMixedEsModules: true,
          modulesOnly: true,
          dedupe: ['react', 'react-dom'],
          extensions: ['.mjs', '.js', '.jsx', '.json'],
          preferBuiltins: false,
        }),
        commonjs({
          transformMixedEsModules: true,
          include: ['node_modules/*'],
        }),
        babel(),
      ],       
    }
  },
  server: {
    port: 5000,
  },
})
