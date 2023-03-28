import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, commonSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

const commonButtonsQuantity: number = 2

describe('Vite Vue Microfrontends', () => {
    context("It checks host app", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 4173
            })
        })
    
        it('Checks console greeting message', () => {
            basePage.checkInfoInConsole(Constants.commonPhrases.viteSvelteMicroFrontEndsApp.consoleMessages[2])
        })
    
        it('Checks both cards includes button', () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.button,
                quantity: commonButtonsQuantity,
                waitUntil: true
            })
            basePage.checkElementQuantity({
                parentSelector: commonSelectors.commonMicroFrontendsAppsCard,
                selector: baseSelectors.tags.coreElements.button,
                quantity: commonButtonsQuantity,
            })
        })
    
        it('Checks both cards button is not disabled', () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.button,
                quantity: commonButtonsQuantity,
                waitUntil: true
            })
            basePage.checkElementState({
                selector: baseSelectors.tags.coreElements.button,
                state: ':disabled',
                isMultiple: true,
                jqueryValue: false
            })
        })
    
        it('Checks both cards button shares same color', () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.button,
                quantity: commonButtonsQuantity,
                waitUntil: true
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.button,
                prop: CssAttr.css,
                value: Constants.color.orange,
                isMultiple: true
            })
        })
    
        it('Checks host app card color is set to blue', () => {
            basePage.checkElementHaveProperty({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                text: Constants.elementsText.commonMicroFrontendsApps.cardMessages.hostCard,
                prop: CssAttr.css,
                value: Constants.color.blue,
                checkType: 'contain'
            })
        })
    
        it('Checks remote app card color is set to black', () => {
            basePage.checkElementQuantity({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                quantity: commonButtonsQuantity,
                waitUntil: true
            })
            basePage.checkElementHaveProperty({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                text: Constants.elementsText.commonMicroFrontendsApps.cardMessages.remoteCard,
                prop: CssAttr.css,
                value: Constants.color.black,
                checkType: 'contain'
            })
        })
    
        it('Checks that host card button text includes counter which changed after click & check value reverted after reload', () => {
            basePage.checkCounterFunctionality({
                    button: baseSelectors.tags.coreElements.button,
                    counterText: Constants.elementsText.commonMicroFrontendsApps.buttonsText.hostButton,
                    isReloaded: true
                })
        })
    
        it('Checks that remote card button text includes counter which changed after click & check value reverted after reload', () => {
            basePage.checkElementQuantity({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                quantity: commonButtonsQuantity,
                waitUntil: true
            })
            basePage.checkCounterFunctionality({
                    button: baseSelectors.tags.coreElements.button,
                    counterText: Constants.elementsText.commonMicroFrontendsApps.buttonsText.remoteButton,
                    buttonsCount: commonButtonsQuantity,
                    isReloaded: true
                })
        })
    })
})
