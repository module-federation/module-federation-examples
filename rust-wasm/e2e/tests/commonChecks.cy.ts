import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import {StubTypes} from "../../../cypress/types/stubTypes";
import {RustWasmMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: RustWasmMethods = new RustWasmMethods()

describe('Rust Wasm', () => {
    context('It Checks buttons functionality', () => {
        const appsData = [
            {
                buttonName: Constants.elementsText.rustWasmApp.buttonsNames[0],
                consoleMessage: Constants.commonPhrases.rustWasmApp.consoleMessages.startLoopMessage,
            },
            {
                buttonName: Constants.elementsText.rustWasmApp.buttonsNames[1],
                consoleMessage: Constants.commonPhrases.rustWasmApp.consoleMessages.tickLoopMessage,
                index: 1
            },
            {
                buttonName: Constants.elementsText.rustWasmApp.buttonsNames[2],
                consoleMessage: Constants.commonPhrases.rustWasmApp.consoleMessages.resetLoopMessage,
                index: 2
            }
        ]
    
        // @ts-ignore
        appsData.forEach((property: { buttonName: string, consoleMessage: string, index: number }) => {
            const extraPropertyIndex: number = property.index === 1 ? 2 : 1
    
            it(`Checks that game board appears after click on ${property.buttonName} button`, () => {
                basePage.openLocalhost({
                    number: 8080
                })
                basePage.checkElementVisibility({
                    selector: selectors.rustWasmApp.gameBoard,
                    isVisible: false,
                    notVisibleState: 'not.be.visible'
                })
                basePage.checkInfoInConsole(property.consoleMessage,StubTypes.notToBeCalled, false)
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.buttonName
                })
                basePage.checkElementVisibility({
                    selector:selectors.rustWasmApp.gameBoard,
                })
                basePage.checkInfoInConsole(property.consoleMessage,StubTypes.beCalled, false, false)
            })
    
            it(`Checks that game board triggered ${property.buttonName} button disappears after reload`, () => {
                basePage.openLocalhost({
                    number: 8080
                })
                methodsPage.checkGameBoardAppearsByClick(property.buttonName)
                basePage.reloadWindow()
                basePage.checkElementVisibility({
                    selector: selectors.rustWasmApp.gameBoard,
                    isVisible: false,
                    notVisibleState: 'not.be.visible'
                })
            })
    
            it(`Checks ${property.buttonName} button still functioning even when game already started`, () => {
                basePage.skipTestByCondition(property.buttonName === appsData[0].buttonName)
                basePage.openLocalhost({
                    number: 8080
                })
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: appsData[0].buttonName
                })
                basePage.checkElementVisibility({
                    selector: selectors.rustWasmApp.gameBoard,
                })
                basePage.checkInfoInConsole(property.consoleMessage,StubTypes.notToBeCalled, false)
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.buttonName
                })
                basePage.checkInfoInConsole(property.consoleMessage,StubTypes.beCalled, false, false)
            })
    
            it(`Checks ${property.buttonName} button still functioning even when game already started and stopped`, () => {
                basePage.openLocalhost({
                    number: 8080
                })
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: appsData[0].buttonName
                })
                basePage.checkElementVisibility({
                    selector: selectors.rustWasmApp.gameBoard,
                })
                basePage.checkInfoInConsole(property.consoleMessage, StubTypes.notToBeCalled, false)
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.rustWasmApp.buttonsNames[3]
                })
                basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmApp.consoleMessages.stopLoopMessage,StubTypes.beCalled, false, false)
                basePage.checkInfoInConsole(property.consoleMessage,property.buttonName === Constants.elementsText.rustWasmApp.buttonsNames[0]
                ? StubTypes.beCalled : StubTypes.notToBeCalled, false, false)
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.buttonName
                })
                basePage.checkElementVisibility({
                    selector: selectors.rustWasmApp.gameBoard,
                })
                basePage.checkInfoInConsole(property.consoleMessage,StubTypes.beCalled, false, false)
            })
    
            it(`Checks game board triggered by ${Constants.elementsText.rustWasmApp.buttonsNames[property.index]} 
            can be updated by ${Constants.elementsText.rustWasmApp.buttonsNames[extraPropertyIndex]} `, () => {
                const consoleMessage: string =  property.index === 1 ? appsData[2].consoleMessage :  appsData[1].consoleMessage
    
                basePage.skipTestByCondition(property.buttonName === appsData[0].buttonName)
                basePage.openLocalhost({
                    number: 8080
                })
                methodsPage.checkGameBoardAppearsByClick(Constants.elementsText.rustWasmApp.buttonsNames[property.index])
                basePage.checkInfoInConsole(consoleMessage,StubTypes.notToBeCalled, false)
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.rustWasmApp.buttonsNames[extraPropertyIndex]
                })
                basePage.checkInfoInConsole(consoleMessage,StubTypes.beCalled, false, false)
            })
    
            it(`Checks game triggered by ${property.buttonName} button can be started and stopped by Play button`, () => {
                basePage.skipTestByCondition(property.buttonName === appsData[0].buttonName)
                basePage.openLocalhost({
                    number: 8080
                })
                methodsPage.checkGameBoardAppearsByClick(property.buttonName)
                basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmApp.consoleMessages.startLoopMessage,StubTypes.notToBeCalled, false)
                basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmApp.consoleMessages.stopLoopMessage,StubTypes.notToBeCalled, false, false)
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: appsData[0].buttonName
                })
                basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmApp.consoleMessages.startLoopMessage,StubTypes.beCalled, false, false)
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.rustWasmApp.buttonsNames[3]
                })
                basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmApp.consoleMessages.stopLoopMessage,StubTypes.beCalled, false, false)
            })
        });
    });
});
