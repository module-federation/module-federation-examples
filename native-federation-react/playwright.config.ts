import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  timeout: 180_000,
  expect: {
    timeout: 10_000,
  },
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm run build && pnpm run start',
    url: 'http://localhost:3000',
    timeout: 240_000,
    reuseExistingServer: !process.env.CI,
  },
});
