import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import {SharedStoreCrossFrameworkMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SharedStoreCrossFrameworkMethods = new SharedStoreCrossFrameworkMethods()

const reactComponentButtonsBlockSelector = selectors.sharedStoreCrossFrameworkApp.buttonsBlock.replace('{blockType}',
    Constants.elementsText.sharedStoreCrossFrameworkApp.componentsTypes.reactType.toUpperCase())
const vueComponentButtonsBlockSelector = selectors.sharedStoreCrossFrameworkApp.buttonsBlock.replace('{blockType}',
    Constants.elementsText.sharedStoreCrossFrameworkApp.componentsTypes.vueType.toUpperCase())

describe('Shared Store Cross Framework', () => {
    context("It checks shared store cross framework app", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3001
            })
        })
    
        it('Checks mark with Shell text visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.sharedStoreCrossFrameworkApp.pageMark,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks clicks counter visibility', () => {
            basePage.checkElementVisibility({
                selector: selectors.sharedStoreCrossFrameworkApp.clicksCounter
            })
        })
    
        it('Checks that button colors in different blocks is not equal', () => {
            methodsPage.checkDifferInButtonsColors(reactComponentButtonsBlockSelector, vueComponentButtonsBlockSelector)
        })
    
        it('Checks that number can be increased by react button and decreased by vue button', () => {
            basePage.checkCounterFunctionality({
                button: `${reactComponentButtonsBlockSelector} ${selectors.sharedStoreCrossFrameworkApp.actionButtons.increment}`,
                counterElement: selectors.sharedStoreCrossFrameworkApp.clicksCounter,
                counterText: Constants.commonConstantsData.commonIndexes.zero.toString(),
                isButtonTexted: false
            })
            basePage.checkCounterFunctionality({
                button: `${vueComponentButtonsBlockSelector} ${selectors.sharedStoreCrossFrameworkApp.actionButtons.decrement}`,
                counterElement: selectors.sharedStoreCrossFrameworkApp.clicksCounter,
                counterText: Constants.commonConstantsData.commonIndexes.one.toString(),
                isButtonTexted: false,
                isCounterDecreased: true
            })
        })
    
        it('Checks that number can be decreased by react button and increased by vue button & check counter is cleared after reload', () => {
            basePage.checkCounterFunctionality({
                button: `${vueComponentButtonsBlockSelector} ${selectors.sharedStoreCrossFrameworkApp.actionButtons.increment}`,
                counterElement: selectors.sharedStoreCrossFrameworkApp.clicksCounter,
                counterText: Constants.commonConstantsData.commonIndexes.zero.toString(),
                isButtonTexted: false
            })
            basePage.checkCounterFunctionality({
                button: `${reactComponentButtonsBlockSelector} ${selectors.sharedStoreCrossFrameworkApp.actionButtons.decrement}`,
                counterElement: selectors.sharedStoreCrossFrameworkApp.clicksCounter,
                counterText: Constants.commonConstantsData.commonIndexes.one.toString(),
                isButtonTexted: false,
                isCounterDecreased: true,
                isReloaded: true,
                isCounterValueUsed: true
            })
        })
    
        it('Checks that increase/decrease actions from both blocks can be executed one by one', () => {
            basePage.checkCounterFunctionality({
                button: `${vueComponentButtonsBlockSelector} ${selectors.sharedStoreCrossFrameworkApp.actionButtons.increment}`,
                counterElement: selectors.sharedStoreCrossFrameworkApp.clicksCounter,
                counterText: Constants.commonConstantsData.commonIndexes.zero.toString(),
                isButtonTexted: false
            })
            basePage.checkCounterFunctionality({
                button: `${reactComponentButtonsBlockSelector} ${selectors.sharedStoreCrossFrameworkApp.actionButtons.increment}`,
                counterElement: selectors.sharedStoreCrossFrameworkApp.clicksCounter,
                counterText: Constants.commonConstantsData.commonIndexes.one.toString(),
                isButtonTexted: false,
                counterValue: Constants.commonConstantsData.commonIndexes.two.toString(),
            })
            basePage.checkCounterFunctionality({
                button: `${vueComponentButtonsBlockSelector} ${selectors.sharedStoreCrossFrameworkApp.actionButtons.decrement}`,
                counterElement: selectors.sharedStoreCrossFrameworkApp.clicksCounter,
                counterText: Constants.commonConstantsData.commonIndexes.two.toString(),
                isButtonTexted: false
            })
            basePage.checkCounterFunctionality({
                button: `${reactComponentButtonsBlockSelector} ${selectors.sharedStoreCrossFrameworkApp.actionButtons.decrement}`,
                counterElement: selectors.sharedStoreCrossFrameworkApp.clicksCounter,
                counterText: Constants.commonConstantsData.commonIndexes.one.toString(),
                isButtonTexted: false,
                isCounterDecreased: true
            })
        })
    })
})
