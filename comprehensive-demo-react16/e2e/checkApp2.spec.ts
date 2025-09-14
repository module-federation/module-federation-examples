import { test, expect } from '@playwright/test';

const base = 'http://localhost:3002';

test.describe('Comprehensive Demo App2', () => {
  test('renders blocks, dialog and tabs', async ({ page }) => {
    await page.goto(base);
    await expect(page.locator('header')).toHaveCSS('background-color', 'rgb(63, 81, 181)');
    await expect(page.locator('.jss2')).toHaveCSS('background-color', 'rgb(250, 250, 250)');
    await expect(page.locator('.jss3')).toHaveCSS('background-color', 'rgb(255, 255, 255)');

    await expect(page.getByRole('heading', { name: 'Material UI App' })).toBeVisible();
    await expect(page.getByText('Dialog Component')).toBeVisible();
    await page.getByRole('button', { name: 'Open Dialog' }).click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog.getByRole('heading', { name: 'Dialog Example' })).toBeVisible();
    await expect(
      dialog.getByText('This is a dialog from the Material UI app rendered in a React Portal.'),
    ).toBeVisible();
    await dialog.getByRole('button', { name: 'Nice' }).click();
    await expect(dialog).not.toBeVisible();

    await expect(page.getByText('Tabs Component')).toBeVisible();
    await expect(page.getByText('Foo Content')).toBeVisible();
    await page.getByRole('tab', { name: 'Bar' }).click();
    await expect(page.getByText('Bar Content')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bar Button' })).toHaveCSS(
      'background-color',
      'rgb(219, 112, 147)',
    );
  });
});
