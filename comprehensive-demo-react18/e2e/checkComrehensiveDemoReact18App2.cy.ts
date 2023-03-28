import {selectors} from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";
import { baseSelectors } from "../../cypress/common/selectors";
import { Constants } from "../../cypress/fixtures/constants";
import {CssAttr} from "../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

describe('Comprehencive Demo React 18', () => {
    context('Check is Comprehensive Demo App2 working and have elements', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3002
            })
        })
    
        it('Check App build and running & Check app elements exist', () => {
            basePage.checkElementVisibility({
                selector: selectors.comprehensiveDemoApp.blockSelectors.firstBlock
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.headers.header
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.headers.header,
                prop: CssAttr.backgroundColor,
                value: Constants.color.oceanBluePearl
            })
            basePage.checkElementVisibility({
                selector: selectors.comprehensiveDemoApp.blockSelectors.secondBlock
            })
            basePage.checkElementHaveProperty({
                selector: selectors.comprehensiveDemoApp.blockSelectors.secondBlock,
                prop: CssAttr.backgroundColor,
                value: Constants.color.alabaster
            })
            basePage.checkElementVisibility({
                selector: selectors.comprehensiveDemoApp.blockSelectors.thirdBlock
            })
            basePage.checkElementHaveProperty({
                selector: selectors.comprehensiveDemoApp.blockSelectors.thirdBlock,
                prop: CssAttr.backgroundColor,
                value: Constants.color.white
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h6,
                text: Constants.elementsText.comprehensiveDemoApp.App2.headerText
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h6,
                text: Constants.elementsText.comprehensiveDemoApp.App2.paragraphText
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App2.openDialogButtonText
            })
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App2.openDialogButtonText
            })
            basePage.checkElementVisibility({
                selector: selectors.comprehensiveDemoApp.app2Dialog
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h2,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogHeader
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogParagraph
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogButtonText
            })
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogButtonText
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h6,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.headerText
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.firstTab.name
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.firstTab.paragraphText
            })
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.secondTab.name
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.secondTab.name
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.secondTab.paragraphText
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.secondTab.buttonText
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.secondTab.buttonText,
                prop: CssAttr.backgroundColor,
                value: Constants.color.paleVioletRed
            })
        })
    })
})
