import { defineConfig } from 'vite';
import { hana } from '@hanabira/router';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [
    tsconfigPaths(),
    react(),
    hana({
      root: __dirname,
      typescript: true,
    }),
  ],
});
