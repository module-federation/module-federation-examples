import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";
const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appName: Constants.elementsText.nextJsSsrApp.checkout,
        host: 3000
    },
    {
        appName: Constants.commonConstantsData.home,
        host: 3001
    },
    {
        appName: Constants.elementsText.nextJsSsrApp.shop,
        host: 3002
    }
]

appsData.forEach((
    property: {
        appName: string,
        host: number
    }
) => {
    describe(`Check ${property.appName} app functionality and elements`, () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: property.host,
            })
            cy.wait(2000)
        })
        it ('Check the items on the Home page and the links to ZEIT and GitHub in the header', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.list,
                text: Constants.commonConstantsData.home
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.elementsText.nextJsSsrApp.texts.text3
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.nextJsSsrApp.texts.text4
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.elementsText.nextJsSsrApp.messages.welcomeMessage
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.nextJsSsrApp.texts.text5
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h3,
                text: Constants.elementsText.nextJsSsrApp.tiles.documentation
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h3,
                text: Constants.elementsText.nextJsSsrApp.tiles.learn
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h3,
                text: Constants.elementsText.nextJsSsrApp.tiles.examples
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.list,
                text: Constants.elementsText.nextJsSsrApp.zeit
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.list,
                text: Constants.elementsText.nextJsSsrApp.gitHub
            })
        })
        it('Verify the Shop page items', () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.list,
                text: Constants.elementsText.nextJsSsrApp.shop,
                wait: 2000
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.elementsText.nextJsSsrApp.pages.shopPage
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h3,
                text: Constants.elementsText.nextJsSsrApp.texts.mainShopText
            })
        })
        it('Verify the Federated page items', () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.list,
                text: Constants.elementsText.nextJSv12App.federatedButton.name,
                wait: 2000
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.elementsText.nextJSv12App.federatedButton.header
            })
        })
        it('Verify the Checkout page items', () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.list,
                text: Constants.elementsText.nextJsSsrApp.checkout,
                wait: 2000
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.elementsText.nextJsSsrApp.pages.checkoutPage
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h3,
                text: Constants.elementsText.nextJsSsrApp.messages.checkoutMessage
            })
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.pre,
                quantity: 2
            })
        })
    })
})
