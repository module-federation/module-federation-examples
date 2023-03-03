/*
 * Base methods for interacting with base elements on the page
 * Please stick to the next rules:
 * 1. Use existing methods. If you cant please make sure twice that you can't use existing methods
 * 2. Every new method need to be added to relevant section
 * 3. Please add a suitable name to the methods
 *
 * NAVIGATION LIST
 * Clicks Section
 * Checks Section
 * Writes Section
 * Helpers Section
 * Activities Section
 * Privates Section
 */

import {baseSelectors, commonSelectors} from "./selectors";
import {Constants} from "../fixtures/constants";
import {CssAttr} from "../types/cssAttr";
import {StubTypes} from "../types/stubTypes";
import {RequestsTypes} from "../types/requestsTypes";
import { readFile, writeTofile } from "../helpers/file-actions-helper";
import {CommonTestData} from "../fixtures/commonTestData";

export class BaseMethods {

 /*
 *---------------------------------------------------
 * CLICKS SECTION
 * Base methods for clicking on elements on the page
 *---------------------------------------------------
 */

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
         wait = 0,
         isShadowRoot = false,
         index = 0,
         parentSelector,
         isTargetChanged = false
    }: {
        selector: string,
        text: string,
        isForce?: boolean,
        wait?: number,
        isShadowRoot?: boolean,
        index?: number,
        parentSelector?: string,
        isTargetChanged?: boolean
    }): void {
        if(isTargetChanged) {
            cy.get(selector).contains(text)
                .should(($button: JQuery<HTMLElement>) => {
                    $button.attr('target', '_self');
                }).click()

            return;
        }

        if(parentSelector) {
            cy.get(parentSelector)
                .find(selector)
                .eq(index)
                .contains(text)
                .click({ force: isForce })

            return;
        }

        if(isShadowRoot) {
            cy.get(selector)
                .shadow()
                .contains(text)
                .click({force: isForce})

            return;
        }

        cy.get(selector)
            .contains(text)
            .click({force: isForce})
            .wait(wait)
    }

