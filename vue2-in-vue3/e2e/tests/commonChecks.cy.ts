import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import {Vue2InVue3Methods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: Vue2InVue3Methods = new Vue2InVue3Methods()
const clicksCounter = 1;

describe('It checks vue2-in-vue3 connection sample', () => {
    const appsData = [
        {
            headerName: Constants.commonPhrases.vue2AppName,
            componentState: Constants.commonPhrases.vue2AppComponentState,
            host: 3001,
        },
        {
            headerName: Constants.commonPhrases.vue3AppName,
            componentState: Constants.commonPhrases.commonVueAppComponentState,
            host: 3002
        }
    ]

    appsData.forEach((property: { headerName: string, componentState: string, host: number }) => {
        it(`Check ${property.headerName} header visibility`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.headerName,
                visibilityState: 'be.visible'
            })
        });

        it(`Check that both apps shares the button with same text`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.button,
                text: Constants.elementsText.vue2AppButtonText,
                visibilityState: 'be.visible'
            })
        });

        it(`Check that in ${property.headerName} button is active`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementState({
                selector: baseSelectors.button,
                state: 'not.be.disabled'
            })
        });

        it(`Check that in ${property.headerName} app by default counter set to 0`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: Constants.commonPhrases.vueAppsDefaultCounterText,
                visibilityState: 'be.visible'
            })
        });

        it(`Checks component state visibility for ${property.headerName}`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.componentState
            })
        });

        it(`Checks that only 'vue3' app recognises button as remote component`, () => {
            basePage.openLocalhost(property.host)
            if(property.headerName === Constants.commonPhrases.vue3AppName) {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: Constants.commonPhrases.commonVueAppComponentState,
                    visibilityState: 'be.visible'
                })

                return;
            }

            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: Constants.commonPhrases.vue2AppComponentState,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: Constants.commonPhrases.commonVueAppComponentState,
                isVisible: false
            })
        });

        it(`Check that in ${property.headerName} app color of component info set to red`, () => {
            basePage.openLocalhost(property.host)
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.style.replace('{style}', Constants.color.nonRgbRed),
                text: Constants.commonPhrases.vueAppsDefaultCounterText
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.style.replace('{style}', Constants.color.nonRgbRed),
                text: property.componentState
            })
        });

        it(`Checks counter on ${property.headerName} changes after click and returns to default after reload`, () => {
            basePage.openLocalhost(property.host)
            methodsPage.checkCounterChangedAfterClick({
                clicksCounter: 3,
                isReloadNeeded: true
            })
        });

        it(`Compares counter on ${property.headerName} with quantity of clicks`, () => {
            basePage.openLocalhost(property.host)
            methodsPage.checkCounterChangedAfterClick({
                clicksCounter: 5,
                isValueCompared: true
            })
        });

        it(`Checks that clicks counter is not shared between apps`, () => {
            const host = property.host === 3001 ? appsData[1].host : appsData[0].host;
            const defaultCounterText = Constants.commonPhrases.vueAppsDefaultCounterText;

            basePage.openLocalhost(property.host)
            methodsPage.checkCounterChangedAfterClick({
                clicksCounter,
            })
            basePage.checkInfoOnNonDefaultHost(host, baseSelectors.divElement,
                defaultCounterText, defaultCounterText.replace(/[0-9]/g, clicksCounter.toString()))
        });
    });
});
