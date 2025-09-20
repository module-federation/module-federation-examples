import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: 'http://localhost:8081',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'pnpm --filter app-exposes serve',
      cwd: __dirname,
      port: 8082,
      reuseExistingServer: !process.env.CI,
      timeout: 240_000,
    },
    {
      command: 'pnpm --filter app-general serve',
      cwd: __dirname,
      port: 8081,
      reuseExistingServer: !process.env.CI,
      timeout: 240_000,
    },
  ],
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
