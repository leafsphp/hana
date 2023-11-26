import { defineConfig } from 'vite';
import { hana } from '@hanabira/router';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    hana({
      root: __dirname,
      typescript: true,
    }),
  ],
});
