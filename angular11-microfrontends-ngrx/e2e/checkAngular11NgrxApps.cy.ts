import {
    baseSelectors,
    commonSelectors
} from './../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { BaseMethods } from '../../cypress/common/base';
import {returnCommonAngularAppsData} from "../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

const appsData = returnCommonAngularAppsData(Constants.commonConstantsData.commonAngularAppsData.messages.shellWelcome)

appsData.forEach(
    (property: {
        appNameText: string,
        headerText: string,
        isWelcomeText: boolean,
        welcomeText?: string,
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
                    selector: baseSelectors.tags.navigation,
                })
                basePage.checkChildElementVisibility(
                    baseSelectors.tags.navigation,
                    baseSelectors.css.navigation,
                )
                basePage.checkElementQuantity({
                    selector: baseSelectors.css.navigation,
                    quantity: 3
                })
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.link,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.href,
                    value: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItemLogo.link
                })
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.link,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.target,
                    value: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItemLogo.targetBlank
                })
                basePage.checkChildElementContainText(
                    baseSelectors.tags.navigation,
                    baseSelectors.css.navigation,
                    Constants.commonConstantsData.home,
                    Constants.commonConstantsData.commonIndexes.one
                )
                basePage.checkChildElementContainText(
                    baseSelectors.tags.navigation,
                    baseSelectors.css.navigation,
                    Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.profile,
                    Constants.commonConstantsData.commonIndexes.two
                )
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: headerText
                })
                if (property.isWelcomeText) {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.paragraph,
                        text: property.welcomeText
                    })
                }
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.paragraph,
                    text: paragraphText
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: property.tableHeaderText
                })
                if (property.isCardBody) {
                    basePage.checkElementExist({
                        selector: commonSelectors.commonAngularAppsSelectors.blocks.cardBody
                    })
                    basePage.checkChildElementVisibility(
                        commonSelectors.commonAngularAppsSelectors.blocks.cardBody,
                        commonSelectors.commonAngularAppsSelectors.blocks.formGroup,
                    )
                    basePage.checkElementQuantity({
                        selector: commonSelectors.commonAngularAppsSelectors.blocks.formGroup,
                        quantity: 3
                    })
                    basePage.checkElementExist({
                        selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.nameField)
                    })
                    basePage.checkElementExist({
                        selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.emailField)
                    })
                    basePage.checkElementExist({
                        selector: commonSelectors.commonAngularAppsSelectors.buttons.primary,
                    })
                    basePage.checkElementState({
                        selector:commonSelectors.commonAngularAppsSelectors.buttons.primary,
                    })
                }
                if (property.sharedHeader) {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.headers.h2,
                        text: property.sharedHeader
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.paragraph,
                        text: property.sharedParagraph
                    })
                }
                basePage.checkElementExist({
                    selector: baseSelectors.tags.tableElements.table,
                })
                basePage.checkChildElementVisibility(
                    baseSelectors.tags.tableElements.table,
                    baseSelectors.tags.tableElements.row
                )
                basePage.checkElementQuantity({
                    selector: baseSelectors.tags.tableElements.header,
                    quantity: 3
                })
                basePage.checkChildElementContainText(
                    baseSelectors.tags.tableElements.table,
                    baseSelectors.tags.tableElements.header,
                    Constants.commonConstantsData.commonAngularAppsData.mdmfTableRowName,
                    Constants.commonConstantsData.commonIndexes.zero
                )
                basePage.checkChildElementContainText(
                    baseSelectors.tags.tableElements.table,
                    baseSelectors.tags.tableElements.header,
                    Constants.commonConstantsData.commonAngularAppsData.mdmfTableRowEmail,
                    Constants.commonConstantsData.commonIndexes.one
                )
                basePage.checkChildElementContainText(
                    baseSelectors.tags.tableElements.table,
                    baseSelectors.tags.tableElements.header,
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
            selector: baseSelectors.tags.tableElements.table,
        })
        basePage.checkChildElementVisibility(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tags.tableElements.dataCell,
            quantity: 3
        })
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonIndexes.zero,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            Constants.commonConstantsData.commonIndexes.one,
        )
        basePage.checkElementExist({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.danger
        })
        basePage.clickElementWithText({
            selector: baseSelectors.css.navigation,
            text: Constants.commonConstantsData.home
        })
        basePage.checkElementExist({
            selector: baseSelectors.tags.tableElements.table,
        })
        basePage.checkChildElementVisibility(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tags.tableElements.dataCell,
            quantity: 3
        })
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonIndexes.zero,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            Constants.commonConstantsData.commonIndexes.one,
        )
        basePage.checkElementExist({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.danger
        })
    })

    it('Check removing user from table (Remove form Profile)', () => {
        basePage.addUser(
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
        )
        basePage.clickElementBySelector({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.danger
        })
        basePage.checkElementExist({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
            isVisible: false
        })
        basePage.checkElementExist({
            selector: baseSelectors.tags.tableElements.table,
        })
        basePage.checkChildElementVisibility(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            false
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tags.tableElements.dataCell,
            quantity: 0
        })
        basePage.clickElementWithText({
            selector: baseSelectors.css.navigation,
            text: Constants.commonConstantsData.home
        })
        basePage.checkElementExist({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
            isVisible: false
        })
        basePage.checkElementExist({
            selector: baseSelectors.tags.tableElements.table,
        })
        basePage.checkChildElementVisibility(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            false
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tags.tableElements.dataCell,
            quantity: 0
        })
    })

    it('Check removing user from table (Remove form Shell)', () => {
        basePage.addUser(
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
        )
        basePage.clickElementWithText({
            selector: baseSelectors.css.navigation,
            text: Constants.commonConstantsData.home
        })
        basePage.clickElementBySelector({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.danger
        })
        basePage.checkElementExist({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
            isVisible: false
        })
        basePage.checkElementExist({
            selector: baseSelectors.tags.tableElements.table,
        })
        basePage.checkChildElementVisibility(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            false
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tags.tableElements.dataCell,
            quantity: 0
        })
        basePage.clickElementWithText({
            selector: baseSelectors.css.navigation,
            text: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.profile,
        })
        basePage.checkElementExist({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
            isVisible: false
        })
        basePage.checkElementExist({
            selector: baseSelectors.tags.tableElements.table,
        })
        basePage.checkChildElementVisibility(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            false
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tags.tableElements.dataCell,
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
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonIndexes.zero,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            Constants.commonConstantsData.commonIndexes.one,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.second,
            Constants.commonConstantsData.commonIndexes.three,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.second,
            Constants.commonConstantsData.commonIndexes.four,
        )
        basePage.clickElementBySelector({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
            index: 1
        })
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonIndexes.zero,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            Constants.commonConstantsData.commonIndexes.one,
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tags.tableElements.dataCell,
            quantity: 3
        })
        basePage.clickElementWithText({
            selector: baseSelectors.css.navigation,
            text: Constants.commonConstantsData.home
        })
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonIndexes.zero,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            Constants.commonConstantsData.commonIndexes.one,
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tags.tableElements.dataCell,
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
            selector: baseSelectors.css.navigation,
            text: Constants.commonConstantsData.home
        })
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonIndexes.zero,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            Constants.commonConstantsData.commonIndexes.one,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.second,
            Constants.commonConstantsData.commonIndexes.three,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.second,
            Constants.commonConstantsData.commonIndexes.four,
        )
        basePage.clickElementBySelector({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
            index: 1
        })
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonIndexes.zero,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            Constants.commonConstantsData.commonIndexes.one,
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tags.tableElements.dataCell,
            quantity: 3
        })
        basePage.clickElementWithText({
            selector: baseSelectors.css.navigation,
            text: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.profile,
        })
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
            Constants.commonConstantsData.commonIndexes.zero,
        )
        basePage.checkChildElementContainText(
            baseSelectors.tags.tableElements.table,
            baseSelectors.tags.tableElements.dataCell,
            Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            Constants.commonConstantsData.commonIndexes.one,
        )
        basePage.checkElementQuantity({
            selector: baseSelectors.tags.tableElements.dataCell,
            quantity: 3
        })
    })

    it('Check fileds validation', () => { 
        basePage.clickElementBySelector({
            selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.nameField)
        })
        basePage.clickElementBySelector({
            selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.emailField)
        })
        basePage.clickElementBySelector({
            selector: commonSelectors.commonAngularAppsSelectors.buttons.primary,
            isForce: true
        })
        basePage.checkElementExist({
            selector: commonSelectors.commonAngularAppsSelectors.alertMessage,
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