/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr({
    include: '**/*.svg'
  }), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    exclude: [
      ...configDefaults.exclude,
      './src/types/**',
    ],
    coverage: {
      provider: 'v8',
      exclude: [
        ...configDefaults.coverage.exclude,
        './src/types/**',
      ]
    },
  },
})