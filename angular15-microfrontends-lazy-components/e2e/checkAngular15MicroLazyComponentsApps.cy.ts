import { blocks, fields, buttons, baseSelectors, alertMessages } from './../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { BaseMethods } from '../../cypress/common/base';
import {returnCommonAngularAppsData} from "../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

const appsData = returnCommonAngularAppsData(Constants.commonConstantsData.commonAngularAppsData.messages.shellWelcome.replace('11', '15'))

appsData.forEach(
    (property: {
        appNameText: string,
        headerText: string,
        isWelcomeText: boolean,
        welcomeText: string,
        paragraphText: string,
        tableHeaderText: string,
        isCardBody: boolean
        sharedHeader?: string,
        sharedParagraph?: string,
        path: string,
        host: number
    }) => {
        const appName = property.path === Constants.commonConstantsData.home.toLowerCase() ? appsData[0].appNameText : appsData[1].appNameText;
        const headerText = property.path === Constants.commonConstantsData.home.toLowerCase() ? appsData[0].headerText : appsData[1].headerText;
        const paragraphText = property.path === Constants.commonConstantsData.home.toLowerCase() ? appsData[0].paragraphText : appsData[1].paragraphText;

        describe(`Check ${appName} App Page`, () => {
            beforeEach(() => {
                basePage.openLocalhost(property.host, property.path)
            })

            it('Check App is build and running', () => {
                basePage.checkElementExist({
                    selector: baseSelectors.navigation,
                })
                basePage.checkChildElementVisibility(
                    baseSelectors.navigation,
                    baseSelectors.navigationItem
                )
                basePage.checkElementQuantity({
                    selector: baseSelectors.navigationItem,
                    quantity: 3
                })
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.linkTag,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.href,
                    value: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItemLogo.link
                })
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.linkTag,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.target,
                    value: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItemLogo.targetBlank
                })
                basePage.checkChildElementContainText(
                    baseSelectors.navigation,
                    baseSelectors.navigationItem,
                    Constants.commonConstantsData.home,
                    Constants.commonConstantsData.commonIndexes.one
                )
                basePage.checkChildElementContainText(
                    baseSelectors.navigation,
                    baseSelectors.navigationItem,
                    Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.profile,
                    Constants.commonConstantsData.commonIndexes.two
                )
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.h2,
                    text: headerText
                })
                if (property.isWelcomeText) {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.paragraph,
                        text: property.welcomeText
                    })
                }
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.paragraph,
                    text: paragraphText
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.h2,
                    text: property.tableHeaderText
                })
                if (property.isCardBody) {
                    basePage.checkElementExist({
                        selector: blocks.cardBody
                    })
                    basePage.checkChildElementVisibility(
                        blocks.cardBody,
                        blocks.formGroup
                    )
                    basePage.checkElementQuantity({
                        selector: blocks.formGroup,
                        quantity: 3
                    })
                    basePage.checkElementExist({
                        selector: fields.commonField.replace('{fieldName}', Constants.selectorParts.formFieldNames.nameField)
                    })
                    basePage.checkElementExist({
                        selector: fields.commonField.replace('{fieldName}', Constants.selectorParts.formFieldNames.emailField)
                    })
                    basePage.checkElementExist({
                        selector: buttons.buttonPrimary
                    })
                    basePage.checkElementState({
                        selector: buttons.buttonPrimary
                    })
                }
                if (property.sharedHeader) {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.h2,
                        text: property.sharedHeader
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.paragraph,
                        text: property.sharedParagraph
                    })
                }
                basePage.checkElementExist({
                    selector: baseSelectors.table
                })
                basePage.checkChildElementVisibility(
                    baseSelectors.table,
                    baseSelectors.tableRow
                )
                basePage.checkElementQuantity({
                    selector: baseSelectors.tableHeader,
                    quantity: 3
                })
                basePage.checkChildElementContainText(
                    baseSelectors.table,
                    baseSelectors.tableHeader,
                    Constants.commonConstantsData.commonAngularAppsData.mdmfTableRowName,
                    Constants.commonConstantsData.commonIndexes.zero
                )
                basePage.checkChildElementContainText(
                    baseSelectors.table,
                    baseSelectors.tableHeader,
                    Constants.commonConstantsData.commonAngularAppsData.mdmfTableRowEmail,
                    Constants.commonConstantsData.commonIndexes.one
                )
                basePage.checkChildElementContainText(
                    baseSelectors.table,
                    baseSelectors.tableHeader,
                    Constants.commonConstantsData.commonAngularAppsData.mdmfTableRowAction,
                    Constants.commonConstantsData.commonIndexes.two
                )
            })
        })
    }
)

describe('Check Apps functionality', () => {
    beforeEach(() => {
        basePage.openLocalhost(4200, Constants.commonConstantsData.commonAngularAppsData.mdmfProfile.path)
    })

    it('Check added user visible on both Apps', () => {
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
        basePage.checkElementExist({
            selector: buttons.buttonDanger
        })
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.commonConstantsData.home
        })
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
        basePage.checkElementExist({
            selector: buttons.buttonDanger
        })
    })

    it('Check removing user from table (Remove form Profile)', () => {
        basePage.addUser(
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
        )
        basePage.clickElementBySelector({
            selector: buttons.buttonDanger
        })
        basePage.checkElementExist({
            selector: buttons.buttonDanger,
            isVisible: false
        })
        basePage.checkElementExist({
            selector: baseSelectors.table
        })
        basePage.checkChildElementVisibility(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            false
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 0
        })
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.commonConstantsData.home
        })
        basePage.checkElementExist({
            selector: buttons.buttonDanger,
            isVisible: false
        })
        basePage.checkElementExist({
            selector: baseSelectors.table
        })
        basePage.checkChildElementVisibility(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            false
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 0
        })
    })

    it('Check removing user from table (Remove form Shell)', () => {
        basePage.addUser(
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
        )
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.commonConstantsData.home
        })
        basePage.clickElementBySelector({
            selector: buttons.buttonDanger
        })
        basePage.checkElementExist({
            selector: buttons.buttonDanger,
            isVisible: false
        })
        basePage.checkElementExist({
            selector: baseSelectors.table
        })
        basePage.checkChildElementVisibility(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            false
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 0
        })
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.profile,
        })
        basePage.checkElementExist({
            selector: buttons.buttonDanger,
            isVisible: false
        })
        basePage.checkElementExist({
            selector: baseSelectors.table
        })
        basePage.checkChildElementVisibility(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            false
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 0
        })
    })

    it('Check adding two users and delete one of them (Remove form Profile)', () => {
        basePage.addUser(
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
        )
        basePage.addUser(
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.second,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.second,
        )
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
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.second,
            Constants.commonConstantsData.commonIndexes.three,
        )
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.second,
            Constants.commonConstantsData.commonIndexes.four,
        )
        basePage.clickElementBySelector({
            selector: buttons.buttonDanger,
            index: 1
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
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 3
        })
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.commonConstantsData.home
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
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 3
        })
    })

    it('Check adding two users and delete one of them (Remove form Shell)', () => {
        basePage.addUser(
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
        )
        basePage.addUser(
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.second,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.second,
        )
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.commonConstantsData.home
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
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.second,
            Constants.commonConstantsData.commonIndexes.three,
        )
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.second,
            Constants.commonConstantsData.commonIndexes.four,
        )
        basePage.clickElementBySelector({
            selector: buttons.buttonDanger,
            index: 1
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
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 3
        })
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.profile,
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
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 3
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
            selector: buttons.buttonPrimary,
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