import { test } from '../../playwright-e2e/common/testFixtures';

import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors } from '../../cypress-e2e/common/selectors';
import { Constants } from '../../cypress-e2e/fixtures/constants';
import { DifferentReactVersionsMethods } from './methods/methods';

test.describe('Different React Versions - App1', () => {
  let basePage: BaseMethods;
  let methodsPage: DifferentReactVersionsMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    methodsPage = new DifferentReactVersionsMethods();

    await basePage.openLocalhost({ number: 3001 });
  });

  test('Check App build and running', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h1,
      text: Constants.commonConstantsData.basicComponents.basicHostRemote,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h2,
      text: Constants.elementsText.differentReactVersionsApps.subheader,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementVisibility({
      selector: baseSelectors.tags.inputs.input,
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.strong,
      text: Constants.elementsText.differentReactVersionsApps.reactBlockParagraph,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h2,
      text: Constants.elementsText.differentReactVersionsApps.reactBlockHeader,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h3,
      text: Constants.elementsText.differentReactVersionsApps.reactBlockSubheader,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.paragraph,
      text: Constants.elementsText.differentReactVersionsApps.paragraph,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.updatedConstantsData.commonAppWithButton.app2,
      visibilityState: 'be.visible',
    });

    await basePage.checkElementHaveProperty({
      selector: methodsPage.getBlockSelector(baseSelectors.tags.coreElements.button.toUpperCase()),
      prop: Constants.commonConstantsData.commonAttributes.border,
      value: Constants.color.nonRgbValues.borderRed1px,
    });

    await basePage.checkElementHaveProperty({
      selector: methodsPage.getBlockSelector(baseSelectors.tags.coreElements.div.toUpperCase()),
      prop: Constants.commonConstantsData.commonAttributes.border,
      value: Constants.color.nonRgbValues.borderRed1px,
    });
  });

  test('Check that filled text appear in header', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h2,
      text: Constants.elementsText.differentReactVersionsApps.reactBlockHeader,
      visibilityState: 'be.visible',
    });

    await basePage.fillField({
      selector: baseSelectors.tags.inputs.input,
      text: Constants.commonConstantsData.standardPhrase,
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h2,
      text: `${Constants.elementsText.differentReactVersionsApps.reactBlockHeader} ${Constants.commonConstantsData.standardPhrase}`,
      visibilityState: 'be.visible',
    });
  });
});

test.describe('Different React Versions - App2', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    await basePage.openLocalhost({ number: 3002 });
  });

  test('Check App build and running', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h1,
      text: Constants.commonConstantsData.basicComponents.basicHostRemote,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.paragraph,
      text: Constants.commonConstantsData.commonCountAppNames.app2.replace(' ', ''),
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.paragraph,
      text: Constants.elementsText.differentReactVersionsApps.paragraph,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.updatedConstantsData.commonAppWithButton.app2,
      visibilityState: 'be.visible',
    });
  });
});
