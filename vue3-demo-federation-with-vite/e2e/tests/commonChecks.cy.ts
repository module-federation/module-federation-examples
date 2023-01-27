import { BaseMethods } from "../../../cypress/common/base";
import { selectors, updatedSelectors } from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('It checks buttons with text visibility and position for both apps', function () {
    let appsData = [
        {
            parentSelector: selectors.vueAppButtonsBlock,
            selector: updatedSelectors.viteButtonSelector,
            text: Constants.elementsText.vue3DemoFederationWithViteApp.viteContent,
            host: 5000
        },
        {
            parentSelector: selectors.vueAppButtonsBlock,
            selector: updatedSelectors.webpackButtonSelector,
            text: Constants.elementsText.vue3DemoFederationWithViteApp.webpackContent,
            host: 5001
        }
    ]

    appsData.forEach(function (property: { parentSelector: string, selector: string, text: string, host: number }) {
        let secondButtonSelector = property.host === 5000 ? appsData[1].selector : appsData[0].selector
        let secondButtonText = property.host === 5000 ? appsData[1].text : appsData[0].text

        it('Checks buttons with text visibility', () => {
            basePage.openLocalhost(property.host)
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
            basePage.openLocalhost(property.host)
            basePage.checkChildElementVisibility(property.parentSelector, property.selector)
            basePage.checkChildElementVisibility(property.parentSelector, secondButtonSelector)
        })
    });
});
