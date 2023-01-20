import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { CssAttr } from '../../cypress/types/cssAttr';

const basePage: BaseMethods = new BaseMethods()

describe("Check App 2", () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.Nested)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.Nested)
        // })

    beforeEach(() => {
        basePage.openLocalhost(3002)
    })

    it('Check elements exist', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.nestedApp3Button})
            
        basePage.checkElementContainText({
            selector: baseSelectors.root,
            text: Constants.elementsText.nestedApp2Container
        })
    })

    it('Check colors', () => {
        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.nestedApp2Container,
            prop: CssAttr.backgroundColor,
            value: Constants.color.chineseSilver
        })

        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.elementsText.nestedApp3Button,
            prop: CssAttr.background,
            value: Constants.color.aquamarine
        })
    })
})
