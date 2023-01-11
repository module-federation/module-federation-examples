import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appName: Constants.elementsText.biDirectionalHeader,
        appSubheader: Constants.elementsText.automaticVendorFirstAppName,
        app1Button: Constants.elementsText.biDirectionalButton1,
        app2Button: Constants.elementsText.biDirectionalButton2,
        host: 3001
    },
    {
        appName: Constants.elementsText.biDirectionalHeader,
        appSubheader: Constants.elementsText.automaticVendorSecondAppName,
        app1Button: Constants.elementsText.biDirectionalButton1,
        app2Button: Constants.elementsText.biDirectionalButton2,
        host: 3002
    }
]

appsData.forEach((
    property: {
        appName: string,
        appSubheader: string,
        app1Button: string,
        app2Button: string,
        host: number
    }
) => {
    describe(`Check ${property.appName} starts and running`, () => {
        before(() => {
            basePage.openLocalhost(property.host)
        })
        it(`Check App1 and App2 elements`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: String(property.appName)
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h2,
                text: String(property.appSubheader)
            })
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: String(property.app1Button)
            })
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: String(property.app2Button)
            })
        })
    })
})
