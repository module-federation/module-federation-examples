import { Constants } from './../../cypress-e2e/fixtures/constants';
import { baseSelectors } from './../../cypress-e2e/common/selectors';
import { BaseMethods } from "../../cypress-e2e/common/base";
import {DifferentReactVersionsMethods} from "./methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: DifferentReactVersionsMethods = new DifferentReactVersionsMethods()

describe('Different React Versions', () => {
    context('Check App1', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3001
            })
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
            basePage.checkElementVisibility({
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
                selector: methodsPage.getBlockSelector(baseSelectors.tags.coreElements.button.toUpperCase()),
                prop: Constants.commonConstantsData.commonAttributes.border,
                value: Constants.color.nonRgbValues.borderRed1px
            })
            basePage.checkElementHaveProperty({
                selector: methodsPage.getBlockSelector(baseSelectors.tags.coreElements.div.toUpperCase()),
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
})

describe('Different React Versions', () => {
    context('Check App2', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3002
            })
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
})
