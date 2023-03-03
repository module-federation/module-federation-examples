import {BaseMethods} from "../../../cypress/common/base";
import {commonSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

describe('Vite Svelte Microfrontends', () => {
    context("It checks host app", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 4173
            })
        })
    
        it('Checks that remote component card appears after loading', () => {
            basePage.checkElementQuantity({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                quantity: 1
            })
            basePage.checkElementWithTextPresence({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                text: Constants.elementsText.commonMicroFrontendsApps.cardMessages.hostCard,
                visibilityState: 'be.visible'
            })
            basePage.checkElementQuantity({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                quantity: 2,
                waitUntil: true
            })
            basePage.checkElementWithTextPresence({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                text: Constants.elementsText.commonMicroFrontendsApps.cardMessages.remoteCard,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks host app card color is set to blue', () => {
            basePage.checkElementHaveProperty({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                text: Constants.elementsText.commonMicroFrontendsApps.cardMessages.hostCard,
                prop: CssAttr.css,
                value: Constants.color.blue,
                checkType: 'contain'
            })
        })
    
        it('Checks remote app card color is set to black', () => {
            basePage.checkElementQuantity({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                quantity: 2,
                waitUntil: true
            })
            basePage.checkElementHaveProperty({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                text: Constants.elementsText.commonMicroFrontendsApps.cardMessages.remoteCard,
                prop: CssAttr.css,
                value: Constants.color.black,
                checkType: 'contain'
            })
        })
    
        it('Checks console messages', () => {
            Constants.commonPhrases.viteSvelteMicroFrontEndsApp.consoleMessages.forEach((message: string) => {
                basePage.checkInfoInConsole(message)
            })
        })
    });
})
