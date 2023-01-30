import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

const commonButtonsQuantity: number = 2

describe("It checks host app", () => {
    beforeEach(() => {
        basePage.openLocalhost(4173)
    })

    it('Checks console greeting message', () => {
        basePage.checkInfoInConsole(Constants.commonPhrases.viteSvelteMicroFrontEndsApp.consoleMessages[2])
    })

    it('Checks both cards includes button', () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.button,
            quantity: commonButtonsQuantity,
            waitUntil: true
        })
        basePage.checkElementQuantity({
            parentSelector: selectors.commonCardSelector,
            selector: baseSelectors.button,
            quantity: commonButtonsQuantity,
        })
    })

    it('Checks both cards button is not disabled', () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.button,
            quantity: commonButtonsQuantity,
            waitUntil: true
        })
        basePage.checkElementState({
            selector: baseSelectors.button,
            state: ':disabled',
            isMultiple: true,
            jqueryValue: false
        })
    })

    it('Checks both cards button shares same color', () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.button,
            quantity: commonButtonsQuantity,
            waitUntil: true
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.button,
            prop: CssAttr.css,
            value: Constants.color.orange,
            isMultiple: true
        })
    })

    it('Checks host app card color is set to blue', () => {
        basePage.checkElementWithTextHaveProperty({
            selector: selectors.commonCardSelector,
            text: Constants.elementsText.commonMicroFrontendsApps.cardMessages.hostCard,
            prop: CssAttr.css,
            value: Constants.color.blue,
            checkType: 'contain'
        })
    })

    it('Checks remote app card color is set to black', () => {
        basePage.checkElementQuantity({
            selector: selectors.commonCardSelector,
            quantity: commonButtonsQuantity,
            waitUntil: true
        })
        basePage.checkElementWithTextHaveProperty({
            selector: selectors.commonCardSelector,
            text: Constants.elementsText.commonMicroFrontendsApps.cardMessages.remoteCard,
            prop: CssAttr.css,
            value: Constants.color.black,
            checkType: 'contain'
        })
    })

    it('Checks that host card button text includes counter which changed after click & check value reverted after reload', () => {
        basePage.checkCounterFunctionality({
                button: baseSelectors.button,
                counterText: Constants.elementsText.commonMicroFrontendsApps.buttonsText.hostButton,
                isReloaded: true
            })
    })

    it('Checks that remote card button text includes counter which changed after click & check value reverted after reload', () => {
        basePage.checkElementQuantity({
            selector: selectors.commonCardSelector,
            quantity: commonButtonsQuantity,
            waitUntil: true
        })
        basePage.checkCounterFunctionality({
                button: baseSelectors.button,
                counterText: Constants.elementsText.commonMicroFrontendsApps.buttonsText.remoteButton,
                buttonsCount: commonButtonsQuantity,
                isReloaded: true
            })
    })
})