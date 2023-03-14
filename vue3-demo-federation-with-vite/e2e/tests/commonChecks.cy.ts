import { BaseMethods } from "../../../cypress/common/base";
import { selectors, updatedSelectors } from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('Vue 3 Demo Federation with Vite', function () {
    context('It checks buttons with text visibility and position for both apps', () => {
        const appsData = [
            {
                parentSelector: selectors.vue3DemoFederationWithViteApp.buttonsBlock,
                selector: updatedSelectors.vue3DemoFederationWithViteApp.buttons.vite,
                text: Constants.elementsText.vue3DemoFederationWithViteApp.viteContent,
                host: 5000
            },
            {
                parentSelector: selectors.vue3DemoFederationWithViteApp.buttonsBlock,
                selector: updatedSelectors.vue3DemoFederationWithViteApp.buttons.webpack,
                text: Constants.elementsText.vue3DemoFederationWithViteApp.webpackContent,
                host: 5001
            }
        ]
    
        appsData.forEach(function (property: { parentSelector: string, selector: string, text: string, host: number }) {
            const secondButtonSelector = property.host === 5000 ? appsData[1].selector : appsData[0].selector
            const secondButtonText = property.host === 5000 ? appsData[1].text : appsData[0].text
    
            it('Checks buttons with text visibility', () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: property.selector,
                    text: property.text,
                    visibilityState: 'be.visible'
                })
                basePage.checkElementWithTextPresence({
                    selector: secondButtonSelector,
                    text: secondButtonText,
                    visibilityState: 'be.visible'
                })
            })
    
            it('Checks that both buttons are in the same block', () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementVisibility({
                    parentSelector: property.parentSelector,
                    selector: property.selector
                })
                basePage.checkElementVisibility({
                    parentSelector: property.parentSelector,
                    selector: secondButtonSelector
                })
            })
        });
    });
});
