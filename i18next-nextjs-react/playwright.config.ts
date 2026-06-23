import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 180_000,
  expect: {
    timeout: 30_000,
  },
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'pnpm --filter i18next-nextjs-react_next-host dev',
      url: 'http://localhost:3000',
      timeout: 360_000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --filter i18next-nextjs-react_react-host start:live',
      url: 'http://localhost:3001',
      timeout: 360_000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --filter i18next-nextjs-react_react-remote start:live',
      url: 'http://localhost:3002',
      timeout: 360_000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
