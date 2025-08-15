import { test, expect } from '@playwright/test';
import { Constants } from '../../cypress-e2e/fixtures/constants';

test.describe('Complete React case', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Check App build and running', async ({ page }) => {
    const text = Constants.elementsText.completeReactCaseApp;
    await expect(page.locator('h1')).toHaveText(text.header);
    await expect(page.locator('strong').nth(0)).toHaveText(text.paragraphs.firstParagraph);
    await expect(page.locator('strong').nth(1)).toHaveText(text.paragraphs.secondParagraph);
    await expect(page.locator('h4').filter({ hasText: text.buttons.h4Buttons })).toBeVisible();
    await expect(page.locator('h4').filter({ hasText: text.h4Dialog })).toBeVisible();
    await expect(page.locator('h4').filter({ hasText: text.h4HoverElement })).toBeVisible();
    await expect(page.locator('.tool-tip')).toHaveText(text.h4HoverElement);
  });

  test('Check App buttons', async ({ page }) => {
    const { buttons } = Constants.elementsText.completeReactCaseApp;
    await expect(page.getByRole('button', { name: buttons.primaryButton })).toBeVisible();
    await expect(page.getByRole('button', { name: buttons.warningButton })).toBeVisible();
    await expect(page.getByRole('button', { name: buttons.openDialogButton })).toBeVisible();
    await expect(page.getByRole('button', { name: buttons.primaryButton })).toHaveCSS(
      'background-color',
      Constants.color.lightWashedAzure,
    );
    await expect(page.getByRole('button', { name: buttons.warningButton })).toHaveCSS(
      'background-color',
      Constants.color.lightWashedOrange,
    );
  });

  test('Check App Dialog popup', async ({ page }) => {
    const { buttons, nameMessage } = Constants.elementsText.completeReactCaseApp;
    await page.getByRole('button', { name: buttons.openDialogButton }).click();
    await expect(page.getByRole('button', { name: buttons.closeButton })).toBeVisible();
    await expect(page.getByText(nameMessage)).toBeVisible();
    await page.fill('input', Constants.commonPhrases.completeReactCaseApp.input);
    await page.getByRole('button', { name: buttons.closeButton }).click();
  });
});

