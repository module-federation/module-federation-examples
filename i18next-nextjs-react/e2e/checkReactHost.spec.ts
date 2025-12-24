import { test } from '@playwright/test';

import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors } from '../../playwright-e2e/common/selectors';
import { Constants } from '../../playwright-e2e/fixtures/constants';

const translations = Constants.updatedConstantsData.reactAppsTranslations;

test.describe('i18next Nextjs React - React Host', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    await basePage.openLocalhost({ number: 3001 });
  });

  test('Check the content exist on React host', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.section,
      text: translations.host.english.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.host.english.text,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.host.english.title,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.section,
      text: translations.remote.english.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.remote.english.title,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.remote.english.text,
    });
  });

  test('Check the language is changed from React host section', async () => {
    await basePage.clickElementWithText({
      selector: baseSelectors.tags.section,
      text: translations.host.english.button,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.section,
      text: translations.host.francais.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.host.francais.text,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.host.francais.title,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.section,
      text: translations.remote.francais.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.remote.francais.title,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.remote.francais.text,
    });

    await basePage.clickElementWithText({
      selector: baseSelectors.tags.section,
      text: translations.host.francais.button,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.section,
      text: translations.host.english.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.host.english.text,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.host.english.title,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.section,
      text: translations.remote.english.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.remote.english.title,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.remote.english.text,
    });
  });

  test('Check the language is changed from remote child section', async () => {
    await basePage.clickElementWithText({
      selector: baseSelectors.tags.section,
      text: translations.remote.english.button,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.section,
      text: translations.host.francais.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.host.francais.text,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.host.francais.title,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.section,
      text: translations.remote.francais.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.remote.francais.title,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.remote.francais.text,
    });

    await basePage.clickElementWithText({
      selector: baseSelectors.tags.section,
      text: translations.remote.francais.button,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.section,
      text: translations.host.english.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.host.english.text,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.host.english.title,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.section,
      text: translations.remote.english.button,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.remote.english.title,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: translations.remote.english.text,
    });
  });
});
