import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),      // ✅ Required for React + JSX support
    tailwindcss() // ✅ TailwindCSS plugin
  ],
  server: {
    port: 5174,   // ✅ Your chosen dev server port
  }
})
