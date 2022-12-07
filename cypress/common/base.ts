export class BaseMethods {

    public openLocalhost(number: number): Cypress.Chainable<Cypress.AUTWindow> {
        return cy.visit(Cypress.env(`localhost${number}`));
    }

    public clickElementBySelector(selector: string, isForce: boolean = false): void {
        cy.get(selector).click({force: isForce})
    }

    public checkElementWithTextPresence(
        selector: string,
        text: string,
        isVisible: boolean = true,
        visibilityState: string = 'exist',
        notVisibleState: string = 'not.exist'
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy
            .get(selector)
            .contains(text)
            .should(isVisible ? visibilityState : notVisibleState);
    }

    public checkChildElementVisibility(
        selector: string,
        childSelector: string,
        isVisible: boolean = true,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy
            .get(selector)
            .find(childSelector)
            .should(isVisible ? 'be.visible' : 'not.exist');
    }

    public checkChildElementContainText(
        selector: string,
        childSelector: string,
        text: string,
        index: number = 0,
        isContain: boolean = true,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy
            .get(selector)
            .find(childSelector)
            .eq(index)
            .should(isContain ? 'contain.text' : 'not.contain.text', text);
    }
}

