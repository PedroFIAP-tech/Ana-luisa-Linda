import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Ana-luisa-Linda/',
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
})
