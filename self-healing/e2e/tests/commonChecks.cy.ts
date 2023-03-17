import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, updatedSelectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

describe('Self Healing', () => {
    context('It checks self-healing apps', () => {
        const appsData = [
            {
                host: 3001,
                appName: Constants.commonConstantsData.commonCountAppNames.app1,
                webpackConfigPath: Constants.filesPath.selfHealingAppsConfigs.app1,
            },
            {
                host: 3002,
                appName: Constants.commonConstantsData.commonCountAppNames.app2,
                webpackConfigPath: Constants.filesPath.selfHealingAppsConfigs.app2,
            }
        ]
    
        appsData.forEach((property: { host: number, appName: string, webpackConfigPath: string }) => {
            it(`Checks ${Constants.commonPhrases.selfHealingApp.headerName} header visibility`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: Constants.commonPhrases.selfHealingApp.headerName,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Checks ${property.appName} app name visibility`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.appName,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Checks button text visibility for ${property.appName} app`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.commonConstantsData.commonButtonWithEmoji,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Checks that button on both apps has pink color`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.button,
                    prop: CssAttr.backgroundColor,
                    value: Constants.color.pink
                })
            });
    
            it(`Checks that app names is not equal`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.compareInfoBetweenHosts(updatedSelectors.common.appName, property.host === 3002 ? appsData[0].host: appsData[1].host, false)
            });
    
            it(`Checks that only ${appsData[1].appName} webpack config includes shared styled components`, () => {
                basePage.checkValueInReadFile({
                    filePath: property.webpackConfigPath,
                    webpackFileSeparator: Constants.commonPhrases.selfHealingApp.configs.separator,
                    text: Constants.commonPhrases.selfHealingApp.configs.searchedString,
                    isContain: !property.webpackConfigPath.includes('1')
                })
            });
        });
    });
});
