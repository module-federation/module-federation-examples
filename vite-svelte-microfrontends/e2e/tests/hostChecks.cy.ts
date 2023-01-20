import {BaseMethods} from "../../../cypress/common/base";
import {selectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

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
        basePage.checkElementQuantity({
            selector: selectors.commonCardSelector,
            quantity: 2,
            waitUntil: true
        })
        basePage.checkElementWithTextPresence({
            selector: selectors.commonCardSelector,
            text: Constants.elementsText.viteReactMicroFrontendsCardsMessages.remoteCard,
            visibilityState: 'be.visible'
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
            quantity: 2,
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

    it('Checks console messages', () => {
        Constants.commonPhrases.viteSvelteMicroFrontEndsConsoleMessages.forEach((message: string) => {
            basePage.checkInfoInConsole(message)
        })
    })
})