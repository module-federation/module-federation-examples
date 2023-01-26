import { Constants } from './../../cypress/fixtures/constants';
import { alertMessages, baseSelectors, fields } from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

describe('Check Angular-React Application', () => {
    beforeEach(() => {
        basePage.openLocalhost(4201)
    })

    it('Check App build and running', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.angularReactShellApp.header
        })
        basePage.checkElementExist({
            selector: fields.commonField.replace('{fieldName}', Constants.selectorParts.formFieldNames.nameField)
        })
        basePage.checkElementExist({
            selector: fields.commonField.replace('{fieldName}', Constants.selectorParts.formFieldNames.emailField)
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.angularReactShellApp.userActions.create
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.angularReactShellApp.subHeader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.angularReactShellApp.paragraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.angularReactShellApp.emptyTableState
        })
    })

    it('Add user to the table', () => {
        basePage.addUser(
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
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
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonIndexes.zero,
        )
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            Constants.commonConstantsData.commonIndexes.one,
        )
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.angularReactShellApp.userActions.remove
        })
    })

    it('Remove user from the table', () => {
        basePage.addUser(
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
        )
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.angularReactShellApp.userActions.remove
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.angularReactShellApp.emptyTableState
        })
    })

    it('Check fields validation', () => {
        basePage.clickElementBySelector({
            selector: fields.commonField.replace('{fieldName}', Constants.selectorParts.formFieldNames.nameField)
        })
        basePage.clickElementBySelector({
            selector: fields.commonField.replace('{fieldName}', Constants.selectorParts.formFieldNames.emailField)
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
            text: Constants.commonConstantsData.commonAngularAppsData.messages.requiresMessages.name,
        })
        basePage.checkElementWithTextPresence({
            selector: alertMessages.angularAlertMessage,
            text: Constants.commonConstantsData.commonAngularAppsData.messages.requiresMessages.email,
        })
    })
})
