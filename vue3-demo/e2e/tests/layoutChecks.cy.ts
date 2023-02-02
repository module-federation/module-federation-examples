import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe("It checks layout app", () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Checks page header with text visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.coreElements.div,
            text: Constants.commonPhrases.vue3DemoApp.appsHeaders.host,
            visibilityState: 'be.visible'
        })
    })

    it('Checks vue app logo visibility', () => {
        basePage.checkElementVisibility(baseSelectors.tags.coreElements.image)
    })

    it('Checks layout app includes remote component', () => {
        basePage.checkChildElementVisibility(selectors.vue3DemoApp.components.layout, selectors.vue3DemoApp.components.remote)
    })

    it('Checks remote component includes remote header', () => {
        basePage.checkChildElementContainText(selectors.vue3DemoApp.components.remote, baseSelectors.tags.coreElements.div, Constants.commonPhrases.vue3DemoApp.appsHeaders.remote)
    })

    it('Checks remote component includes component state message', () => {
        basePage.checkChildElementContainText(selectors.vue3DemoApp.components.remote, baseSelectors.tags.coreElements.div, Constants.commonConstantsData.commonVueAppComponentState, 1)
    })

    it('Checks remote component includes button with text', () => {
        basePage.checkChildElementContainText(selectors.vue3DemoApp.components.remote, baseSelectors.tags.coreElements.button, Constants.commonConstantsData.helloWorldMessage)
    })
})