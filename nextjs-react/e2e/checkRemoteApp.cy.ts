import { BaseMethods } from '../../cypress-e2e/common/base';
import { baseSelectors } from '../../cypress-e2e/common/selectors';
import { Constants } from '../../cypress-e2e/fixtures/constants';
import { CssAttr } from '../../cypress-e2e/types/cssAttr';

const basePage: BaseMethods = new BaseMethods();

describe('NextJS React', () => {
  // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
  // before(() => {
  //     basePage.buildTheSample(Constants.samplesPath.nextjsReact)
  // })

  // after(() => {
  //     basePage.shutdownTheSample(Constants.samplesPath.nextjsReact)
  // })
  context('Check remote app', () => {
    beforeEach(() => {
      basePage.openLocalhost({
        number: 3001,
      });
    });

    it('Check button exists', () => {
      basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.button,
        text: Constants.elementsText.nextJsReactApp.buttons.remote,
      });
    });

    it('Check button color', () => {
      basePage.checkElementHaveProperty({
        selector: baseSelectors.tags.coreElements.button,
        text: Constants.elementsText.nextJsReactApp.buttons.remote,
        prop: CssAttr.background,
        value: Constants.color.darkMutedBlue,
      });
    });
  });
});
