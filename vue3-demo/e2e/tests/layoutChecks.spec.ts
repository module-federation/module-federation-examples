import { test } from '@playwright/test';
import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors, selectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

test.describe('Vue 3 Demo', () => {
  test.describe('It checks layout app', () => {
    let basePage: BaseMethods;

    test.beforeEach(async ({ page }) => {
      basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: 3001 });
      // Wait for layout to mount and remote component to render
      await basePage.checkElementVisibility({ selector: selectors.vue3DemoApp.components.layout });
      await basePage.checkElementVisibility({
        parentSelector: selectors.vue3DemoApp.components.layout,
        selector: selectors.vue3DemoApp.components.remote,
      });
    });

    test('Checks page header with text visibility', async () => {
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.div,
        text: Constants.commonPhrases.vue3DemoApp.appsHeaders.host,
        visibilityState: 'be.visible',
      });
    });

    test('Checks vue app logo visibility', async () => {
      await basePage.checkElementVisibility({
        selector: baseSelectors.tags.coreElements.image,
      });
    });

    test('Checks layout app includes remote component', async () => {
      await basePage.checkElementVisibility({
        parentSelector: selectors.vue3DemoApp.components.layout,
        selector: selectors.vue3DemoApp.components.remote,
      });
    });

    test('Checks remote component includes remote header', async () => {
      await basePage.checkElementContainText({
        parentSelector: selectors.vue3DemoApp.components.remote,
        selector: '.app-label',
        text: Constants.commonPhrases.vue3DemoApp.appsHeaders.remote,
      });
    });

    test('Checks remote component includes component state message', async () => {
      await basePage.checkElementContainText({
        parentSelector: selectors.vue3DemoApp.components.remote,
        selector: baseSelectors.tags.coreElements.div,
        text: Constants.commonConstantsData.commonVueAppComponentState,
        index: Constants.commonConstantsData.commonIndexes.one,
      });
    });

    test('Checks remote component includes button with text', async () => {
      await basePage.checkElementContainText({
        parentSelector: selectors.vue3DemoApp.components.remote,
        selector: baseSelectors.tags.coreElements.button,
        text: Constants.commonConstantsData.helloWorldMessage,
      });
    });
  });
});
