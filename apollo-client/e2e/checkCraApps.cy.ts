import { baseSelectors } from './../../cypress-e2e/common/selectors';
import { BaseMethods } from '../../cypress-e2e/common/base';
import { Constants } from '../../cypress-e2e/fixtures/constants';

const basePage: BaseMethods = new BaseMethods();

const appsData = [
  {
    host: 3001,
  },
];

appsData.forEach((property: { appNameText: string; host: number }) => {
  const appName = property.appNameText;

  describe('Apollo Client', () => {
    context(`Check apollo-client`, () => {
      beforeEach(() => {
        basePage.openLocalhost({
          number: property.host,
        });
      });

      it(`Check Host elements exist on the page`, () => {
        basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h1,
          text: 'Module Federation Example: React 18 + Apollo Client',
        });
      });

      it(`Check App2 elements exist on the page`, () => {
        basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h2,
          text: 'This is a component from App 2.',
        });
      });
    });
  });
});
