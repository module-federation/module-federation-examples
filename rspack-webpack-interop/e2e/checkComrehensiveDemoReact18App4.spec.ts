import { test, expect } from '@playwright/test';

test.describe('Comprehensive Demo App4', () => {
  test('shows svelte greeting', async ({ page }) => {
    await page.goto('http://localhost:3004');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await expect(page.locator('h1')).toHaveText('Hello From Svelte world!');
  });
});
