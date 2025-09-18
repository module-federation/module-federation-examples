import { test } from '@playwright/test';

import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors } from '../../cypress-e2e/common/selectors';
import { Constants } from '../../cypress-e2e/fixtures/constants';

const translations = Constants.updatedConstantsData.reactAppsTranslations;

test.describe('i18next Nextjs React - React Remote', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    await basePage.openLocalhost({ number: 3002 });
  });

  test('Check the content of the page exist', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: translations.remote.english.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.ids.app,
      text: translations.remote.english.title,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.ids.app,
      text: translations.remote.english.text,
    });
  });

  test('Check the language is changed', async () => {
    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: translations.remote.english.button,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: translations.remote.francais.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.ids.app,
      text: translations.remote.francais.title,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.ids.app,
      text: translations.remote.francais.text,
    });

    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: translations.remote.francais.button,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: translations.remote.english.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.ids.app,
      text: translations.remote.english.title,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.ids.app,
      text: translations.remote.english.text,
    });
  });
});
