import { defineConfig } from '@playwright/test';

const useLegacyStart = !!process.env.LEGACY_START;

export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
  expect: {
    timeout: 10_000,
  },
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
  },
  webServer: {
    command: useLegacyStart ? 'pnpm run legacy:start' : 'pnpm run start',
    url: 'http://localhost:3001',
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
