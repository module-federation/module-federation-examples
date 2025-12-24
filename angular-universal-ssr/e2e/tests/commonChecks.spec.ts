import { test } from '@playwright/test';

import { BaseMethods } from '../../../playwright-e2e/common/base';
import { Constants } from '../../../playwright-e2e/fixtures/constants';
import { baseSelectors, updatedSelectors } from '../../../playwright-e2e/common/selectors';
import { AngularUniversalSsrMethods } from '../methods/methods';

type AppData = {
  componentName: string;
  tabName: string;
  componentText?: string;
  link?: string;
};

const appsData: AppData[] = [
  {
    componentName: Constants.commonPhrases.angularUniversalSsrApp.components.homeComponent.split(' ')[0],
    tabName: Constants.elementsText.angularUniversalSsrApp.tabsNames[0],
    componentText: Constants.commonPhrases.angularUniversalSsrApp.components.homeComponent,
  },
  {
    componentName: Constants.commonPhrases.angularUniversalSsrApp.components.angularLazyComponent.split(' ')[0],
    tabName: Constants.elementsText.angularUniversalSsrApp.tabsNames[1],
    componentText: Constants.commonPhrases.angularUniversalSsrApp.components.angularLazyComponent,
    link: Constants.hrefs.angularUniversalSsrLinks.angularLink,
  },
  {
    componentName: Constants.elementsText.angularUniversalSsrApp.tabsNames[2].split(' ')[0],
    tabName: Constants.elementsText.angularUniversalSsrApp.tabsNames[2],
    link: Constants.hrefs.angularUniversalSsrLinks.federationLink,
  },
];

test.describe('Angular Universal SSR - Components Functionality', () => {
  let basePage: BaseMethods;
  let methodsPage: AngularUniversalSsrMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    methodsPage = new AngularUniversalSsrMethods(page);
  });

  for (const property of appsData) {
    test(`Component ${property.componentName} text is visible only when tab is active`, async () => {
      await basePage.openLocalhost({ number: 4000 });

      if (property.componentName === appsData[1].componentName) {
        await basePage.checkElementWithTextPresence({
          selector: updatedSelectors.angularUniversalSsrApp.tab,
          text: property.componentText,
          isVisible: false,
        });
        await basePage.clickElementWithText({
          selector: updatedSelectors.angularUniversalSsrApp.tab,
          text: property.componentName,
        });
      }

      await methodsPage.checkActiveTabNameConnection(property.tabName, property.componentText);

      await basePage.reloadWindow();

      if (property.componentName !== appsData[2].componentName) {
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.appRoot,
          text: property.componentText,
          visibilityState: 'be.visible',
        });
      }
    });

    test(`Link changes after clicking ${property.componentName} tab`, async () => {
      if (property.componentName === appsData[0].componentName) {
        test.skip();
      }

      if (!property.link) {
        test.skip();
      }

      await basePage.openLocalhost({ number: 4000 });
      await basePage.checkUrlText(property.link);

      await basePage.clickElementWithText({
        selector: updatedSelectors.angularUniversalSsrApp.tab,
        text: property.tabName,
      });

      await basePage.checkUrlText(property.link, true);
      await basePage.reloadWindow();
      await basePage.checkUrlText(property.link, true);
    });
  }
});
