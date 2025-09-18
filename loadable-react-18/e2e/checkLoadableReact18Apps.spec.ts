import { test } from '@playwright/test';

import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors, selectors } from '../../cypress-e2e/common/selectors';
import { Constants } from '../../cypress-e2e/fixtures/constants';

const standardPhrase = Constants.commonConstantsData.standardPhrase;

test.describe('Loadable React 18 - App1', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    await basePage.openLocalhost({ number: 3000 });
  });

  test('Check App headers and buttons visibility', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h1,
      text: Constants.elementsText.reactApps.header,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h2,
      text: Constants.elementsText.reactApps.app1.subHeader,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h3,
      text: Constants.elementsText.reactApps.header3,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementVisibility({
      selector: baseSelectors.tags.inputs.input,
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.reactApps.regularButton,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.reactApps.loadableButton,
      visibilityState: 'be.visible',
    });
  });

  test('Check that App 2 Content Block with filled text appears', async () => {
    await basePage.fillField({
      selector: baseSelectors.tags.inputs.input,
      text: standardPhrase,
    });

    await basePage.checkElementWithTextPresence({
      selector: `${selectors.reactApp.app2ContentBlock} ${baseSelectors.tags.headers.h2}`,
      text: Constants.elementsText.reactApps.splitedApp.header,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: `${selectors.reactApp.app2ContentBlock} ${baseSelectors.tags.paragraph}`,
      text: Constants.elementsText.reactApps.splitedApp.subHeader,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.strong,
      text: standardPhrase,
      visibilityState: 'be.visible',
    });
  });
});

test.describe('Loadable React 18 - App2', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    await basePage.openLocalhost({ number: 3001 });
  });

  test('Check App elements visibility', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h1,
      text: Constants.elementsText.reactApps.header,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h2,
      text: Constants.elementsText.reactApps.app2.subHeader,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h3,
      text: Constants.elementsText.reactApps.header3,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementVisibility({
      selector: baseSelectors.tags.inputs.input,
    });
  });

  test('Check that App 2 Content Block with filled text appears', async () => {
    await basePage.fillField({
      selector: baseSelectors.tags.inputs.input,
      text: standardPhrase,
    });

    await basePage.checkElementWithTextPresence({
      selector: `${selectors.reactApp.app2ContentBlock} ${baseSelectors.tags.headers.h2}`,
      text: Constants.elementsText.reactApps.splitedApp.header,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: `${selectors.reactApp.app2ContentBlock} ${baseSelectors.tags.paragraph}`,
      text: Constants.elementsText.reactApps.splitedApp.subHeader,
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.strong,
      text: standardPhrase,
      visibilityState: 'be.visible',
    });
  });
});
