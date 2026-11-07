import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  retries: 0,
  workers: 1,
  forbidOnly: !!process.env.CI,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3062',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'pnpm --filter modernjs-ssr-data-loader_remote serve',
      url: 'http://127.0.0.1:3061/static/mf-manifest.json',
      timeout: 60_000,
      reuseExistingServer: false,
    },
    {
      command: 'pnpm --filter modernjs-ssr-data-loader_host serve',
      url: 'http://127.0.0.1:3062/entry-one',
      timeout: 60_000,
      reuseExistingServer: false,
    },
  ],
});
