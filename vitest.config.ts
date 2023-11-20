/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['**/*.tsx'],
      exclude: ['**/main.tsx'],
    },
  },
});
