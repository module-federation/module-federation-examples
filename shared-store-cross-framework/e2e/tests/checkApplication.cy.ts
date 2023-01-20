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
        basePage.checkCounterFunctionality({
            button: `${reactComponentButtonsBlockSelector} ${buttons.sharedStoreCrossFrameworkAppActionsButtons.incrementButton}`,
            counterElement: selectors.sharedStoreCrossFrameworkAppClicksCounter,
            counterText: Constants.commonText.sharedStoreCrossFrameworkCounterValues.zero,
            isButtonTexted: false
        })
        basePage.checkCounterFunctionality({
            button: `${vueComponentButtonsBlockSelector} ${buttons.sharedStoreCrossFrameworkAppActionsButtons.decrementButton}`,
            counterElement: selectors.sharedStoreCrossFrameworkAppClicksCounter,
            counterText: Constants.commonText.sharedStoreCrossFrameworkCounterValues.one,
            isButtonTexted: false,
            isCounterDecreased: true
        })
    })

    it('Checks that number can be decreased by react button and increased by vue button & check counter is cleared after reload', () => {
        basePage.checkCounterFunctionality({
            button: `${vueComponentButtonsBlockSelector} ${buttons.sharedStoreCrossFrameworkAppActionsButtons.incrementButton}`,
            counterElement: selectors.sharedStoreCrossFrameworkAppClicksCounter,
            counterText: Constants.commonText.sharedStoreCrossFrameworkCounterValues.zero,
            isButtonTexted: false
        })
        basePage.checkCounterFunctionality({
            button: `${reactComponentButtonsBlockSelector} ${buttons.sharedStoreCrossFrameworkAppActionsButtons.decrementButton}`,
            counterElement: selectors.sharedStoreCrossFrameworkAppClicksCounter,
            counterText: Constants.commonText.sharedStoreCrossFrameworkCounterValues.one,
            isButtonTexted: false,
            isCounterDecreased: true,
            isReloaded: true,
            isCounterValueUsed: true
        })
    })

    it('Checks that increase/decrease actions from both blocks can be executed one by one', () => {
        basePage.checkCounterFunctionality({
            button: `${vueComponentButtonsBlockSelector} ${buttons.sharedStoreCrossFrameworkAppActionsButtons.incrementButton}`,
            counterElement: selectors.sharedStoreCrossFrameworkAppClicksCounter,
            counterText: Constants.commonText.sharedStoreCrossFrameworkCounterValues.zero,
            isButtonTexted: false
        })
        basePage.checkCounterFunctionality({
            button: `${reactComponentButtonsBlockSelector} ${buttons.sharedStoreCrossFrameworkAppActionsButtons.incrementButton}`,
            counterElement: selectors.sharedStoreCrossFrameworkAppClicksCounter,
            counterText: Constants.commonText.sharedStoreCrossFrameworkCounterValues.one,
            isButtonTexted: false,
            counterValue: Constants.commonText.sharedStoreCrossFrameworkCounterValues.two,
        })
        basePage.checkCounterFunctionality({
            button: `${vueComponentButtonsBlockSelector} ${buttons.sharedStoreCrossFrameworkAppActionsButtons.decrementButton}`,
            counterElement: selectors.sharedStoreCrossFrameworkAppClicksCounter,
            counterText: Constants.commonText.sharedStoreCrossFrameworkCounterValues.two,
            isButtonTexted: false
        })
        basePage.checkCounterFunctionality({
            button: `${reactComponentButtonsBlockSelector} ${buttons.sharedStoreCrossFrameworkAppActionsButtons.decrementButton}`,
            counterElement: selectors.sharedStoreCrossFrameworkAppClicksCounter,
            counterText: Constants.commonText.sharedStoreCrossFrameworkCounterValues.one,
            isButtonTexted: false,
            isCounterDecreased: true
        })
    })
})
