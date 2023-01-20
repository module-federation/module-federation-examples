import {BaseMethods} from "../../../cypress/common/base";
import {selectors} from "../../../cypress/common/selectors";
import {CommonTestData} from "../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

describe('It checks names and symbols inside cards',  () => {
    CommonTestData.commonMicroFrontendsAppsData.forEach((property: { cardName: string, symbolName: string, symbol: string, status: string }) => {
        it(`Checks ${property.symbolName} symbol visibility for ${property.cardName} card`, () => {
            basePage.openLocalhost(5173)
            basePage.checkElementQuantity({
                selector: selectors.commonCardSelector,
                quantity: 2,
                waitUntil: true
            })
            basePage.checkChildElementVisibility(selectors.commonCardSelector, property.symbol, true , 'be.visible', property.status)
        });

        it(`Checks ${property.cardName} card includes status`, () => {
            basePage.openLocalhost(5173)
            basePage.checkElementQuantity({
                selector: selectors.commonCardSelector,
                quantity: 2,
                waitUntil: true
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.commonCardSelector,
                text: property.status,
                visibilityState: 'be.visible'
            })
        });
    });
});
