import {BaseMethods} from "../../../cypress/common/base";
import {Constants} from "../../../cypress/fixtures/constants";
import {baseSelectors, buttons} from "../../../cypress/common/selectors";

const basePage: BaseMethods = new BaseMethods()

const elementsQuantity = 2

describe("It checks host apps' component", () => {
    beforeEach(() => {
        basePage.openLocalhost(3000)
    })

    it('Checks apps console loading module message', () => {
        basePage.checkInfoInConsole(Constants.elementsText.nativeFederationReactConsoleMessages.loadingModuleMessage)
    })

    it('Checks apps console remote module message', () => {
        basePage.checkInfoInConsole(Constants.elementsText.nativeFederationReactConsoleMessages.remoteModuleMessage)
    })

    it('Checks remote component greeting visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.nativeFederationReactPageMessages.remoteComponentGreeting,
            visibilityState: 'be.visible'
        })
    })

    it('Checks change components message visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.nativeFederationReactPageMessages.changeComponentMessage,
            visibilityState: 'be.visible'
        })
    })

    it('Checks page includes two links', () => {
        basePage.checkElementQuantity({
            parentSelector: baseSelectors.body,
            selector: baseSelectors.linkTag,
            quantity: elementsQuantity
        })
    })

    it('Checks both links has same names', () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.linkTag,
            text: Constants.elementsText.nativeFederationElementsTexts.linkName,
            quantity: elementsQuantity
        })
    })

    it('Checks page includes two buttons', () => {
        basePage.checkElementQuantity({
            parentSelector: baseSelectors.body,
            selector: baseSelectors.button,
            quantity: elementsQuantity
        })
    })

    it('Checks buttons are not disabled', () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.button,
            state: 'not.be.disabled',
            quantity: elementsQuantity
        })
        basePage.checkElementState({
            selector: baseSelectors.button,
            state: 'not.be.disabled'
        })
    })

    it('Checks links are not disabled', () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.linkTag,
            state: 'not.be.disabled',
            quantity: elementsQuantity
        })
        basePage.checkElementState({
            selector: baseSelectors.linkTag,
            state: 'not.be.disabled'
        })
    })

    it('Checks both linked buttons include same link', () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.linkTag,
            state: 'not.be.disabled',
            quantity: elementsQuantity
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.linkTag,
            attr: Constants.commonText.attr,
            prop: Constants.commonText.href,
            value: Constants.hrefs.nativeFederationReactUrl,
            isMultiple: true
        })
    })

    it('Checks both buttons contain same text', () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.button,
            state: 'not.be.disabled',
            quantity: elementsQuantity
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.nativeFederationElementsTexts.buttonText,
            visibilityState: 'be.visible',
            isMultiple: true,
        })
    })

    it('Checks host button visibility', () => {
        basePage.checkChildElementVisibility(baseSelectors.divElement, baseSelectors.button, true,
            'be.visible', Constants.elementsText.nativeFederationReactButtonsNames.host)
    })

    it('Checks remote button visibility', () => {
        basePage.checkChildElementVisibility(baseSelectors.divElement, baseSelectors.button, true,
            'be.visible', Constants.elementsText.nativeFederationReactButtonsNames.remote)
    })

    it('Checks that host button text includes counter which changed after click & check value reverted after reload', () => {
        basePage.checkCounterFunctionality({
            button: buttons.nativeFederationReactButtons.hostButton,
            counterText: Constants.elementsText.nativeFederationElementsTexts.buttonText,
            isReloaded: true
        })
    })

    it('Checks that remote button text includes counter which changed after click & check value reverted after reload', () => {
        basePage.checkCounterFunctionality({
            button: buttons.nativeFederationReactButtons.remoteButton,
            counterText: Constants.elementsText.nativeFederationElementsTexts.buttonText,
            isReloaded: true
        })
    })
})