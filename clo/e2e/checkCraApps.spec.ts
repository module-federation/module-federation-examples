import { test, expect } from '@playwright/test';

const apps = [
  { port: 3000, name: 'Host' },
  { port: 3002, name: 'Remote' },
];

apps.forEach(({ port, name }) => {
  test.describe(`Check ${name}`, () => {
    test(`Check ${name} elements exist on the page`, async ({ page }) => {
      await page.goto(`http://localhost:${port}`);
      // MF + async startup can delay when remote content appears; wait for the app shell first.
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Basic Host-Remote');
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();

      // Host should render the remote Button; Remote renders its local Button.
      if (name === 'Host') {
        await expect(page.getByRole('button', { name: /Hello from remote/i })).toBeVisible();
      } else {
        // Remote Button includes an extra suffix in the sample.
        await expect(page.getByRole('button')).toContainText('Hello from remote');
      }
    });
  });
});
