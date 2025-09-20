import { test, expect } from '@playwright/test';

const hostUrl = 'http://localhost:3001';

const rgbRed = 'rgb(136, 0, 0)';

test.describe('Offline Remote', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(hostUrl);
  });

  test('renders the host header and description', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Offline Remote' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Remotes currently in use' })).toBeVisible();
    await expect(page.getByText(/Click The second button/i)).toBeVisible();
  });

  test('shows the local button with expected styling', async ({ page }) => {
    const button = page.getByRole('button', { name: 'App 1 Button' });
    await expect(button).toBeVisible();
    await expect(button).toHaveCSS('background-color', rgbRed);
  });

  test('displays an offline warning for the remote module', async ({ page }) => {
    await expect(page.getByText(/remote app2 is offline/i)).toBeVisible();
  });
});
