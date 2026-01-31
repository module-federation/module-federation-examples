import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 240_000,
  expect: {
    timeout: 30_000,
  },
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm run start',
    url: 'http://localhost:3001',
    timeout: 300_000,
    reuseExistingServer: !process.env.CI,
  },
});
