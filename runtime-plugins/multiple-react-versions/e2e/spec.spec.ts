import { test, expect } from '@playwright/test';

const runtimeWrapperText = 'In RUNTIME PLUGIN WRAPPER';
const hooksComponentText =
  'This Component uses hooks, if loaded on localhost:3001, it should work, even though that host does not support React Hooks';
const versionInfoText = 'Host React: 16.6.3 Remote React: 17.0.2';
const app2ContentText = 'More react components from App2 using non-legacy React to render';

test.describe('multiple-react-versions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the host headings', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Basic Host-Remote');
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'App 1, Uses react version not compatible with hooks',
      }),
    ).toBeVisible();
  });

  test('shows the runtime plugin wrapper content', async ({ page }) => {
    await expect(page.getByText(runtimeWrapperText)).toBeVisible();
    await expect(page.locator('strong', { hasText: hooksComponentText })).toBeVisible();
  });

  test('loads the remote button and hides the placeholder', async ({ page }) => {
    await expect(page.locator('text=Loading Button')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'App 2 Button' })).toBeVisible();
  });

  test('renders the host input placeholder', async ({ page }) => {
    await expect(page.getByPlaceholder('Type something into this input')).toBeVisible();
  });

  test('shows version information for host and remote React', async ({ page }) => {
    await expect(page.getByText(versionInfoText)).toBeVisible();
  });

  test('renders additional App 2 content', async ({ page }) => {
    await expect(page.locator('div', { hasText: runtimeWrapperText })).toBeVisible();
    await expect(page.locator('p', { hasText: app2ContentText })).toBeVisible();
  });
});
