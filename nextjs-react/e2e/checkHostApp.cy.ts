import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import {CssAttr} from "../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

describe("Check host app", () => {
    beforeEach(() => {
        basePage.openLocalhost(3000)
    })

    it('Check buttons exist', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.nextJsReactApp.buttons.nextJS})
        cy.wait(200)
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.nextJsReactApp.buttons.remote})
    })

    it('Check button color', () => {
        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.elementsText.nextJsReactApp.buttons.nextJS,
            prop: CssAttr.background,
            value: Constants.color.lightSaturatedYellow
        })
        cy.wait(200)
        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.elementsText.nextJsReactApp.buttons.remote,
            prop: CssAttr.background,
            value: Constants.color.darkMutedBlue
        })
    })
})
