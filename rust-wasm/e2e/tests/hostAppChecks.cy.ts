import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {StubTypes} from "../../../cypress/types/stubTypes";

const basePage: BaseMethods = new BaseMethods()

describe("Rust Wasm", () => {
    context("It Checks host app", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 8080
            })
        })
    
        it('Checks basic console message', () => {
            basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmApp.consoleMessages.baseLoadingMessage)
        })
    
        it('Checks app header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.commonPhrases.rustWasmApp.commonHostAppName,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks there are three buttons on page', () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.button,
                quantity: 3
            })
        })
    
        it('Checks all buttons are not disabled', () => {
            basePage.checkElementState({
                selector: baseSelectors.tags.coreElements.button,
                state: ':disabled',
                isMultiple: true,
                jqueryValue: false
            })
        })
    
        it('Checks all buttons names visibility', () => {
            Constants.elementsText.rustWasmApp.buttonsNames.forEach((name: string) => {
                if (name !== Constants.elementsText.rustWasmApp.buttonsNames[3]) {
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.coreElements.button,
                        text: name,
                        visibilityState: 'be.visible'
                    })
                }
            })
        })
    
        it('Checks all buttons shares same color', () => {
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.button,
                prop: CssAttr.css,
                value: Constants.color.lightGrey,
                isMultiple: true
            })
        })
    
        it('Checks that Play button name changed to Stop after click', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[0],
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[3],
                isVisible: false,
            })
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[0]
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[0],
                isVisible: false,
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[3],
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks that start button name returns to Play after reload', () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[0]
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[0],
                isVisible: false,
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[3],
                visibilityState: 'be.visible'
            })
            basePage.reloadWindow()
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[0],
                visibilityState: 'be.visible'
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[3],
                isVisible: false,
            })
        })
    
        it('Checks infinite looping started on game board after appearing', () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[0]
            })
            basePage.checkElementVisibility({
                selector: selectors.rustWasmApp.gameBoard
            })
            basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmApp.consoleMessages.startLoopMessage)
        })
    
        it('Checks looping stopped after reload', () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[0]
            })
            basePage.checkElementVisibility({
                selector: selectors.rustWasmApp.gameBoard
            })
            basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmApp.consoleMessages.startLoopMessage)
            basePage.reloadWindow()
            basePage.checkElementVisibility({
                selector: selectors.rustWasmApp.gameBoard,
                isVisible: false,
                notVisibleState: 'not.be.visible'
            })
            basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmApp.consoleMessages.startLoopMessage, StubTypes.notToBeCalled)
        })
    
        it('Checks looping can be stopped by Stop button', () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[0]
            })
            basePage.checkElementVisibility({
                selector: selectors.rustWasmApp.gameBoard
            })
            basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmApp.consoleMessages.stopLoopMessage,StubTypes.notToBeCalled, false)
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.rustWasmApp.buttonsNames[3]
            })
            basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmApp.consoleMessages.stopLoopMessage,StubTypes.beCalled, false, false)
        })
    })
})