/*
 *---------------------------------------------------
 * CHECKS SECTION
 * Base methods for various checks on page
 *---------------------------------------------------
 */

    public checkValueInReadFile({
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

    public checkUrlText(url: string, isInclude: boolean = false, isDifferentOrigin: boolean = false): void {
        if(isDifferentOrigin) {
            cy.origin(url, { args: { isInclude, url } }, ({ isInclude, url }) => {
                cy.url().should(isInclude ? 'include' : 'not.include', url);
            });

            return;
        }

        cy.url().should(isInclude ? 'include' : 'not.include', url);
    }

    public checkElementVisibility
    ({
         selector,
         isVisible = true,
         visibleState = 'be.visible',
         notVisibleState = 'not.exist',
         text,
         parentElement,
         parentSelector
    }: {
        selector: string,
        isVisible?: boolean,
        visibleState?: string,
        notVisibleState?: string,
        text?: string,
        parentElement?: boolean,
        parentSelector?: string
    }): Cypress.Chainable<JQuery<HTMLElement>> {
        if(parentSelector) {
            if(text && parentElement) {
                return cy
                    .get(parentSelector).contains(text).parent()
                    .find(selector)
                    .should(isVisible ? visibleState : notVisibleState);
            }

            if(text && !parentElement) {
                return cy
                    .get(parentSelector).contains(text)
                    .find(selector)
                    .should(isVisible ? visibleState : notVisibleState);
            }

            if(text) {
                return cy
                    .get(parentSelector).contains(text).parent(parentSelector)
                    .find(selector)
                    .should(isVisible ? visibleState : notVisibleState);
            }

            return cy
                .get(parentSelector)
                .find(selector)
                .should(isVisible ? visibleState : notVisibleState);
        }

        return cy
            .get(selector)
            .should(isVisible ? visibleState : notVisibleState);
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
         textArray,
         isShadowRoot = false
    }: {
        selector: string,
        text: any,
        isVisible?: boolean,
        visibilityState?: string,
        notVisibleState?: string,
        parentSelector?: string,
        isMultiple?: boolean,
        wait?: number,
        index?: number,
        textArray?: string[],
        isShadowRoot?: boolean
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

        if(isShadowRoot) {
            cy.get(selector)
                .shadow()
                .contains(text)
                .should(isVisible ? visibilityState : notVisibleState);

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
         isContain = true,
         checkType = 'contain.text',
         parentSelector,
         isParent,
         link
    }: {
        selector: string,
        text?: string | number,
        index?: number,
        isContain?: boolean,
        checkType?: string,
        parentSelector?: string
        isParent?: boolean
        link?: string
    }): Cypress.Chainable<JQuery<HTMLElement>> {
        if(link) {
            if (isParent && text) {
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

        if (index && !parentSelector) {
            return cy
                .get(selector)
                .eq(index)
                .should(isContain ? checkType : 'not.contain.text', text)
        }

        if(parentSelector) {
            return cy
                .get(parentSelector)
                .find(selector)
                .eq(index)
                .should(isContain ? checkType : 'not.contain.text', text);
        }

        return cy
            .get(selector)
            .should(isContain ? checkType : 'not.contain.text', text);
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
        this.openLocalhost({
            number: localhost
        })
        cy.wait('@networkCall').then((interception) => {
            if(interception.response) {
                cy.wrap(interception.response.statusCode).should('eq', statusCode)
            }
        })
    }

    public checkElementHaveProperty({
         selector,
         attr = CssAttr.css,
         prop,
         value,
         parentSelector,
         isMultiple = false,
         index,
         isShadowElement = false,
         text,
         isParent = false,
         checkType = 'contains',
         isWithInvoke = true,
         isInclude = true
     }: {
         selector: string,
         attr?: string,
         prop: string,
         value: string,
         index?: number
         parentSelector?: string,
         isMultiple? : boolean,
         isShadowElement?: boolean,
         text?: string,
         isParent?: boolean,
         checkType?: string,
         isWithInvoke?: boolean,
         isInclude?: boolean
     }
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        if(text) {
            if(isParent) {
                cy.get(selector)
                    .contains(text)
                    .parent()
                    .invoke(attr, prop)
                    .should(isInclude? 'include' : 'not.include', value)

                // @ts-ignore
                return;
            }

            if (parentSelector && index) {
              cy.get(parentSelector)
                .find(selector)
                .eq(index)
                .contains(text)
                .invoke(attr, prop)
                .should(isInclude? 'include' : 'not.include', value)

              // @ts-ignore
              return;
            }

            if (parentSelector) {
                cy.get(parentSelector)
                    .find(selector)
                    .contains(text)
                    .invoke(attr, prop)
                    .should(isInclude? 'include' : 'not.include', value)

                // @ts-ignore
                return;
            }

            if(checkType !== 'contains') {
                cy.get(selector)
                    .each((element: JQuery<HTMLElement>) => {
                        if(element.text().includes(text)) {
                            this._checkCssValue(element, prop, value)
                        }
                    });

                // @ts-ignore
                return;
            }

          return cy.get(selector)
                .contains(text)
                .invoke(attr, prop)
                .should(isInclude? 'include' : 'not.include', value)
        }

        if(index) {
            return cy.get(selector)
                .eq(index)
                .invoke(attr, prop)
                .should(isInclude? 'include' : 'not.include', value)
        }

        if(parentSelector && isShadowElement) {
            return cy.get(parentSelector)
                .shadow()
                .find(selector)
                .invoke(attr, prop)
                .should(isInclude? 'include' : 'not.include', value)
        }

        if(parentSelector) {
            return cy.get(parentSelector)
                .find(selector)
                .invoke(attr, prop)
                .should(isInclude? 'include' : 'not.include', value)
        }

        if(isMultiple) {
            return cy.get(selector)
                .each((element: JQuery<HTMLElement>) => {
                    this._checkCssValue(element, prop, value)
                });
        }

        if(!isWithInvoke) {
            return cy.get(selector).should(prop, value)
        }

        return cy.get(selector)
            .invoke(attr, prop)
            .should(isInclude? 'include' : 'not.include', value)
    }

    public checkElementQuantity({
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

        cy.get(baseSelectors.tags.inputs.input)
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

    public checkCounterFunctionality({
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

/*
*---------------------------------------------------
* WRITES SECTION
* Base methods for writing values in inputs/files
*---------------------------------------------------
*/

    public writeContentToFile({
         filePath,
         content,
         wait = 500,
         contentFilePath
    }: {
        filePath: string,
        content?: string
        wait?: number,
        contentFilePath?: string
    }): void {
        if(contentFilePath) {
            readFile(contentFilePath).then((file: string) => {
                writeTofile(filePath, file)
                cy.wait(wait)
            })
        }

        if(content) {
            writeTofile(filePath, content)
            cy.wait(wait)
        }
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

/*
*---------------------------------------------------
* HELPERS SECTION
* Base methods for activities like visit, go back,
* get selector, etc
*---------------------------------------------------
*/

    public skipTestByCondition(condition: any): void {
        cy.skipWhen(condition)
    }

    public hoverElement({
         selector,
         text,
         wait = 0
    }: {
        selector: string,
        text?: string,
        wait?: number
    }): void {
        if (text) {
            cy.wait(wait).get(selector).contains(text).realHover()

            return;
        }

        cy.wait(wait).get(selector).realHover()
    }

    public openLocalhost({
        number,
        path
    }: {
        number: number,
        path?: string
    }): Cypress.Chainable<Cypress.AUTWindow> {
        return path ?
            cy.visit(`${Cypress.env(`localhost${number}`)}/${path}`)
            :
            cy.visit(Cypress.env(`localhost${number}`));

    }

    public reloadWindow(withoutCache: boolean = false): void {
        cy.reload(withoutCache)
    }

    public goBack(): void {
        cy.go(-1)
    }

    public getInputSelector(selector: string): string {
        return selector.includes(Constants.selectorParts.sharedRoutingAppSelectorsParts.userInfo.toUpperCase()) ? baseSelectors.tags.inputs.textarea : baseSelectors.tags.inputs.input
    }

/*
*---------------------------------------------------
* ACTIVITIES SECTION
* Base methods related to specific actions
*---------------------------------------------------
*/
    public addUser(name: string, email: string): void {
        this.fillField({
            selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.nameField),
            text: name
        })
        this.fillField({
            selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.emailField),
            text: email
        })
        this.checkElementState({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.primary,
            state: 'not.be.disabled'
        })
        this.clickElementBySelector({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.primary
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

    public checkOutsideResourceUrl({
         parentSelector,
         selector,
         text,
         link,
         isInclude = true
     }: {
        parentSelector?: string,
        selector: string,
        text: string,
        link: string,
        isInclude?: boolean
    }): void {
        if(parentSelector) {
            this.clickElementWithText({
                parentSelector,
                selector,
                text,
                isTargetChanged: true
            })
        } else {
            this.clickElementWithText({
                selector,
                text,
                isTargetChanged: true
            })
        }
        this.checkUrlText(link, isInclude, true)
    }

    public changeRootFile({
         changedContentFilePath,
         rootFilePath,
         originalContentFilePath,
     }: {
        changedContentFilePath: string,
        rootFilePath: string,
        originalContentFilePath: string
    }): void {
        cy.wait(2000)
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.paragraph,
            text: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.start,
            visibilityState: 'be.visible'
        })
        this.writeContentToFile({
            contentFilePath: changedContentFilePath,
            filePath: rootFilePath,
            wait: 1000
        })
        this.reloadWindow()
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.paragraph,
            text: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.start,
            isVisible: false
        })
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.paragraph,
            text: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.start.replace('started', 'TESTED'),
            visibilityState: 'be.visible'
        })
        this.writeContentToFile({
            contentFilePath: originalContentFilePath,
            filePath: rootFilePath,
            wait: 1000
        })
        this.reloadWindow()
        this.checkElementWithTextPresence({
            selector: baseSelectors.tags.paragraph,
            text: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.start,
            visibilityState: 'be.visible'
        })
    }

    public checkLinkedCardsFunctionality(host: number): void {
        this.checkOutsideResourceUrl({
            parentSelector: baseSelectors.tags.headers.h1,
            selector: baseSelectors.tags.coreElements.link,
            text: CommonTestData.nextJsAppsHeaderLinkName,
            link: Constants.commonConstantsData.commonLinks.nextJs,
        })
        Constants.commonConstantsData.nextJsAppsCommonPhrases.linksCardsText.forEach((text: string, index: number) => {
            this.openLocalhost({
                number: host
            })
            this.checkOutsideResourceUrl({
                selector: commonSelectors.nextJsAppsLinkCard,
                text,
                link: Constants.commonConstantsData.commonLinks.nextJsAppsCardsLinks[index],
            })
        })
        // TODO: Failed for now due to dynamic animations loading on new page. Extra investigate required
        // this.openLocalhost(host)
        // this.checkOutsideResourceUrl({
        //         parentSelector: baseSelectors.tags.footer,
        //         selector: baseSelectors.tags.coreElements.link,
        //         text: Constants.commonConstantsData.nextJsAppsCommonPhrases.messages.engine,
        //         link: Constants.commonConstantsData.commonLinks.vercel,
        // })
    }

    public checkLinkedCardsHoverAnimation(): void {
        Constants.commonConstantsData.nextJsAppsCommonPhrases.linksCardsText.forEach((text: string) => {
            this.reloadWindow()
            this.checkElementHaveProperty({
                selector: commonSelectors.nextJsAppsLinkCard,
                prop: CssAttr.color,
                value: Constants.color.skyBlue,
                text,
                isInclude: false,
            })
            this.hoverElement({
                selector: commonSelectors.nextJsAppsLinkCard,
                text,
                wait: 2000
            })
            this.checkElementHaveProperty({
                selector: commonSelectors.nextJsAppsLinkCard,
                prop: CssAttr.color,
                value: Constants.color.skyBlue,
                text,
            })
        })
    }


/*
*---------------------------------------------------
* PRIVATES SECTION
* Base private methods
*---------------------------------------------------
*/

    private _checkInputValue(text: string, value: string, isLengthChecked: boolean = false): void {
        if(isLengthChecked) {
            expect(text.length).to.be.eq(value.length)

            return;
        }

        expect(text).to.be.eq(value)

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
