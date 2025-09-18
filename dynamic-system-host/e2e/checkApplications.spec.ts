import { test } from '@playwright/test';

import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors, commonSelectors } from '../../playwright-e2e/common/selectors';
import { Constants } from '../../playwright-e2e/fixtures/constants';
import { getDateWithFormat } from '../../cypress-e2e/helpers/base-helper';
import { CssAttr } from '../../cypress-e2e/types/cssAttr';
import { returnCommonDynamicAppsData } from '../../cypress-e2e/fixtures/commonTestData';

const appsData = returnCommonDynamicAppsData(
  Constants.commonPhrases.dynamicSystemHostApp.paragraphText,
);
const widgetButtons = Constants.elementsText.dynamicRemotesApp.buttonsText;
const dynamicHostParagraph = Constants.commonPhrases.dynamicSystemHostApp.hostParagraph;

const getWidgetSelector = (index: number) =>
  commonSelectors.commonWidget.replace('{appQuantity}', String(index + 2));

appsData.forEach(app => {
  test.describe(`Dynamic System Host - ${app.appNameText} (port ${app.host})`, () => {
    test('renders shared header and optional paragraph', async ({ page }) => {
      const basePage = new BaseMethods(page);

      await basePage.openLocalhost({ number: app.host });

      await basePage.checkElementWithTextPresence({
        selector: app.headerSelector,
        text: app.headerText,
      });

      await basePage.checkElementWithTextPresence({
        selector: app.subHeaderSelector,
        text: app.appNameText,
      });

      if (app.paragraph) {
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.paragraph,
          text: dynamicHostParagraph,
        });
      } else {
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.paragraph,
          text: dynamicHostParagraph,
          isVisible: false,
        });
      }
    });

    test('displays the expected widget trigger buttons', async ({ page }) => {
      const basePage = new BaseMethods(page);

      await basePage.openLocalhost({ number: app.host });

      if (app.isButtonExist) {
        for (const buttonText of widgetButtons) {
          await basePage.checkElementWithTextPresence({
            selector: app.buttonSelector,
            text: buttonText,
          });
        }

        return;
      }

      await basePage.checkElementVisibility({
        selector: app.buttonSelector,
        isVisible: false,
      });
    });

    test('loads widgets dynamically with correct styling and copy', async ({ page }) => {
      const basePage = new BaseMethods(page);

      await basePage.openLocalhost({ number: app.host });

      if (app.isButtonExist) {
        for (const [index, buttonText] of widgetButtons.entries()) {
          await test.step(`loads widget via ${buttonText}`, async () => {
            await basePage.clickElementWithText({
              selector: app.buttonSelector,
              text: buttonText,
            });

            const widgetSelector = getWidgetSelector(index);

            await basePage.checkElementVisibility({ selector: widgetSelector });

            await basePage.checkElementHaveProperty({
              selector: widgetSelector,
              prop: CssAttr.backgroundColor,
              value: app.widgetColor[index],
            });

            await basePage.checkElementWithTextPresence({
              selector: app.subHeaderSelector,
              text: app.widgetName[index],
            });

            await basePage.checkElementWithTextPresence({
              selector: baseSelectors.tags.paragraph,
              text: app.widgetParagraph[index],
            });

            await basePage.checkElementWithTextPresence({
              selector: baseSelectors.tags.paragraph,
              text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm'),
            });
          });
        }

        return;
      }

      const widgetIndex = app.widgetQuantity ?? 0;
      const widgetSelector = getWidgetSelector(widgetIndex);

      await basePage.checkElementVisibility({ selector: widgetSelector });

      await basePage.checkElementHaveProperty({
        selector: widgetSelector,
        prop: CssAttr.backgroundColor,
        value: app.widgetColor[widgetIndex],
      });

      await basePage.checkElementWithTextPresence({
        selector: app.subHeaderSelector,
        text: app.widgetName[widgetIndex],
      });

      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.paragraph,
        text: app.widgetParagraph[widgetIndex],
      });

      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.paragraph,
        text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm'),
      });
    });
  });
});
