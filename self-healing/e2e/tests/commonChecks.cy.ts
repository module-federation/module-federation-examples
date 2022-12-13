import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, updatedSelectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {SelfHealingMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: SelfHealingMethods = new SelfHealingMethods()

describe('It checks self-healing apps', () => {
    const appsData = [
        {
            host: 3001,
            appName: Constants.commonPhrases.app1Name,
            webpackConfigPath: Constants.samplesPath.selfHealingApp1WebpackConfigPath
        },
        {
            host: 3002,
            appName: Constants.commonPhrases.app2Name,
            webpackConfigPath: Constants.samplesPath.selfHealingApp2WebpackConfigPath
        }
    ]

    appsData.forEach((property: { host: number, appName: string, webpackConfigPath: string }) => {
        it(`Checks ${Constants.commonPhrases.selfHealingAppHeaderName} header visibility`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: Constants.commonPhrases.selfHealingAppHeaderName,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks ${property.appName} app name visibility`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.appName,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks button text visibility for ${property.appName} app`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.button,
                text: Constants.elementsText.selfHealingAppButtonText,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks that button on both apps has pink color`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementHaveProperty({
                selector: baseSelectors.button,
                prop: CssAttr.backgroundColor,
                value: Constants.color.pink
            })
        });

        it(`Checks that app names is not equal`, () => {
            basePage.openLocalhost(property.host)
            basePage.compareInfoBetweenHosts(updatedSelectors.commonAppNameSelector, property.host === 3002 ? appsData[0].host: appsData[1].host, false)
        });

        it(`Checks that only ${appsData[1].appName} webpack config includes shared styled components`, () => {
            let { selfHealingWebpackConfigSeparator } = Constants.commonPhrases
            let selfHealingWebpackConfigSearchedElement = Constants.commonPhrases.selfHealingWebpackConfigSearchedString

            if(property.webpackConfigPath.includes('1')) {
                methodsPage.checkValueInWebpackConfig(property.webpackConfigPath, selfHealingWebpackConfigSeparator, selfHealingWebpackConfigSearchedElement, false)

                return;
            }

            methodsPage.checkValueInWebpackConfig(property.webpackConfigPath, selfHealingWebpackConfigSeparator, selfHealingWebpackConfigSearchedElement)
        });
    });
});
