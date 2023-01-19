import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, buttons, selectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import {SharedStoreCrossFrameworkMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SharedStoreCrossFrameworkMethods = new SharedStoreCrossFrameworkMethods()

const reactComponentButtonsBlockSelector = selectors.sharedStoreCrossFrameworkAppButtonsBlock.replace('{blockType}',
    Constants.commonText.sharedStoreCrossFrameworkAppComponentsTypes.reactType.toUpperCase())
const vueComponentButtonsBlockSelector = selectors.sharedStoreCrossFrameworkAppButtonsBlock.replace('{blockType}',
    Constants.commonText.sharedStoreCrossFrameworkAppComponentsTypes.vueType.toUpperCase())

describe("It checks shared store cross framework app", () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Checks mark with Shell text visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.sharedStoreCrossFrameworkShellPageMark,
            visibilityState: 'be.visible'
        })
    })

    it('Checks clicks counter visibility', () => {
        basePage.checkElementVisibility(selectors.sharedStoreCrossFrameworkAppClicksCounter)
    })

    it('Checks that button colors in different blocks is not equal', () => {
        methodsPage.checkDifferInButtonsColors(reactComponentButtonsBlockSelector, vueComponentButtonsBlockSelector)
    })

    it('Checks that number can be increased by react button and decreased by vue button', () => {
        methodsPage.changeCounterValue({
            firstButtonsBlock: reactComponentButtonsBlockSelector,
            secondButtonsBlock: vueComponentButtonsBlockSelector
        })
    })

    it('Checks that number can be decreased by react button and increased by vue button & check counter is cleared after reload', () => {
        methodsPage.changeCounterValue({
            firstButtonsBlock: vueComponentButtonsBlockSelector,
            secondButtonsBlock: reactComponentButtonsBlockSelector
        })
        cy.reload()
        basePage.checkElementWithTextPresence({
            selector: selectors.sharedStoreCrossFrameworkAppClicksCounter,
            text: Constants.commonText.sharedStoreCrossFrameworkCounterValues.zero,
            visibilityState: 'be.visible'
        })
    })

    it('Checks that increase/decrease actions from both blocks can be executed one by one', () => {
        methodsPage.clickAndCheckCounterValue({
            selector: buttons.sharedStoreCrossFrameworkAppActionsButtons.incrementButton,
            value: Constants.commonText.sharedStoreCrossFrameworkCounterValues.one
        })
        methodsPage.clickAndCheckCounterValue({
            selector: buttons.sharedStoreCrossFrameworkAppActionsButtons.decrementButton,
            value: Constants.commonText.sharedStoreCrossFrameworkCounterValues.zero
        })
    })
})
