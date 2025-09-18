import { test, expect } from '@playwright/test';

const apps = [
  { name: 'Host', port: 3000 },
  { name: 'Remote', port: 3002 },
];

for (const { name, port } of apps) {
  test.describe(`CRA ${name}`, () => {
    test(`should render the ${name} application`, async ({ page }) => {
      await page.goto(`http://localhost:${port}`);

      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Basic Host-Remote');
      await expect(page.getByRole('heading', { level: 2 })).toHaveText(name);
      await expect(page.getByRole('button')).toContainText('Hello from remote');
    });
  });
}

