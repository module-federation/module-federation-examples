import { test } from '@playwright/test';

import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors } from '../../playwright-e2e/common/selectors';
import { Constants } from '../../playwright-e2e/fixtures/constants';
import { CssAttr } from '../../playwright-e2e/types/cssAttr';

test.describe('Nested - App 3', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    await basePage.openLocalhost({ number: 3003 });
  });

  test('Check button exists', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.updatedConstantsData.commonAppWithButton.app3,
      visibilityState: 'be.visible',
    });
  });

  test('Check button color', async () => {
    await basePage.checkElementHaveProperty({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.updatedConstantsData.commonAppWithButton.app3,
      prop: CssAttr.background,
      value: Constants.color.aquamarine,
    });
  });
});
