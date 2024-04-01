import { Constants } from '../../cypress-e2e/fixtures/constants';
import { baseSelectors, selectors } from '../../cypress-e2e/common/selectors';
import { BaseMethods } from '../../cypress-e2e/common/base';
import { CssAttr } from '../../cypress-e2e/types/cssAttr';

const basePage: BaseMethods = new BaseMethods();

describe('Comprehemsive Demo React 16', () => {
  context('Check is Comprehensive Demo App3 working and have elements', () => {
    beforeEach(() => {
      basePage.openLocalhost({
        number: 3003,
      });
    });

    it('Check App build and running & Check app elements exist', () => {
      basePage.checkElementVisibility({
        selector: selectors.comprehensiveDemoApp.blockSelectors.firstBlock,
      });
      basePage.checkElementVisibility({
        selector: baseSelectors.tags.headers.header,
      });
      basePage.checkElementHaveProperty({
        selector: baseSelectors.tags.headers.header,
        prop: CssAttr.backgroundColor,
        value: Constants.color.oceanBluePearl,
      });
      basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.headers.h6,
        text: Constants.elementsText.comprehensiveDemoApp.App3.headerText,
      });
      basePage.checkElementVisibility({
        selector: selectors.comprehensiveDemoApp.blockSelectors.secondBlock,
      });
      basePage.checkElementHaveProperty({
        selector: selectors.comprehensiveDemoApp.blockSelectors.secondBlock,
        prop: CssAttr.backgroundColor,
        value: Constants.color.alabaster,
      });
      basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.button,
        text: Constants.commonConstantsData.commonButtonWithEmoji.replace(
          Constants.commonConstantsData.button,
          Constants.elementsText.comprehensiveDemoApp.App3.buttonText,
        ),
      });
      basePage.checkElementHaveProperty({
        selector: baseSelectors.tags.coreElements.button,
        prop: CssAttr.backgroundColor,
        value: Constants.color.paleVioletRed,
      });
    });
  });
});
