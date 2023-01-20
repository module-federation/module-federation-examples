import { baseSelectors} from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base"
import { Constants } from "../../cypress/fixtures/constants"

const basePage: BaseMethods = new BaseMethods()

describe("Checks application", () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })
    let appText = [
        {
            appText: Constants.commonPhrases.welcomeToHostApp
        },
        {
            appText: Constants.commonPhrases.remoteAppText
        },
        {
            appText: Constants.commonPhrases.remoteAppsNameFromReduxStore
        }
    ]
    
    appText.forEach(function (property: { appText: string }) {
        it(`Check that ${property.appText} text is visible`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.appText,
                visibilityState: 'be.visible'
            })
        })
    });

        it('Checks dispatch RemoteApp NewName Button visibility', () => {
        basePage.checkElementWithTextPresence({
           selector: baseSelectors.button,
           text: Constants.elementsText.dispatchRemoteAppNewNameButton
        }); 
    });
    
        it('Checks that Remote App name Updated', () => {
            basePage.sendInputText({
                selector: baseSelectors.input,
                text: Constants.elementsText.dispatchRemoteAppNewNameInput
            }); 
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: Constants.elementsText.dispatchRemoteAppNewNameButton
            });
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: Constants.elementsText.dispatchRemoteAppNewNameInput
             });    
    });
})