import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appName: Constants.elementsText.reactHostRemoteApp.containers.header,
        appDiv: Constants.elementsText.reactHostRemoteApp.containers.div,
        host: 8080
    },

    {
        appName: Constants.elementsText.reactHostRemoteApp.hostedDiv,
        appDiv: Constants.elementsText.reactHostRemoteApp.containers.div,
        appButtonInvoices: Constants.elementsText.reactHostRemoteApp.buttons.invoices,
        appButtonExpenses: Constants.elementsText.reactHostRemoteApp.buttons.expenses,
        appButtonInvoicesH2: Constants.elementsText.reactHostRemoteApp.buttons.invoices,
        appButtonExpensesH2: Constants.elementsText.reactHostRemoteApp.buttons.expenses,
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
        describe(`React NextJS -- React Host Remote`, () => {
            context(`Check react-host-remote ${property.appName} starts and running`, () => {
                before(() => {
                    basePage.openLocalhost({
                        number: property.host
                    })
                })
                it(`Check Host ${property.appName} UI and Invoices, Expenses buttons`, () => {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: property.appName
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: property.appDiv
                    })
                    if (property.host == 8081) {
                        if (property.appButtonInvoices){
                            basePage.clickElementWithText({
                                selector: baseSelectors.tags.coreElements.link,
                                text: property.appButtonInvoices
                            })
                        }
                        if (property.appButtonInvoicesH2){
                            basePage.checkElementWithTextPresence({
                                selector: baseSelectors.tags.headers.h2,
                                text: property.appButtonInvoicesH2
                            })
                        }
                        basePage.goBack()
                        if (property.appButtonExpenses){
                            basePage.clickElementWithText({
                                selector: baseSelectors.tags.coreElements.link,
                                text: property.appButtonExpenses
                            })
                        }
                        if (property.appButtonExpensesH2)
                        basePage.checkElementWithTextPresence({
                            selector: baseSelectors.tags.headers.h2,
                            text: property.appButtonExpensesH2
                        })
                    }
    
                })
            })
        })
    })
