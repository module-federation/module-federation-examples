import { test, expect } from '@playwright/test';

const hostUrl = 'http://localhost:3001';
const remoteUrl = 'http://localhost:3002';
const controlPanelHeading = 'Share Control Panel';

test.describe('Control Sharing', () => {
  test.describe('Host Application', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(hostUrl);
    });

    test('displays correct header and subheader', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toContainText(controlPanelHeading);
      await expect(page.getByRole('heading', { level: 2, name: 'App 1' })).toBeVisible();
    });

    test('shows host version information', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 4, name: 'Host Used React: 17.0.2' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 4, name: 'Host Used ReactDOM: 17.0.2' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 4, name: 'Host Used Lodash: 4.17.21' })).toBeVisible();
    });

    test('renders app cards with package information', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 3, name: 'app1' })).toBeVisible();

      for (const pkg of ['lodash', 'react-dom', 'react']) {
        await expect(page.locator('h4', { hasText: pkg })).toBeVisible();
      }

      await expect(page.locator('p', { hasText: '4.17.21' })).toBeVisible();
      await expect(page.locator('p', { hasText: '17.0.2' })).toBeVisible();
    });

    test('exposes control buttons', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Clear Settings' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Save and Reload' })).toBeVisible();
    });

    test('lists version override options', async ({ page }) => {
      await expect(page.getByText('Override Version')).toBeVisible();

      for (const option of ['4.17.21', '3.10.1', '17.0.2', '16.14.0']) {
        await expect(page.locator('option', { hasText: option })).toBeVisible();
      }
    });

    test('applies version overrides from localStorage', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'App 2 Button - lodash 3.10.1' })).toBeVisible();

      await page.evaluate(() => {
        localStorage.setItem('formDataVMSC', JSON.stringify({ app2: { lodash: '4.17.21' } }));
      });

      await page.reload();

      await expect(page.getByRole('button', { name: 'App 2 Button - lodash 4.17.21' })).toBeVisible();

      await page.evaluate(() => {
        localStorage.removeItem('formDataVMSC');
      });
    });
  });

  test.describe('Remote Application', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(remoteUrl);
    });

    test('displays correct header and subheader', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toContainText(controlPanelHeading);
      await expect(page.getByRole('heading', { level: 2, name: 'App 2' })).toBeVisible();
    });

    test('shows the remote button text', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'App 2 Button' })).toBeVisible();
    });
  });
});
