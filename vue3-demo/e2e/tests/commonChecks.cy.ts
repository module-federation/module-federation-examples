import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('Vue 3 Demo',  () => {
    context('It checks app names & messages', () => {
        const appsData = [
            {
                host: 3001,
                appName: Constants.commonPhrases.vue3DemoApp.appsNames.layout
            },
            {
                host: 3002,
                appName: Constants.commonPhrases.vue3DemoApp.appsNames.remote
            }
        ]
    
        appsData.forEach((property: { host: number, appName: string }) => {
            it('Checks apps name visibility', () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: property.appName,
                    visibilityState: 'be.visible'
                })
            })
    
            it('Checks component state message visibility', () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.div,
                    text: Constants.commonConstantsData.commonVueAppComponentState,
                    visibilityState: 'be.visible'
                })
            })
    
            it('Checks component state message style', () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.css.style.replace('{style}',  Constants.color.nonRgbValues.red),
                    text: Constants.commonConstantsData.commonVueAppComponentState,
                    visibilityState: 'be.visible'
                })
            })
    
            it('Checks button visibility', () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementVisibility({
                    selector: baseSelectors.tags.coreElements.button
                })
            })
    
            it(`Checks that button is not disabled`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementState({
                    selector: baseSelectors.tags.coreElements.button,
                    state: 'not.be.disabled'
                })
            });
    
            it(`Checks button text`, () => {
                basePage.openLocalhost({
                    number: property.host
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.commonConstantsData.helloWorldMessage,
                    visibilityState: 'be.visible'
                })
            });
        });
    });
});
