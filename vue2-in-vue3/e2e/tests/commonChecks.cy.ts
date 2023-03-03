import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()
const clicksCounter = 1;

describe('Vue 2 in Vue 3', () => {
    context('It checks vue2-in-vue3 connection sample', () => {
        const appsData = [
            {
                headerName: Constants.commonPhrases.vue2InVue3App.appsNames.vue2,
                componentState: Constants.commonPhrases.vue2InVue3App.componentState,
                host: 3001,
            },
            {
                headerName: Constants.commonPhrases.vue2InVue3App.appsNames.vue3,
                componentState: Constants.commonConstantsData.commonVueAppComponentState,
                host: 3002
            }
        ]
    
        appsData.forEach((property: { headerName: string, componentState: string, host: number }) => {
            it(`Check ${property.headerName} header visibility`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.headerName,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Check that both apps shares the button with same text`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.vue2InVue3App.commonButtonText,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Check that in ${property.headerName} button is active`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementState({
                    selector: baseSelectors.tags.coreElements.button,
                    state: 'not.be.disabled'
                })
            });
    
            it(`Check that in ${property.headerName} app by default counter set to 0`, () => {
                basePage.openLocalhost({
                number: property.host
            })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: Constants.commonPhrases.vue2InVue3App.defaultCounterText,
                    visibilityState: 'be.visible'
                })
            });
    
            it(`Checks component state visibility for ${property.headerName}`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.componentState
                })
            });
    
            it(`Checks that only 'vue3' app recognises button as remote component`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                if(property.headerName === Constants.commonPhrases.vue2InVue3App.appsNames.vue3) {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.div,
                        text: Constants.commonConstantsData.commonVueAppComponentState,
                        visibilityState: 'be.visible'
                    })
    
                    return;
                }
    
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: Constants.commonPhrases.vue2InVue3App.componentState,
                    visibilityState: 'be.visible'
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: Constants.commonConstantsData.commonVueAppComponentState,
                    isVisible: false
                })
            });
    
            it(`Check that in ${property.headerName} app color of component info set to red`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.css.style.replace('{style}', Constants.color.nonRgbValues.red),
                    text: Constants.commonPhrases.vue2InVue3App.defaultCounterText
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.css.style.replace('{style}',  Constants.color.nonRgbValues.red),
                    text: property.componentState
                })
            });
    
            it(`Checks counter on ${property.headerName} changes after click and returns to default after reload`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkCounterFunctionality({
                    button: baseSelectors.tags.coreElements.button,
                    counterElement: baseSelectors.tags.coreElements.div,
                    counterText: Constants.commonPhrases.vue2InVue3App.defaultCounterText,
                    isButtonTexted: false,
                    isReloaded: true
                })
            });
    
            it(`Compares counter on ${property.headerName} with quantity of clicks`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkCounterFunctionality({
                    button: baseSelectors.tags.coreElements.button,
                    counterElement: baseSelectors.tags.coreElements.div,
                    counterText: Constants.commonPhrases.vue2InVue3App.defaultCounterText,
                    isButtonTexted: false,
                    isValueCompared: true
                })
            });
    
            it(`Checks that clicks counter is not shared between apps`, () => {
                const host = property.host === 3001 ? appsData[1].host : appsData[0].host;
                const defaultCounterText = Constants.commonPhrases.vue2InVue3App.defaultCounterText;
    
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkCounterFunctionality({
                    button: baseSelectors.tags.coreElements.button,
                    counterElement: baseSelectors.tags.coreElements.div,
                    counterText: Constants.commonPhrases.vue2InVue3App.defaultCounterText,
                    isButtonTexted: false
                })
                basePage.checkInfoOnNonDefaultHost(host, baseSelectors.tags.coreElements.div,
                    defaultCounterText, defaultCounterText.replace(/[0-9]/g, clicksCounter.toString()))
            });
        });
    });
});
