import { expect, test } from '@playwright/test';

test.describe('NextJS React smoke tests', () => {
  test('host page loads remote content', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Next JS and React' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next JS Button' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Remote Button' })).toBeVisible();
  });

  test('remote standalone entry is available', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await expect(page.getByRole('button', { name: 'Remote Button' })).toBeVisible();
  });
});
