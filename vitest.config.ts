import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
const r = (p: string) => resolve(__dirname, p);

const alias = {
  '@mocks': r('mocks'),
  '@eliduty/type': r('packages/type/src'),
  '@eliduty/request': r('packages/request/src')
};

export default defineConfig({
  resolve: {
    alias
  },
  test: {
    setupFiles: ['./mocks/setup.ts'],
    environment: 'jsdom'
  }
});
