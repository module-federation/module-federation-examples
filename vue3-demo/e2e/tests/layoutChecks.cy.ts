import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('Vue 3 Demo', () => {
    context("It checks layout app", () => {
        beforeEach(() => {
                basePage.openLocalhost({
                    number: 3001
                })
        })
    
        it('Checks page header with text visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.commonPhrases.vue3DemoApp.appsHeaders.host,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks vue app logo visibility', () => {
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.coreElements.image
            })
        })
    
        it('Checks layout app includes remote component', () => {
            basePage.checkElementVisibility({
                parentSelector: selectors.vue3DemoApp.components.layout,
                selector: selectors.vue3DemoApp.components.remote
            })
        })
    
        it('Checks remote component includes remote header', () => {
            basePage.checkElementContainText({
                parentSelector: selectors.vue3DemoApp.components.remote,
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.commonPhrases.vue3DemoApp.appsHeaders.remote
            })
        })
    
        it('Checks remote component includes component state message', () => {
            basePage.checkElementContainText({
                parentSelector: selectors.vue3DemoApp.components.remote,
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.commonConstantsData.commonVueAppComponentState,
                index: Constants.commonConstantsData.commonIndexes.one
            })
        })
    
        it('Checks remote component includes button with text', () => {
            basePage.checkElementContainText({
                parentSelector: selectors.vue3DemoApp.components.remote,
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.commonConstantsData.helloWorldMessage,
            })
        })
    })
})
