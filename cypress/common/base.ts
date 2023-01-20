import {baseSelectors, block, buttons, fields} from "./selectors";
import {Constants} from "../fixtures/constants";
import {CssAttr} from "../types/cssAttr";
import {StubTypes} from "../types/stubTypes";
import {RequestsTypes} from "../types/requestsTypes";
import { readFile, writeTofile } from "../helpers/file-actions-helper";

export class BaseMethods {

    public buildTheSample(command: string): void {
        cy.exec(command, {failOnNonZeroExit: false})
    }

    public shutdownTheSample(command: string): void {
        cy.exec(command)
    }

    public skipTestByCondition(condition: any): void {
        cy.skipWhen(condition)
    }

    public writeContentToFile({
        filePath,
        content,
        wait = 500
    }: {
        filePath: string,
        content: string
        wait?: number
    }): void {
        writeTofile(filePath, content)
        cy.wait(wait)
    }

    public openLocalhost(number: number, path?: string): Cypress.Chainable<Cypress.AUTWindow> {
        return path ?
            cy.visit(`${Cypress.env(`localhost${number}`)}/${path}`)
            :
            cy.visit(Cypress.env(`localhost${number}`));
    }

    public checkValueInReadFile
    ({
        filePath,
        text,
        webpackFileSeparator,
        isContain = true
    }: {
        filePath: string,
        text: string,
        webpackFileSeparator?: string
        isContain?: boolean
    }): void {
        readFile(filePath).then((file: string) => {
            if(webpackFileSeparator) {
                    isContain ? expect(file.split(webpackFileSeparator)[1]).to.include(text) :
                        expect(file.split(webpackFileSeparator)[1]).not.to.include(text)

                return;
            }

            expect(JSON.stringify(file)).to.include(text)
        })
    }

    public addUser(name: string, email: string): void {
        this.fillField({
            selector: fields.commonField.replace('{fieldName}', Constants.fieldsNames.nameField),
            text: name
        })
        this.fillField({
            selector: fields.commonField.replace('{fieldName}', Constants.fieldsNames.emailField),
            text: email
        })
        this.checkElementState({
            selector: buttons.buttonPrimary,
            state: 'not.be.disabled'
        })
        this.clickElementBySelector({
            selector: buttons.buttonPrimary
        })
    }

