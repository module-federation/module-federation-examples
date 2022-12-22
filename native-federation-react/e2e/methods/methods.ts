import { BaseMethods } from "../../../cypress/common/base";
import {Constants} from "../../../cypress/fixtures/constants";

export class NativeFederationReactMethods extends BaseMethods {

    public checkInfoInConsole(info: string): void {
        cy.window().then((win) => {
            cy.stub(win.console, "log") .as('log')
            cy.get('@log').should('be.calledWith', info)
        })
    }

    public checkCounterInButton(button: string): void {
        let counter = 0

        this.checkElementWithTextPresence({
            selector: button,
            text: Constants.elementsText.nativeFederationElementsTexts.buttonText,
            visibilityState: 'be.visible'
        })
        this.clickElementBySelector({
            selector: button
        })
        counter++
        this.checkElementWithTextPresence({
            selector: button,
            text: Constants.elementsText.nativeFederationElementsTexts.buttonText.replace(/[0-9]+/, counter.toString()),
            visibilityState: 'be.visible'
        })
        this.reloadWindow()
        this.checkElementWithTextPresence({
            selector: button,
            text: Constants.elementsText.nativeFederationElementsTexts.buttonText,
            visibilityState: 'be.visible'
        })
    }
}