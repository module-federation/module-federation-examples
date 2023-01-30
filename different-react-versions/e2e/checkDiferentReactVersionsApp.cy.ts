import { Constants } from './../../cypress/fixtures/constants';
import { baseSelectors } from './../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

describe('Check App1', () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Check App build and running', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.commonConstantsData.basicComponents.basicHostRemote,
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.differentReactVersionsApps.subheader
        })
        basePage.checkElementExist({
            selector: baseSelectors.input
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.strong,
            text: Constants.elementsText.differentReactVersionsApps.reactBlockParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.differentReactVersionsApps.reactBlockHeader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h3,
            text: Constants.elementsText.differentReactVersionsApps.reactBlockSubheader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.differentReactVersionsApps.paragraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.updatedConstantsData.commonAppWithButton.app2
        })
        basePage.checkElementHaveProperty({
            selector: basePage.getBlockSelector(baseSelectors.button.toUpperCase()),
            prop: Constants.commonConstantsData.commonAttributes.border,
            value: Constants.color.nonRgbValues.borderRed1px
        })
        basePage.checkElementHaveProperty({
            selector: basePage.getBlockSelector(baseSelectors.divElement.toUpperCase()),
            prop: Constants.commonConstantsData.commonAttributes.border,
            value: Constants.color.nonRgbValues.borderRed1px
        })
    })

    it('Check that filled text appear in header', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.differentReactVersionsApps.reactBlockHeader
        })
        basePage.fillField({
            selector: baseSelectors.input,
            text: Constants.commonConstantsData.standardPhrase
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: `${Constants.elementsText.differentReactVersionsApps.reactBlockHeader} ${Constants.commonConstantsData.standardPhrase}`
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
            text: Constants.commonConstantsData.basicComponents.basicHostRemote,
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.commonConstantsData.commonCountAppNames.app2.replace(' ', '')
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.differentReactVersionsApps.paragraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.updatedConstantsData.commonAppWithButton.app2
        })
    })
})