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

    it('Checks that remote component card appears after loading', () => {
        basePage.checkElementQuantity({
            selector: selectors.commonCardSelector,
            quantity: 1
        })
        basePage.checkElementWithTextPresence({
            selector: selectors.commonCardSelector,
            text: Constants.elementsText.viteReactMicroFrontendsCardsMessages.hostCard,
            visibilityState: 'be.visible'
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.root,
            text: Constants.commonPhrases.commonLoadingText.toLowerCase(),
            visibilityState: 'be.visible'
        })
        basePage.checkElementQuantity({
            selector: baseSelectors.button,
            quantity: commonButtonsQuantity,
            waitUntil: true
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.root,
            text: Constants.commonPhrases.commonLoadingText.toLowerCase(),
            isVisible: false
        })
        basePage.checkElementQuantity({
            selector: selectors.commonCardSelector,
            quantity: commonButtonsQuantity
        })
        basePage.checkElementWithTextPresence({
            selector: selectors.commonCardSelector,
            text: Constants.elementsText.viteReactMicroFrontendsCardsMessages.remoteCard,
            visibilityState: 'be.visible'
        })
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
            text: Constants.elementsText.viteReactMicroFrontendsCardsMessages.hostCard,
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
            text: Constants.elementsText.viteReactMicroFrontendsCardsMessages.remoteCard,
            prop: CssAttr.css,
            value: Constants.color.black,
            checkType: 'contain'
        })
    })

    it('Checks that host card button text includes counter which changed after click & check value reverted after reload', () => {
        basePage.checkCounterFunctionality({
            button: baseSelectors.button,
            counterText: Constants.elementsText.viteReactMicroFrontendsButtonsText.hostButton,
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
                counterText: Constants.elementsText.viteReactMicroFrontendsButtonsText.remoteButton,
                buttonsCount: commonButtonsQuantity,
                isReloaded: true,
            })
    })
})