import { join } from 'path';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    mode,
    plugins: [react(), visualizer()],
    build: {
      outDir: 'dist',
    },
    resolve: {
      alias: {
        '@': join(__dirname, './src'),
      },
    },
  };
});
