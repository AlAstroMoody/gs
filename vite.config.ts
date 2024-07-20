import path from 'path'
import { fileURLToPath, URL } from 'url'
import { splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/gs/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'tailwind.config.js': path.resolve(__dirname, 'tailwind.config.js'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [`@import "@/assets/css/fonts/fonts.css";`],
      },
    },
  },
  optimizeDeps: {
    include: ['tailwind.config.js'],
  },
  build: {
    commonjsOptions: {
      include: ['tailwind.config.js', 'node_modules/**'],
    },
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // creating a chunk to @open-ish deps. Reducing the vendor chunk size
          if (id.includes('node_modules')) {
            return id
            .toString()
            .split('node_modules/')[1]
            .split('/')[0]
            .toString();
          }
        },
      },
    },
  },
})
