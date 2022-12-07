import { BaseMethods } from "../../../cypress/common/base";
import { selectors, updatedSelectors } from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import { Vue3DemoFederationWithViteMethods } from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: Vue3DemoFederationWithViteMethods = new Vue3DemoFederationWithViteMethods()

describe("It checks vite side app", () => {
    before(() => {
        basePage.openLocalhost(5000)
    })

    it('Clicks on vite content button and checks that wrong alert greeting is not displayed', () => {
        methodsPage.checkBrowserAlertByText(updatedSelectors.viteButtonSelector, Constants.commonPhrases.webpackGreeting, false)
    })

    it('Clicks on vite content button and checks correct alert greeting', () => {
        methodsPage.checkBrowserAlertByText(updatedSelectors.viteButtonSelector, Constants.commonPhrases.viteGreeting)
    })

    it('Checks that Vite button stands as the first in the group', () => {
        methodsPage.checkChildElementContainText(selectors.vueAppButtonsBlock, updatedSelectors.vueAppCommonButtonSelector, Constants.elementsText.viteContent)
        methodsPage.checkChildElementContainText(selectors.vueAppButtonsBlock, updatedSelectors.vueAppCommonButtonSelector, Constants.elementsText.webpackContent,1)
    })
})