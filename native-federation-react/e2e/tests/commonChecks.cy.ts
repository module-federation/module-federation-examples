import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('Native Federation React', () => {
    context('It checks components header and console message', () => {
        const appsData = [
            {
                host: 3000,
                header: Constants.commonConstantsData.basicComponents.host
            },
            {
                host: 3001,
                header: Constants.commonConstantsData.basicComponents.remote
            }
        ]
    
        appsData.forEach((property: { host: number, header: string }) => {
            it(`Checks ${property.header} page header visibility`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: property.header,
                    visibilityState: 'be.visible'
                })
            })
    
            it(`Checks console message visibility in ${property.header} component`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.paragraph,
                    text: Constants.elementsText.nativeFederationReactApp.messages.pageMessages.checkConsoleMessage,
                    visibilityState: 'be.visible'
                })
            })
    
            it('Checks apps console date message', () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkInfoInConsole(Constants.elementsText.nativeFederationReactApp.messages.consoleMessages.dateMessage)
            })
    
            it('Checks apps console weekend message', () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkInfoInConsole(Constants.elementsText.nativeFederationReactApp.messages.consoleMessages.weekendMessage)
            })
        });
    })
});
