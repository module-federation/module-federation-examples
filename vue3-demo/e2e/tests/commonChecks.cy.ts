import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('It checks app names & messages',  () => {
    const appsData = [
        {
            host: 3001,
            appName: Constants.commonPhrases.vue3DemoLayoutAppNames.layout
        },
        {
            host: 3002,
            appName: Constants.commonPhrases.vue3DemoLayoutAppNames.remote
        }
    ]

    appsData.forEach((property: { host: number, appName: string }) => {
        it('Checks apps name visibility', () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.appName,
                visibilityState: 'be.visible'
            })
        })

        it('Checks component state message visibility', () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: Constants.commonPhrases.commonVueAppComponentState,
                visibilityState: 'be.visible'
            })
        })

        it('Checks component state message style', () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.style.replace('{style}', Constants.color.nonRgbRed),
                text: Constants.commonPhrases.commonVueAppComponentState,
                visibilityState: 'be.visible'
            })
        })

        it('Checks button visibility', () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementVisibility(baseSelectors.button)
        })

        it(`Checks that button is not disabled`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementState({
                selector: baseSelectors.button,
                state: 'not.be.disabled'
            })
        });

        it(`Checks button text`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.button,
                text: Constants.elementsText.helloWorldMessage,
                visibilityState: 'be.visible'
            })
        });
    });
});
