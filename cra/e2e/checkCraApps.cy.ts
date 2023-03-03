import { baseSelectors } from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base"
import { Constants } from "../../cypress/fixtures/constants"

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

        describe('CRA', () => {
            context(`Check ${appName}`, () => {
                beforeEach(() => {
                    basePage.openLocalhost({
                        number: property.host
                    })
                })
    
                it(`Check ${appName} elements exist on the page`, () => {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.headers.h1,
                        text: Constants.commonConstantsData.basicComponents.basicHostRemote,
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.headers.h2,
                        text: property.appNameText
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.button,
                        text: Constants.elementsText.craApp.buttonText
                    })
                })
            })
        })
    })
