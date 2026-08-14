import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['node_modules/**', '.next/**', 'e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: [
        // Next.js and build infrastructure
        'next.config.mjs',
        'next-env.d.ts',
        'postcss.config.mjs',
        'tailwind.config.ts',
        'playwright.config.ts',
        'vitest.config.ts',
        'vitest.setup.ts',
        // Next.js route shells and root layout — covered by E2E
        'app/layout.tsx',
        'app/page.tsx',
        'app/stay/**',
        // Type definitions only
        'lib/types/**',
        // Static demo data
        'lib/config/demo-property.ts',
        // Default excludes
        'node_modules/**',
        '.next/**',
        'e2e/**',
        '__tests__/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
});
