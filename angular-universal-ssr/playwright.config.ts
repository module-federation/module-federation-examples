import { defineConfig } from '@playwright/test';

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
    baseURL: 'http://localhost:4000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm run build && pnpm run serve',
    url: 'http://localhost:4000',
    timeout: 300_000,
    reuseExistingServer: !process.env.CI,
  },
});
