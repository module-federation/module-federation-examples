import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {TypeScriptProjectReferencesMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: TypeScriptProjectReferencesMethods = new TypeScriptProjectReferencesMethods()

describe('It checks typescript-project-references apps', function () {
    let appsData = [
        {
            host: 3001,
            header: Constants.commonPhrases.typescriptProjectReferencesAppsHeader,
            appName: Constants.commonPhrases.typescriptProjectReferencesAppsApp1Name
        },
        {
            host: 3002,
            header: Constants.commonPhrases.typescriptProjectReferencesAppsHeader,
            appName: Constants.commonPhrases.typescriptProjectReferencesAppsApp2Name
        }
    ]

    appsData.forEach(function (property: { host: number, header: string, appName: string }) {
        it(`Check that both apps shares ${property.header} header`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.header,
                visibilityState: 'be.visible'
            })
        });
        it(`Check ${property.appName} app name visibility`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.header,
                visibilityState: 'be.visible'
            })
        });
        it(`Check ${property.appName} contains button`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementVisibility(baseSelectors.button)
        });

        it(`Checks that button in ${property.appName} is not disabled`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementState({
                selector: baseSelectors.button,
                state: 'not.be.disabled'
            })
        });

        it(`Checks that both apps shares button with same text`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.button,
                text: Constants.elementsText.typescriptProjectReferencesAppsButtonText,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks that apps names is not equal`, () => {
            basePage.openLocalhost(property.host)
            methodsPage.compareAppNames(property.host === 3002 ? appsData[0].host: appsData[1].host)
        });
    });
});