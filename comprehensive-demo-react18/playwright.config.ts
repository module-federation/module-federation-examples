import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 180000,
  expect: {
    timeout: 60000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: [
    {
      command: 'pnpm --filter comprehensive-demo-react18_app-01 serve',
      url: 'http://localhost:3001/',
      reuseExistingServer: !process.env.CI,
      timeout: 180000,
    },
    {
      command: 'pnpm --filter comprehensive-demo-react18_app-02 serve',
      url: 'http://localhost:3002/remoteEntry.js',
      reuseExistingServer: !process.env.CI,
      timeout: 180000,
    },
    {
      command: 'pnpm --filter comprehensive-demo-react18_app-03 serve',
      url: 'http://localhost:3003/remoteEntry.js',
      reuseExistingServer: !process.env.CI,
      timeout: 180000,
    },
    {
      command: 'pnpm --filter comprehensive-demo-react18_app-04 serve',
      url: 'http://localhost:3004/remoteEntry.js',
      reuseExistingServer: !process.env.CI,
      timeout: 180000,
    },
    {
      command: 'pnpm --filter comprehensive-demo-react18_app-05 serve',
      url: 'http://localhost:3005/remoteEntry.js',
      reuseExistingServer: !process.env.CI,
      timeout: 180000,
    },
  ],
});
