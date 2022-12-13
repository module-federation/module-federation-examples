import { Constants } from './../../cypress/fixtures/constants';
import { baseSelectors, block } from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

describe('Check App1', () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Check App build and running', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.elementsText.diferentReactVersionsHeader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.diferentReactVersionsApp1Subheader
        })
        basePage.checkElementExist({
            selector: baseSelectors.input
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.strong,
            text: Constants.elementsText.diferentReactVersionsApp1ReactBlockParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.diferentReactVersionsApp1ReactBlockHeader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h3,
            text: Constants.elementsText.diferentReactVersionsApp1ReactBlockSubheader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.diferentReactVersionsParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.diferentReactVersionsButtonName
        })
        basePage.checkElementHaveProperty({
            selector: basePage.getBlockSelector(baseSelectors.button.toUpperCase()),
            prop: Constants.commonText.border,
            value: Constants.color.borderColorRed1px
        })
        basePage.checkElementHaveProperty({
            selector: basePage.getBlockSelector(baseSelectors.divElement.toUpperCase()),
            prop: Constants.commonText.border,
            value: Constants.color.borderColorRed1px
        })
    })

    it('Check that filled text appear in header', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.diferentReactVersionsApp1ReactBlockHeader
        })
        basePage.fillField({
            selector: baseSelectors.input,
            text: Constants.commonText.standartText
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: `${Constants.elementsText.diferentReactVersionsApp1ReactBlockHeader} ${Constants.commonText.standartText}`
        })
    })
})

describe('Check App2', () => {
    beforeEach(() => {
        basePage.openLocalhost(3002)
    })

    it('Check App build and running', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.elementsText.diferentReactVersionsHeader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.diferentReactVersionsApp2Subheader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.diferentReactVersionsParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.diferentReactVersionsButtonName
        })
    })
})