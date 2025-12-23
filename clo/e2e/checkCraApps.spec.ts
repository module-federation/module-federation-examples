import { test, expect } from '@playwright/test';

const apps = [
  { port: 3000, name: 'Host' },
  { port: 3002, name: 'Remote' },
];

apps.forEach(({ port, name }) => {
  test.describe(`Check ${name}`, () => {
    test(`Check ${name} elements exist on the page`, async ({ page }) => {
      await page.goto(`http://localhost:${port}`);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Basic Host-Remote');
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
      await expect(page.getByRole('button')).toContainText('Hello from remote');
    });
  });
});
