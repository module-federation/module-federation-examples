import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 180_000,
  expect: {
    timeout: 10_000,
  },
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3001',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm run start',
    // Avoid IPv6 `localhost` resolution issues in CI where Quasar dev binds to IPv4.
    url: 'http://127.0.0.1:3001',
    timeout: 300_000,
    reuseExistingServer: !process.env.CI,
  },
});
