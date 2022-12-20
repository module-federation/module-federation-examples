import { Constants } from './../../cypress/fixtures/constants';
import { baseSelectors } from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()


describe('Check App1', () => {
    beforeEach(() => {
        basePage.openLocalhost(3002)
    })

    it('Check App build and running', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.elementsText.competeReactCaseHeader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.strong,
            text: Constants.elementsText.competeReactCaseFirstParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.strong,
            text: Constants.elementsText.competeReactCaseSecondParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h4,
            text: Constants.elementsText.h4Buttons
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h4,
            text: Constants.elementsText.h4Dialog
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h4,
            text: Constants.elementsText.h4HoverMePlease
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.toolTip,
            text: Constants.elementsText.h4HoverMePlease
        })
    })        

    it('Check App buttons', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.primaryButton
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.warningButton
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.clickToOpenDialogButton
        })
        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.elementsText.primaryButton,
            prop: 'background-color',
            value: Constants.color.lightWashedAzure
        })
        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.elementsText.warningButton,
            prop: 'background-color',
            value: Constants.color.lightWashedOrange
        })
    })

    it('Check App Dialod popup', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.clickToOpenDialogButton
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.compeateReactCaseWhatIsYourName
        })
        basePage.sendInputText({
            selector: baseSelectors.input,
            text: Constants.commonPhrases.compleateReactCaseInput
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.closeItButton
        })
    })
})
