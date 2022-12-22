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
            selector: baseSelectors.divElement,
            text: Constants.commonPhrases.vue3DemoLayoutAppHeaders.host,
            visibilityState: 'be.visible'
        })
    })

    it('Checks vue app logo visibility', () => {
        basePage.checkElementVisibility(baseSelectors.image)
    })

    it('Checks layout app includes remote component', () => {
        basePage.checkChildElementVisibility(selectors.vue3DemoComponents.layout, selectors.vue3DemoComponents.remote)
    })

    it('Checks remote component includes remote header', () => {
        basePage.checkChildElementContainText(selectors.vue3DemoComponents.remote, baseSelectors.divElement, Constants.commonPhrases.vue3DemoLayoutAppHeaders.remote)
    })

    it('Checks remote component includes component state message', () => {
        basePage.checkChildElementContainText(selectors.vue3DemoComponents.remote, baseSelectors.divElement, Constants.commonPhrases.commonVueAppComponentState, 1)
    })

    it('Checks remote component includes button with text', () => {
        basePage.checkChildElementContainText(selectors.vue3DemoComponents.remote, baseSelectors.button, Constants.elementsText.helloWorldMessage)
    })
})