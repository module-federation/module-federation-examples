import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { CssAttr } from '../../cypress/types/cssAttr';

const basePage: BaseMethods = new BaseMethods()

describe("Check App 3", () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.Nested)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.Nested)
        // })

    beforeEach(() => {
        basePage.openLocalhost(3003)
    })

    it('Check button exists', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.nestedApp3Button})
    })

    it('Check button color', () => {
        basePage.checkElementWithTextHaveCssProperty(
            baseSelectors.button,
            Constants.elementsText.nestedApp3Button,
            CssAttr.background,
            Constants.color.aquamarine)
    })
})