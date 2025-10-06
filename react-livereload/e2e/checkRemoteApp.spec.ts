import { expect, test } from '@playwright/test';
import { BasePage } from '../../playwright-e2e/common/basePage';
import { Constants } from '../../playwright-e2e/fixtures/constants';

const REMOTE_PORT = 3001;
const COUNTER_PREFIX = Constants.elementsText.reactHmrApp.remote.text;
const BUTTON_LABEL = Constants.elementsText.reactHmrApp.remote.button;

test.describe('React HMR - Remote App', () => {
  test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.openLocalhost({ port: REMOTE_PORT });
  });

  test('renders the default state', async ({ page }) => {
    await expect(page.getByRole('button', { name: BUTTON_LABEL })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(`${COUNTER_PREFIX}0`);
  });

  test('increments the counter when button is clicked', async ({ page }) => {
    const incrementButton = page.getByRole('button', { name: BUTTON_LABEL });

    for (let count = 1; count <= 2; count += 1) {
      await incrementButton.click();
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(`${COUNTER_PREFIX}${count}`);
    }
  });
});

