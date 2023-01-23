import { Constants } from './../../cypress/fixtures/constants';
import { baseSelectors } from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";
import {CssAttr} from "../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()


describe('Check App1', () => {
    beforeEach(() => {
        basePage.openLocalhost(3002)
    })

    it('Check App build and running', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.elementsText.completeReactCaseApp.header
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.strong,
            text: Constants.elementsText.completeReactCaseApp.paragraphs.firstParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.strong,
            text: Constants.elementsText.completeReactCaseApp.paragraphs.secondParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h4,
            text: Constants.elementsText.completeReactCaseApp.buttons.h4Buttons
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h4,
            text: Constants.elementsText.completeReactCaseApp.h4Dialog
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h4,
            text: Constants.elementsText.completeReactCaseApp.h4HoverElement
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.toolTip,
            text: Constants.elementsText.completeReactCaseApp.h4HoverElement
        })
    })        

    it('Check App buttons', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.completeReactCaseApp.buttons.primaryButton
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.completeReactCaseApp.buttons.warningButton
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.completeReactCaseApp.buttons.openDialogButton
        })
        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.elementsText.completeReactCaseApp.buttons.primaryButton,
            prop: CssAttr.backgroundColor,
            value: Constants.color.lightWashedAzure
        })
        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.elementsText.completeReactCaseApp.buttons.warningButton,
            prop: CssAttr.backgroundColor,
            value: Constants.color.lightWashedOrange
        })
    })

    it('Check App Dialod popup', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.completeReactCaseApp.buttons.openDialogButton
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.completeReactCaseApp.nameMessage,
        })
        basePage.sendInputText({
            selector: baseSelectors.input,
            text: Constants.commonPhrases.completeReactCaseApp.input
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.completeReactCaseApp.buttons.closeButton
        })
    })
})
