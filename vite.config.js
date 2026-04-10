import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Keep GLBs as separate cacheable files — never inline them
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Split heavy 3D libraries so the main bundle stays small
        // and the browser can cache vendor chunks independently
        manualChunks: {
          'vendor-three':      ['three'],
          'vendor-drei-fiber': ['@react-three/fiber', '@react-three/drei', 'three-stdlib'],
          'vendor-react':      ['react', 'react-dom'],
          'vendor-gsap':       ['gsap'],
        },
      },
    },
  },
})
