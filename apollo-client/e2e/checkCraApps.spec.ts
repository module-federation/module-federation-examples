import { test, expect } from '@playwright/test';

test.describe('Apollo Client', () => {
  test('should render host and remote components', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toHaveText(
      'Module Federation Example: React 18 + Apollo Client',
    );
    await expect(
      page.getByRole('heading', { level: 2, name: 'This is the App 2 application.' }),
    ).toBeVisible();
  });
});
