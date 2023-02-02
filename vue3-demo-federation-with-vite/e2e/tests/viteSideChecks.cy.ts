import { BaseMethods } from "../../../cypress/common/base";
import { selectors, updatedSelectors } from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe("It checks vite side app", () => {
    beforeEach(() => {
        basePage.openLocalhost(5000)
    })

    it('Clicks on vite content button and checks that wrong alert greeting is not displayed', () => {
        basePage.checkBrowserAlertByText({
            selector: updatedSelectors.vue3DemoFederationWithViteApp.buttons.vite,
            alertMessage: Constants.commonPhrases.vue3DemoFederationWithViteApp.greetings.webpack,
            isEqual: false
        })
    })

    it('Clicks on vite content button and checks correct alert greeting', () => {
        basePage.checkBrowserAlertByText({
            selector: updatedSelectors.vue3DemoFederationWithViteApp.buttons.vite,
            alertMessage: Constants.commonPhrases.vue3DemoFederationWithViteApp.greetings.vite
        })
    })

    it('Checks that Vite button stands as the first in the group', () => {
        basePage.checkChildElementContainText(selectors.vue3DemoFederationWithViteApp.buttonsBlock, updatedSelectors.vue3DemoFederationWithViteApp.buttons.common, Constants.elementsText.vue3DemoFederationWithViteApp.viteContent)
        basePage.checkChildElementContainText(selectors.vue3DemoFederationWithViteApp.buttonsBlock, updatedSelectors.vue3DemoFederationWithViteApp.buttons.common, Constants.elementsText.vue3DemoFederationWithViteApp.webpackContent,1)
    })
})