    public compareInfoBetweenHosts(
        selector: string,
        extraHost: number,
        isEqual: boolean = true,
        index: number = 0,
        clickSelector?: string,
        wait: number = 0
    ): void {
        cy.get(selector)
            .wait(wait)
            .eq(index)
            .invoke('text')
            .then((baseText: string) => {
                cy.origin(Cypress.env(`localhost${extraHost}`), { args: { baseText, selector, isEqual, clickSelector, wait } }, ({ baseText, selector, isEqual, clickSelector, wait }) => {
                    cy.visit('/')
                    if(clickSelector) {
                        cy.get(clickSelector).click().wait(wait)
                    }
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
         cy.url().should(isInclude ? 'include' : 'not.include', url);
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
        if (parentSelector) {
            return cy.get(parentSelector).find(selector).wait(wait).click({force: isForce, multiple: isMultiple})
        }

        return cy.get(selector).eq(index).wait(wait).click({force: isForce, multiple: isMultiple})
    }

    public clickElementWithText({
        selector,
        text,
        isForce = false,
        wait = 0
    }: {
        selector: string,
        text: string,
        isForce?: boolean
        wait?: number
    }): void {
        cy.get(selector)
            .contains(text)
            .click({force: isForce})
            .wait(wait)
    }

    public clickChildElementWithText({
        selector,
        childSelector,
        text,
        isForce = false,
        index
    }: {
        selector: string,
        childSelector: string,
        text: string,
        isForce?: boolean,
        index?: number
    }): Cypress.Chainable<JQuery<HTMLElement>> {
        if (index) {
            return cy.get(selector)
                .find(childSelector)
                .eq(index)
                .contains(text)
                .click({ force: isForce })
        }

        return cy.get(selector)
            .find(childSelector)
            .contains(text)
            .click({ force: isForce })
    }

    public checkElementWithTextPresence({
         selector,
         text,
         isVisible = true,
         visibilityState =  'exist',
         notVisibleState = 'not.exist',
         parentSelector,
         isMultiple = false,
         index = 0,
         textArray
    }: {
        selector: string,
        text: any,
        isVisible?: boolean,
        visibilityState?: string,
        notVisibleState?: string,
        parentSelector?: string,
        isMultiple?: boolean,
        wait?: number
        index?: number
        textArray?: string[]
    }): Cypress.Chainable<JQuery<HTMLElement>> {
        if(parentSelector && !textArray) {
           return this._checkChildElementWithTextPresence(parentSelector, selector, text, isVisible ? visibilityState : notVisibleState)
        }

        if(index) {
            return cy
                .get(selector)
                .eq(index)
                .contains(text)
                .should(isVisible ? visibilityState : notVisibleState);
        }

        if(isMultiple) {
            return cy.get(selector)
                .each((element: JQuery<HTMLElement>) => {
                    expect(element.text()).to.include(text)
                });
        }

        if(textArray) {
            for (let i = 0; i <  textArray.length; i++) {
                // @ts-ignore
                this._checkChildElementWithTextPresence(parentSelector, selector.replace(
                   '{cellType}', textArray[i]
                       .replace(/\s/g, '_').toUpperCase()), text[i], isVisible ? visibilityState : notVisibleState)
            }

            // @ts-ignore
            return;
        }

        return cy.get(selector)
            .contains(text)
            .should(isVisible ? visibilityState : notVisibleState);
    }

    public checkElementContainText({
        selector,
        text,
        index = 0,
        contain= true,
        checkType = 'contain.text'
    }: {
        selector: string,
        text?: string | number,
        index?: number,
        contain?: boolean,
        checkType?: string
    }): Cypress.Chainable<JQuery<HTMLElement>> {
        if (index) {
            return cy
                .get(selector)
                .eq(index)
                .should(contain ? checkType : 'not.contain.text', text)
        }

        return cy
            .get(selector)
            .should(contain ? checkType : 'not.contain.text', text);
    }

    public checkInfoInConsole(info: string, chainer: StubTypes = StubTypes.beCalled, isReloaded: boolean = true, isStubbed: boolean = true): void {
        if(isStubbed) {
            cy.window().then((win) => {
                cy.stub(win.console, "log").as('log');
            })
        }
        cy.get('@log').should(chainer, info)
        if(isReloaded) {
            this.reloadWindow()
        }
    }

    public checkNetworkCallCreated(requestType: RequestsTypes, url: string, localhost: number, statusCode: number): void {
        cy.intercept(requestType, url).as('networkCall');
        // Extra visit required cause intercept needs to be created before visit
        this.openLocalhost(localhost)
        cy.wait('@networkCall').then((interception) => {
            if(interception.response) {
                cy.wrap(interception.response.statusCode).should('eq', statusCode)
            }
        })
    }

    public checkElementVisibility(
        selector: string,
        isVisible: boolean = true,
        notVisibleState: string = 'not.be.visible'
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy
            .get(selector)
            .should(isVisible ? 'be.visible' : notVisibleState);
    }

    public checkChildElementVisibility(
        selector: string,
        childSelector: string,
        isVisible: boolean = true,
        visibilityState: string = 'be.visible',
        text?: string,
        notVisibleState: string = 'not.exist',
        parentElement: boolean = true
): Cypress.Chainable<JQuery<HTMLElement>> {
        if(text && parentElement) {
            return cy
                .get(selector).contains(text).parent()
                .find(childSelector)
                .should(isVisible ? visibilityState : notVisibleState);
        }

        if(text && !parentElement) {
            return cy
                .get(selector).contains(text)
                .find(childSelector)
                .should(isVisible ? visibilityState : notVisibleState);
        }

        if(text) {
            return cy
                .get(selector).contains(text).parent(selector)
                .find(childSelector)
                .should(isVisible ? visibilityState : notVisibleState);
        }

        return cy
            .get(selector)
            .find(childSelector)
            .should(isVisible ? visibilityState : notVisibleState);
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
        attr = CssAttr.css,
        prop,
        value,
        parentSelector,
        isMultiple = false,
        index
    }: {
        selector: string,
        attr?: string,
        prop: string,
        value: string,
        index?: number
        parentSelector?: string,
        isMultiple? : boolean
     }
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        if(index) {
            return cy.get(selector)
                .eq(index)
                .invoke(attr, prop)
                .should('include', value)
        }

        if(parentSelector) {
            return cy.get(parentSelector)
                .find(selector)
                .invoke(attr, prop)
                .should('include', value)
        }

        if(isMultiple) {
            return cy.get(selector)
                .each((element: JQuery<HTMLElement>) => {
                    this._checkCssValue(element, prop, value)
                });
        }

        return cy.get(selector)
            .invoke(attr, prop)
            .should('include', value)
    }

    public checkChildElementHaveProperty({
        selector,
        childSelector,
        attr = CssAttr.css,
        prop,
        value,
        parentSelector
    }: {
        selector: string,
        childSelector: string,
        attr?: string,
        prop: string,
        value: string
        parentSelector?: string
    }
    ): void {
        if(parentSelector) {
            cy.get(parentSelector)
                .find(selector)
                .invoke(attr, prop)
                .should('include', value)

            return;
        }

        cy.get(selector)
            .find(childSelector)
            .invoke(attr, prop)
            .should('include', value)
    }

    public checkElementWithTextHaveProperty({
        selector,
        text,
        attr = CssAttr.css,
        prop,
        value,
        checkType = 'contains',
        parent,
    }: {
        selector: string,
        text: string,
        attr?: string,
        prop: string,
        value: string,
        checkType?: string
        parent?: boolean
    }): void {
        if(parent) {
            cy.get(selector)
            .contains(text)
            .parent()
            .invoke(attr, prop)
            .should('include', value)

            return;
        }

        if(checkType !== 'contains') {
            cy.get(selector)
                .each((element: JQuery<HTMLElement>) => {
                    if(element.text().includes(text)) {
                        this._checkCssValue(element, prop, value)
                    }
                });

            return;
        }

        cy.get(selector)
            .contains(text)
            .invoke(attr, prop)
            .should('include', value)
    }

    public checkChildElementWithTextHaveProperty({
        selector,
        childSelector,
        text,
        attr = CssAttr.css,
        prop,
        value,
        index
    }: {
        selector: string,
        childSelector: string,
        text: string,
        attr?: string,
        prop: string,
        value: string,
        index?: number
    }): Cypress.Chainable<JQuery<HTMLElement>> {
        if (index) {
            return cy.get(selector)
                .find(childSelector)
                .eq(index)
                .contains(text)
                .invoke(attr, prop)
                .should('include', value)
        }

        return cy.get(selector)
            .find(childSelector)
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
         text,
         waitUntil = false,
         jqueryValue = false
    }: {
        selector: string,
        quantity: number,
        state?: string,
        parentSelector?: string,
        text?: string
        waitUntil?: boolean
        jqueryValue?: boolean
    }): void {
        if(parentSelector) {
            cy.get(parentSelector).find(selector).should(state, quantity)

            return;
        }

        if(text && !jqueryValue) {
            cy.get(selector).should('contain.text', text).and(state, quantity)

            return;
        }

        if(waitUntil) {
            cy.waitUntil(() =>
                cy.get(selector).should('have.length', quantity, { timeout: 2000 }),
            );

            return;
        }

        if(jqueryValue) {
            let counter: number = 0;

            cy.get(selector)
                .each((element: JQuery<HTMLElement>) => {
                    if(element.text().includes(<string>text)) {
                       counter++

                        if(counter === quantity) {
                            expect(counter).to.be.eq(quantity)
                        }
                    }
                });

            return;
        }

        cy.get(selector).should(state, quantity)
    }

    public checkElementState({
         selector,
         state = 'be.disabled',
         parentSelector,
         text,
         isMultiple = false,
         jqueryValue
    }: {
        selector: string,
        state?: string,
        parentSelector?: string,
        text?: string,
        isMultiple?: boolean
        jqueryValue?: any
    }): void {
        if(parentSelector) {
            cy.get(parentSelector)
                .find(selector)
                .should(state)

            return;
        }

        if(text) {
            cy.get(selector).contains(text).should(state)

            return;
        }

        if(isMultiple) {
            cy.get(selector)
                .each((element: JQuery<HTMLElement>) => {
                    expect(element.is(state)).to.be.eq(jqueryValue)
                });

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
        return cy.origin(Cypress.env(`localhost${host}`), { args: { element, existedText, notExistedText } }, ({ element, existedText, notExistedText }) => {
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

    public getBlockSelector(blockType: string): string {
        return block.commonReactBlock.replace('{blockType}', blockType);
    }

    public goBack(): void {
        cy.go(-1)
    }

    public checkCounterFunctionality
    ({
         button,
         counterText,
         buttonsCount,
         counterElement,
         isButtonTexted = true,
         isReloaded,
         isValueCompared,
         isCounterDecreased,
         counterValue,
         isCounterValueUsed
    }: {
        button: string,
        counterText: string,
        buttonsCount?: number,
        counterElement?: string
        isButtonTexted?: boolean
        isReloaded?: boolean
        isValueCompared?: boolean
        isCounterDecreased?: boolean
        counterValue?: string,
        isCounterValueUsed?: boolean,
    }) : void {
        let counter = 0
        let counterElementSelector: string = counterElement? counterElement : button

        this.checkElementWithTextPresence({
            selector: counterElementSelector,
            text: counterText,
            visibilityState: 'be.visible'
        })
        if(isButtonTexted) {
            this.clickElementWithText({
                selector: button,
                text: counterText
            })
            if(!isCounterDecreased) {
                counter++
            }
        } else {
            this.clickElementBySelector({
                selector: button,
            })
            if(!isCounterDecreased) {
                counter++
            }
        }
        this.checkElementWithTextPresence({
            selector: counterElementSelector,
            text: counterValue? counterValue : counterText.replace(/[0-9]+/, counter.toString()),
            visibilityState: 'be.visible'
        })
        if (isValueCompared) {
            expect(counter.toString()).to.eq(counterText.replace(/[0-9]/g, counter.toString()).split(':')[1].trim())
        }
        if(isReloaded) {
            this.reloadWindow()
            if(buttonsCount) {
                this.checkElementQuantity({
                    selector: button,
                    quantity: buttonsCount,
                    waitUntil: true
                })
            }
            this.checkElementWithTextPresence({
                selector: counterElementSelector,
                text: isCounterValueUsed ? counter : counterText,
                visibilityState: 'be.visible'
            })
        }
    }

    public checkElementWithTextContainsLink(
        selector: string,
        text: string,
        link: string,
        parent: boolean = false
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        if (parent) {
            return cy.get(selector)
            .contains(text)
            .parent()
            .should('have.attr', 'href', link)
            .and('not.be.disabled')
        }
        return cy.get(selector)
            .each((element: JQuery<HTMLElement>) => {
                if(element.text() === text && element.attr('href') === link) {
                    expect(element.attr('href')).to.be.eq(link)
                    expect(element.is(':disabled')).to.be.eq(false)
                }
            });
    }

    public checkBrowserAlertByText({
        selector,
        alertMessage,
        isEqual = true,
        index = 0
    }: {
        selector: string,
        alertMessage: string,
        isEqual?: boolean,
        index?: number
    }): void {
        this.clickElementBySelector({
            selector,
            index
        })
        cy.wrap(new Promise<void>((resolve, reject) => {
            cy.on('window:alert', (alertText: string) => {
                try {
                    if(isEqual) {
                        expect(alertText).to.be.eq(alertMessage);
                    } else {
                        expect(alertText).not.to.be.eq(alertMessage)
                    }
                } catch ( err ) {
                    return reject(err);
                }
                resolve();
            });
            setTimeout(() => {
                reject(new Error('window.confirm wasn\'t called within 1s'));
            }, 3000);
        }), { log: false });
    }

    private _checkInputValue(text: string, value: string, isLengthChecked: boolean = false): void {
        if(isLengthChecked) {
            expect(text.length).to.be.eq(value.length)

            return;
        }

        expect(text).to.be.eq(value)

    }

    public clickElementInsideShadowRoot({
        selector,
        text,
        isForce = false
    }: {
        selector: string,
        text: string,
        isForce?: boolean
    }): void {
        cy.get(selector)
            .shadow()
            .contains(text)
            .click({force: isForce})
    }

    public checkElementInsideShadowRoot({
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
            .shadow()
            .contains(text)
            .should(isVisible ? visibilityState : notVisibleState);
    }

    public checkElementPropertyInsideShadowRoot({
        selector,
        subSelector,
        attr = 'css',
        prop,
        value
    }: {
        selector: string,
        subSelector: string
        attr?: string,
        prop: string,
        value: string
    }
    ): void {
        cy.get(selector)
            .shadow()
            .find(subSelector)
            .invoke(attr, prop)
            .should('include', value)
    }


    private _checkCssValue(element: JQuery<HTMLElement>, prop: string, value: string): void {
        if(prop === CssAttr.css) {
            expect(element.css(CssAttr.backgroundColor)).to.be.eq(value)
        } else {
            expect(element.attr(prop)).to.be.eq(value)
        }
    }

    private _checkChildElementWithTextPresence(parentSelector: string, selector: string, text: string, visibilityState: string): Cypress.Chainable<JQuery<HTMLElement>> {
       return cy.get(parentSelector)
            .find(selector)
            .contains(text)
            .should(visibilityState);
    }
}
