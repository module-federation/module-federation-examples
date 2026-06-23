import { expect, test } from '@playwright/test';
import path from 'path';
import { readFileSync } from 'fs';

import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors, updatedSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

const appsData = [
  {
    host: 3001,
    appName: Constants.commonConstantsData.commonCountAppNames.app1,
    webpackConfigPath: Constants.filesPath.selfHealingAppsConfigs.app1,
  },
  {
    host: 3002,
    appName: Constants.commonConstantsData.commonCountAppNames.app2,
    webpackConfigPath: Constants.filesPath.selfHealingAppsConfigs.app2,
  },
];

const repoRoot = path.resolve(__dirname, '../../..');

appsData.forEach(({ host, appName, webpackConfigPath }) => {
  test.describe(`Self-Healing app on localhost:${host}`, () => {
    let basePage: BaseMethods;

    test.beforeEach(async ({ page }) => {
      basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: host });
    });

    test(`Checks ${Constants.commonPhrases.selfHealingApp.headerName} header visibility`, async () => {
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.div,
        text: Constants.commonPhrases.selfHealingApp.headerName,
        visibilityState: 'be.visible',
      });
    });

    test(`Checks ${appName} app name visibility`, async () => {
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.div,
        text: appName,
        visibilityState: 'be.visible',
      });
    });

    test(`Checks button text visibility for ${appName}`, async () => {
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.button,
        text: Constants.commonConstantsData.commonButtonWithEmoji,
        visibilityState: 'be.visible',
      });
    });

    test(`Checks that button on ${appName} has pink color`, async () => {
      await basePage.checkElementHaveProperty({
        selector: baseSelectors.tags.coreElements.button,
        prop: 'background-color',
        value: Constants.color.pink,
      });
    });

    test('Checks that app names are not equal across hosts', async () => {
      const otherHost = host === appsData[0].host ? appsData[1].host : appsData[0].host;
      await basePage.compareInfoBetweenHosts(updatedSelectors.common.appName, otherHost, false);
    });
  });

  test(`Checks webpack config for ${appName}`, async () => {
    const filePath = path.resolve(repoRoot, webpackConfigPath);
    const content = readFileSync(filePath, 'utf-8');
    const section =
      content.split(Constants.commonPhrases.selfHealingApp.configs.separator)[1] ?? '';
    const shouldContain = !webpackConfigPath.includes('app1');

    if (shouldContain) {
      expect(section).toContain(Constants.commonPhrases.selfHealingApp.configs.searchedString);
    } else {
      expect(section).not.toContain(Constants.commonPhrases.selfHealingApp.configs.searchedString);
    }
  });
});
