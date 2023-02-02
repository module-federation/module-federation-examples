import {BaseMethods} from "../../../cypress/common/base";
import {commonSelectors} from "../../../cypress/common/selectors";
import {CommonTestData} from "../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

describe('It checks names and symbols inside cards',  () => {
    CommonTestData.commonMicroFrontendsAppsData.forEach((property: { cardName: string, symbolName: string, symbol: string, status: string }) => {
        it(`Checks ${property.symbolName} symbol visibility for ${property.cardName} card`, () => {
            basePage.openLocalhost(4173)
            basePage.checkElementQuantity({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                quantity: 2,
                waitUntil: true
            })
            basePage.checkElementVisibility({
                parentSelector: commonSelectors.commonMicroFrontendsAppsCard,
                selector: property.symbol,
                text: property.status,
                parentElement: property.symbolName === CommonTestData.commonMicroFrontendsAppsData[0].symbolName
            })
        });

        it(`Checks ${property.cardName} card includes status`, () => {
            basePage.openLocalhost(4173)
            basePage.checkElementQuantity({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                quantity: 2,
                waitUntil: true
            })
            basePage.checkElementWithTextPresence({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                text: property.status,
                visibilityState: 'be.visible'
            })
        });
    });
});
