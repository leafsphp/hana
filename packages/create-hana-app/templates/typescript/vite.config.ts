import { defineConfig } from 'vite';
import { hana } from '@hanabira/router';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [
    react(),
    hana({
      root: __dirname,
      typescript: true,
    }),
  ],
});
