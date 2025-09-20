import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './e2e',
  timeout: 60 * 1000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  retries: isCI ? 2 : 0,
  reporter: isCI ? 'dot' : 'list',
  use: {
    trace: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'pnpm run --filter react-18-code-splitting_app1 start',
      port: 3000,
      reuseExistingServer: !isCI,
      timeout: 120 * 1000,
    },
    {
      command: 'pnpm run --filter react-18-code-splitting_app2 start',
      port: 3001,
      reuseExistingServer: !isCI,
      timeout: 120 * 1000,
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
