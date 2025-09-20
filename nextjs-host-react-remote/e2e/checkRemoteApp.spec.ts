import { expect, test } from '@playwright/test';

test.describe('NextJS React - remote app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/');
  });

  test('renders remote button', async ({ page }) => {
    const remoteButton = page.getByRole('button', { name: 'Remote Button' });
    await expect(remoteButton).toBeVisible();
  });

  test('applies remote button color', async ({ page }) => {
    const remoteButton = page.getByRole('button', { name: 'Remote Button' });
    await expect(remoteButton).toHaveCSS('background-color', 'rgb(75, 75, 232)');
  });
});
