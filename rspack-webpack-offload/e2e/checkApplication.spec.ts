import { test, expect } from '@playwright/test';
import { Constants } from '../../playwright-e2e/fixtures/constants';

const selectors = {
  header: 'h1',
  strong: 'strong',
  sectionTitle: 'h4',
  tooltip: '.tool-tip',
  button: 'button',
  input: 'input',
};

test.describe('Complete React case', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Check App build and running', async ({ page }) => {
    const { completeReactCaseApp } = Constants.elementsText;

    await expect(page.locator(selectors.header)).toHaveText(completeReactCaseApp.header);
    await expect(page.locator(selectors.strong).nth(0)).toHaveText(
      completeReactCaseApp.paragraphs.firstParagraph,
    );
    await expect(page.locator(selectors.strong).nth(1)).toHaveText(
      completeReactCaseApp.paragraphs.secondParagraph,
    );
    await expect(
      page.locator(selectors.sectionTitle).filter({ hasText: completeReactCaseApp.buttons.h4Buttons }),
    ).toBeVisible();
    await expect(
      page.locator(selectors.sectionTitle).filter({ hasText: completeReactCaseApp.h4Dialog }),
    ).toBeVisible();
    await expect(
      page.locator(selectors.sectionTitle).filter({ hasText: completeReactCaseApp.h4HoverElement }),
    ).toBeVisible();
    await expect(page.locator(selectors.tooltip)).toHaveText(completeReactCaseApp.h4HoverElement);
  });

  test('Check App buttons', async ({ page }) => {
    const {
      buttons: { primaryButton, warningButton, openDialogButton },
    } = Constants.elementsText.completeReactCaseApp;

    await expect(page.getByRole('button', { name: primaryButton })).toBeVisible();
    await expect(page.getByRole('button', { name: warningButton })).toBeVisible();
    await expect(page.getByRole('button', { name: openDialogButton })).toBeVisible();

    await expect(page.getByRole('button', { name: primaryButton })).toHaveCSS(
      'background-color',
      Constants.color.lightWashedAzure,
    );
    await expect(page.getByRole('button', { name: warningButton })).toHaveCSS(
      'background-color',
      Constants.color.lightWashedOrange,
    );
  });

  test('Check App Dialog popup', async ({ page }) => {
    const {
      buttons: { openDialogButton, closeButton },
      nameMessage,
    } = Constants.elementsText.completeReactCaseApp;

    await page.getByRole('button', { name: openDialogButton }).click();
    await expect(page.getByRole('button', { name: closeButton })).toBeVisible();
    await expect(page.getByText(nameMessage)).toBeVisible();
    await page.fill(selectors.input, Constants.commonPhrases.completeReactCaseApp.input);
    await page.getByRole('button', { name: closeButton }).click();
  });
});
