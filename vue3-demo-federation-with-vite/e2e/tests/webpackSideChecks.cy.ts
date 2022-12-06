import { BaseMethods } from "../../../cypress/common/base";
import { selectors, updatedSelectors } from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import { Vue3DemoFederationWithViteMethods } from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: Vue3DemoFederationWithViteMethods = new Vue3DemoFederationWithViteMethods()

describe("It checks webpack side app", () => {
    before(() => {
        basePage.openLocalhost(5001)
    })

    it('Clicks on webpack content button and checks that wrong alert greeting is not displayed', () => {
        methodsPage.checkBrowserAlertByText(updatedSelectors.webpackButtonSelector, Constants.commonPhrases.viteGreeting, false)
    })

    it('Clicks on webpack content button and checks correct alert greeting', () => {
        methodsPage.checkBrowserAlertByText(updatedSelectors.webpackButtonSelector, Constants.commonPhrases.webpackGreeting)
    })

    it('Checks that Webpack button stands as the first in the group', () => {
        methodsPage.checkChildElementContainText(selectors.vueAppButtonsBlock, updatedSelectors.vueAppCommonButtonSelector, Constants.elementsText.webpackContent)
        methodsPage.checkChildElementContainText(selectors.vueAppButtonsBlock, updatedSelectors.vueAppCommonButtonSelector, Constants.elementsText.viteContent,1)
    })
})