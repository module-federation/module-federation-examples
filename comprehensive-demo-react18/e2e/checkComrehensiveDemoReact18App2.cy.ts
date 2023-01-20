import { dialogs } from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";
import { block, baseSelectors } from "../../cypress/common/selectors";
import { Constants } from "../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('Check is Comprehensive Demo App2 working and have elements', () => {
    beforeEach(() => {
        basePage.openLocalhost(3002)
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
        basePage.checkElementExist({
            selector: block.comprehensiveDemoBlockSelectors.secondBlock
        })
        basePage.checkElementHaveProperty({
            selector: block.comprehensiveDemoBlockSelectors.secondBlock,
            prop: Constants.commonText.backgroundColor,
            value: Constants.color.alabaster
        })
        basePage.checkElementExist({
            selector: block.comprehensiveDemoBlockSelectors.thirdBlock
        })
        basePage.checkElementHaveProperty({
            selector: block.comprehensiveDemoBlockSelectors.thirdBlock,
            prop: Constants.commonText.backgroundColor,
            value: Constants.color.white
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h6,
            text: Constants.elementsText.comprehensiveDemo.App2.headerText
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h6,
            text: Constants.elementsText.comprehensiveDemo.App2.paragraphText
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemo.App2.openDialogButtonText
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemo.App2.openDialogButtonText
        })
        basePage.checkElementExist({
            selector: dialogs.comprehensiveDemoDialogApp2
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogHeader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogButtonText
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogButtonText
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h6,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogTabs.headerText
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogTabs.firstTab.name
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogTabs.firstTab.paragraphText
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogTabs.secondTab.name
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogTabs.secondTab.name
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogTabs.secondTab.paragraphText
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogTabs.secondTab.buttonText
        })
        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemo.App2.dialogTabs.secondTab.buttonText,
            prop: Constants.commonText.backgroundColor,
            value: Constants.color.paleVioletRed
        })
    })
})