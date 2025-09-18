import { test, expect } from '@playwright/test';

const hostUrl = 'http://localhost:3001';
const remoteUrl = 'http://localhost:3002';

test.describe('CSS isolation example', () => {
  test.describe('host application', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(hostUrl);
    });

    test('renders host headings', async ({ page }) => {
      await expect(
        page.getByRole('heading', { level: 1, name: /Host Application - React Version/ }),
      ).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'App 1' })).toBeVisible();
    });

    test('mounts the remote inside a shadow DOM', async ({ page }) => {
      const remoteMount = page.locator('#parent');
      await expect(remoteMount).toBeVisible();

      const hasShadowRoot = await remoteMount.evaluate(element => Boolean(element.shadowRoot));
      expect(hasShadowRoot).toBe(true);

      const remoteHeading = remoteMount.getByRole('heading', {
        level: 1,
        name: /Remote Application - React Version/,
      });
      const remoteButton = remoteMount.getByRole('button', { name: 'Make Everything Yellow' });

      await expect(remoteHeading).toBeVisible();
      await expect(remoteButton).toBeVisible();

      await expect(
        page.getByRole('heading', { level: 1, name: /Host Application - React Version/ }),
      ).toHaveCSS('font-style', 'italic');
    });

    test('retains host styles after interacting with the remote', async ({ page }) => {
      const remoteMount = page.locator('#parent');
      const remoteButton = remoteMount.getByRole('button', { name: 'Make Everything Yellow' });

      await remoteButton.click();

      await expect(remoteButton).toBeVisible();
      await expect(remoteMount.getByRole('heading', { level: 2, name: 'App 2' })).toBeVisible();
      await expect(
        page.getByRole('heading', { level: 1, name: /Host Application - React Version/ }),
      ).toHaveCSS('font-style', 'italic');
    });
  });

  test.describe('standalone remote application', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(remoteUrl);
    });

    test('renders remote headings and button', async ({ page }) => {
      await expect(
        page.getByRole('heading', { level: 1, name: /Remote Application - React Version/ }),
      ).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'App 2' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Make Everything Yellow' })).toBeVisible();
    });

    test('applies yellow styles after clicking the button', async ({ page }) => {
      const button = page.getByRole('button', { name: 'Make Everything Yellow' });
      await button.click();

      await expect(page.locator('#root')).toHaveCSS('background-color', 'rgb(255, 255, 0)');
      await expect(button).toHaveCSS('background-color', 'rgb(255, 255, 0)');
    });
  });
});
