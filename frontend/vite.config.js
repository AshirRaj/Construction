import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'charts-vendor';
            if (id.includes('lucide-react') || id.includes('framer-motion')) return 'ui-vendor';
            if (id.includes('react-router') || id.includes('react-dom') || id.includes('react')) return 'react-vendor';
            return 'vendor';
          }
        }
      }
    }
  }
})
