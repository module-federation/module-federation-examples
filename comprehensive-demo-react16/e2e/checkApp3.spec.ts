import { test, expect } from '@playwright/test';

const base = 'http://localhost:3003';

test.describe('Comprehensive Demo App3', () => {
  test('shows styled button', async ({ page }) => {
    await page.goto(base);
    await expect(page.locator('.jss1')).toBeVisible();
    const appBar = page.locator('header').first();
    await expect(appBar).toHaveCSS('background-color', 'rgb(63, 81, 181)');
    await expect(page.locator('.jss2')).toHaveCSS('background-color', 'rgb(250, 250, 250)');
    await expect(page.getByRole('heading', { name: 'Styled Components App' })).toBeVisible();
    const button = page.getByRole('button', { name: '💅 Test Button' });
    await expect(button).toBeVisible();
    await expect(button).toHaveCSS('background-color', 'rgb(219, 112, 147)');
  });
});
