import { Constants } from './../../cypress/fixtures/constants';
import {baseSelectors, selectors} from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";
import {CssAttr} from "../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()


describe('Complete React case', () => {
    context('Check App1', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3002
            })
        })
    
        it('Check App build and running', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.elementsText.completeReactCaseApp.header
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.strong,
                text: Constants.elementsText.completeReactCaseApp.paragraphs.firstParagraph
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.strong,
                text: Constants.elementsText.completeReactCaseApp.paragraphs.secondParagraph
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h4,
                text: Constants.elementsText.completeReactCaseApp.buttons.h4Buttons
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h4,
                text: Constants.elementsText.completeReactCaseApp.h4Dialog
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h4,
                text: Constants.elementsText.completeReactCaseApp.h4HoverElement
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.completeReactCaseApp.toolTip,
                text: Constants.elementsText.completeReactCaseApp.h4HoverElement
            })
        })        
    
        it('Check App buttons', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.completeReactCaseApp.buttons.primaryButton
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.completeReactCaseApp.buttons.warningButton
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.completeReactCaseApp.buttons.openDialogButton
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.completeReactCaseApp.buttons.primaryButton,
                prop: CssAttr.backgroundColor,
                value: Constants.color.lightWashedAzure
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.completeReactCaseApp.buttons.warningButton,
                prop: CssAttr.backgroundColor,
                value: Constants.color.lightWashedOrange
            })
        })
    
        it('Check App Dialog popup', () => {
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.completeReactCaseApp.buttons.openDialogButton
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.completeReactCaseApp.buttons.closeButton,
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.completeReactCaseApp.nameMessage,
            })
            basePage.fillField({
                selector: baseSelectors.tags.inputs.input,
                text: Constants.commonPhrases.completeReactCaseApp.input
            })
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.completeReactCaseApp.buttons.closeButton
            })
        })
    })
})
