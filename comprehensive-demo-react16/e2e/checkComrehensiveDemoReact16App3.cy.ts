import { Constants } from '../../cypress/fixtures/constants';
import { block, baseSelectors } from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

describe('Check is Comprehensive Demo App3 working and have elements', () => {
    beforeEach(() => {
        basePage.openLocalhost(3003)
    })

    it('Check App build and running & Check app elements exist', () => {
        basePage.checkElementExist({
            selector: block.comprehensiveDemoBlockSelectors.firstBlock
        })
        basePage.checkElementExist({
            selector: baseSelectors.header
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.header,
            prop: Constants.commonText.backgroundColor,
            value: Constants.color.oceanBluePearl
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h6,
            text: Constants.elementsText.comprehensiveDemo.App3.headerText
        })
        basePage.checkElementExist({
            selector: block.comprehensiveDemoBlockSelectors.secondBlock
        })
        basePage.checkElementHaveProperty({
            selector: block.comprehensiveDemoBlockSelectors.secondBlock,
            prop: Constants.commonText.backgroundColor,
            value: Constants.color.alabaster
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.commonButtonWithEmoji.replace(
                Constants.commonPhrases.button,
                Constants.elementsText.comprehensiveDemo.App3.buttonText
            )
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.button,
            prop: Constants.commonText.backgroundColor,
            value: Constants.color.paleVioletRed
        })
    })
})