import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["@mediapipe/pose, @mediapipe/camera_utils"],
      output: {
        globals: {
          "@mediapipe/pose": "mediapipePose",
          "@mediapipe/camera_utils": "mediapipeCamera",
        },
      },
    },
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //     '@assets': path.resolve(__dirname, 'src/assets'),
  //     '@components': path.resolve(__dirname, 'src/components'),
  //     '@redux': path.resolve(__dirname, 'src/redux'),
  //     '@styles': path.resolve(__dirname, 'src/styles'),
  //     '@api': path.resolve(__dirname, 'src/api'),
  //     '@utils': path.resolve(__dirname, 'src/utils'),
  //   },
  // },
});
