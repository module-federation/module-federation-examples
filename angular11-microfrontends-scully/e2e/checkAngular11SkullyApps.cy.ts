import { ProductList } from './fixtures/productList';
import {baseSelectors, commonSelectors} from '../../cypress/common/selectors';
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

        describe('Angular 11 microfrontends SCULLY', () => {
            context(`Check ${appName} App Page`, () => {
                beforeEach(() => {
                    basePage.openLocalhost({
                        number: property.host,
                        path: property.path
                    })
                })
    
                it('Check App is build and running', () => {
                    basePage.checkElementVisibility({
                        selector: baseSelectors.tags.navigation,
                    })
                    basePage.checkElementVisibility({
                        parentSelector: baseSelectors.tags.navigation,
                        selector: baseSelectors.css.navigation,
                    })
                    basePage.checkElementQuantity({
                        selector: baseSelectors.css.navigation,
                        quantity: 4
                    })
                    basePage.checkElementHaveProperty({
                        selector: baseSelectors.tags.coreElements.link,
                        attr: Constants.commonConstantsData.commonAttributes.attr,
                        prop: Constants.commonConstantsData.commonAttributes.href,
                        value: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItemLogo.gitHubLink
                    })
                    basePage.checkElementHaveProperty({
                        selector: baseSelectors.tags.coreElements.link,
                        attr: Constants.commonConstantsData.commonAttributes.attr,
                        prop: Constants.commonConstantsData.commonAttributes.target,
                        value: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItemLogo.targetBlank
                    })
                    basePage.checkElementContainText({
                        parentSelector: baseSelectors.tags.navigation,
                        selector: baseSelectors.css.navigation,
                        text: Constants.commonConstantsData.home,
                        index: Constants.commonConstantsData.commonIndexes.one
                    })
                    basePage.checkElementContainText({
                        parentSelector: baseSelectors.tags.navigation,
                        selector: baseSelectors.css.navigation,
                        text:  Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.profile,
                        index: Constants.commonConstantsData.commonIndexes.two
                    })
                    basePage.checkElementContainText({
                        parentSelector: baseSelectors.tags.navigation,
                        selector: baseSelectors.css.navigation,
                        text:  Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.product,
                        index: Constants.commonConstantsData.commonIndexes.three
                    })
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
                        basePage.checkElementVisibility({
                            selector: commonSelectors.commonAngularAppsSelectors.blocks.cardBody
                        })
                        basePage.checkElementVisibility({
                            parentSelector: commonSelectors.commonAngularAppsSelectors.blocks.cardBody,
                            selector: commonSelectors.commonAngularAppsSelectors.blocks.formGroup,
                        })
                        basePage.checkElementQuantity({
                            selector: commonSelectors.commonAngularAppsSelectors.blocks.formGroup,
                            quantity: 3
                        })
                        basePage.checkElementVisibility({
                            selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.nameField)
                        })
                        basePage.checkElementVisibility({
                            selector: commonSelectors.formField.replace('{fieldName}', Constants.selectorParts.formFieldNames.emailField)
                        })
                        basePage.checkElementVisibility({
                            selector: commonSelectors.commonAngularAppsSelectors.buttons.primary
                        })
                        basePage.checkElementState({
                            selector: commonSelectors.commonAngularAppsSelectors.buttons.primary,
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
                    basePage.checkElementVisibility({
                        selector: baseSelectors.tags.tableElements.table,
                    })
                    basePage.checkElementVisibility({
                        parentSelector: baseSelectors.tags.tableElements.table,
                        selector: baseSelectors.tags.tableElements.row
                    })
                    basePage.checkElementQuantity({
                        selector: baseSelectors.tags.tableElements.header,
                        quantity: 3
                    })
                    basePage.checkElementContainText({
                        parentSelector: baseSelectors.tags.tableElements.table,
                        selector: baseSelectors.tags.tableElements.header,
                        text: Constants.commonConstantsData.commonAngularAppsData.mdmfTableRowName,
                        index: Constants.commonConstantsData.commonIndexes.zero
                    })
                    basePage.checkElementContainText({
                        parentSelector: baseSelectors.tags.tableElements.table,
                        selector: baseSelectors.tags.tableElements.header,
                        text: Constants.commonConstantsData.commonAngularAppsData.mdmfTableRowEmail,
                        index: Constants.commonConstantsData.commonIndexes.one
                    })
                    basePage.checkElementContainText({
                        parentSelector: baseSelectors.tags.tableElements.table,
                        selector: baseSelectors.tags.tableElements.header,
                        text: Constants.commonConstantsData.commonAngularAppsData.mdmfTableRowAction,
                        index: Constants.commonConstantsData.commonIndexes.two
                    })
                })
            })
        }
    )
    
    describe('Check Apps functionality', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 4200,
                path: Constants.commonConstantsData.commonAngularAppsData.mdmfProfile.path
            })
        })
    
        it('Check added user visible on both Apps', () => {
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
                index: Constants.commonConstantsData.commonIndexes.zero
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
                index: Constants.commonConstantsData.commonIndexes.one
            })
            basePage.checkElementVisibility({
                selector: commonSelectors.commonAngularAppsSelectors.buttons.danger
            })
            basePage.clickElementWithText({
                selector: baseSelectors.css.navigation,
                text: Constants.commonConstantsData.home
            })
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
                index: Constants.commonConstantsData.commonIndexes.zero
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
                index: Constants.commonConstantsData.commonIndexes.one
            })
            basePage.checkElementVisibility({
                selector: commonSelectors.commonAngularAppsSelectors.buttons.danger
            })
        })
    
        it('Check removing user from table (Remove form Profile)', () => {
            basePage.addUser(
                Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
                Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
            )
            basePage.clickElementBySelector({
                selector:commonSelectors.commonAngularAppsSelectors.buttons.danger
            })
            basePage.checkElementVisibility({
                selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
                isVisible: false
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.tableElements.table,
            })
            basePage.checkElementVisibility({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                isVisible: false
            })
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.tableElements.dataCell,
                quantity: 0
            })
            basePage.clickElementWithText({
                selector: baseSelectors.css.navigation,
                text: Constants.commonConstantsData.home
            })
            basePage.checkElementVisibility({
                selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
                isVisible: false
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.tableElements.table,
            })
            basePage.checkElementVisibility({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector:  baseSelectors.tags.tableElements.dataCell,
                isVisible: false
            })
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
            basePage.checkElementVisibility({
                selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
                isVisible: false
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.tableElements.table,
            })
            basePage.checkElementVisibility({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                isVisible: false
            })
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.tableElements.dataCell,
                quantity: 0
            })
            basePage.clickElementWithText({
                selector: baseSelectors.css.navigation,
                text: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.profile,
            })
            basePage.checkElementVisibility({
                selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
                isVisible: false
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.tableElements.table,
            })
            basePage.checkElementVisibility({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector:  baseSelectors.tags.tableElements.dataCell,
                isVisible: false
            })
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
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
                index: Constants.commonConstantsData.commonIndexes.zero
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
                index: Constants.commonConstantsData.commonIndexes.one
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.testName.second,
                index: Constants.commonConstantsData.commonIndexes.three
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.email.second,
                index: Constants.commonConstantsData.commonIndexes.four
            })
            basePage.clickElementBySelector({
                selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
                index: 1
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
                index: Constants.commonConstantsData.commonIndexes.zero
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
                index: Constants.commonConstantsData.commonIndexes.one
            })
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.tableElements.dataCell,
                quantity: 3
            })
            basePage.clickElementWithText({
                selector: baseSelectors.css.navigation,
                text: Constants.commonConstantsData.home
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
                index: Constants.commonConstantsData.commonIndexes.zero
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
                index: Constants.commonConstantsData.commonIndexes.one
            })
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
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
                index: Constants.commonConstantsData.commonIndexes.zero
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
                index: Constants.commonConstantsData.commonIndexes.one
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.testName.second,
                index: Constants.commonConstantsData.commonIndexes.three
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.email.second,
                index: Constants.commonConstantsData.commonIndexes.four
            })
            basePage.clickElementBySelector({
                selector: commonSelectors.commonAngularAppsSelectors.buttons.danger,
                index: 1
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
                index: Constants.commonConstantsData.commonIndexes.zero
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
                index: Constants.commonConstantsData.commonIndexes.one
            })
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.tableElements.dataCell,
                quantity: 3
            })
            basePage.clickElementWithText({
                selector: baseSelectors.css.navigation,
                text: Constants.commonConstantsData.commonAngularAppsData.mdmfNavigationItems.profile,
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.testName.first,
                index: Constants.commonConstantsData.commonIndexes.zero
            })
            basePage.checkElementContainText({
                parentSelector: baseSelectors.tags.tableElements.table,
                selector: baseSelectors.tags.tableElements.dataCell,
                text: Constants.commonConstantsData.commonAngularAppsData.messages.email.first,
                index: Constants.commonConstantsData.commonIndexes.one
            })
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
            basePage.checkElementVisibility({
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
    
    describe('Check Product Application', () => {
        const productList = ProductList
    
        beforeEach(() => {
            basePage.openLocalhost({
                number: 4200,
                path: Constants.hrefs.angular11SkullyApp.product
            })
        })
    
        it('Check App build and running', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h2,
                text: Constants.elementsText.differentAngularVersionsApps.mdmfProductHeader
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.commonPhrases.differentAngularVersionsApps.productParagraph
            })
            productList.forEach((product) => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: product.name
                })
                basePage.checkElementHaveProperty({
                    parentSelector: baseSelectors.tags.coreElements.div,
                    selector: baseSelectors.tags.coreElements.link,
                    index: product.index,
                    text: Constants.commonPhrases.differentAngularVersionsApps.productLinkText,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.href,
                    value: product.link
                })
            })
        })
    
        it('Check Product page', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.updatedConstantsData.updatedLoadingMessage,
                isVisible: false
            })
            productList.forEach((product) => {
                basePage.clickElementWithText({
                    parentSelector: baseSelectors.tags.coreElements.div,
                    selector: baseSelectors.tags.coreElements.link,
                    text: Constants.commonPhrases.differentAngularVersionsApps.productLinkText,
                    index: product.index,
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.link,
                    text: Constants.commonPhrases.differentAngularVersionsApps.backLink
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: product.productName
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h3,
                    text: product.productType
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h4,
                    text: product.productPrice
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: product.productButtonName
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.paragraph,
                    text: product.productDescription
                })
                basePage.checkElementHaveProperty({
                    parentSelector:  baseSelectors.tags.coreElements.div,
                    selector: baseSelectors.tags.coreElements.image,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.src,
                    value: product.productImageLink
                })
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.link,
                    text: Constants.commonPhrases.differentAngularVersionsApps.backLink
                })
            })
        })
    })
})
