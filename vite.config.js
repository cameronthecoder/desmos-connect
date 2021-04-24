import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '',
  build: {
      rollupOptions: {
          output: {
            entryFileNames: `js/[name].js`,   // works
            chunkFileNames: `js/[name].js`,   // works
            assetFileNames: `assets/[name].[ext]` // does not work for images
          }
      }
  }
})
