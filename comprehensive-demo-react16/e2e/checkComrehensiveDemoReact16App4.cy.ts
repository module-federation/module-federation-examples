import { Constants } from '../../cypress-e2e/fixtures/constants';
import { baseSelectors } from '../../cypress-e2e/common/selectors';
import { BaseMethods } from '../../cypress-e2e/common/base';

const basePage: BaseMethods = new BaseMethods();

describe('Comprehemsive Demo React 16', () => {
  context('Check is Comprehensive Demo App4 working and have elements', () => {
    beforeEach(() => {
      basePage.openLocalhost({
        number: 3004,
      });
    });

    it('Check App build and running & Check app elements exist', () => {
      basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.headers.h1,
        text: Constants.elementsText.comprehensiveDemoApp.App4.headerText,
      });
    });
  });
});
