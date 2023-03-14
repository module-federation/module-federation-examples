import { Constants } from '../../cypress/fixtures/constants';
import {baseSelectors, selectors} from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";
import {CssAttr} from "../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

describe('Comprehemsive Demo React 16', () => {
    context('Check is Comprehensive Demo App1 working and have elements', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3001
            })
        })
    
        it('Check App build and running & Check app elements exist', () => {
            basePage.checkElementVisibility({
                selector: selectors.comprehensiveDemoApp.blockSelectors.sideBarBlock
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h6,
                text: Constants.elementsText.comprehensiveDemoApp.App1.sideNavHeaderText
            })
            Constants.elementsText.comprehensiveDemoApp.comprehensiveDemoDemoPages.forEach((demoPage) => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.spans.span,
                    text: demoPage.name
                })
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.link,
                    index: demoPage.index,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.href,
                    value: demoPage.link
                })
            })
            Constants.elementsText.comprehensiveDemoApp.comprehensiveDemoDemoPages.forEach((application) => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.spans.span,
                    text: application.name
                })
                basePage.checkElementHaveProperty({
                    selector: baseSelectors.tags.coreElements.link,
                    index: application.index,
                    attr: Constants.commonConstantsData.commonAttributes.attr,
                    prop: Constants.commonConstantsData.commonAttributes.href,
                    value: application.link
                })
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.headers.header
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h6,
                text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.headerText
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.headers.header,
                prop: CssAttr.backgroundColor,
                value: Constants.color.oceanBluePearl
            })
            basePage.checkElementVisibility({
                selector: selectors.comprehensiveDemoApp.alert
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.comprehensiveDemoApp.alert,
                text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.alertMessage
            })
            basePage.checkElementVisibility({
                selector: selectors.comprehensiveDemoApp.closeButton
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.paragraphs.first
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.paragraphs.second
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.paragraphs.third
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.link,
                index: Constants.commonConstantsData.commonIndexes.ten,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.href,
                value: Constants.hrefs.comprehensiveDemoApp.gitHub
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.buttonText
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.button,
                prop: CssAttr.backgroundColor,
                value: Constants.color.paleVioletRed
            })
        })
    
        it('Check Main Tab Functionality', () => {
            basePage.checkBrowserAlertByText({
                selector: baseSelectors.tags.coreElements.button,
                alertMessage: Constants.elementsText.comprehensiveDemoApp.alertMessage
            })
            basePage.clickElementBySelector({
                selector: selectors.comprehensiveDemoApp.closeButton
            })
            basePage.checkElementHaveProperty({
                selector: selectors.comprehensiveDemoApp.alert,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.style,
                value: Constants.commonConstantsData.commonAttributes.displayNone
            })
            Constants.elementsText.comprehensiveDemoApp.comprehensiveDemoDemoPages.forEach((demoPage) => {
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.link,
                    text: demoPage.name
                })
                basePage.checkUrlText(
                    demoPage.link,
                    true
                )
            })
            Constants.elementsText.comprehensiveDemoApp.comprehensiveDemoDemoPages.forEach((application) => {
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.link,
                    text: application.name
                })
                basePage.checkUrlText(
                    application.link,
                    true
                )
                basePage.goBack()
            })
        })
    
        it('Check UI Library elements', () => {
            basePage.openLocalhost({
                number: 3001,
                path: Constants.hrefs.comprehensiveDemoApp.uiLibrary
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.headers.header
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h6,
                text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.headerText
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.headers.header,
                prop: CssAttr.backgroundColor,
                value: Constants.color.oceanBluePearl
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.paragraphs.first
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.paragraphs.second
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.paragraphs.third
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.commonConstantsData.commonButtonWithEmoji
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.link,
                index: Constants.commonConstantsData.commonIndexes.ten,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.href,
                value: Constants.hrefs.comprehensiveDemoApp.app3
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.link,
                index: Constants.commonConstantsData.commonIndexes.eleven,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.href,
                value: Constants.hrefs.comprehensiveDemoApp.routingDemo
            })
        })
    
        it('Check Dialog elements', () => {
            basePage.openLocalhost({
                number: 3001,
                path: Constants.hrefs.comprehensiveDemoApp.demoDialog
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.headers.header
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h6,
                text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.dialogHeader
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.headers.header,
                prop: CssAttr.backgroundColor,
                value: Constants.color.oceanBluePearl
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.dialogParagraph
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
        })
    
        it('Check Svelte Page elements', () => {
            basePage.openLocalhost({
                number: 3001,
                path: Constants.hrefs.comprehensiveDemoApp.demoSvelte
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.headers.header
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h6,
                text: Constants.elementsText.comprehensiveDemoApp.App1.svelte.headerText
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.inputs.input
            })
            basePage.fillField({
                selector: baseSelectors.tags.inputs.input,
                text: Constants.commonConstantsData.standardPhrase
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.updatedConstantsData.baseSvelteIntroMessage
            })
        })
    
        it('Check Routing elements', () => {
            basePage.openLocalhost({
                number: 3001,
                path: Constants.hrefs.comprehensiveDemoApp.routingDemo.replace("http://localhost:3001/", '')
            })
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.headers.header
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h6,
                text: Constants.elementsText.comprehensiveDemoApp.App1.routing.headerText
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.routing.paragraphs.first
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.routing.paragraphs.second
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.routing.paragraphs.third
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.routing.paragraphs.forth
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.elementsText.comprehensiveDemoApp.App1.routing.paragraphs.forth
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.firstTab.name
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
