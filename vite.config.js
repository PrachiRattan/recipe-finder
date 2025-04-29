import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0', // required for external access
    port: 4173,       // optional, keep default
    allowedHosts: ['recipe-finder-iywv.onrender.com']
  }
})
