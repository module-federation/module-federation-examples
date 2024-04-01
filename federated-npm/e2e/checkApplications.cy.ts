import { BaseMethods } from '../../cypress-e2e/common/base';
import { baseSelectors } from '../../cypress-e2e/common/selectors';
import { Constants } from '../../cypress-e2e/fixtures/constants';

const basePage: BaseMethods = new BaseMethods();

const appsData = [
  {
    appNameText: Constants.commonConstantsData.commonCountAppNames.app1,
    host: 3001,
  },
  {
    appNameText: Constants.commonConstantsData.commonCountAppNames.app2,
    host: 3002,
  },
  // {
  //     appNameText: Constants.commonConstantsData.commonCountAppNames.app3,
  //     host: 3003
  // },
];

appsData.forEach(function (property: { appNameText: string; host: number }) {
  describe('Federated npm', () => {
    context(`Check ${property.appNameText}`, () => {
      it(`Check header block with text visibility`, () => {
        basePage.openLocalhost({
          number: property.host,
        });
        basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h1,
          text: Constants.commonConstantsData.basicComponents.basicHostRemote,
          visibilityState: 'be.visible',
        });
        basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h2,
          text: property.host === 3003 ? appsData[1].appNameText : `${property.appNameText}`,
          visibilityState: 'be.visible',
        });
      });

      it(`Check button text visibility`, () => {
        basePage.openLocalhost({
          number: property.host,
        });
        basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.button,
          text: Constants.updatedConstantsData.commonAppWithButton.app2,
          visibilityState: 'be.visible',
        });
      });
    });
  });
});
