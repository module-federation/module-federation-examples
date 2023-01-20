import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appName: Constants.elementsText.reactHostRemoteContainerHeader,
        appDiv: Constants.elementsText.reactHostRemoteContainerDiv,
        host: 8080
    },

    {
        appName: Constants.elementsText.reactHostRemoteHostedDiv,
        appDiv: Constants.elementsText.reactHostRemoteContainerDiv,
        appButtonInvoices: Constants.elementsText.reactHostRemoteHostedButtonNames.invoices,
        appButtonExpenses: Constants.elementsText.reactHostRemoteHostedButtonNames.expenses,
        appButtonInvoicesH2: Constants.elementsText.reactHostRemoteHostedButtonNames.invoices,
        appButtonExpensesH2: Constants.elementsText.reactHostRemoteHostedButtonNames.expenses,
        host: 8081

    }
]


appsData.forEach((
        property: {
            appName: string,
            appDiv: string,
            host: number,
            appButtonInvoices?: string,
            appButtonExpenses?: string,
            appButtonInvoicesH2?: string,
            appButtonExpensesH2?: string
        }) => {
        describe(`Check react-host-remote ${property.appName} starts and running`, () => {
            before(() => {
                basePage.openLocalhost(property.host)
            })
            it(`Check Host ${property.appName} UI and Invoices, Expenses buttons`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: property.appName
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: property.appDiv
                })
                if (property.host == 8081) {
                    if (property.appButtonInvoices){
                        basePage.clickElementWithText({
                            selector: baseSelectors.linkTag,
                            text: property.appButtonInvoices
                        })
                    }
                    if (property.appButtonInvoicesH2){
                        basePage.checkElementWithTextPresence({
                            selector: baseSelectors.h2,
                            text: property.appButtonInvoicesH2
                        })
                    }
                    basePage.goBack()
                    if (property.appButtonExpenses){
                        basePage.clickElementWithText({
                            selector: baseSelectors.linkTag,
                            text: property.appButtonExpenses
                        })
                    }
                    if (property.appButtonExpensesH2)
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.h2,
                        text: property.appButtonExpensesH2
                    })
                }

            })
        })
    })
