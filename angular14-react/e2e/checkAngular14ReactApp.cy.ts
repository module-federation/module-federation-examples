import { Constants } from './../../cypress/fixtures/constants';
import { baseSelectors, commonSelectors } from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

describe('Angular 14 React', () => {
    context('Check Angular-React Application', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 4201
            })
        })
    
        it('Check App build and running', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h2,
                text: Constants.elementsText.angularReactShellApp.header
            })
            basePage.checkElementVisibility({
                selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.nameField)
            })
            basePage.checkElementVisibility({
                selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.emailField)
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.angularReactShellApp.userActions.create
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h2,
                text: Constants.elementsText.angularReactShellApp.subHeader
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.angularReactShellApp.paragraph
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.angularReactShellApp.emptyTableState
            })
        })
    
        it('Add user to the table', () => {
            basePage.addUser(
                Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
                Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            )
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.tableElements.table,
            })
            basePage.checkElementVisibility({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
            })
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.tableElements.dataCell,
                quantity: 3
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
                index: Constants.commonConstantsData.commonIndexes.zero,
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
                index: Constants.commonConstantsData.commonIndexes.one,
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.angularReactShellApp.userActions.remove
            })
        })
    
        it('Remove user from the table', () => {
            basePage.addUser(
                Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
                Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            )
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.angularReactShellApp.userActions.remove
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.angularReactShellApp.emptyTableState
            })
        })
    
        it('Check fields validation', () => {
            basePage.clickElementBySelector({
                selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.nameField)
            })
            basePage.clickElementBySelector({
                selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.emailField)
            })
            basePage.clickElementBySelector({
                selector: baseSelectors.tags.coreElements.button,
                isForce: true
            })
            basePage.checkElementVisibility({
                selector:commonSelectors.commonAngularAppsSelectors.alertMessage,
            })
            basePage.checkElementWithTextPresence({
                selector: commonSelectors.commonAngularAppsSelectors.alertMessage,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.requiresMessages.name,
            })
            basePage.checkElementWithTextPresence({
                selector: commonSelectors.commonAngularAppsSelectors.alertMessage,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.requiresMessages.email,
            })
        })
    })
})
