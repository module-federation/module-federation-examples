import {BaseMethods} from "../../../cypress/common/base";
import {commonSelectors} from "../../../cypress/common/selectors";
import {CommonTestData} from "../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

describe('Vite Svelte Microfrontends',  () => {
    context('It checks names and symbols inside cards', () => {
        CommonTestData.commonMicroFrontendsAppsData.forEach((property: { cardName: string, symbolName: string, symbol: string, status: string }) => {
            it(`Checks ${property.symbolName} symbol visibility for ${property.cardName} card`, () => {
                basePage.openLocalhost({
                    number: 4173
                })
                basePage.checkElementQuantity({
                    selector: commonSelectors.commonMicroFrontendsAppsCard,
                    quantity: 2,
                    waitUntil: true
                })
                basePage.checkElementVisibility({
                    parentSelector: commonSelectors.commonMicroFrontendsAppsCard,
                    selector: property.symbol,
                    text: property.status,
                    parentElement: true
                })
            });
    
            it(`Checks ${property.cardName} card includes status`, () => {
                basePage.openLocalhost({
                    number: 4173
                })
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
});
