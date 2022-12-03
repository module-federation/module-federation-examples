import {Base} from "../../../cypress/common/base";
import {selectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

const basePage: Base = new Base()

describe("It checks buttons for vite", () => {
    before(() => {
        basePage.buildTheSample(Constants.samplesPath.vue3DemoFederationWithVite)
        basePage.openLocalhost(5000)
    })

    it('Checks buttons with text visibility', () => {
        basePage.checkElementWithTextPresence(updatedSelectors.viteButtonSelector, Constants.elementsText.viteContent,
            true, 'be.visible')
        basePage.checkElementWithTextPresence(updatedSelectors.webpackButtonSelector, Constants.elementsText.webpackContent,
            true, 'be.visible')
    })

    it('Checks that both buttons are in the same block', () => {
        basePage.checkChildElementVisibility(selectors.vueAppButtonsBlock, updatedSelectors.viteButtonSelector)
        basePage.checkChildElementVisibility(selectors.vueAppButtonsBlock, updatedSelectors.webpackButtonSelector)
    })
})

describe("It checks buttons for webpack", () => {
    before(() => {
        basePage.buildTheSample(Constants.samplesPath.vue3DemoFederationWithVite)
        basePage.openLocalhost(5001)
    })

    it('Checks buttons with text visibility', () => {
        basePage.checkElementWithTextPresence(updatedSelectors.viteButtonSelector, Constants.elementsText.viteContent,
            true, 'be.visible')
        basePage.checkElementWithTextPresence(updatedSelectors.webpackButtonSelector, Constants.elementsText.webpackContent,
            true, 'be.visible')
    })

    it('Checks that both buttons are in the same block', () => {
        basePage.checkChildElementVisibility(selectors.vueAppButtonsBlock, updatedSelectors.viteButtonSelector)
        basePage.checkChildElementVisibility(selectors.vueAppButtonsBlock, updatedSelectors.webpackButtonSelector)
    })
})