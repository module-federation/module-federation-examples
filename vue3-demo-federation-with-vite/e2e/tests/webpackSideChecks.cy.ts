import { BaseMethods } from "../../../cypress/common/base";
import { selectors, updatedSelectors } from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe("It checks webpack side app", () => {
    beforeEach(() => {
        basePage.openLocalhost(5001)
    })

    it('Clicks on webpack content button and checks that wrong alert greeting is not displayed', () => {
        basePage.checkBrowserAlertByText({
            selector: updatedSelectors.vue3DemoFederationWithViteApp.buttons.webpack,
            alertMessage: Constants.commonPhrases.vue3DemoFederationWithViteApp.greetings.vite,
            isEqual: false
        })
    })

    it('Clicks on webpack content button and checks correct alert greeting', () => {
        basePage.checkBrowserAlertByText({
            selector: updatedSelectors.vue3DemoFederationWithViteApp.buttons.webpack,
            alertMessage: Constants.commonPhrases.vue3DemoFederationWithViteApp.greetings.webpack
        })
    })

    it('Checks that Webpack button stands as the first in the group', () => {
        basePage.checkChildElementContainText(selectors.vue3DemoFederationWithViteApp.buttonsBlock, updatedSelectors.vue3DemoFederationWithViteApp.buttons.common, Constants.elementsText.vue3DemoFederationWithViteApp.webpackContent)
        basePage.checkChildElementContainText(selectors.vue3DemoFederationWithViteApp.buttonsBlock, updatedSelectors.vue3DemoFederationWithViteApp.buttons.common, Constants.elementsText.vue3DemoFederationWithViteApp.viteContent,1)
    })
})