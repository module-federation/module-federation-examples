import {BaseMethods} from "../../../cypress/common/base";
import {Constants} from "../../../cypress/fixtures/constants";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";

const basePage: BaseMethods = new BaseMethods()

const elementsQuantity = 2

describe('Native Federation React', () => {
    context('It checks host apps\' component', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3000
            })
        })
    
        it('Checks apps console loading module message', () => {
            basePage.checkInfoInConsole(Constants.elementsText.nativeFederationReactApp.messages.consoleMessages.loadingModuleMessage)
        })
    
        it('Checks apps console remote module message', () => {
            basePage.checkInfoInConsole(Constants.elementsText.nativeFederationReactApp.messages.consoleMessages.remoteModuleMessage)
        })
    
        it('Checks remote component greeting visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.nativeFederationReactApp.messages.pageMessages.remoteComponentGreeting,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks change components message visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.nativeFederationReactApp.messages.pageMessages.changeComponentMessage,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks page includes two links', () => {
            basePage.checkElementQuantity({
                parentSelector: baseSelectors.tags.coreElements.body,
                selector: baseSelectors.tags.coreElements.link,
                quantity: elementsQuantity
            })
        })
    
        it('Checks both links has same names', () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.link,
                text: Constants.elementsText.nativeFederationReactApp.elementsTexts.linkName,
                quantity: elementsQuantity
            })
        })
    
        it('Checks page includes two buttons', () => {
            basePage.checkElementQuantity({
                parentSelector: baseSelectors.tags.coreElements.body,
                selector: baseSelectors.tags.coreElements.button,
                quantity: elementsQuantity
            })
        })
    
        it('Checks buttons are not disabled', () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.button,
                state: 'not.be.disabled',
                quantity: elementsQuantity
            })
            basePage.checkElementState({
                selector: baseSelectors.tags.coreElements.button,
                state: 'not.be.disabled'
            })
        })
    
        it('Checks links are not disabled', () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.link,
                state: 'not.be.disabled',
                quantity: elementsQuantity
            })
            basePage.checkElementState({
                selector: baseSelectors.tags.coreElements.link,
                state: 'not.be.disabled'
            })
        })
    
        it('Checks both linked buttons include same link', () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.link,
                state: 'not.be.disabled',
                quantity: elementsQuantity
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.link,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.href,
                value: Constants.commonConstantsData.commonLinks.react,
                isMultiple: true
            })
        })
    
        it('Checks both buttons contain same text', () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.button,
                state: 'not.be.disabled',
                quantity: elementsQuantity
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.nativeFederationReactApp.elementsTexts.buttonText,
                visibilityState: 'be.visible',
                isMultiple: true,
            })
        })
    
        it('Checks host button visibility', () => {
            basePage.checkElementVisibility({
                parentSelector: baseSelectors.tags.coreElements.div,
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.nativeFederationReactApp.buttons.host
            })
        })
    
        it('Checks remote button visibility', () => {
            basePage.checkElementVisibility({
                parentSelector: baseSelectors.tags.coreElements.div,
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.nativeFederationReactApp.buttons.remote
            })
        })
    
        it('Checks that host button text includes counter which changed after click & check value reverted after reload', () => {
            basePage.checkCounterFunctionality({
                button: selectors.nativeFederationReactApp.buttons.host,
                counterText: Constants.elementsText.nativeFederationReactApp.elementsTexts.buttonText,
                isReloaded: true
            })
        })
    
        it('Checks that remote button text includes counter which changed after click & check value reverted after reload', () => {
            basePage.checkCounterFunctionality({
                button: selectors.nativeFederationReactApp.buttons.remote,
                counterText: Constants.elementsText.nativeFederationReactApp.elementsTexts.buttonText,
                isReloaded: true
            })
        })
    })
})
