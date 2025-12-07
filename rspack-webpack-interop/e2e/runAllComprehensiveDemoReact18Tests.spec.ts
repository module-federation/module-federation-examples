import { test, expect } from '@playwright/test';

// Apps 2 and 3 are designed as remotes that consume from app-01 (they wrap
// their entire content in app_01/Page). They work correctly when loaded as
// remotes from app-01, but cannot function as standalone hosts. Testing them
// via app-01's integration tests is the correct approach.
const apps = [
  { port: 3001, name: 'App 1', selector: 'h6', text: 'Module Federation Demo' },
  { port: 3004, name: 'App 4', selector: 'h1', text: 'Hello From Svelte world!' },
  { port: 3005, name: 'App 5', selector: 'action-button button', text: 'bar' },
];

apps.forEach(({ port, name, selector, text }) => {
  test.describe(name, () => {
    test(`build and run ${name}`, async ({ page }) => {
      await page.goto(`http://localhost:${port}`);
      await expect(page.locator(selector, { hasText: text })).toBeVisible();
    });
  });
});
