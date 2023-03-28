import { baseSelectors} from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base"
import { Constants } from "../../cypress/fixtures/constants"

const basePage: BaseMethods = new BaseMethods()

describe("Redux Reducer Injection", () => {
    context("Checks application", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3001
            })
        })
        let appText = [
            {
                appText: Constants.commonPhrases.reduxReducerInjectionApp.welcomeMessage
            },
            {
                appText: Constants.commonPhrases.reduxReducerInjectionApp.remoteAppText
            },
            {
                appText: Constants.commonPhrases.reduxReducerInjectionApp.remoteAppsNameFromReduxStore
            }
        ]
        
        appText.forEach(function (property: { appText: string }) {
            it(`Check that ${property.appText} text is visible`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.appText,
                    visibilityState: 'be.visible'
                })
            })
        });
    
            it('Checks dispatch RemoteApp NewName Button visibility', () => {
            basePage.checkElementWithTextPresence({
               selector: baseSelectors.tags.coreElements.button,
               text: Constants.elementsText.dispatchRemoteApp.button
            }); 
        });
        
            it('Checks that Remote App name Updated', () => {
                basePage.fillField({
                    selector: baseSelectors.tags.inputs.input,
                    text: Constants.elementsText.dispatchRemoteApp.input
                }); 
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.dispatchRemoteApp.button
                });
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: Constants.elementsText.dispatchRemoteApp.input
                 });    
        });
    })
})
