import { test, expect } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { baseSelectors, commonSelectors } from '../../../../playwright-e2e/common/selectors';
import { Constants } from '../../../../playwright-e2e/fixtures/constants';
import { CommonTestData } from '../../../../playwright-e2e/fixtures/commonTestData';

const REMOTE_BASE_URL = 'http://localhost:8081/';
const REMOTE_ROOT_FILE_PATH = path.resolve(__dirname, '../../remote/pages/index.js');
const REMOTE_CHANGED_CONTENT_PATH = path.resolve(
  __dirname,
  '../fixtures/remote/changedContent.js',
);
const START_MESSAGE = Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.start;
const CHANGED_MESSAGE = START_MESSAGE.replace('started', 'TESTED');

test.describe('Remote page checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(REMOTE_BASE_URL);
  });

  test('header link has expected color', async ({ page }) => {
    const headerLink = page
      .locator(`${baseSelectors.tags.headers.h1} ${baseSelectors.tags.coreElements.link}`)
      .filter({ hasText: CommonTestData.nextJsAppsHeaderLinkName });
    await expect(headerLink).toHaveCSS('color', Constants.color.skyBlue);
  });

  test('renders four link cards', async ({ page }) => {
    await expect(page.locator(commonSelectors.nextJsAppsLinkCard)).toHaveCount(
      Constants.commonConstantsData.commonIndexes.four,
    );
  });

  test('shows expected link card copy', async ({ page }) => {
    for (const text of Constants.commonConstantsData.nextJsAppsCommonPhrases.linksCardsText) {
      const card = page.locator(commonSelectors.nextJsAppsLinkCard).filter({ hasText: text });
      await expect(card).toBeVisible();
    }
  });

  test('updates card style on hover', async ({ page }) => {
    for (const text of Constants.commonConstantsData.nextJsAppsCommonPhrases.linksCardsText) {
      await page.reload();
      const card = page.locator(commonSelectors.nextJsAppsLinkCard).filter({ hasText: text });
      await expect(card).not.toHaveCSS('color', Constants.color.skyBlue);
      await card.hover();
      await page.waitForTimeout(2000);
      await expect(card).toHaveCSS('color', Constants.color.skyBlue);
    }
  });

  test('reflects root file content changes', async ({ page }) => {
    const introParagraph = page
      .locator(baseSelectors.tags.paragraph)
      .filter({ hasText: START_MESSAGE });
    await expect(introParagraph).toBeVisible();

    const initialContent = await readFile(REMOTE_ROOT_FILE_PATH, 'utf-8');
    const changedContent = await readFile(REMOTE_CHANGED_CONTENT_PATH, 'utf-8');

    try {
      await writeFile(REMOTE_ROOT_FILE_PATH, changedContent, 'utf-8');
      await page.waitForTimeout(1000);
      await page.reload();
      const changedParagraph = page
        .locator(baseSelectors.tags.paragraph)
        .filter({ hasText: CHANGED_MESSAGE });
      await expect(changedParagraph).toBeVisible();

      await writeFile(REMOTE_ROOT_FILE_PATH, initialContent, 'utf-8');
      await page.waitForTimeout(1000);
      await page.reload();
      await expect(introParagraph).toBeVisible();
    } finally {
      await writeFile(REMOTE_ROOT_FILE_PATH, initialContent, 'utf-8');
    }
  });
});
