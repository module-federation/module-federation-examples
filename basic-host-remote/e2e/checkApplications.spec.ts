import { test, expect } from '@playwright/test';

const apps = [
  { port: 3001, name: 'App 1' },
  { port: 3002, name: 'App 2' },
];

apps.forEach(({ port, name }) => {
  test.describe(`Check ${name}`, () => {
    test(`Check ${name} built and running`, async ({ page }) => {
      await page.goto(`http://localhost:${port}`);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Basic Host-Remote');
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
    });

    test(`Check buttons in ${name} exist`, async ({ page }) => {
      await page.goto(`http://localhost:${port}`);
      await expect(page.getByRole('button')).toHaveText('App 2 Button!!!!');
    });
  });
});

