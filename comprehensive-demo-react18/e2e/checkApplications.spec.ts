import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const app05RemoteEntry = 'http://localhost:3005/remoteEntry.js';

const apps = [
  { port: 3001, name: 'App 1', selector: 'h6', text: 'Module Federation Demo', remotes: [app05RemoteEntry] },
  { port: 3002, name: 'App 2', selector: 'h6', text: 'Material UI App' },
  { port: 3003, name: 'App 3', selector: 'h6', text: 'Styled Components App' },
  { port: 3004, name: 'App 4', selector: 'h1', text: 'Hello From Svelte world!' },
  { port: 3005, name: 'App 5', selector: 'action-button button', text: 'bar' },
];

const waitForRemoteEntries = async (page: Page, urls: string[]) => {
  await Promise.all(
    urls.map(url =>
      expect
        .poll(
          async () => {
            try {
              const response = await page.request.get(url);
              return response.ok();
            } catch {
              return false;
            }
          },
          { timeout: 60000 },
        )
        .toBeTruthy(),
    ),
  );
};

apps.forEach(({ port, name, selector, text, remotes = [] }) => {
  test.describe(name, () => {
    test(`build and run ${name}`, async ({ page }) => {
      if (remotes.length) {
        await waitForRemoteEntries(page, remotes);
      }
      await page.goto(`http://localhost:${port}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      await expect(page.locator(selector, { hasText: text })).toBeVisible();
    });
  });
});
