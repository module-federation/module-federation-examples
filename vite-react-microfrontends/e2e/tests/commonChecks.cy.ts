import {BaseMethods} from "../../../cypress/common/base";
import {selectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('It checks names and symbols inside cards',  () => {
    const appsData = [
        {
            cardName: Constants.commonText.viteReactMicroFrontendsCardsNames.hostCard,
            symbolName: Constants.commonText.viteReactMicroFrontendsCardsSymbolsNames.starSymbol,
            symbol: selectors.viteReactMicroFrontendsCardsSymbols.starSymbol,
            status: Constants.elementsText.viteReactMicroFrontendsCardsMessages.hostCard
        },
        {
            cardName:  Constants.commonText.viteReactMicroFrontendsCardsNames.remoteCard,
            symbolName: Constants.commonText.viteReactMicroFrontendsCardsSymbolsNames.cloudSymbol,
            symbol: selectors.viteReactMicroFrontendsCardsSymbols.cloudSymbol,
            status: Constants.elementsText.viteReactMicroFrontendsCardsMessages.remoteCard
        }
    ]

    appsData.forEach((property: { cardName: string, symbolName: string, symbol: string, status: string }) => {
        it(`Checks ${property.symbolName} symbol visibility for ${property.cardName} card`, () => {
            basePage.openLocalhost(4173)
            basePage.checkElementQuantity({
                selector: selectors.commonCardSelector,
                quantity: 2,
                waitUntil: true
            })
            basePage.checkChildElementVisibility(selectors.commonCardSelector, property.symbol, true , 'be.visible', property.status)
        });

        it(`Checks ${property.cardName} card includes status`, () => {
            basePage.openLocalhost(4173)
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
