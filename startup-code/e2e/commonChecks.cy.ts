import { BaseMethods } from "../../cypress/common/base";
import { baseSelectors, updatedSelectors } from "../../cypress/common/selectors";
import { Constants } from "../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('Startup Code', () => {
    context('It checks startup-code apps', () => {
        const appsData = [
            {
                host: 3001,
                header: Constants.commonConstantsData.basicComponents.basicHostRemote,
                appName: Constants.commonConstantsData.commonCountAppNames.app1
            },
            {
                host: 3002,
                header: Constants.commonConstantsData.basicComponents.basicHostRemote,
                appName: Constants.commonConstantsData.commonCountAppNames.app2
            }
        ]
    
        appsData.forEach((property: { host: number, header: string, appName: string }) => {
            it(`Check that both apps shares ${property.header} header`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.header,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Check ${property.appName} app name visibility`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.appName,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Check ${property.appName} contains button`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementVisibility({
                    selector: baseSelectors.tags.coreElements.button
                })
            });
    
            it(`Checks that button in ${property.appName} is not disabled`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementState({
                    selector: baseSelectors.tags.coreElements.button,
                    state: 'not.be.disabled'
                })
            });
    
            it(`Checks that both apps shares button with same text`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.updatedConstantsData.commonAppWithButton.app2,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Checks that apps names is not equal`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.compareInfoBetweenHosts(updatedSelectors.common.appName, property.host === 3002 ? appsData[0].host: appsData[1].host, false)
            });
        });
    });
});
