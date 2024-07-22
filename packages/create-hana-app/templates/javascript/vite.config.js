import { defineConfig } from 'vite';
import { hana } from '@hanabira/router';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    hana({
      root: __dirname,
      typescript: false,
    }),
  ],
});
