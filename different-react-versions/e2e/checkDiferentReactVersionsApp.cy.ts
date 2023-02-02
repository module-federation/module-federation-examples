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
            selector: baseSelectors.tags.headers.h1,
            text: Constants.commonConstantsData.basicComponents.basicHostRemote,
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.h2,
            text: Constants.elementsText.differentReactVersionsApps.subheader
        })
        basePage.checkElementExist({
            selector: baseSelectors.tags.inputs.input
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.strong,
            text: Constants.elementsText.differentReactVersionsApps.reactBlockParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.h2,
            text: Constants.elementsText.differentReactVersionsApps.reactBlockHeader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.h3,
            text: Constants.elementsText.differentReactVersionsApps.reactBlockSubheader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.paragraph,
            text: Constants.elementsText.differentReactVersionsApps.paragraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.coreElements.button,
            text: Constants.updatedConstantsData.commonAppWithButton.app2
        })
        basePage.checkElementHaveProperty({
            selector: basePage.getBlockSelector(baseSelectors.tags.coreElements.button.toUpperCase()),
            prop: Constants.commonConstantsData.commonAttributes.border,
            value: Constants.color.nonRgbValues.borderRed1px
        })
        basePage.checkElementHaveProperty({
            selector: basePage.getBlockSelector(baseSelectors.tags.coreElements.div.toUpperCase()),
            prop: Constants.commonConstantsData.commonAttributes.border,
            value: Constants.color.nonRgbValues.borderRed1px
        })
    })

    it('Check that filled text appear in header', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.h2,
            text: Constants.elementsText.differentReactVersionsApps.reactBlockHeader
        })
        basePage.fillField({
            selector: baseSelectors.tags.inputs.input,
            text: Constants.commonConstantsData.standardPhrase
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.h2,
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
            selector: baseSelectors.tags.headers.h1,
            text: Constants.commonConstantsData.basicComponents.basicHostRemote,
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.paragraph,
            text: Constants.commonConstantsData.commonCountAppNames.app2.replace(' ', '')
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.paragraph,
            text: Constants.elementsText.differentReactVersionsApps.paragraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.coreElements.button,
            text: Constants.updatedConstantsData.commonAppWithButton.app2
        })
    })
})