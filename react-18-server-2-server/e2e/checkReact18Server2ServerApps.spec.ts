import { test, expect } from '@playwright/test';
import { Constants } from '../../cypress-e2e/fixtures/constants';
import { baseSelectors, selectors } from '../../cypress-e2e/common/selectors';

const APP1_PORT = 3000;
const APP2_PORT = 3001;
const STANDARD_PHRASE = Constants.commonConstantsData.standardPhrase;

const getAppUrl = (port: number) => `http://localhost:${port}/`;

test.describe('React 18 Server 2 Server - App1', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(getAppUrl(APP1_PORT));
  });

  test('renders initial content', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 1, name: Constants.elementsText.reactApps.header }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { level: 2, name: Constants.elementsText.reactApps.app1.subHeader }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { level: 3, name: Constants.elementsText.reactApps.header3 }),
    ).toBeVisible();

    await expect(page.locator(baseSelectors.tags.inputs.input)).toBeVisible();

    await expect(page.locator(selectors.react18Server2Server.idField)).toContainText(
      Constants.elementsText.reactApps.idField,
    );
    await expect(page.locator(selectors.react18Server2Server.NameField)).toContainText(
      Constants.elementsText.reactApps.nameField,
    );
    await expect(page.locator(selectors.react18Server2Server.CompanyField)).toContainText(
      Constants.elementsText.reactApps.companyfield,
    );
  });

  test('renders remote content when typing', async ({ page }) => {
    const input = page.locator(baseSelectors.tags.inputs.input).first();
    await input.fill(STANDARD_PHRASE);

    const contentBlock = page.locator(selectors.reactApp.app2ContentBlock);

    await expect(
      contentBlock.getByRole('heading', {
        level: 2,
        name: Constants.elementsText.reactApps.splitedApp.header,
      }),
    ).toBeVisible();

    await expect(contentBlock.locator(baseSelectors.tags.paragraph).first()).toHaveText(
      Constants.elementsText.reactApps.splitedApp.subHeader,
    );

    await expect(contentBlock.locator(baseSelectors.tags.strong)).toHaveText(STANDARD_PHRASE);
  });
});

test.describe('React 18 Server 2 Server - App2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(getAppUrl(APP2_PORT));
  });

  test('renders initial content', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 1, name: Constants.elementsText.reactApps.header }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { level: 2, name: Constants.elementsText.reactApps.app2.subHeader }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { level: 3, name: Constants.elementsText.reactApps.header3 }),
    ).toBeVisible();

    await expect(page.locator(baseSelectors.tags.inputs.input)).toBeVisible();
  });

  test('renders remote content when typing', async ({ page }) => {
    const input = page.locator(baseSelectors.tags.inputs.input).first();
    await input.fill(STANDARD_PHRASE);

    const contentBlock = page.locator(selectors.reactApp.app2ContentBlock);

    await expect(
      contentBlock.getByRole('heading', {
        level: 2,
        name: Constants.elementsText.reactApps.splitedApp.header,
      }),
    ).toBeVisible();

    await expect(contentBlock.locator(baseSelectors.tags.paragraph).first()).toHaveText(
      Constants.elementsText.reactApps.splitedApp.subHeader,
    );

    await expect(contentBlock.locator(baseSelectors.tags.strong)).toHaveText(STANDARD_PHRASE);
  });
});
