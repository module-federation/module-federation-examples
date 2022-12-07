
export class BaseMethods {

    public buildTheSample(path: string):void {
        cy.exec(`cd ${path} && make build`, { failOnNonZeroExit: false })
    }

    public shutdownTheSample(path: string):void {
        cy.exec(`cd ${path} && make shutdown`)
    }

    public openLocalhost(number: number): Cypress.Chainable<Cypress.AUTWindow> {
        return cy.visit(Cypress.env(`localhost${number}`));
    }

    public clickElementBySelector(selector: string, isForce: boolean = false): void {
        cy.get(selector).click({force: isForce})
    }

    public checkElementWithTextPresence({
        selector,
        text,
        isVisible = true,
        visibilityState = 'exist',
        notVisibleState = 'not.exist'
    }: {
        selector: string,
        text: string,
        isVisible?: boolean,
        visibilityState?: string,
        notVisibleState?: string
    }): Cypress.Chainable<JQuery<HTMLElement>> {
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

    public checkElementWithTextHaveCssProperty(
        selector: string,
        text: string,
        cssProp: string,
        cssPropValue: string
    ): void {
        cy.get(selector)
            .contains(text)
            .invoke('css', cssProp)
            .should('include', cssPropValue)
    }

    public checkElementPositionbyText(
        selector: string,
        text: string,
        position: number
    ): void {
        cy.get(selector)
            .its(position)
            .should('have.text', text)
    }
}

