import {BaseMethods} from "../../../../cypress/common/base";
import {baseSelectors} from "../../../../cypress/common/selectors";
import {Constants} from "../../../../cypress/fixtures/constants";
import {CommonTestData} from "../../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

describe('It checks elements visibility', () => {
    const appsData = [
        {
            messageType: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.welcome.split(' ')[0].trim(),
            selector: baseSelectors.tags.headers.h1,
            message: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.welcome,
            linkText: CommonTestData.nextJsHostReactRemoteAppLinkName,
        },
        {
            messageType: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.start.split('by')[0].trim(),
            selector: baseSelectors.tags.paragraph,
            message: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.start,
        },
        {
            messageType: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.engine,
            selector: baseSelectors.tags.footer,
            message: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.engine,
            linkText: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.engine,
        },
        {
            messageType: baseSelectors.tags.footer.charAt(0).toUpperCase() + baseSelectors.tags.footer.slice(1),
            selector: baseSelectors.tags.coreElements.body,
            message: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.footer,
        }
    ]

    appsData.forEach((property: { messageType: string, selector: string, message: string, linkText? : string }) => {
        it(`Checks ${property.messageType} message visibility`, () => {
            basePage.openLocalhost(8080)
            basePage.checkElementWithTextPresence({
                selector: property.selector,
                text: property.message,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks ${property.messageType} message includes texted link`, () => {
            basePage.skipTestByCondition(!property.linkText)
            basePage.openLocalhost(8080)
            basePage.checkElementWithTextPresence({
                parentSelector: property.selector,
                selector: baseSelectors.tags.coreElements.link,
                text: property.linkText,
                visibilityState: 'be.visible'
            })
        })
    })
})