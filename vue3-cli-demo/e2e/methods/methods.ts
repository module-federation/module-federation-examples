export class Vue3CliDemoMethods {

    public checkElementWithTextIncludesLink(
        selector: string,
        text: string,
        link: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(selector)
            .each((element: JQuery<HTMLElement>) => {
                if(element.text() === text && element.attr('href') === link) {
                    expect(element.attr('href')).to.be.eq(link)
                    expect(element.is(':disabled')).to.be.eq(false)
                }
            });
    }
}