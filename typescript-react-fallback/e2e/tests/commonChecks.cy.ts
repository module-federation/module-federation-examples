import { BaseMethods } from "../../../cypress-e2e/common/base";
import {baseSelectors, updatedSelectors} from "../../../cypress-e2e/common/selectors";
import {Constants} from "../../../cypress-e2e/fixtures/constants";
import {CommonTestData} from "../../../cypress-e2e/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

describe('Typescript Project Reference', () => {
    context('It checks typescript-project-references apps', () => {
        CommonTestData.commonTypeScriptAppsData.forEach((property: { host: number, header: string, appName: string }) => {
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
                basePage.compareInfoBetweenHosts(updatedSelectors.common.appName, property.host === 3002 ? CommonTestData.commonTypeScriptAppsData[0].host: CommonTestData.commonTypeScriptAppsData[1].host, false)
            });
        });
    });
});
