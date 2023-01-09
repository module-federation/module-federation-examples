import {BaseMethods} from "../../../../cypress/common/base";
import {baseSelectors} from "../../../../cypress/common/selectors";
import {CommonTestData} from "../../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

describe('It checks elements visibility', () => {
    CommonTestData.commonNextJsAppsData.forEach((property: { messageType: string, selector: string, message: string, linkText? : string }) => {
        it(`Checks ${property.messageType} message visibility`, () => {
            basePage.openLocalhost({
                number: 8080
            })
            basePage.checkElementWithTextPresence({
                selector: property.selector,
                text: property.message,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks ${property.messageType} message includes texted link`, () => {
            basePage.skipTestByCondition(!property.linkText)
            basePage.openLocalhost({
                number: 8080
            })
            basePage.checkElementWithTextPresence({
                parentSelector: property.selector,
                selector: baseSelectors.tags.coreElements.link,
                text: property.linkText,
                visibilityState: 'be.visible'
            })
        })
    })
})