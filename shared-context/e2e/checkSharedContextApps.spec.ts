import { Constants } from '../../cypress-e2e/fixtures/constants';
import { test } from '../../playwright-e2e/common/testFixtures';
import { SharedContextPage } from './page-objects/sharedContextPage';

interface SharedContextAppConfig {
  header: string;
  subheader: string;
  paragraph: string;
  port: number;
}

const appsUnderTest: SharedContextAppConfig[] = [
  {
    header: Constants.elementsText.sharedContextApp.header,
    subheader: Constants.commonConstantsData.commonCountAppNames.app1,
    paragraph: Constants.elementsText.sharedContextApp.app1.paragraph,
    port: 3001,
  },
  {
    header: Constants.elementsText.sharedContextApp.header,
    subheader: Constants.commonConstantsData.commonCountAppNames.app2,
    paragraph: Constants.elementsText.sharedContextApp.app2.paragraph,
    port: 3002,
  },
];

test.describe('Shared Context', () => {
  for (const app of appsUnderTest) {
    test(`renders shared context for ${app.subheader}`, async ({ page }) => {
      const sharedContextPage = new SharedContextPage(page);
      const { port, ...expectations } = app;

      await sharedContextPage.open(port);
      await sharedContextPage.expectSharedContextContent(expectations);
    });
  }
});
