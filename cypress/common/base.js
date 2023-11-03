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

const baseSelectors = require("./selectors").baseSelectors;
const commonSelectors = require("./selectors").commonSelectors;
const Constants = require("../fixtures/constants.js");
const CssAttr = require("../types/cssAttr");
const StubTypes = require("../types/stubTypes");
const RequestsTypes = require("../types/requestsTypes");
const { readFile, writeTofile } = require("../helpers/file-actions-helper.js");
const CommonTestData = require("../fixtures/commonTestData.js");

export default class BaseMethods {

 /*
 *---------------------------------------------------
 * CLICKS SECTION
 * Base methods for clicking on elements on the page
 *---------------------------------------------------
 */

    clickElementBySelector({
         selector,
         index = 0,
         isForce = false,
         parentSelector,
         isMultiple = false,
         wait = 0
    } = {}) {
        if (parentSelector) {
            return cy.get(parentSelector).find(selector).wait(wait).click({force: isForce, multiple: isMultiple})
        }

        return cy.get(selector).eq(index).wait(wait).click({force: isForce, multiple: isMultiple})
    }

    clickElementWithText({
         selector,
         text,
         isForce = false,
         wait = 0,
         isShadowRoot = false,
         index = 0,
         parentSelector,
         isTargetChanged = false
    } = {}) {
        if(isTargetChanged) {
            cy.get(selector).contains(text)
                .should(($button) => {
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

    checkValueInReadFile({
         filePath,
         text,
         webpackFileSeparator,
         isContain = true
     }) {
        readFile(filePath).then((file) => {
            if(webpackFileSeparator) {
                isContain ? expect(file.split(webpackFileSeparator)[1]).to.include(text) :
                    expect(file.split(webpackFileSeparator)[1]).not.to.include(text)

                return;
            }

            expect(JSON.stringify(file)).to.include(text)
        })
    }

    checkUrlText(url, isInclude = false, isDifferentOrigin = false) {
        if(isDifferentOrigin) {
            cy.origin(url, { args: { isInclude, url } }, ({ isInclude, url }) => {
                cy.url().should(isInclude ? 'include' : 'not.include', url);
            });

            return;
        }

        cy.url().should(isInclude ? 'include' : 'not.include', url);
    }

    checkElementVisibility ({
         selector,
         isVisible = true,
         visibleState = 'be.visible',
         notVisibleState = 'not.exist',
         text,
         parentElement,
         parentSelector
    }) {
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

    checkElementWithTextPresence({
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
    }) {
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
                .each((element) => {
                    expect(element.text()).to.include(text)
                });
        }

        if(textArray) {
            for (let i = 0; i <  textArray.length; i++) {
                this._checkChildElementWithTextPresence(parentSelector, selector.replace(
                    '{cellType}', textArray[i]
                        .replace(/\s/g, '_').toUpperCase()), text[i], isVisible ? visibilityState : notVisibleState)
            }

            return;
        }

        if(isShadowRoot) {
            cy.get(selector)
                .shadow()
                .contains(text)
                .should(isVisible ? visibilityState : notVisibleState);

            return;
        }

        return cy.get(selector)
            .contains(text)
            .should(isVisible ? visibilityState : notVisibleState);
    }

    checkElementContainText({
         selector,
         text,
         index = 0,
         isContain = true,
         checkType = 'contain.text',
         parentSelector,
         isParent,
         link
    }) {
        if(link) {
            if (isParent && text) {
                return cy.get(selector)
                    .contains(text)
                    .parent()
                    .should('have.attr', 'href', link)
                    .and('not.be.disabled')
            }

            return cy.get(selector)
                .each((element) => {
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

    checkInfoInConsole(info, chainer = StubTypes.beCalled, isReloaded = true, isStubbed = true) {
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

    checkNetworkCallCreated(requestType, url, localhost, statusCode) {
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

    checkElementHaveProperty({
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
     } = {}) 
     {
        if(text) {
            if(isParent) {
                cy.get(selector)
                    .contains(text)
                    .parent()
                    .invoke(attr, prop)
                    .should(isInclude? 'include' : 'not.include', value)

                return;
            }

            if (parentSelector && index) {
              cy.get(parentSelector)
                .find(selector)
                .eq(index)
                .contains(text)
                .invoke(attr, prop)
                .should(isInclude? 'include' : 'not.include', value)

              return;
            }

            if (parentSelector) {
                cy.get(parentSelector)
                    .find(selector)
                    .contains(text)
                    .invoke(attr, prop)
                    .should(isInclude? 'include' : 'not.include', value)

                return;
            }

            if(checkType !== 'contains') {
                cy.get(selector)
                    .each((element) => {
                        if(element.text().includes(text)) {
                            this._checkCssValue(element, prop, value)
                        }
                    });

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
                .each((element) => {
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

    checkElementQuantity({
         selector,
         quantity,
         parentSelector,
         state = 'have.length',
         text,
         waitUntil = false,
         jqueryValue = false
     }) {
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
            let counter = 0;

            cy.get(selector)
                .each((element) => {
                    if(element.text().includes(text)) {
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

    checkElementState({
         selector,
         state = 'be.disabled',
         parentSelector,
         text,
         isMultiple = false,
         jqueryValue
    } = {}) {
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
                .each((element) => {
                    expect(element.is(state)).to.be.eq(jqueryValue)
                });

            return;
        }

        cy.get(selector)
            .should(state)
    }

    checkInputValue(value, parentElement, isLengthChecked = false) {
        if (parentElement) {
            cy.get(parentElement)
                .find(this.getInputSelector(parentElement))
                .invoke('val')
                .then((text) => {
                    this._checkInputValue(text, value, isLengthChecked)
                });

            return;
        }

        cy.get(baseSelectors.tags.inputs.input)
            .invoke('val')
            .then((text) => {
                this._checkInputValue(text, value, isLengthChecked)
            });
    }

    checkInfoOnNonDefaultHost(host, element, existedText, notExistedText) {
        return cy.origin(Cypress.env(`localhost${host}`), { args: { element, existedText, notExistedText } }, ({ element, existedText, notExistedText }) => {
            cy.visit('/')
            // do not get it as checkElementWithTextPresence() due to inability of origin to get outside methods
            cy.get(element).contains(existedText).should('be.visible')
            cy.get(element).contains(notExistedText).should('not.exist')
        });
    }

    checkCounterFunctionality({ button, counterText, buttonsCount, counterElement, isButtonTexted = true, isReloaded, isValueCompared, isCounterDecreased, counterValue, isCounterValueUsed }) {
        let counter = 0
        let counterElementSelector = counterElement? counterElement : button

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

    checkBrowserAlertByText({ selector, alertMessage, isEqual = true, index = 0 }) {
        this.clickElementBySelector({
            selector,
            index
        })
        cy.wrap(new Promise((resolve, reject) => {
            cy.on('window:alert', (alertText) => {
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

     writeContentToFile(filePath, content, wait = 500, contentFilePath) {
        if(contentFilePath) {
            readFile(contentFilePath).then((file) => {
                writeTofile(filePath, file)
                cy.wait(wait)
            })
        }

        if(content) {
            writeTofile(filePath, content)
            cy.wait(wait)
        }
    }

     fillField(selector, text, parentSelector) {
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

    skipTestByCondition(condition) {
        cy.skipWhen(condition)
    }

    hoverElement(selector, text, wait = 0) {
        if (text) {
            cy.wait(wait).get(selector).contains(text).realHover()

            return;
        }

        cy.wait(wait).get(selector).realHover()
    }

    openLocalhost(number, path) {
        if(path) {
            return cy.visit(`${Cypress.env(`localhost${number}`)}/${path}`);
        } else {
            return cy.visit(Cypress.env(`localhost${number}`));
        }
    }

    reloadWindow(withoutCache = false) {
        cy.reload(withoutCache);
    }

    goBack() {
        cy.go(-1)
    }

    getInputSelector(selector) {
        return selector.includes(Constants.selectorParts.sharedRoutingAppSelectorsParts.userInfo.toUpperCase()) ? baseSelectors.tags.inputs.textarea : baseSelectors.tags.inputs.input
    }

/*
*---------------------------------------------------
* ACTIVITIES SECTION
* Base methods related to specific actions
*---------------------------------------------------
*/
    addUser(name, email) {
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

    compareInfoBetweenHosts(selector, extraHost, isEqual = true, index = 0, clickSelector, wait = 0) {
        cy.get(selector)
            .wait(wait)
            .eq(index)
            .invoke('text')
            .then((baseText) => {
                cy.origin(Cypress.env(`localhost${extraHost}`), { args: { baseText, selector, isEqual, clickSelector, wait } }, ({ baseText, selector, isEqual, clickSelector, wait }) => {
                    cy.visit('/')
                    if(clickSelector) {
                        cy.get(clickSelector).click().wait(wait)
                    }
                    cy.get(selector)
                        .invoke('text')
                        .then((text) => {
                            if(isEqual) {
                                expect(text).to.be.eq(baseText)

                                return;
                            }

                            expect(text).not.to.be.eq(baseText)
                        });
                });
            });
    }

    checkOutsideResourceUrl({ parentSelector, selector, text, link, isInclude = true }) {
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

    changeRootFile(changedContentFilePath, rootFilePath, originalContentFilePath) {
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

    checkLinkedCardsFunctionality(host) {
        this.checkOutsideResourceUrl({
            parentSelector: baseSelectors.tags.headers.h1,
            selector: baseSelectors.tags.coreElements.link,
            text: CommonTestData.nextJsAppsHeaderLinkName,
            link: Constants.commonConstantsData.commonLinks.nextJs,
        })
        Constants.commonConstantsData.nextJsAppsCommonPhrases.linksCardsText.forEach((text, index) => {
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

    checkLinkedCardsHoverAnimation() {
        Constants.commonConstantsData.nextJsAppsCommonPhrases.linksCardsText.forEach((text) => {
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

    _checkInputValue(text, value, isLengthChecked = false) {
        if(isLengthChecked) {
            expect(text.length).to.be.eq(value.length)

            return;
        }

        expect(text).to.be.eq(value)

    }


    _checkCssValue(element, prop, value) {
        if(prop === CssAttr.css) {
            expect(element.css(CssAttr.backgroundColor)).to.be.eq(value)
        } else {
            expect(element.attr(prop)).to.be.eq(value)
        }
    }

    _checkChildElementWithTextPresence(parentSelector, selector, text, visibilityState) {
       return cy.get(parentSelector)
            .find(selector)
            .contains(text)
            .should(visibilityState);
    }
}

