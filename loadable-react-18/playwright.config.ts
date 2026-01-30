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
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    // Use workspace-root pnpm to avoid missing node_modules in CI
    command: 'pnpm -w --filter loadable-react-18_* --parallel serve',
    url: 'http://localhost:3000',
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
