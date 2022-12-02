export class BaseMethods {

    public openLocalhost(number: number): Cypress.Chainable<Cypress.AUTWindow> {
        return cy.visit(Cypress.env(`localhost${number}`));
    }

    public checkElementExistWithText(
        selector: string,
        text: string,
        isVisible: boolean = true
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy
            .get(selector)
            .contains(text)
            .should(isVisible ? 'exist' : 'not.exist');
    }
}
