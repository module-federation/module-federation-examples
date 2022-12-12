import { Constants } from './../../cypress/fixtures/constants';
import { alertMessages, baseSelectors, buttons, fields } from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

function addUser(name: string, email: string) {
    basePage.fillField({
        selector: fields.nameField,
        text: name
    })
    basePage.fillField({
        selector: fields.emailField,
        text: email
    })
    basePage.checkElementState({
        selector: baseSelectors.button,
        state: 'not.be.disabled'
    })
    basePage.clickElementBySelector({
        selector: baseSelectors.button
    })
}

describe('Check Angular-React Application', () => {
    beforeEach(() => {
        basePage.openLocalhost(4201)
    })

    it('Check App build and running', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.angularReactShellHeader
        })
        basePage.checkElementExist({
            selector: fields.nameField
        })
        basePage.checkElementExist({
            selector: fields.nameField
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.angularReactShellCreateUserButton
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.angularReactShellSubHeader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.angularReactShellParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.angularReactShellEmptyTable
        })
    })

    it('Add user to the table', () => {
        addUser(
            Constants.commonPhrases.name.text,
            Constants.commonPhrases.email.text
        )
        basePage.checkElementExist({
            selector: baseSelectors.table
        })
        basePage.checkChildElementVisibility(
            baseSelectors.table,
            baseSelectors.tableDataCell
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 3
        })
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonPhrases.name.text,
            Constants.commonPhrases.name.index,
        )
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonPhrases.email.text,
            Constants.commonPhrases.email.index,
        )
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.angularReactShellRemoveUserButton
        })
    })

    it('Remove user to the table', () => {
        addUser(
            Constants.commonPhrases.name.text,
            Constants.commonPhrases.email.text
        )
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.angularReactShellRemoveUserButton
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.angularReactShellEmptyTable
        })
    })

    it('Check fileds validation', () => {
        basePage.clickElementBySelector({
            selector: fields.nameField
        })
        basePage.clickElementBySelector({
            selector: fields.emailField
        })
        basePage.clickElementBySelector({
            selector: baseSelectors.button,
            isForce: true
        })
        basePage.checkElementExist({
            selector: alertMessages.angularAlertMessage
        })
        basePage.checkElementWithTextPresence({
            selector: alertMessages.angularAlertMessage,
            text: Constants.commonPhrases.nameIsRequired
        })
        basePage.checkElementWithTextPresence({
            selector: alertMessages.angularAlertMessage,
            text: Constants.commonPhrases.emailIsRequired
        })
    })
})
