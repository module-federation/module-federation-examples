import {BaseMethods} from "../../../cypress-e2e/common/base";
import {baseSelectors, commonSelectors} from "../../../cypress-e2e/common/selectors";
import {Constants} from "../../../cypress-e2e/fixtures/constants";
import {CssAttr} from "../../../cypress-e2e/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

const commonButtonsQuantity: number = 2

describe('Vite React Microfrontends', () => {
    context("It checks host app", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 4173
            })
        })
    
        it('Checks that remote component card appears after loading', () => {
            basePage.checkElementQuantity({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                quantity: 1
            })
            basePage.checkElementWithTextPresence({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                text: Constants.elementsText.commonMicroFrontendsApps.cardMessages.hostCard,
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.ids.root,
                text: Constants.updatedConstantsData.updatedLoadingMessage.toLowerCase(),
                visibilityState: 'be.visible'
            })
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.button,
                quantity: commonButtonsQuantity,
                waitUntil: true
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.ids.root,
                text: Constants.updatedConstantsData.updatedLoadingMessage.toLowerCase(),
                isVisible: false
            })
            basePage.checkElementQuantity({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                quantity: commonButtonsQuantity
            })
            basePage.checkElementWithTextPresence({
                selector: commonSelectors.commonMicroFrontendsAppsCard,
                text: Constants.elementsText.commonMicroFrontendsApps.cardMessages.remoteCard,
                visibilityState: 'be.visible'
            })
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
                    isReloaded: true,
                })
        })
    })
})
