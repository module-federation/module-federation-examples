import { Constants } from './../../cypress/fixtures/constants';
import { baseSelectors } from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appName: Constants.commonConstantsData.commonCountAppNames.app1,
        page1: Constants.commonConstantsData.reactNestedRoutersPagesMessages.page1App1,
        page2: Constants.commonConstantsData.reactNestedRoutersPagesMessages.page2App1,
        host: 8081
    },
    {
        appName: Constants.commonConstantsData.commonCountAppNames.app2,
        page1: Constants.commonConstantsData.reactNestedRoutersPagesMessages.page1App2,
        page2: Constants.commonConstantsData.reactNestedRoutersPagesMessages.page2App2,
        host: 8082
    }
]

appsData.forEach((
    property: {
        appName: string,
        page1: string,
        page2: string,
        host: number
    }
) => {
    describe(`Check ${property.appName}`, () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host)
        })
    
        it(`Check ${property.appName} build and running (Check elements on the page : Page header & Go to Page link)`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.page1
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.linkTag,
                text: Constants.updatedConstantsData.reactedNestedRoutersGoToPageMessage.page2,
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.linkTag,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.href,
                value: Constants.commonConstantsData.commonLinks.page2
            })
        })
    
        it('Check clicking on Go To Page (Check go to routing)', () => {
            basePage.clickElementBySelector({
                selector: baseSelectors.linkTag
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.page2
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.linkTag,
                text: Constants.updatedConstantsData.reactedNestedRoutersGoToPageMessage.page1,
            })
            basePage.checkUrlText(
                Constants.commonConstantsData.commonLinks.page2,
                true
            )
        })
    })
})

describe('Check App 3', () => {
    const navigation = Constants.elementsText.reactNestedRoutersNavApp

    beforeEach(() => {
        basePage.openLocalhost(8080)
    })

    it('Check App 3 build and running (Check elements on the page: Navigation links & Go to Page link)', () => {
        basePage.checkElementExist({
            selector: baseSelectors.navigation
        })
        navigation.forEach((navItem) => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.linkTag,
                text: navItem.name,
                index: navItem.index
            })
            basePage.checkElementWithTextHaveProperty({
                selector: baseSelectors.linkTag,
                text: navItem.name,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.href,
                value: navItem.link
            })
        })
    })

    it('Check App 3 functionality (Clicking on links & Check Routing)', () => {
        navigation.forEach((navItem) => {
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: navItem.name
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: navItem.text
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.linkTag,
                text: navItem.linkText
            })
            basePage.checkElementWithTextHaveProperty({
                selector: baseSelectors.linkTag,
                text: navItem.linkText,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.href,
                value: navItem.linkRouting
            })
        })
    })
})