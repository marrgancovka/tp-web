import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({include: "**/*.jsx"})],
  server: {
    watch: {
      usePolling: true,
    }
  },
  
  build: {
    // Вы можете настроить цель сборки (для более старых браузеров):
    target: 'es2015',

    // Вы также можете настроить имя выходного файла для сборки
    outDir: 'dist',



    // Включите сжатие файлов
    sourcemap: false,
  },
})
