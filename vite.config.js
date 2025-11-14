// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  plugins: [react(), tailwindcss()],

  // -----------------------------------------------------------------
  // Build output (unchanged)
  // -----------------------------------------------------------------
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },

  // -----------------------------------------------------------------
  // Development server
  // -----------------------------------------------------------------
  server: {
    port: 3000,
    open: true,                     // open browser automatically
    // -------------------------------------------------------------
    // PROXY ALL /api calls to your Express backend
    // -------------------------------------------------------------
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // <-- Express server port
        changeOrigin: true,
        secure: false,
        // Optional: log proxy activity while debugging
        // configure: (proxy, _options) => {
        //   proxy.on('proxyReq', (proxyReq, req) => {
        //     console.log('Proxying', req.method, req.url);
        //   });
        // },
      },
    },
  },
});