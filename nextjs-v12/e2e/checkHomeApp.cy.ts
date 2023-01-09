import {BaseMethods} from "../../cypress/common/base";
import {Constants} from "../../cypress/fixtures/constants";
import {baseSelectors} from "../../cypress/common/selectors";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        homeLink: Constants.elementsText.nextJsV12App.homeApp.homeLink,
        shopLink: Constants.elementsText.nextJsV12App.homeApp.shopLink,
        shopHeader: Constants.elementsText.nextJsV12App.homeApp.shopHeader,
        shopSubHeader: Constants.elementsText.nextJsV12App.homeApp.shopSubHeader,
        federatedLink: Constants.elementsText.nextJsV12App.homeApp.federatedLink,
        federatedHeader: Constants.elementsText.nextJsV12App.homeApp.federatedHeader,
        checkoutLink: Constants.elementsText.nextJsV12App.homeApp.checkoutLink,
        checkoutHeader: Constants.elementsText.nextJsV12App.homeApp.checkoutHeader,
        checkoutSubHeader: Constants.elementsText.nextJsV12App.homeApp.checkoutSubHeader,
        checkoutDivHeader: Constants.elementsText.nextJsV12App.homeApp.checkoutDivHeader,
        checkoutDivText: Constants.elementsText.nextJsV12App.homeApp.checkoutDivText,
        zeitLink: Constants.elementsText.nextJsV12App.homeApp.zeitLink,
        homeHeader: Constants.elementsText.nextJsV12App.homeApp.header,
        homeSubheader: Constants.elementsText.nextJsV12App.homeApp.subheader,
        host: 3001
    }
]

appsData.forEach((
    property: {
        homeLink: string,
        shopLink: string,
        shopHeader: string,
        shopSubHeader: string,
        federatedLink: string,
        federatedHeader: string,
        checkoutLink: string,
        checkoutHeader: string,
        checkoutSubHeader: string,
        checkoutDivHeader: string,
        checkoutDivText: string,
        zeitLink: string,
        homeHeader: string,
        homeSubheader: string,
        host: number

}
) => {
    describe(`Check Home app starts and running`, () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host)
        })
        it (`Check Home App Elements`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.linkTag,
                text: property.homeLink
            })
            cy.wait(500)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: property.homeHeader
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.paragraph,
                text: property.homeSubheader
            })
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: property.shopLink,
                wait: 2500
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: property.shopHeader
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h3,
                text: property.shopSubHeader
            })
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: property.federatedLink
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: property.federatedHeader
            })
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: property.checkoutLink,
                wait: (2500)
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: property.checkoutHeader
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h3,
                text: property.checkoutSubHeader
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.checkoutDivHeader
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.checkoutDivText
            })
        })
    })
})

