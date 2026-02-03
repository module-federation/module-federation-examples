import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

const appUrl = '/';

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getAppSection = (page: Page, appNumber: number): Locator =>
  // The label text appears inside a <span> that includes trailing delimiters like " | ".
  // Use a regex anchored at the start to avoid matching ancestor containers.
  page.getByText(new RegExp(`^App ${appNumber} loaded`)).first().locator('..');

const expectInstanceLabels = async (section: Locator) => {
  // Each app mounts nested remotes into a dedicated child container; only check the app's own spans.
  const spans = section.locator(':scope > span');
  await expect(spans.filter({ hasText: /^Lib 1 instance ID: \d+/ })).toBeVisible();
  await expect(spans.filter({ hasText: /^Lib 2 instance ID through lib 1: \d+/ })).toBeVisible();
  await expect(spans.filter({ hasText: /^Lib 2 instance ID: \d+/ })).toBeVisible();
};

const extractInstanceId = async (section: Locator, label: string): Promise<string> => {
  const spans = section.locator(':scope > span');
  const text = await spans
    .filter({ hasText: new RegExp(`^${escapeRegExp(label)}: \\d+`) })
    .first()
    .innerText();
  const match = text.match(/\d+/);
  expect(match, `Expected to find numeric instance ID for ${label}`).not.toBeNull();
  return match![0];
};

test.describe('Isolated Shared Dependencies', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(appUrl);

    await Promise.all([
      expect(page.getByText(/^App 1 loaded/).first()).toBeVisible({ timeout: 10_000 }),
      expect(page.getByText(/^App 2 loaded/).first()).toBeVisible({ timeout: 10_000 }),
      expect(page.getByText(/^App 3 loaded/).first()).toBeVisible({ timeout: 10_000 }),
    ]);
  });

  test('should load all three apps', async ({ page }) => {
    await expect(page.getByText(/^App 1 loaded/).first()).toBeVisible();
    await expect(page.getByText(/^App 2 loaded/).first()).toBeVisible();
    await expect(page.getByText(/^App 3 loaded/).first()).toBeVisible();
  });

  test('should display instance IDs for all apps', async ({ page }) => {
    for (const appNumber of [1, 2, 3]) {
      const section = getAppSection(page, appNumber);
      await expectInstanceLabels(section);
    }
  });

  test('should verify instance sharing behavior across apps', async ({ page }) => {
    const app1Section = getAppSection(page, 1);
    const app2Section = getAppSection(page, 2);
    const app3Section = getAppSection(page, 3);

    const app1Lib1 = await extractInstanceId(app1Section, 'Lib 1 instance ID');
    const app1Lib2 = await extractInstanceId(app1Section, 'Lib 2 instance ID');

    const app2Lib1 = await extractInstanceId(app2Section, 'Lib 1 instance ID');
    expect(app2Lib1).toBe(app1Lib1);
    const app2Lib2 = await extractInstanceId(app2Section, 'Lib 2 instance ID');
    expect(app2Lib2).toBe(app1Lib2);

    const app3Lib1 = await extractInstanceId(app3Section, 'Lib 1 instance ID');
    expect(app3Lib1).toBe(app1Lib1);
    const app3Lib2 = await extractInstanceId(app3Section, 'Lib 2 instance ID');
    expect(app3Lib2).toBe(app1Lib2);
  });

  test('should maintain consistent instance IDs within each app', async ({ page }) => {
    for (const appNumber of [1, 2, 3]) {
      const section = getAppSection(page, appNumber);
      const throughLib1 = await extractInstanceId(section, 'Lib 2 instance ID through lib 1');
      const direct = await extractInstanceId(section, 'Lib 2 instance ID');
      expect(direct).toBe(throughLib1);
    }
  });
});
