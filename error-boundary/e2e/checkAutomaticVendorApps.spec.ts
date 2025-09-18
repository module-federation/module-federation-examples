import { test, expect } from '@playwright/test';

test.describe('Offline Remote', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays the offline remote header', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3001/');
    await expect(page.getByRole('heading', { level: 1, name: 'Offline Remote' })).toBeVisible();
  });

  test('renders the App 1 button with a red background', async ({ page }) => {
    const app1Button = page.getByRole('button', { name: 'App 1 Button' });

    await expect(app1Button).toBeVisible();
    await expect(app1Button).toHaveCSS('background-color', 'rgb(136, 0, 0)');
  });
});
