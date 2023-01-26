import {baseSelectors, buttons, selectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {BaseMethods} from "../../../cypress/common/base";
import {SharedStoreCrossFrameworkMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SharedStoreCrossFrameworkMethods = new SharedStoreCrossFrameworkMethods()

describe('It checks shared-store-cross-framework sample', () => {
    const appsData = [
        {
            name: Constants.elementsText.sharedStoreCrossFrameworkApp.componentsTypes.reactType,
            buttonsBlock: selectors.sharedStoreCrossFrameworkAppButtonsBlock.replace('{blockType}',
                Constants.elementsText.sharedStoreCrossFrameworkApp.componentsTypes.reactType.toUpperCase()),
            blockName:  Constants.elementsText.sharedStoreCrossFrameworkApp.blocksNames.reactModule,
            color: Constants.color.lightBlue
        },
        {
            name: Constants.elementsText.sharedStoreCrossFrameworkApp.componentsTypes.vueType,
            buttonsBlock: selectors.sharedStoreCrossFrameworkAppButtonsBlock.replace('{blockType}',
                Constants.elementsText.sharedStoreCrossFrameworkApp.componentsTypes.vueType.toUpperCase()),
            blockName: Constants.elementsText.sharedStoreCrossFrameworkApp.blocksNames.vueModule,
            color: Constants.color.lightGreen
        }
    ]

    appsData.forEach((property: { name: string, buttonsBlock: string, blockName: string, color: string }) => {
        it(`Checks ${property.name} buttons block visibility`, () => {
            basePage.openLocalhost(3001)
            basePage.checkElementVisibility(property.buttonsBlock)
        });

        it(`Checks ${property.name} buttons block includes element with block name`, () => {
            basePage.openLocalhost(3001)
            basePage.checkElementWithTextPresence({
                parentSelector: property.buttonsBlock,
                selector: baseSelectors.divElement,
                text: property.blockName,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks ${property.name} buttons block includes two buttons`, () => {
            basePage.openLocalhost(3001)
            basePage.checkElementQuantity({
                parentSelector: property.buttonsBlock,
                selector: baseSelectors.button,
                quantity: 2
            })
        });

        it(`Checks ${property.name} buttons color`, () => {
            basePage.openLocalhost(3001)
            methodsPage.findValueInMultipleButtons({
                buttonsBlockSelector: property.buttonsBlock,
                cssValue : property.color
            })
        });

        it(`Checks ${property.name} block includes increment and decrement one`, () => {
            basePage.openLocalhost(3001)
            methodsPage.findValueInMultipleButtons({
                buttonsBlockSelector: property.buttonsBlock,
                text : Constants.elementsText.sharedStoreCrossFrameworkApp.mathSigns.plus
            })
            methodsPage.findValueInMultipleButtons({
                buttonsBlockSelector: property.buttonsBlock,
                text : Constants.elementsText.sharedStoreCrossFrameworkApp.mathSigns.minus
            })
        });

        it(`Checks that buttons in ${property.name} block are not disabled`, () => {
            basePage.openLocalhost(3001)
            basePage.checkElementState({
                parentSelector: property.buttonsBlock,
                selector: baseSelectors.button,
                state: 'not.be.disabled'
            })
        });

        it.only(`Checks increase/decrease actions by ${property.name} buttons + check counter can have negative value`, () => {
            basePage.openLocalhost(3001)
            basePage.checkCounterFunctionality({
                button:`${property.buttonsBlock} ${buttons.sharedStoreCrossFrameworkAppActionsButtons.incrementButton}`,
                counterElement: selectors.sharedStoreCrossFrameworkAppClicksCounter,
                counterText: Constants.commonConstantsData.commonIndexes.zero.toString(),
                isButtonTexted: false
            })
            basePage.checkCounterFunctionality({
                button:`${property.buttonsBlock} ${buttons.sharedStoreCrossFrameworkAppActionsButtons.decrementButton}`,
                counterElement: selectors.sharedStoreCrossFrameworkAppClicksCounter,
                counterText: Constants.commonConstantsData.commonIndexes.one.toString(),
                isButtonTexted: false,
                isCounterDecreased: true
            })
            basePage.checkCounterFunctionality({
                button:`${property.buttonsBlock} ${buttons.sharedStoreCrossFrameworkAppActionsButtons.decrementButton}`,
                counterElement: selectors.sharedStoreCrossFrameworkAppClicksCounter,
                counterText: Constants.commonConstantsData.commonIndexes.zero.toString(),
                isButtonTexted: false,
                isCounterDecreased: true,
                counterValue: Constants.commonConstantsData.commonIndexes.minusOne.toString(),
            })
        });
    });
})