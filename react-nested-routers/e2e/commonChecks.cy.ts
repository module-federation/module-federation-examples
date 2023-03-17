import { BaseMethods } from "../../cypress/common/base";
import { baseSelectors } from "../../cypress/common/selectors";
import { Constants } from "../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('React Nested Routers', () => {
    context('It checks app1/app2', () => {
        const appsData = [
            {
                host: 8081,
                message: Constants.commonPhrases.reactNestedRoutersApp.pagesMessages.page1App1,
                linkMessage: Constants.elementsText.reactNestedRoutersApp.shellAppTextedLinks[4]
            },
            {
                host: 8082,
                message: Constants.commonPhrases.reactNestedRoutersApp.pagesMessages.pageAApp2,
                linkMessage: Constants.elementsText.reactNestedRoutersApp.shellAppTextedLinks[4].replace(Constants.elementsText.reactNestedRoutersApp.replaceValues[0], Constants.elementsText.reactNestedRoutersApp.replaceValues[4])
            }
        ]
    
        appsData.forEach((property: { host: number, message: string, linkMessage: string }) => {
            it(`Checks page message visibility`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.message,
                    visibilityState: 'be.visible'
                })
            });

            it(`Checks texted link visibility`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.link,
                    text: property.host === appsData[1].host? property.linkMessage.replace(Constants.elementsText.reactNestedRoutersApp.replaceValues[4],
                        Constants.elementsText.reactNestedRoutersApp.replaceValues[1]) : property.linkMessage,
                    visibilityState: 'be.visible'
                })
            });

            it(`Checks that on click on link url texts on page changed & changes is not reverted after reload`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                if(property.host === appsData[0].host) {
                    basePage.checkUrlText(Constants.commonConstantsData.commonLinks.page2, false)
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: property.message,
                        visibilityState: 'be.visible'
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.link,
                        text: property.linkMessage,
                        visibilityState: 'be.visible'
                    })
                    basePage.clickElementWithText({
                        selector: baseSelectors.tags.coreElements.link,
                        text: appsData[0].linkMessage
                    })
                    basePage.checkUrlText(Constants.commonConstantsData.commonLinks.page2, true)
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: property.message,
                        isVisible: false,
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.link,
                        text: property.linkMessage,
                        isVisible: false,
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: property.message.replace(Constants.elementsText.reactNestedRoutersApp.replaceValues[2], Constants.elementsText.reactNestedRoutersApp.replaceValues[3]),
                        visibilityState: 'be.visible'
                    })
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.link,
                        text: property.linkMessage.replace(Constants.elementsText.reactNestedRoutersApp.replaceValues[0], Constants.elementsText.reactNestedRoutersApp.replaceValues[4]),
                        visibilityState: 'be.visible'
                    })
                    basePage.reloadWindow()
                    basePage.checkUrlText(Constants.commonConstantsData.commonLinks.page2, true)

                 return;
                }

                basePage.checkUrlText(Constants.hrefs.reactNestedRoutersApp.pageB, false)
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.message,
                    visibilityState: 'be.visible'
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.link,
                    text: property.linkMessage.replace(Constants.elementsText.reactNestedRoutersApp.replaceValues[4], Constants.elementsText.reactNestedRoutersApp.replaceValues[1]),
                    visibilityState: 'be.visible'
                })
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.link,
                    text: appsData[1].linkMessage.replace(Constants.elementsText.reactNestedRoutersApp.replaceValues[4], Constants.elementsText.reactNestedRoutersApp.replaceValues[1])
                })
                basePage.checkUrlText(Constants.hrefs.reactNestedRoutersApp.pageB, true)
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.message,
                    isVisible: false,
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.link,
                    text: property.linkMessage,
                    isVisible: false,
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.message.replace(Constants.elementsText.reactNestedRoutersApp.replaceValues[5], Constants.elementsText.reactNestedRoutersApp.replaceValues[6]),
                    visibilityState: 'be.visible'
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.link,
                    text: property.linkMessage.replace(Constants.elementsText.reactNestedRoutersApp.replaceValues[4], Constants.elementsText.reactNestedRoutersApp.replaceValues[7]),
                    visibilityState: 'be.visible'
                })
                basePage.reloadWindow()
                basePage.checkUrlText(Constants.hrefs.reactNestedRoutersApp.pageB, true)
            });
        });
    });
});