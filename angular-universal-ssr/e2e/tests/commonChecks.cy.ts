import { BaseMethods } from "../../../cypress/common/base";
import {Constants} from "../../../cypress/fixtures/constants";
import {baseSelectors, updatedSelectors} from "../../../cypress/common/selectors";
import {AngularUniversalSsrMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: AngularUniversalSsrMethods = new AngularUniversalSsrMethods()

describe('It checks components functionality', () => {
    const appsData = [
        {
            componentName: Constants.commonPhrases.angularUniversalSsrComponentsMessages.homeComponent.split(' ')[0],
            tabName: Constants.elementsText.angularUniversalSsrTabsNames[0],
            componentText: Constants.commonPhrases.angularUniversalSsrComponentsMessages.homeComponent,
        },
        {
            componentName: Constants.commonPhrases.angularUniversalSsrComponentsMessages.angularLazyComponent.split(' ')[0],
            tabName: Constants.elementsText.angularUniversalSsrTabsNames[1],
            componentText: Constants.commonPhrases.angularUniversalSsrComponentsMessages.angularLazyComponent,
            link: Constants.hrefs.angularUniversalSsrLinks.angularLink,
        },
        {
            componentName: Constants.elementsText.angularUniversalSsrTabsNames[2].split(' ')[0],
            tabName: Constants.elementsText.angularUniversalSsrTabsNames[2],
            link: Constants.hrefs.angularUniversalSsrLinks.federationLink,
        }
    ]

    // @ts-ignore
    appsData.forEach((property: { componentName : string, tabName: string, componentText: string, link: string }) => {
        const appTabSelector: string = updatedSelectors.angularUniversalSsrTab

        it(`Checks that ${property.componentName} component element text will be visible only if ${property.componentName} tab is active & text is not reverted after reload`, () => {
            basePage.openLocalhost(4000)
            if(property.componentName === appsData[1].componentName) {
                basePage.checkElementWithTextPresence({
                    selector: appTabSelector,
                    text: appsData[1].componentText,
                    isVisible: false,
                })
                basePage.clickElementWithText({
                    selector: appTabSelector,
                    text: appsData[1].componentName
                })
            }
            methodsPage.checkActiveTabNameConnection(property.tabName, property.componentText)
            basePage.reloadWindow()
            if(property.componentName !== appsData[2].componentName) {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.appRoot,
                    text: property.componentText,
                    visibilityState: 'be.visible'
                })
            }
        })

        it(`Checks link changes after click on ${property.componentName} tab & check link is not reverted after reload`, () => {
            basePage.skipTestByCondition(property.componentName === Constants.elementsText.angularUniversalSsrTabsNames[0])
            basePage.openLocalhost(4000)
            basePage.checkUrlText(property.link)
            basePage.clickElementWithText({
                selector: appTabSelector,
                text: property.tabName
            })
            basePage.checkUrlText(property.link, true)
            basePage.reloadWindow()
            basePage.checkUrlText(property.link, true)
        })
    })
});
