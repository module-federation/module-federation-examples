import { Constants } from '../../cypress/fixtures/constants';
import { block, baseSelectors } from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";
import {CssAttr} from "../../cypress/types/cssAttr";

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
            prop: CssAttr.backgroundColor,
            value: Constants.color.oceanBluePearl
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h6,
            text: Constants.elementsText.comprehensiveDemoApp.App3.headerText
        })
        basePage.checkElementExist({
            selector: block.comprehensiveDemoBlockSelectors.secondBlock
        })
        basePage.checkElementHaveProperty({
            selector: block.comprehensiveDemoBlockSelectors.secondBlock,
            prop: CssAttr.backgroundColor,
            value: Constants.color.alabaster
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonConstantsData.commonButtonWithEmoji.replace(
                Constants.commonConstantsData.button,
                Constants.elementsText.comprehensiveDemoApp.App3.buttonText
            )
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.button,
            prop: CssAttr.backgroundColor,
            value: Constants.color.paleVioletRed
        })
    })
})