export class NextjsSsrMethods {

    public checkElementWithTextContainsLink(
        selector: string,
        text: string,
        link: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(selector)
            .each((element: JQuery<HTMLElement>) => {
                if(element.text() === text) {
                    expect(element.attr('href')).to.be.eq(link)
                    expect(element.is(':disabled')).to.be.eq(false)
                }
            });
    }

    public checkParentElementWithTextContainsLink(
        selector: string,
        text: string,
        link: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(selector)
            .contains(text)
            .parent()
            .should('have.attr', 'href', link)
            .and('not.be.disabled')
    }
}