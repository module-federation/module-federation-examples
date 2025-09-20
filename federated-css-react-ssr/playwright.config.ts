import { defineConfig, devices } from '@playwright/test';

const reuseExisting = !process.env.CI;

export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'pnpm --filter "federated-css-react-ssr_expose-*" --parallel start',
      cwd: __dirname,
      port: 3001,
      reuseExistingServer: reuseExisting,
      timeout: 300_000,
    },
    {
      command: 'pnpm --filter "federated-css-react-ssr_shell*" --parallel start:prod',
      cwd: __dirname,
      port: 4000,
      reuseExistingServer: reuseExisting,
      timeout: 300_000,
    },
  ],
});
