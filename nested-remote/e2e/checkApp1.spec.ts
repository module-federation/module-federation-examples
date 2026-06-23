import { test } from '@playwright/test';

import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors } from '../../playwright-e2e/common/selectors';
import { Constants } from '../../playwright-e2e/fixtures/constants';
import { CssAttr } from '../../playwright-e2e/types/cssAttr';

test.describe('Nested - App 1', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    await basePage.openLocalhost({ number: 3001 });
  });

  test('Check elements exist', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.updatedConstantsData.commonAppWithButton.app3,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementContainText({
      selector: baseSelectors.ids.root,
      text: Constants.elementsText.nestedApp.app2Container,
    });
    await basePage.checkElementContainText({
      selector: baseSelectors.ids.root,
      text: Constants.elementsText.nestedApp.app1Text,
    });
  });

  test('Check colors', async () => {
    await basePage.checkElementHaveProperty({
      selector: baseSelectors.tags.coreElements.div,
      text: Constants.elementsText.nestedApp.app2Container,
      prop: CssAttr.backgroundColor,
      value: Constants.color.chineseSilver,
    });
    await basePage.checkElementHaveProperty({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.updatedConstantsData.commonAppWithButton.app3,
      prop: CssAttr.background,
      value: Constants.color.aquamarine,
    });
  });
});
