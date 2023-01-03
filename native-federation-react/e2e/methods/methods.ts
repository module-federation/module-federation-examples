import { BaseMethods } from "../../../cypress/common/base";

export class NativeFederationReactMethods extends BaseMethods {

    public checkInfoInConsole(info: string): void {
        cy.window().then((win) => {
            cy.stub(win.console, "log") .as('log')
            cy.get('@log').should('be.calledWith', info)
        })
    }
}