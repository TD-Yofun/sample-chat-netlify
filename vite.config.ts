import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    mode,
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
  };
});
