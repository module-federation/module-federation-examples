import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appName: Constants.commonConstantsData.biDirectional,
        appSubheader: Constants.commonConstantsData.commonCountAppNames.app1,
        app1Button: Constants.updatedConstantsData.commonAppWithButton.app1,
        app2Button: Constants.updatedConstantsData.commonAppWithButton.app2,
        host: 3001
    },
    {
        appName: Constants.commonConstantsData.biDirectional,
        appSubheader: Constants.commonConstantsData.commonCountAppNames.app2,
        app1Button: Constants.updatedConstantsData.commonAppWithButton.app1,
        app2Button: Constants.updatedConstantsData.commonAppWithButton.app2,
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
    describe('Bi Directional', () => {
        context(`Check ${property.appName} elements exists on the page`, () => {
            before(() => {
                basePage.openLocalhost({
                    number: property.host
                })
            })
            it(`Check App1 and App2 elements`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: String(property.appName)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: String(property.appSubheader)
                })
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: String(property.app1Button)
                })
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: String(property.app2Button)
                })
            })
        })
    })
})
