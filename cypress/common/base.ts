export class BaseMethods {

    public buildTheSample(path: string):void {
        cy.exec(`cd ${path} && make build`, { failOnNonZeroExit: false })
    }

    public shutdownTheSample(path: string):void {
        cy.exec(`cd ${path} && make shutdown`)
    }

    public openLocalhost(number: number, path?: string): Cypress.Chainable<Cypress.AUTWindow> {
        return path ? 
        cy.visit(Cypress.env(`localhost${number}/${path}`))
        :
        cy.visit(Cypress.env(`localhost${number}`));
    }

    public compareInfoBetweenHosts(selector: string, extraHost: number, isEqual: boolean = true): void {
        cy.get(selector)
            .invoke('text')
            .then((baseText: string) => {
                cy.origin(Cypress.env(`localhost${extraHost}`), {args: {baseText, selector, isEqual}}, ({baseText, selector, isEqual}) => {
                    cy.visit('/')
                    cy.get(selector)
                        .invoke('text')
                        .then((text: string) => {
                            if(isEqual) {
                                expect(text).to.be.eq(baseText)

                                return;
                            }

                            expect(text).not.to.be.eq(baseText)
                        });
                });
            });
    }

    public checkUrlText(url: string, isInclude: boolean = false): void {
         cy.url().should(isInclude? 'include' : 'not.include', url);
    }

    public checkElementState(selector: string, isDisabled: boolean = false): void {
        cy.get(selector).should(isDisabled? 'be.disabled' : 'not.be.disabled')
    }

    public checkElementExist({
        selector,
        isVisible = true,
        notVisibleState = 'not.exist',
        visibleState = 'be.visible',
    }: {
        selector: string,
        isVisible?: boolean,
        notVisibleState?: string,
        visibleState?: string,
    }): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(selector)
        .should(isVisible ? visibleState : notVisibleState);
    }

    public clickElementBySelector({
        selector,
        index = 0,
        isForce = false
    }: {
        selector: string,
        index?: number,
        isForce?: boolean
    }): Cypress.Chainable<JQuery<HTMLElement>>{
        if (index) {
            return cy.get(selector).eq(index).click({force: isForce})
        }

        return cy.get(selector).click({force: isForce})
    }

    public clickElementWithText({
        selector,
        text,
        isForce = false
    }: {
        selector: string,
        text: string,
        isForce?: boolean
    }): void {
        cy.get(selector)
            .contains(text)
            .click({force: isForce})
    }

    public checkElementWithTextPresence({
        selector,
        text,
        isVisible = true,
        visibilityState =  'exist',
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

    public checkElementContainText(
        selector: string,
        text: string,
        contain: boolean = true
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy
            .get(selector)
            .should(contain ? 'contain.text' : 'not.contain.text', text);
    }

    public checkElementVisibility(
        selector: string,
        isVisible: boolean = true
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy
            .get(selector)
            .should(isVisible ? 'be.visible' : 'not.be.visible');
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

    public checkElementHaveProperty({
        selector,
        attr = 'css',
        prop,
        value
    }: {
        selector: string,
        attr?: string,
        prop: string,
        value: string
    }
    ): void {
        cy.get(selector)
            .invoke(attr, prop)
            .should('include', value)
    }

    public checkElementWithTextHaveProperty({
        selector,
        text,
        attr = 'css',
        prop,
        value
    }: {
        selector: string,
        text: string,
        attr?: string,
        prop: string,
        value: string
    }): void {
        cy.get(selector)
            .contains(text)
            .invoke(attr, prop)
            .should('include', value)
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

    public checkElementQuantity({
        selector,
        quantity
    }: {
        selector: string,
        quantity: number
    }): void {
        cy.get(selector)
            .should('have.length', quantity)
    }

    public checkElementState({
        selector,
        state = 'be.disabled'
    }: {
        selector: string,
        state?: string
    }): void {
        cy.get(selector)
            .should(state)
    }

    public fillField({
        selector,
        text
    }: {
        selector: string,
        text: string
    }): void {
        cy.get(selector)
            .type('{selectall}{backspace}{backspace}')
            .fill(text);
    }
}
