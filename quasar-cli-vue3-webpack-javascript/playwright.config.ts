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
  webServer: [
    {
      command: 'pnpm --dir app-exposes exec -- env BROWSER=none quasar dev',
      url: 'http://localhost:3001',
      timeout: 300_000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --dir app-general exec -- env BROWSER=none quasar dev',
      url: 'http://localhost:3002',
      timeout: 300_000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
