import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {BaseMethods} from "../../../cypress/common/base";
import {SharedStoreCrossFrameworkMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SharedStoreCrossFrameworkMethods = new SharedStoreCrossFrameworkMethods()

describe('It checks shared-store-cross-framework sample', () => {
    const appsData = [
        {
            name: Constants.commonText.sharedStoreCrossFrameworkAppComponentsTypes.reactType,
            buttonsBlock: selectors.sharedStoreCrossFrameworkAppButtonsBlock.replace('{blockType}',
                Constants.commonText.sharedStoreCrossFrameworkAppComponentsTypes.reactType.toUpperCase()),
            blockName: Constants.commonText.sharedStoreCrossFrameworkAppButtonsBlocksNames.reactModule,
            color: Constants.color.lightBlue
        },
        {
            name: Constants.commonText.sharedStoreCrossFrameworkAppComponentsTypes.vueType,
            buttonsBlock: selectors.sharedStoreCrossFrameworkAppButtonsBlock.replace('{blockType}',
                Constants.commonText.sharedStoreCrossFrameworkAppComponentsTypes.vueType.toUpperCase()),
            blockName: Constants.commonText.sharedStoreCrossFrameworkAppButtonsBlocksNames.vueModule,
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
                text : Constants.commonText.commonMathSigns.plusSign
            })
            methodsPage.findValueInMultipleButtons({
                buttonsBlockSelector: property.buttonsBlock,
                text : Constants.commonText.commonMathSigns.minusSign
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

        it(`Checks increase/decrease actions by ${property.name} buttons + check counter can have negative value`, () => {
            basePage.openLocalhost(3001)
            methodsPage.changeCounterValue({
                baseButtonsBlock: property.buttonsBlock,
            })
        });
    });
})