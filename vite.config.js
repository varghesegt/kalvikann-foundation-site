import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0', // ✅ Expose to network (LAN/WiFi)
    port: 5173,
    strictPort: true,
    open: true,
    watch: { usePolling: true },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  base: '/',
});
