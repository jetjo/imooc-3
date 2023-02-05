import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

const SERVER = 'https://www.fastmock.site/mock/db10f372e8cf729e0aa9b589ee9fb48f';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 8099,
    host: true,
    open: true,
    proxy: {
      '/dev-api': {
        target: SERVER,
        changeOrigin: true,
        // rewrite: (p) => p.replace(/^\/dev-api/, '')
      }
    }
  },
})
