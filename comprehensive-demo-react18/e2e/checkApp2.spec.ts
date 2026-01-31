import { test, expect } from '@playwright/test';

const base = 'http://localhost:3002';

test.describe('Comprehensive Demo App2', () => {
  test('renders blocks, dialog and tabs', async ({ page }) => {
    await page.goto(base);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await expect(page.locator('header').first()).toHaveCSS('background-color', 'rgb(63, 81, 181)');
    await expect(page.getByRole('heading', { name: 'Material UI App' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dialog Component' })).toBeVisible();

    const openDialogButton = page.getByRole('button', { name: 'Open Dialog' });
    await expect(openDialogButton).toBeVisible();
    await openDialogButton.click();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog.getByRole('heading', { name: 'Dialog Example' })).toBeVisible();
    await expect(
      dialog.getByText('This is a dialog from the Material UI app rendered in a React Portal.'),
    ).toBeVisible();
    await dialog.getByRole('button', { name: 'Nice' }).click();
    await expect(dialog).not.toBeVisible();

    await expect(page.getByRole('heading', { name: 'Tabs Component' })).toBeVisible();
    const fooTab = page.getByRole('tab', { name: 'Foo' });
    const barTab = page.getByRole('tab', { name: 'Bar' });
    await expect(fooTab).toBeVisible();
    await expect(barTab).toBeVisible();
    await expect(page.getByText('Foo Content')).toBeVisible();

    await barTab.click();
    await expect(page.getByText('Bar Content')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bar Button' })).toHaveCSS(
      'background-color',
      'rgb(219, 112, 147)',
    );
  });
});
