import { baseSelectors } from '../../cypress-e2e/common/selectors';
import { BaseMethods } from "../../cypress-e2e/common/base"
import { Constants } from "../../cypress-e2e/fixtures/constants"

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appNameText: Constants.commonConstantsData.basicComponents.host,
        host: 3000
    },
    {
        appNameText: Constants.commonConstantsData.basicComponents.remote,
        host: 3002
    }
]

appsData.forEach(
    (property: {
        appNameText: string,
        host: number
    }) => {
        const appName = property.host === 3000 ? appsData[0].appNameText : appsData[1].appNameText;

        describe(`Check ${appName}`, () => {
            beforeEach(() => {
                basePage.openLocalhost(property.host)
            })

            it(`Check ${appName} build and running`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.h1,
                    text: Constants.commonConstantsData.basicComponents.basicHostRemote,
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.h2,
                    text: property.appNameText
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.button,
                    text: Constants.elementsText.craApp.buttonText
                })
            })
        })
    })
