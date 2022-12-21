import { AngularMethods } from './../../cypress/common/angular_samples/methods';
import { blocks, fields, buttons, baseSelectors, alertMessages } from './../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { BaseMethods } from '../../cypress/common/base';

const basePage: BaseMethods = new BaseMethods()
const angularMethods: AngularMethods = new AngularMethods()

const appsData = [
    {
        appNameText: Constants.elementsText.mdmfShell.name,
        headerText: Constants.elementsText.mdfmShellHeader,
        isWelcomeText: true,
        welcomeText: Constants.commonPhrases.mdmfShellWelcome.replace('11', '15'),
        paragraphText: Constants.commonPhrases.mdmfShellParagraph,
        tableHeaderText: Constants.elementsText.mdmfAppTableHeader,
        isCardBody: false,
        path: Constants.elementsText.mdmfShell.path,
        host: 4200
    },
    {
        appNameText: Constants.elementsText.mdmfProfile.name,
        headerText: Constants.elementsText.mdfmProfileHeader,
        isWelcomeText: false,
        welcomeText: '',
        paragraphText: Constants.commonPhrases.mdmfProfileParagraph,
        tableHeaderText: Constants.elementsText.mdmfAppTableHeader,
        isCardBody: true,
        sharedHeader: Constants.elementsText.mdmfSharedHeader,
        sharedParagraph: Constants.commonPhrases.mdmfSharedParagraph,
        path: Constants.elementsText.mdmfProfile.path,
        host: 4200
    }
]

appsData.forEach(
    function (
        property: {
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
        }) {
        const appName = property.path === Constants.elementsText.mdmfShell.path ? appsData[0].appNameText : appsData[1].appNameText;
        const headerText = property.path === Constants.elementsText.mdmfShell.path ? appsData[0].headerText : appsData[1].headerText;
        const paragraphText = property.path === Constants.elementsText.mdmfShell.path ? appsData[0].paragraphText : appsData[1].paragraphText;

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
                    attr: Constants.commonText.attr,
                    prop: Constants.commonText.href,
                    value: Constants.elementsText.mdmfNavigationItemLogo.link
                })
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.linkTag,
                    attr: Constants.commonText.attr,
                    prop: Constants.commonText.target,
                    value: Constants.elementsText.mdmfNavigationItemLogo.targetBlank
                })
                basePage.checkChildElementContainText(
                    baseSelectors.navigation,
                    baseSelectors.navigationItem,
                    Constants.tabsNames.mdmfNavigationItemHome.name,
                    Constants.tabsNames.mdmfNavigationItemHome.index
                )
                basePage.checkChildElementContainText(
                    baseSelectors.navigation,
                    baseSelectors.navigationItem,
                    Constants.tabsNames.mdmfNavigationItemProfile.name,
                    Constants.tabsNames.mdmfNavigationItemProfile.index
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
                if(property.isCardBody) {
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
                        selector: fields.commonField.replace('{fieldName}', Constants.fieldsNames.nameField)
                    })
                    basePage.checkElementExist({
                        selector: fields.commonField.replace('{fieldName}', Constants.fieldsNames.emailField)
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
                    Constants.elementsText.mdmfTableRowName.name,
                    Constants.elementsText.mdmfTableRowName.index
                )
                basePage.checkChildElementContainText(
                    baseSelectors.table,
                    baseSelectors.tableHeader,
                    Constants.elementsText.mdmfTableRowEmail.name,
                    Constants.elementsText.mdmfTableRowEmail.index
                )
                basePage.checkChildElementContainText(
                    baseSelectors.table,
                    baseSelectors.tableHeader,
                    Constants.elementsText.mdmfTableRowAction.name,
                    Constants.elementsText.mdmfTableRowAction.index
                )
            })
        })
    }
)

describe('Check Apps functionality', () => {
    beforeEach(() => {
        basePage.openLocalhost(4200, Constants.elementsText.mdmfProfile.path)
    })

    it('Check added user visible on both Apps', () => {
        angularMethods.addUser(
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
        basePage.checkElementExist({
            selector: buttons.buttonDanger
        })
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.tabsNames.mdmfNavigationItemHome.name
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
            Constants.commonPhrases.name.text,
            Constants.commonPhrases.name.index,
        )
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonPhrases.email.text,
            Constants.commonPhrases.email.index,
        )
        basePage.checkElementExist({
            selector: buttons.buttonDanger
        })
    })

    it('Check removing user from table (Remove form Profile)', () => {
        angularMethods.addUser(
            Constants.commonPhrases.name.text,
            Constants.commonPhrases.email.text
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
            text: Constants.tabsNames.mdmfNavigationItemHome.name 
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
        angularMethods.addUser(
            Constants.commonPhrases.name.text,
            Constants.commonPhrases.email.text
        )
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.tabsNames.mdmfNavigationItemHome.name 
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
            text: Constants.tabsNames.mdmfNavigationItemProfile.name 
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
        angularMethods.addUser(
            Constants.commonPhrases.name.text,
            Constants.commonPhrases.email.text
        )
        angularMethods.addUser(
            Constants.commonPhrases.secondName.text,
            Constants.commonPhrases.secondEmail.text
        )
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
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonPhrases.secondName.text,
            Constants.commonPhrases.secondName.index,
        )
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonPhrases.secondEmail.text,
            Constants.commonPhrases.secondEmail.index,
        )
        basePage.clickElementBySelector({
            selector: buttons.buttonDanger,
            index: 1
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
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 3
        })
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.tabsNames.mdmfNavigationItemHome.name 
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
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 3
        })
    })

    it('Check adding two users and delete one of them (Remove form Shell)', () => {
        angularMethods.addUser(
            Constants.commonPhrases.name.text,
            Constants.commonPhrases.email.text
        )
        angularMethods.addUser(
            Constants.commonPhrases.secondName.text,
            Constants.commonPhrases.secondEmail.text
        )
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.tabsNames.mdmfNavigationItemHome.name 
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
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonPhrases.secondName.text,
            Constants.commonPhrases.secondName.index,
        )
        basePage.checkChildElementContainText(
            baseSelectors.table,
            baseSelectors.tableDataCell,
            Constants.commonPhrases.secondEmail.text,
            Constants.commonPhrases.secondEmail.index,
        )
        basePage.clickElementBySelector({
            selector: buttons.buttonDanger,
            index: 1
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
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 3
        })
        basePage.clickElementWithText({
            selector: baseSelectors.navigationItem,
            text: Constants.tabsNames.mdmfNavigationItemProfile.name 
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
        basePage.checkElementQuantity({
            selector: baseSelectors.tableDataCell,
            quantity: 3
        })
    })

    it('Check fileds validation', () => {
        basePage.clickElementBySelector({
            selector: fields.commonField.replace('{fieldName}', Constants.fieldsNames.nameField)
        })
        basePage.clickElementBySelector({
            selector: fields.commonField.replace('{fieldName}', Constants.fieldsNames.emailField)
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
            text: Constants.commonPhrases.nameIsRequired
        })
        basePage.checkElementWithTextPresence({
            selector: alertMessages.angularAlertMessage,
            text: Constants.commonPhrases.emailIsRequired
        })
    })
})