import { expect, test } from '@playwright/test';

test.describe('NextJS React - host app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders host and remote buttons', async ({ page }) => {
    const hostButton = page.getByRole('button', { name: 'Next JS Button' });
    await expect(hostButton).toBeVisible();

    const remoteButton = page.getByRole('button', { name: 'Remote Button' });
    await expect(remoteButton).toBeVisible();
  });

  test('applies expected button colors', async ({ page }) => {
    const hostButton = page.getByRole('button', { name: 'Next JS Button' });
    await expect(hostButton).toHaveCSS('background-color', 'rgb(255, 198, 0)');

    const remoteButton = page.getByRole('button', { name: 'Remote Button' });
    await expect(remoteButton).toHaveCSS('background-color', 'rgb(75, 75, 232)');
  });
});
