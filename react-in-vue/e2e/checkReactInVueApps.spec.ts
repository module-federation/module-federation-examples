import { expect, test } from '@playwright/test';
import { Constants } from '../../cypress-e2e/fixtures/constants';
import { baseSelectors, commonSelectors } from '../../playwright-e2e/common/selectors';
import { BasePage } from '../../playwright-e2e/common/basePage';

interface ReactInVueAppConfig {
  header: string;
  subHeader: string;
  buttonText: string;
  port: number;
  checkboxLabel?: string;
  buttonTextLabel?: string;
  counterLabel?: string;
  buttonHeader?: string;
}

const reactButtonText = Constants.elementsText.reactInVueApp.App1.buttonText;
const updatedReactButtonText = Constants.elementsText.reactInVueApp.App1.updatedButtonText;

const appsUnderTest: ReactInVueAppConfig[] = [
  {
    header: Constants.elementsText.reactInVueApp.App1.header,
    subHeader: Constants.elementsText.reactInVueApp.App1.subHeader,
    checkboxLabel: Constants.elementsText.reactInVueApp.App1.checkBoxText,
    buttonTextLabel: Constants.elementsText.reactInVueApp.App1.buttonInputText,
    counterLabel: Constants.elementsText.reactInVueApp.App1.counterText,
    buttonHeader: Constants.elementsText.reactInVueApp.App1.buttonHeader,
    buttonText: reactButtonText,
    port: 3001,
  },
  {
    header: Constants.commonConstantsData.basicComponents.basicHostRemote,
    subHeader: Constants.commonConstantsData.home,
    buttonText: Constants.elementsText.reactInVueApp.App2.buttonText,
    port: 3002,
  },
];

const buildFieldSelector = (fieldName: string): string =>
  commonSelectors.formField.replace('{fieldName}', fieldName);

const checkboxSelector = baseSelectors.css.checkbox;

const assertAppHeadings = async (page: BasePage, config: ReactInVueAppConfig): Promise<void> => {
  await page.expectElementWithTextPresence({
    selector: baseSelectors.tags.headers.h1,
    text: config.header,
  });

  await page.expectElementWithTextPresence({
    selector: baseSelectors.tags.headers.h2,
    text: config.subHeader,
  });
};

test.describe('React in Vue', () => {
  for (const app of appsUnderTest) {
    const isPrimaryApp = app.port === 3001;

    test.describe(`app running on port ${app.port}`, () => {
      test.beforeEach(async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.openLocalhost({ port: app.port });
      });

      test('renders the expected layout', async ({ page }) => {
        const basePage = new BasePage(page);
        await assertAppHeadings(basePage, app);

        if (isPrimaryApp) {
          await basePage.expectElementWithTextPresence({
            selector: baseSelectors.tags.coreElements.spans.span,
            text: app.checkboxLabel!,
          });

          const checkbox = page.locator(checkboxSelector);
          await expect(checkbox).toBeVisible();
          await expect(checkbox).toBeChecked();

          await basePage.expectElementWithTextPresence({
            selector: baseSelectors.tags.coreElements.spans.span,
            text: app.buttonTextLabel!,
          });

          await basePage.expectElementWithTextPresence({
            selector: baseSelectors.tags.coreElements.spans.span,
            text: app.counterLabel!,
          });

          await basePage.expectElementWithTextPresence({
            selector: baseSelectors.tags.headers.h2,
            text: app.buttonHeader!,
          });
        }

        await expect(page.getByRole('button', { name: app.buttonText })).toBeVisible();
      });

      test('hides the button when the checkbox is unchecked', async ({ page }) => {
        test.skip(!isPrimaryApp, 'Secondary app does not render the checkbox controlled button');

        const button = page.getByRole('button', { name: reactButtonText });
        await expect(button).toBeVisible();

        const checkbox = page.locator(checkboxSelector);
        await checkbox.click();

        await expect(button).toBeHidden();
      });

      test('updates the button label from the form field', async ({ page }) => {
        test.skip(!isPrimaryApp, 'Secondary app does not expose the form field');

        await expect(page.getByRole('button', { name: reactButtonText })).toBeVisible();

        const buttonTextField = page.locator(buildFieldSelector('BUTTON_TEXT'));
        await buttonTextField.fill(updatedReactButtonText);

        await expect(page.getByRole('button', { name: updatedReactButtonText })).toBeVisible();
      });

      test('increments the counter after clicking the button', async ({ page }) => {
        test.skip(!isPrimaryApp, 'Secondary app does not expose the counter');

        const counterField = page.locator(buildFieldSelector('COUNTER'));
        await expect(counterField).toHaveValue('0');

        await page.getByRole('button', { name: reactButtonText }).click();

        await expect(counterField).toHaveValue('1');
      });
    });
  }
});
