import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CommonTestData} from "../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

describe('It checks typescript-monorepo apps', () => {
    CommonTestData.commonTypeScriptMonorepoProjectReferencesAppsData.forEach((property: { host: number, header: string, appName: string }) => {
        it(`Check that both apps shares ${property.header} header`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: property.header,
                visibilityState: 'be.visible'
            })
        });
        it(`Check ${property.appName} app name visibility`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: property.appName,
                visibilityState: 'be.visible'
            })
        });
        it(`Check ${property.appName} contains button`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementVisibility(baseSelectors.tags.coreElements.button)
        });

        it(`Checks that button in ${property.appName} is not disabled`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementState({
                selector: baseSelectors.tags.coreElements.button,
                state: 'not.be.disabled'
            })
        });

        it(`Checks that both apps shares button with same text`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.updatedConstantsData.commonAppWithButton.app2,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks that apps names is not equal`, () => {
            basePage.openLocalhost(property.host)
            basePage.compareInfoBetweenHosts(updatedSelectors.common.appName, property.host === 3002 ? CommonTestData.commonTypeScriptMonorepoProjectReferencesAppsData[0].host: CommonTestData.commonTypeScriptMonorepoProjectReferencesAppsData[1].host, false)
        });
    });
});