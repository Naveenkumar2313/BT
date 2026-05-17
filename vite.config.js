import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      workbox: { clientsClaim: true, skipWaiting: true }
    })
  ],
  build: {
    chunkSizeWarningLimit: 2000
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, "src/app")
    }
  },
  server: {
    proxy: {
      '/rapidapi': {
        target: 'https://judge0-ce.p.rapidapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rapidapi/, ''),
        headers: {
          'X-RapidAPI-Key': 'ca4d1cdb95msh97d80c10e13ed1bp188aacjsn76682c55d7a1',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    }
  }
});
