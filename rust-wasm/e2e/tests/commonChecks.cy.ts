import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, selectors} from "../../../cypress/common/selectors";
import { Constants } from "../../../cypress/fixtures/constants";
import {StubTypes} from "../../../cypress/types/stubTypes";
import {RustWasmMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: RustWasmMethods = new RustWasmMethods()

describe('It checks buttons functionality', () => {
    const appsData = [
        {
            buttonName: Constants.commonText.rustWasmAppButtonsNames[0],
            consoleMessage: Constants.commonPhrases.rustWasmConsoleMessages.startLoopMessage,
        },
        {
            buttonName: Constants.commonText.rustWasmAppButtonsNames[1],
            consoleMessage: Constants.commonPhrases.rustWasmConsoleMessages.tickLoopMessage,
            index: 1
        },
        {
            buttonName: Constants.commonText.rustWasmAppButtonsNames[2],
            consoleMessage: Constants.commonPhrases.rustWasmConsoleMessages.resetLoopMessage,
            index: 2
        }
    ]

    // @ts-ignore
    appsData.forEach((property: { buttonName: string, consoleMessage: string, index: number }) => {
        const extraPropertyIndex: number = property.index === 1 ? 2 : 1

        it(`Checks that game board appears after click on ${property.buttonName} button`, () => {
            basePage.openLocalhost(8080)
            basePage.checkElementVisibility(selectors.rustWasmGameBoard, false)
            basePage.checkInfoInConsole(property.consoleMessage,StubTypes.notToBeCalled, false)
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: property.buttonName
            })
            basePage.checkElementVisibility(selectors.rustWasmGameBoard)
            basePage.checkInfoInConsole(property.consoleMessage,StubTypes.beCalled, false, false)
        })

        it(`Checks that game board triggered ${property.buttonName} button disappears after reload`, () => {
            basePage.openLocalhost(8080)
            methodsPage.checkGameBoardAppearsByClick(property.buttonName)
            basePage.reloadWindow()
            basePage.checkElementVisibility(selectors.rustWasmGameBoard, false)
        })

        it(`Checks ${property.buttonName} button still functioning even when game already started`, () => {
            basePage.skipTestByCondition(property.buttonName === appsData[0].buttonName)
            basePage.openLocalhost(8080)
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: appsData[0].buttonName
            })
            basePage.checkElementVisibility(selectors.rustWasmGameBoard)
            basePage.checkInfoInConsole(property.consoleMessage,StubTypes.notToBeCalled, false)
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: property.buttonName
            })
            basePage.checkInfoInConsole(property.consoleMessage,StubTypes.beCalled, false, false)
        })

        it(`Checks ${property.buttonName} button still functioning even when game already started and stopped`, () => {
            basePage.openLocalhost(8080)
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: appsData[0].buttonName
            })
            basePage.checkElementVisibility(selectors.rustWasmGameBoard)
            basePage.checkInfoInConsole(property.consoleMessage, StubTypes.notToBeCalled, false)
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: Constants.commonText.rustWasmAppButtonsNames[3]
            })
            basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmConsoleMessages.stopLoopMessage,StubTypes.beCalled, false, false)
            basePage.checkInfoInConsole(property.consoleMessage,property.buttonName === Constants.commonText.rustWasmAppButtonsNames[0]
            ? StubTypes.beCalled : StubTypes.notToBeCalled, false, false)
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: property.buttonName
            })
            basePage.checkElementVisibility(selectors.rustWasmGameBoard)
            basePage.checkInfoInConsole(property.consoleMessage,StubTypes.beCalled, false, false)
        })

        it(`Checks game board triggered by ${Constants.commonText.rustWasmAppButtonsNames[property.index]} 
        can be updated by ${Constants.commonText.rustWasmAppButtonsNames[extraPropertyIndex]} `, () => {
            const consoleMessage: string =  property.index === 1 ? appsData[2].consoleMessage :  appsData[1].consoleMessage

            basePage.skipTestByCondition(property.buttonName === appsData[0].buttonName)
            basePage.openLocalhost(8080)
            methodsPage.checkGameBoardAppearsByClick(Constants.commonText.rustWasmAppButtonsNames[property.index])
            basePage.checkInfoInConsole(consoleMessage,StubTypes.notToBeCalled, false)
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: Constants.commonText.rustWasmAppButtonsNames[extraPropertyIndex]
            })
            basePage.checkInfoInConsole(consoleMessage,StubTypes.beCalled, false, false)
        })

        it(`Checks game triggered by ${property.buttonName} button can be started and stopped by Play button`, () => {
            basePage.skipTestByCondition(property.buttonName === appsData[0].buttonName)
            basePage.openLocalhost(8080)
            methodsPage.checkGameBoardAppearsByClick(property.buttonName)
            basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmConsoleMessages.startLoopMessage,StubTypes.notToBeCalled, false)
            basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmConsoleMessages.stopLoopMessage,StubTypes.notToBeCalled, false, false)
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: appsData[0].buttonName
            })
            basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmConsoleMessages.startLoopMessage,StubTypes.beCalled, false, false)
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: Constants.commonText.rustWasmAppButtonsNames[3]
            })
            basePage.checkInfoInConsole(Constants.commonPhrases.rustWasmConsoleMessages.stopLoopMessage,StubTypes.beCalled, false, false)
        })
    });
});
