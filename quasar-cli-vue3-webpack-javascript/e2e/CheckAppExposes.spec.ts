import { test } from '../../playwright-e2e/common/testFixtures';

import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors, selectors } from '../../playwright-e2e/common/selectors';
import { Constants } from '../../playwright-e2e/fixtures/constants';

interface AppData {
  appName: string;
  appBanner: string;
  appExposesComponentsButton: string;
  clickMeButton: string;
  appListDiv: string;
  host: number;
}

const appsData: AppData[] = [
  {
    appName: Constants.elementsText.quasarCliApp.appExposes.appName,
    appBanner: Constants.elementsText.quasarCliApp.appExposes.banner,
    appExposesComponentsButton: Constants.elementsText.quasarCliApp.appExposes.componentsButton,
    clickMeButton: Constants.elementsText.quasarCliApp.appButtonClickMeButton,
    appListDiv: Constants.elementsText.quasarCliApp.appListDiv,
    host: 3001,
  },
  {
    appName: Constants.elementsText.quasarCliApp.appGeneral.name,
    appBanner: Constants.elementsText.quasarCliApp.appGeneral.banner,
    appExposesComponentsButton: Constants.elementsText.quasarCliApp.appExposes.componentsButton,
    clickMeButton: Constants.elementsText.quasarCliApp.appButtonClickMeButton,
    appListDiv: Constants.elementsText.quasarCliApp.appListDiv,
    host: 3002,
  },
];

const listNames = Constants.elementsText.quasarCliApp.names;

async function openComponentsSection(basePage: BaseMethods): Promise<void> {
  await basePage.clickElementWithText({
    selector: baseSelectors.tags.coreElements.link,
    text: Constants.elementsText.quasarCliApp.appExposes.componentsButton,
  });
}

appsData.forEach(property => {
  test.describe(`Quasar CLI Vue3 Webpack JS - ${property.appName}`, () => {
    let basePage: BaseMethods;

    test.beforeEach(async ({ page }) => {
      basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: property.host });
    });

    test(`Check ${property.appName} elements`, async ({ page }) => {
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.div,
        text: property.appName,
        visibilityState: 'be.visible',
      });
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.headers.h4,
        text: property.appBanner,
        visibilityState: 'be.visible',
      });

      await page.locator(baseSelectors.tags.coreElements.button).first().click();
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.link,
        text: property.appExposesComponentsButton,
        // Quasar's navigation drawer keeps items in the DOM; don't require link removal.
        isVisible: true,
      });

      await page.locator(baseSelectors.tags.coreElements.button).first().click();
      await openComponentsSection(basePage);

      if (property.host === 3002) {
        await page
          .locator(baseSelectors.tags.coreElements.link)
          .filter({ hasText: Constants.elementsText.quasarCliApp.appGeneral.routeButton })
          .first()
          .click({ force: true });

        await basePage.checkUrlText(property.host.toString(), true);

        await openComponentsSection(basePage);

        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h5,
          text: Constants.elementsText.quasarCliApp.appGeneral.subheader1,
          visibilityState: 'be.visible',
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h5,
          text: Constants.elementsText.quasarCliApp.appGeneral.subheader2,
          visibilityState: 'be.visible',
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: Constants.elementsText.quasarCliApp.appGeneral.counter,
          visibilityState: 'be.visible',
        });
      }

      if (property.host === 3001) {
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: Constants.commonConstantsData.button,
          visibilityState: 'be.visible',
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: Constants.elementsText.quasarCliApp.appExposes.list,
          visibilityState: 'be.visible',
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: Constants.elementsText.quasarCliApp.appButtonDiv,
          visibilityState: 'be.visible',
        });
      }
    });

    test(`Check counters in ${property.appName} app`, async () => {
      await openComponentsSection(basePage);

      await basePage.checkElementWithTextPresence({
        selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.exposes.counter,
        text: Constants.commonConstantsData.commonIndexes.zero.toString(),
        visibilityState: 'be.visible',
      });

      if (property.host === 3002) {
        await basePage.checkElementWithTextPresence({
          selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.general.counter,
          text: Constants.commonConstantsData.commonIndexes.zero.toString(),
          visibilityState: 'be.visible',
        });
      }

      await basePage.clickElementWithText({
        selector: baseSelectors.tags.coreElements.button,
        text: property.clickMeButton,
      });

      // The counter is local component state and can update in-place.
      // Assert via textContent rather than a text-filtered locator to avoid flakiness.
      await basePage.checkElementContainText({
        selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.exposes.counter,
        text: Constants.commonConstantsData.commonIndexes.one.toString(),
      });

      if (property.host === 3002) {
        await basePage.checkElementWithTextPresence({
          selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.general.counter,
          text: Constants.commonConstantsData.commonIndexes.one.toString(),
          visibilityState: 'be.visible',
        });
      }

      await basePage.reloadWindow();
      // AppButton counter is not persisted across reloads; it resets to 0.
      await basePage.checkElementContainText({
        selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.exposes.counter,
        text: Constants.commonConstantsData.commonIndexes.zero.toString(),
      });

      if (property.host === 3002) {
        await basePage.checkElementWithTextPresence({
          selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.general.counter,
          text: Constants.commonConstantsData.commonIndexes.zero.toString(),
          visibilityState: 'be.visible',
        });
      }
    });

    test(`Check list of elements in ${property.appName} app`, async ({ page }) => {
      await openComponentsSection(basePage);

      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.div,
        text: property.appListDiv,
        visibilityState: 'be.visible',
      });

      for (const element of listNames) {
        await basePage.checkElementQuantity({
          selector: selectors.quasarCliVue3WebPackJavaScriptApp.apps.exposes.names,
          quantity: element.index,
        });
        await page
          .locator(selectors.quasarCliVue3WebPackJavaScriptApp.apps.exposes.closeButton)
          .first()
          .click();
      }

      if (property.host === 3002) {
        for (const element of listNames) {
          await basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.coreElements.div,
            text: String(element.name),
            visibilityState: 'be.visible',
          });
        }
      }
    });
  });
});
