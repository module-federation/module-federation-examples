import { test } from '@playwright/test';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

const appsData = [
  {
    headerText: Constants.elementsText.serverSideRenderOnlyApp.headers.host,
    sharedComponentText: Constants.elementsText.serverSideRenderOnlyApp.components.sharedComponent,
    updatedSharedComponentText:
      Constants.elementsText.serverSideRenderOnlyApp.components.updatedSharedComponent,
    host: 3000,
  },
  {
    headerText: Constants.elementsText.serverSideRenderOnlyApp.headers.remote,
    sharedComponentText: Constants.elementsText.serverSideRenderOnlyApp.components.sharedComponent,
    updatedSharedComponentText:
      Constants.elementsText.serverSideRenderOnlyApp.components.updatedSharedComponent,
    host: 3001,
  },
];

const repoRoot = path.resolve(__dirname, '../../..');
const sharedComponentPath = path.resolve(
  repoRoot,
  Constants.filesPath.serverSideRenderOnlyChangeFilePath,
);
const initialSharedComponentContent = readFileSync(sharedComponentPath, 'utf-8');

const writeSharedComponent = (content: string): void => {
  writeFileSync(sharedComponentPath, content, 'utf-8');
};

test.describe('Server Side Render Only', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(() => {
    writeSharedComponent(Constants.elementsText.serverSideRenderOnlyApp.contents.originalContent);
  });

  test.afterEach(() => {
    writeSharedComponent(initialSharedComponentContent);
  });

  appsData.forEach(({ headerText, sharedComponentText, updatedSharedComponentText, host }) => {
    test.describe(`Check ${headerText} App`, () => {
      let basePage: BaseMethods;

      test.beforeEach(async ({ page }) => {
        basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: host });
      });

      test('Check app build and running + elements exist', async () => {
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h1,
          text: headerText,
          visibilityState: 'be.visible',
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: sharedComponentText,
          visibilityState: 'be.visible',
        });
      });

      test('Update Shared component file', async () => {
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: sharedComponentText,
          visibilityState: 'be.visible',
        });

        writeSharedComponent(
          Constants.elementsText.serverSideRenderOnlyApp.contents.changedContent,
        );

        await basePage.reloadWindow();
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: updatedSharedComponentText,
          visibilityState: 'be.visible',
        });
      });

      test('Check Shared component visibility in both apps after updating', async () => {
        writeSharedComponent(
          Constants.elementsText.serverSideRenderOnlyApp.contents.changedContent,
        );

        const otherHost = host === 3000 ? 3001 : 3000;
        await basePage.openLocalhost({ number: otherHost });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: updatedSharedComponentText,
          visibilityState: 'be.visible',
        });
        await basePage.reloadWindow();
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: updatedSharedComponentText,
          visibilityState: 'be.visible',
        });

        writeSharedComponent(
          Constants.elementsText.serverSideRenderOnlyApp.contents.originalContent,
        );
      });

      test('Check app build and running & shared component visibility after reset', async () => {
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h1,
          text: headerText,
          visibilityState: 'be.visible',
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: sharedComponentText,
          visibilityState: 'be.visible',
        });
      });
    });
  });
});

test.afterAll(() => {
  writeSharedComponent(Constants.elementsText.serverSideRenderOnlyApp.contents.originalContent);
});
