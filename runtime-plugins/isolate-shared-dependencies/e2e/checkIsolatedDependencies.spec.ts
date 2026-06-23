import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

const appUrl = '/';

const getAppSection = (page: Page, appNumber: number): Locator =>
  page.getByText(`App ${appNumber} loaded`).first().locator('..');

const getAppLoadedText = (page: Page, appNumber: number): Locator =>
  page.getByText(`App ${appNumber} loaded`);

const getFirstAppLoadedText = (page: Page, appNumber: number): Locator =>
  getAppLoadedText(page, appNumber).first();

const getInstanceLabel = (section: Locator, label: string): Locator =>
  section.locator(':scope > span').filter({ hasText: new RegExp(`${label}: \\d+`) });

const expectInstanceLabels = async (section: Locator) => {
  await expect(getInstanceLabel(section, 'Lib 1 instance ID')).toBeVisible();
  await expect(getInstanceLabel(section, 'Lib 2 instance ID through lib 1')).toBeVisible();
  await expect(getInstanceLabel(section, 'Lib 2 instance ID')).toBeVisible();
};

const extractInstanceId = async (section: Locator, label: string): Promise<string> => {
  const text = await getInstanceLabel(section, label).innerText();
  const match = text.match(/\d+/);
  expect(match, `Expected to find numeric instance ID for ${label}`).not.toBeNull();
  return match![0];
};

test.describe('Isolated Shared Dependencies', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(appUrl);

    await Promise.all([
      expect(getFirstAppLoadedText(page, 1)).toBeVisible({ timeout: 10_000 }),
      expect(getFirstAppLoadedText(page, 2)).toBeVisible({ timeout: 10_000 }),
      expect(getFirstAppLoadedText(page, 3)).toBeVisible({ timeout: 10_000 }),
    ]);
  });

  test('should load all three apps', async ({ page }) => {
    await expect(getFirstAppLoadedText(page, 1)).toBeVisible();
    await expect(getFirstAppLoadedText(page, 2)).toBeVisible();
    await expect(getFirstAppLoadedText(page, 3)).toBeVisible();
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
