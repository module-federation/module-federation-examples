import { BaseMethods } from "../../../cypress/common/base";
import { selectors, updatedSelectors } from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe("It checks webpack side app", () => {
    beforeEach(() => {
        basePage.openLocalhost(5001)
    })

    it('Clicks on webpack content button and checks that wrong alert greeting is not displayed', () => {
        basePage.checkBrowserAlertByText(updatedSelectors.webpackButtonSelector, Constants.commonPhrases.viteGreeting, false)
    })

    it('Clicks on webpack content button and checks correct alert greeting', () => {
        basePage.checkBrowserAlertByText(updatedSelectors.webpackButtonSelector, Constants.commonPhrases.webpackGreeting)
    })

    it('Checks that Webpack button stands as the first in the group', () => {
        basePage.checkChildElementContainText(selectors.vueAppButtonsBlock, updatedSelectors.vueAppCommonButtonSelector, Constants.elementsText.webpackContent)
        basePage.checkChildElementContainText(selectors.vueAppButtonsBlock, updatedSelectors.vueAppCommonButtonSelector, Constants.elementsText.viteContent,1)
    })
})