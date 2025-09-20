import { test, expect } from '@playwright/test';
import { Constants } from '../../cypress-e2e/fixtures/constants';
import { baseSelectors, selectors } from '../../cypress-e2e/common/selectors';

const appsData = [
  {
    appName: Constants.elementsText.react18CodeSplittingApp.app1.appName,
    appHeader2: Constants.elementsText.reactApps.app1.subHeader,
    host: 3000,
  },
  {
    appName: Constants.elementsText.react18CodeSplittingApp.app2.appName,
    appHeader2: Constants.elementsText.reactApps.app2.subHeader,
    host: 3001,
  },
];

for (const { appName, appHeader2, host } of appsData) {
  test.describe(`React 18 Code Splitting - ${appName}`, () => {
    test(`renders static content for ${appName}`, async ({ page }) => {
      await page.goto(`http://localhost:${host}/`);

      await expect(page.locator(baseSelectors.tags.headers.h1)).toHaveText(
        Constants.elementsText.react18CodeSplittingApp.header,
      );
      await expect(page.locator(baseSelectors.tags.headers.h2)).toHaveText(appHeader2);
      await expect(page.locator(baseSelectors.tags.headers.h3)).toHaveText(
        Constants.elementsText.reactApps.header3,
      );
      await expect(page.locator(baseSelectors.tags.inputs.input)).toBeVisible();
      await expect(
        page.getByRole('button', { name: Constants.elementsText.react18CodeSplittingApp.button }),
      ).toBeVisible();
    });

    test(`loads remote content for ${appName}`, async ({ page }) => {
      await page.goto(`http://localhost:${host}/`);

      const input = page.locator(baseSelectors.tags.inputs.input).first();
      await input.fill(Constants.commonConstantsData.standardPhrase);
      await page.getByRole('button', { name: Constants.elementsText.react18CodeSplittingApp.button }).click();

      const contentBlock = page.locator(selectors.reactApp.app2ContentBlock);
      await expect(contentBlock.locator(baseSelectors.tags.headers.h2)).toHaveText(
        Constants.elementsText.reactApps.splitedApp.header,
      );
      await expect(contentBlock.locator(baseSelectors.tags.paragraph)).toHaveText(
        Constants.elementsText.reactApps.splitedApp.subHeader,
      );
      await expect(page.locator(baseSelectors.tags.strong)).toHaveText(
        Constants.commonConstantsData.standardPhrase,
      );
    });
  });
}
