import { defineConfig } from 'vite';
import { hana } from '@hanabira/router';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    tailwindcss(),
    hana({
      root: __dirname,
      typescript: false,
    }),
  ],
});
