import { test } from '@playwright/test';
import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors, updatedSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

const appsUnderTest = [
  {
    host: 3001,
    header: Constants.commonConstantsData.typeScript.charAt(0).toUpperCase(),
    appName: Constants.commonConstantsData.commonCountAppNames.app1,
  },
  {
    host: 3002,
    header: Constants.commonConstantsData.typeScript.charAt(0).toUpperCase(),
    appName: Constants.commonConstantsData.commonCountAppNames.app2,
  },
];
const sharedButtonText = Constants.updatedConstantsData.commonAppWithButton.app2;
const sharedHeader = `${appsUnderTest[0].header}${Constants.commonConstantsData.typeScript.slice(1)}`;

if (appsUnderTest.length < 2) {
  throw new Error('Typescript monorepo scenario requires at least two apps for validation.');
}

const otherHost = (currentHost: number) => {
  const alternate = appsUnderTest.find(app => app.host !== currentHost)?.host;
  if (!alternate) {
    throw new Error(`Unable to resolve alternate host for port ${currentHost}.`);
  }
  return alternate;
};

test.describe('Typescript Monorepo', () => {
  for (const app of appsUnderTest) {
    test(`checks both apps share the ${sharedHeader} header (port: ${app.host})`, async ({ page }) => {
      const basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: app.host });
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.headers.h1,
        text: sharedHeader,
        visibilityState: 'be.visible',
      });
    });

    test(`checks ${app.appName} app name visibility (port: ${app.host})`, async ({ page }) => {
      const basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: app.host });
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.headers.h2,
        text: app.appName,
        visibilityState: 'be.visible',
      });
    });

    test(`checks ${app.appName} renders shared button (port: ${app.host})`, async ({ page }) => {
      const basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: app.host });
      await basePage.checkElementVisibility({
        selector: baseSelectors.tags.coreElements.button,
      });
    });

    test(`checks ${app.appName} button is enabled (port: ${app.host})`, async ({ page }) => {
      const basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: app.host });
      await basePage.checkElementState({
        selector: baseSelectors.tags.coreElements.button,
        state: 'not.be.disabled',
      });
    });

    test(`checks both apps share the same button text (port: ${app.host})`, async ({ page }) => {
      const basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: app.host });
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.button,
        text: sharedButtonText,
        visibilityState: 'be.visible',
      });
    });

    test(`confirms app names differ across hosts when visiting ${app.appName}`, async ({ page }) => {
      const basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: app.host });
      await basePage.compareInfoBetweenHosts({
        selector: updatedSelectors.common.appName,
        extraHost: otherHost(app.host),
        isEqual: false,
      });
    });
  }
});
