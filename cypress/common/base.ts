import {baseSelectors} from "./selectors";
import {Constants} from "../fixtures/constants";

export class BaseMethods {

    public buildTheSample(path: string): void {
        cy.exec(`cd ${path} && make build`, {failOnNonZeroExit: false})
    }

    public shutdownTheSample(path: string): void {
        cy.exec(`cd ${path} && make shutdown`)
    }

    public execTheCommand(command: string, wait: number = 100): void {
        cy.exec(command)
        cy.wait(wait)
    }

    public openLocalhost(number: number, path?: string): Cypress.Chainable<Cypress.AUTWindow> {
        return path ? 
        cy.visit(`${Cypress.env(`localhost${number}`)}/${path}`)
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
        isForce = false,
        parentSelector,
        isMultiple = false,
        wait = 0
    }: {
        selector: string,
        index?: number,
        isForce?: boolean,
        parentSelector? : string,
        isMultiple?: boolean,
        wait?: number
    }): Cypress.Chainable<JQuery<HTMLElement>> {
        if (index) {
            return cy.get(selector).eq(index).wait(wait).click({force: isForce, multiple: isMultiple})
        }

        if (parentSelector) {
            return cy.get(parentSelector).find(selector).wait(wait).click({force: isForce, multiple: isMultiple})
        }

        return cy.get(selector).wait(wait).click({force: isForce, multiple: isMultiple})
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
         notVisibleState = 'not.exist',
         parentSelector,
         isMultiple = false,
         wait = 0,
         index = 0
    }: {
        selector: string,
        text: string,
        isVisible?: boolean,
        visibilityState?: string,
        notVisibleState?: string,
        parentSelector?: string,
        isMultiple?: boolean,
        wait? : number
        index?: number
    }): Cypress.Chainable<JQuery<HTMLElement>> {
        if (parentSelector) {
            return cy.get(parentSelector)
                .find(selector)
                .contains(text)
                .wait(wait)
                .should(isVisible ? visibilityState : notVisibleState);
        }

        if(index) {
            return cy
                .get(selector)
                .eq(index)
                .contains(text)
                .wait(wait)
                .should(isVisible ? visibilityState : notVisibleState);
        }

        if(isMultiple) {
            return cy.get(selector)
                .wait(wait)
                .each((element: JQuery<HTMLElement>) => {
                    expect(element.text()).to.include(text)
                });
        }

        return cy.get(selector)
            .contains(text)
            .wait(wait)
            .should(isVisible ? visibilityState : notVisibleState);
    }

    public checkElementContainText(
        selector: string,
        text: string,
        index: number = 0,
        contain: boolean = true
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        if (index) {
        return cy
            .get(selector)
            .eq(index)
            .should(contain ? 'contain.text' : 'not.contain.text', text)
        } 

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
        visibilityState: string = 'be.visible',
        text? : string
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        if(text) {
            return cy
                .get(selector).contains(text)
                .find(childSelector)
                .should(isVisible ? visibilityState : 'not.exist');
        }

        return cy
            .get(selector)
            .find(childSelector)
            .should(isVisible ? visibilityState : 'not.exist');
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

    public checkElementHaveProperty
    ({
         selector,
         attr = 'css',
         prop,
         value,
         parentSelector,
         isMultiple = false
    }: {
        selector: string,
        attr?: string,
        prop: string,
        value: string
        parentSelector?: string,
        isMultiple? : boolean
     }
    ): void {
        if(parentSelector) {
            cy.get(parentSelector)
                .find(selector)
                .invoke(attr, prop)
                .should('include', value)

            return;
        }

        if(isMultiple) {
            cy.get(selector)
                .each((element: JQuery<HTMLElement>) => {
                    expect(element.attr(prop)).to.be.eq(value)
                });

            return;
        }

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

    public checkElementQuantity
    ({
         selector,
         quantity,
         parentSelector,
         state = 'have.length',
         text
    }: {
        selector: string,
        quantity: number,
        state?: string,
        parentSelector? : string
        text?: string
    }): void {
        if(parentSelector) {
            cy.get(parentSelector).find(selector).should(state, quantity)

            return;
        }

        if(text) {
            cy.get(selector).should('contain.text', text).and(state, quantity)

            return;
        }

        cy.get(selector).should(state, quantity)
    }

    public checkElementState
    ({
         selector,
         state = 'be.disabled',
         parentSelector
    }: {
        selector: string,
        state?: string,
        parentSelector?: string
    }): void {
        if(parentSelector) {
            cy.get(parentSelector)
                .find(selector)
                .should(state)

            return;
        }

        cy.get(selector)
            .should(state)
    }

    public fillField({
        selector,
        text,
        parentSelector
    }: {
        selector: string,
        text: string,
        parentSelector?: string
    }): void {
        if (parentSelector) {
            cy.get(parentSelector)
                .find(selector)
                .type('{selectall}{backspace}{backspace}')
                .fill(text);

            return;
        }

        cy.get(selector)
            .type('{selectall}{backspace}{backspace}')
            .fill(text);
    }

    public getInputSelector(selector: string): string {
        return selector.includes(Constants.elementsText.sharedRoutingAppSelectorsParts.userInfo.toUpperCase()) ? baseSelectors.textarea : baseSelectors.input
    }

    public checkInputValue(value: string, parentElement?: string, isLengthChecked: boolean = false): void {
        if (parentElement) {
            cy.get(parentElement)
                .find(this.getInputSelector(parentElement))
                .invoke('val')
                .then((text: any) => {
                    this._checkInputValue(text, value, isLengthChecked)
                });

            return;
        }

        cy.get(baseSelectors.input)
            .invoke('val')
            .then((text: any) => {
                this._checkInputValue(text, value, isLengthChecked)
            });
    }

    public checkInfoOnNonDefaultHost(
        host: number,
        element: string,
        existedText: string,
        notExistedText: string
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.origin(Cypress.env(`localhost${host}`), {args: {element, existedText, notExistedText}}, ({element, existedText, notExistedText}) => {
            cy.visit('/')
            // do not get it as checkElementWithTextPresence() due to inability of origin to get outside methods
            cy.get(element).contains(existedText).should('be.visible')
            cy.get(element).contains(notExistedText).should('not.exist')
        });
    }

    public reloadWindow(withoutCache: boolean = false): void {
        cy.reload(withoutCache)
    }

    public sendInputText({
        selector,
        text
    }: {    
        selector: string,
        text: string,
    }) {
        return cy
            .get(selector)
            .type(text);
    }

    private _checkInputValue(text: string, value: string, isLengthChecked: boolean = false): void {
        if(isLengthChecked) {
            expect(text.length).to.be.eq(value.length)

            return;
        }

        expect(text).to.be.eq(value)

    }
}

