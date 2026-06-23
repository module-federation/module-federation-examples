import { test, expect } from '@playwright/test';

const hostApp = {
  url: 'http://localhost:3001',
  header: 'API controlled remote configs',
  subheader: 'Remotes currently in use',
  buttonLabel: 'App 1 Button',
  buttonColor: 'rgb(136, 0, 0)',
};

const remoteApp = {
  url: 'http://localhost:3002',
  header: 'API controlled remote configs',
  subheader: 'App 2',
  buttonLabel: 'App 2 Button - CLICK ME',
  buttonColor: 'rgb(0, 0, 204)',
};

test.describe('Backend Controlled Configs', () => {
  test.describe('Host application', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(hostApp.url);
    });

    test('renders correct headings', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(hostApp.header);
      await expect(page.getByRole('heading', { level: 2, name: hostApp.subheader })).toBeVisible();
    });

    test('shows the local button with expected styling', async ({ page }) => {
      const button = page.getByRole('button', { name: hostApp.buttonLabel });
      await expect(button).toBeVisible();
      await expect(button).toHaveCSS('background-color', hostApp.buttonColor);
    });

    test('loads the remote button through the runtime plugin', async ({ page }) => {
      await expect(page.getByRole('button', { name: /App [23] Button - CLICK ME/ })).toBeVisible();
    });
  });

  test.describe('Remote application', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(remoteApp.url);
    });

    test('renders correct headings', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(remoteApp.header);
      await expect(
        page.getByRole('heading', { level: 2, name: remoteApp.subheader }),
      ).toBeVisible();
    });

    test('shows the local button with expected styling', async ({ page }) => {
      const button = page.getByRole('button', { name: remoteApp.buttonLabel });
      await expect(button).toBeVisible();
      await expect(button).toHaveCSS('background-color', remoteApp.buttonColor);
    });

    test('renders the federated button from the host', async ({ page }) => {
      await expect(page.getByRole('button', { name: hostApp.buttonLabel })).toBeVisible();
    });
  });
});
