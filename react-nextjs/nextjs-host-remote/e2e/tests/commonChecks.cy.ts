import {BaseMethods} from "../../../../cypress/common/base";
import {baseSelectors} from "../../../../cypress/common/selectors";
import {CommonTestData} from "../../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()

// TODO: Update this file with similar checks from host/remote checks files
describe('It checks elements visibility', () => {
    const hosts = [8080, 8081]

    CommonTestData.commonNextJsAppsData.forEach((property: { messageType: string, selector: string, message: string, linkText? : string }) => {
        hosts.forEach((host: number) => {
            it(`Checks ${property.messageType} message visibility`, () => {
                basePage.skipTestByCondition(host === 8081 && property.message === CommonTestData.commonNextJsAppsData[3].message)
                basePage.openLocalhost(host)
                basePage.checkElementWithTextPresence({
                    selector: property.selector,
                    text: property.message,
                    visibilityState: 'be.visible'
                })
            });

            it(`Checks ${property.messageType} message includes texted link`, () => {
                basePage.skipTestByCondition(!property.linkText)
                basePage.openLocalhost(host)
                basePage.checkElementWithTextPresence({
                    parentSelector: property.selector,
                    selector: baseSelectors.tags.coreElements.link,
                    text: property.linkText,
                    visibilityState: 'be.visible'
                })
            })
        })
    })
})