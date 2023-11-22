import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { hana } from '@hanabira/router';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    hana({
      root: __dirname,
      typescript: true,
    }),
  ],
});
