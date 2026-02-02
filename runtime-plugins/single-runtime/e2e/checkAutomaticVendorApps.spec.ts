import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

const app1Url = 'http://localhost:3001';
const app2Url = 'http://localhost:3002';

const hexToRgb = (hex: string): string => {
  const cleanHex = hex.replace('#', '');
  const numericValue = parseInt(cleanHex, 16);
  const r = (numericValue >> 16) & 255;
  const g = (numericValue >> 8) & 255;
  const b = numericValue & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

const preparePage = async (page: Page, url: string) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
  });
  await page.goto(url);
};

const expectRemoteEntry = async (
  page: Page,
  moduleName: string,
  remoteAlias: string,
  expectedEntry: string,
) => {
  const moduleContainer = page.getByText(`Module: ${moduleName}`).locator('..');
  await expect(moduleContainer).toBeVisible();

  const remoteRow = moduleContainer.locator('div', { hasText: `${remoteAlias}:` });
  await expect(remoteRow).toBeVisible();
  await expect(remoteRow.locator('code')).toHaveText(expectedEntry);
};

test.describe('Single Runtime Plugin Example', () => {
  test.describe('App 1 (port 3001)', () => {
    test.beforeEach(async ({ page }) => {
      await preparePage(page, app1Url);
    });

    test('should have correct title', async ({ page }) => {
      await expect(
        page.getByRole('heading', { level: 1, name: 'App 1 - Single Runtime Demo' }),
      ).toBeVisible();
    });

    test('should have explanation section', async ({ page }) => {
      await expect(
        page.getByRole('heading', { level: 3, name: "What's Happening Here?" }),
      ).toBeVisible();
      await expect(
        page.locator('p', { hasText: 'This is App1 running on port 3001.' }),
      ).toBeVisible();
    });

    test('should have working counter', async ({ page }) => {
      await expect(
        page.getByRole('heading', { level: 3, name: /Shared State Counter: 0/ }),
      ).toBeVisible();
      await page.getByRole('button', { name: 'Increment Counter' }).click();
      await expect(
        page.getByRole('heading', { level: 3, name: /Shared State Counter: 1/ }),
      ).toBeVisible();
    });

    test('should have local and remote buttons with correct styling', async ({ page }) => {
      const localButton = page.getByRole('button', { name: /App 1 Button/ });
      const remoteButton = page.getByRole('button', { name: /App 2 Button/ });

      await expect(localButton).toBeVisible();
      await expect(localButton).toHaveCSS('background-color', hexToRgb('#4a90e2'));

      await expect(remoteButton).toBeVisible();
      await expect(remoteButton).toHaveCSS('background-color', hexToRgb('#e24a90'));
    });

    test('should have working click counters on buttons', async ({ page }) => {
      const localButton = page.getByRole('button', { name: /App 1 Button/ });
      const remoteButton = page.getByRole('button', { name: /App 2 Button/ });

      await localButton.click();
      await expect(localButton).toContainText('Clicks: 1');

      await remoteButton.click();
      await expect(remoteButton).toContainText('Clicks: 1');
    });

    test('should show correct runtime information', async ({ page }) => {
      await expect(
        page.getByRole('heading', { level: 3, name: 'Runtime Information:' }),
      ).toBeVisible();

      await expect(page.getByText('Module: app1')).toBeVisible();
      await expect(page.getByText('Module: app2')).toBeVisible();

      await expectRemoteEntry(page, 'app1', 'app2', 'http://localhost:3002/remoteEntry.js');
      await expectRemoteEntry(page, 'app2', 'app1', 'http://localhost:3001/app1_partial.js');
    });

    test('should have working navigation between apps', async ({ page }) => {
      const navigationLink = page.getByRole('link', { name: /Go to App 2/ });
      await expect(navigationLink).toHaveAttribute('href', 'http://localhost:3002');
    });
  });

  test.describe('App 2 (port 3002)', () => {
    test.beforeEach(async ({ page }) => {
      await preparePage(page, app2Url);
    });

    test('should have correct title', async ({ page }) => {
      await expect(
        page.getByRole('heading', { level: 1, name: 'App 2 - Single Runtime Demo' }),
      ).toBeVisible();
    });

    test('should have explanation section', async ({ page }) => {
      await expect(
        page.getByRole('heading', { level: 3, name: "What's Happening Here?" }),
      ).toBeVisible();
      await expect(
        page.locator('p', { hasText: 'This is App2 running on port 3002.' }),
      ).toBeVisible();
    });

    test('should have working counter', async ({ page }) => {
      await expect(
        page.getByRole('heading', { level: 3, name: /Shared State Counter: 0/ }),
      ).toBeVisible();
      await page.getByRole('button', { name: 'Increment Counter' }).click();
      await expect(
        page.getByRole('heading', { level: 3, name: /Shared State Counter: 1/ }),
      ).toBeVisible();
    });

    test('should have local and remote buttons with correct styling', async ({ page }) => {
      const localButton = page.getByRole('button', { name: /App 2 Button/ });
      const remoteButton = page.getByRole('button', { name: /App 1 Button/ });

      await expect(localButton).toBeVisible();
      await expect(localButton).toHaveCSS('background-color', hexToRgb('#e24a90'));

      await expect(remoteButton).toBeVisible();
      await expect(remoteButton).toHaveCSS('background-color', hexToRgb('#4a90e2'));
    });

    test('should have working click counters on buttons', async ({ page }) => {
      const localButton = page.getByRole('button', { name: /App 2 Button/ });
      const remoteButton = page.getByRole('button', { name: /App 1 Button/ });

      await localButton.click();
      await expect(localButton).toContainText('Clicks: 1');

      await remoteButton.click();
      await expect(remoteButton).toContainText('Clicks: 1');
    });

    test('should show correct runtime information', async ({ page }) => {
      await expect(
        page.getByRole('heading', { level: 3, name: 'Runtime Information:' }),
      ).toBeVisible();

      await expect(page.getByText('Module: app1')).toBeVisible();
      await expect(page.getByText('Module: app2')).toBeVisible();

      await expectRemoteEntry(page, 'app2', 'app1', 'http://localhost:3001/remoteEntry.js');
      await expectRemoteEntry(page, 'app1', 'app2', 'http://localhost:3002/remoteEntry.js');
    });

    test('should have working navigation between apps', async ({ page }) => {
      const navigationLink = page.getByRole('link', { name: /Go to App 1/ });
      await expect(navigationLink).toHaveAttribute('href', 'http://localhost:3001');
    });
  });
});
