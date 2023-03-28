import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CommonTestData} from "../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

describe('Typescript', () => {
    context('It checks typescript apps', () => {
        const appsData = [
            {
                host: 3001,
                appName: Constants.commonConstantsData.commonCountAppNames.app1,
                smallButton: Constants.updatedConstantsData.typeScriptApp.buttons.small,
                largeButton: Constants.updatedConstantsData.typeScriptApp.buttons.large
            },
            {
                host: 3002,
                appName: Constants.commonConstantsData.commonCountAppNames.app2,
            }
        ]
    
        appsData.forEach((property: { host: number, appName: string, smallButton?: string, largeButton?: string }) => {
            it(`Checks both apps shares same header`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: CommonTestData.commonTypeScriptAppsData[0].header,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Checks app name visibility`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: property.appName,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Checks both apps shares ${appsData[0].smallButton}`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: appsData[0].smallButton,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Checks ${appsData[0].smallButton} is not disabled`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementState({
                    selector: baseSelectors.tags.coreElements.button,
                    text: appsData[0].smallButton,
                    state: 'not.be.disabled'
                })
            });
    
            it(`Checks only ${appsData[0].appName} includes ${appsData[0].largeButton}`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                if(property.host === appsData[0].host) {
                  basePage.checkElementWithTextPresence({
                      selector: baseSelectors.tags.coreElements.button,
                      text: appsData[0].largeButton,
                      visibilityState: 'be.visible'
                  })
                  basePage.checkElementState({
                      selector: baseSelectors.tags.coreElements.button,
                      text: appsData[0].largeButton,
                      state: 'not.be.disabled'
                  })
    
                  return;
              }
    
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: appsData[0].largeButton,
                    isVisible: false
                })
            })
        });
    });
});
