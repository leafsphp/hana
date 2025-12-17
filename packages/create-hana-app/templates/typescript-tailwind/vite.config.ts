import { defineConfig } from 'vite';
import { hana } from '@hanabira/router';

import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [
    tsconfigPaths(),
    react(),
    tailwindcss(),
    hana({
      root: __dirname,
      typescript: true,
    }),
  ],
});
