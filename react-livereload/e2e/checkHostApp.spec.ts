import { expect, test } from '@playwright/test';
import { BasePage } from '../../playwright-e2e/common/basePage';
import { baseSelectors } from '../../playwright-e2e/common/selectors';
import { Constants } from '../../playwright-e2e/fixtures/constants';

const HOST_PORT = 3000;

const navigationTargets = [
  {
    name: Constants.commonConstantsData.home,
    path: Constants.commonConstantsData.commonLinks.baseLink,
    expectedContent: undefined,
  },
  {
    name: Constants.commonConstantsData.button,
    path: Constants.hrefs.reactHmrApp.button,
    expectedContent: Constants.elementsText.reactHmrApp.host.button,
  },
  {
    name: Constants.hrefs.reactHmrApp.heading.name,
    path: Constants.hrefs.reactHmrApp.heading.link,
    expectedContent: Constants.elementsText.reactHmrApp.host.heading,
  },
];

test.describe('React HMR - Host App', () => {
  test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.openLocalhost({ port: HOST_PORT });
  });

  test('renders the home page structure', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 1, name: Constants.elementsText.reactHmrApp.host.headerText1 }),
    ).toBeVisible();

    const heading = page.getByRole('heading', { level: 1, name: Constants.elementsText.reactHmrApp.host.headerText1 });
    const banner = page.locator('div').filter({ has: heading }).locator('div[style]').first();

    await expect(banner).toContainText(Constants.elementsText.reactHmrApp.host.headerText2);
    await expect(banner).toHaveCSS('background-color', 'rgb(173, 255, 47)');

    for (const { name, path } of navigationTargets) {
      const link = page.getByRole('link', { name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', path);
    }
  });

  for (const { name, path, expectedContent } of navigationTargets) {
    test(`navigates to ${name} section`, async ({ page }) => {
      await page.getByRole('link', { name }).click();

      await expect(page).toHaveURL(`http://localhost:${HOST_PORT}${path}`);

      await expect(
        page.getByRole('heading', { level: 1, name: Constants.elementsText.reactHmrApp.host.headerText1 }),
      ).toBeVisible();
      await expect(page.getByText(Constants.elementsText.reactHmrApp.host.headerText2)).toBeVisible();

      for (const target of navigationTargets) {
        await expect(page.getByRole('link', { name: target.name })).toBeVisible();
      }

      if (expectedContent) {
        await expect(page.locator(baseSelectors.ids.root)).toContainText(expectedContent);
      }
    });
  }
});

