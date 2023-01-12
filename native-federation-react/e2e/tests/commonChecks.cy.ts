import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('It checks components header and console message', () => {
    const appsData = [
        {
            host: 3000,
            header: Constants.elementsText.nativeFederationReactComponentsHeaders.host
        },
        {
            host: 3001,
            header: Constants.elementsText.nativeFederationReactComponentsHeaders.remote
        }
    ]

    appsData.forEach((property: { host: number, header: string }) => {
        it(`Checks ${property.header} page header visibility`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: property.header,
                visibilityState: 'be.visible'
            })
        })

        it(`Checks console message visibility in ${property.header} component`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.paragraph,
                text: Constants.elementsText.nativeFederationReactPageMessages.checkConsoleMessage,
                visibilityState: 'be.visible'
            })
        })

        it('Checks apps console date message', () => {
            basePage.openLocalhost(property.host)
            basePage.checkInfoInConsole(Constants.elementsText.nativeFederationReactConsoleMessages.dateMessage)
        })

        it('Checks apps console weekend message', () => {
            basePage.openLocalhost(property.host)
            basePage.checkInfoInConsole(Constants.elementsText.nativeFederationReactConsoleMessages.weekendMessage)
        })
    });
});
