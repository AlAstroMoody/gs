import { fileURLToPath, URL } from 'url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/gs/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          `@import "@/assets/scss/fonts/fonts.scss"; 
           @import "@/assets/scss/_mixins.scss";`,
        ],
      },
    },
  },
})
