import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(dirname, 'src'),
  //     '@assets': path.resolve(dirname, 'src/assets'),
  //     '@components': path.resolve(dirname, 'src/components'),
  //     '@redux': path.resolve(dirname, 'src/redux'),
  //     '@styles': path.resolve(dirname, 'src/styles'),
  //     '@api': path.resolve(dirname, 'src/api'),
  //     '@utils': path.resolve(__dirname, 'src/utils'),
  //   },
  // },
  optimizeDeps: {
    exclude: ['@mediapipe/pose', '@mediapipe/camera_utils'],
  },
})