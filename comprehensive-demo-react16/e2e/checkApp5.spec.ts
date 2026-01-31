import { test, expect } from '@playwright/test';

const base = 'http://localhost:3005';

test.describe('Comprehensive Demo App5', () => {
  test('shows button and alert', async ({ page }) => {
    await page.goto(base);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const button = page.locator('action-button').locator('button');
    await expect(button).toHaveText('bar');
    await expect(page.locator('.alert')).toHaveText(/Hello/);
    await expect(page.locator('.closebtn')).toBeVisible();
  });

  test('button triggers alert and close hides it', async ({ page }) => {
    await page.goto(base);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('You have pressed a button.');
      await dialog.accept();
    });
    await page.locator('action-button').locator('button').click();
    await page.locator('.closebtn').click();
    await expect(page.locator('.alert')).toBeHidden();
  });
});
