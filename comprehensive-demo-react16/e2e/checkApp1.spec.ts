import { test, expect } from '@playwright/test';

const base = 'http://localhost:3001';

test.describe('Comprehensive Demo App1', () => {
  test('main page displays sidebar links and elements', async ({ page }) => {
    await page.goto(base);
    await expect(page.getByRole('heading', { name: 'SideNav' })).toBeVisible();

    const demoLinks = ['Main', 'UI Library', 'Dialog', 'Svelte Page', 'Routing'];
    for (const name of demoLinks) {
      await expect(page.getByRole('link', { name })).toBeVisible();
    }

    const appLinks = [
      { name: 'App #1', href: 'http://localhost:3001' },
      { name: 'App #2', href: 'http://localhost:3002' },
      { name: 'App #3', href: 'http://localhost:3003' },
      { name: 'App #4', href: 'http://localhost:3004' },
      { name: 'App #5', href: 'http://localhost:3005' },
    ];
    for (const { name, href } of appLinks) {
      await expect(page.getByRole('link', { name })).toHaveAttribute('href', href);
    }

    await expect(page.getByRole('heading', { name: 'Module Federation Demo' })).toBeVisible();
    await expect(page.getByText('Alert from LitElement')).toBeVisible();
    const actionButton = page.getByRole('button', { name: 'Lit Element Action' });
    await expect(actionButton).toBeVisible();
  });

  test('main tab functionality', async ({ page }) => {
    await page.goto(base);
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('You have pressed a button.');
      await dialog.accept();
    });
    await page.getByRole('button', { name: 'Lit Element Action' }).click();
    await page.locator('.closebtn').click();
    await expect(page.locator('.alert')).toBeHidden();
  });

  test('UI library page renders remote button', async ({ page }) => {
    await page.goto(`${base}/#/ui-library`);
    await expect(page.getByRole('heading', { name: 'UI Library Demo' })).toBeVisible();
    await expect(
      page.getByText('Simple example showing host app and external component using separate CSS solutions.'),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: /Button/ })).toBeVisible();
  });

  test('dialog page loads and dialog opens', async ({ page }) => {
    await page.goto(`${base}/#/dialog`);
    await expect(page.getByRole('heading', { name: 'Dialog Demo' })).toBeVisible();
    await expect(
      page.getByText(
        'Clicking the button below will render a Dialog using React Portal. This dialog component is being lazy loaded from the app #2.',
      ),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Open Dialog' }).click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog.getByRole('heading', { name: 'Dialog Example' })).toBeVisible();
    await expect(
      dialog.getByText('This is a dialog from the Material UI app rendered in a React Portal.'),
    ).toBeVisible();
    await dialog.getByRole('button', { name: 'Nice' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('svelte page updates greeting', async ({ page }) => {
    await page.goto(`${base}/#/svelte`);
    await expect(page.getByRole('heading', { name: 'Svelte Demo' })).toBeVisible();
    const input = page.locator('input');
    await input.fill('test');
    await expect(page.locator('h1')).toHaveText('Hello From Svelte test!');
  });

  test('routing page renders tabs', async ({ page }) => {
    await page.goto(`${base}/#/routing/foo`);
    await expect(page.getByRole('heading', { name: 'Routing Demo' })).toBeVisible();
    await expect(page.getByText('Foo Content')).toBeVisible();
    await page.getByRole('tab', { name: 'Bar' }).click();
    await expect(page.getByText('Bar Content')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bar Button' })).toHaveCSS(
      'background-color',
      'rgb(219, 112, 147)',
    );
  });
});
