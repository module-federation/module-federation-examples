import { Constants } from '../../cypress/fixtures/constants';
import { block, baseSelectors, alertMessages, buttons, dialogs } from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";
import {CssAttr} from "../../cypress/types/cssAttr";

const basePage: BaseMethods = new BaseMethods()

describe('Check is Comprehensive Demo App1 working and have elements', () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Check App build and running & Check app elements exist', () => {
        basePage.checkElementExist({
            selector: block.comprehensiveDemoBlockSelectors.sideBarBlock
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h6,
            text: Constants.elementsText.comprehensiveDemoApp.App1.sideNavHeaderText
        })
        Constants.elementsText.comprehensiveDemoApp.comprehensiveDemoDemoPages.forEach((demoPage) => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.span,
                text: demoPage.name
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.linkTag,
                index: demoPage.index,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.href,
                value: demoPage.link
            })
        })
        Constants.elementsText.comprehensiveDemoApp.comprehensiveDemoDemoPages.forEach((application) => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.span,
                text: application.name
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.linkTag,
                index: application.index,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.href,
                value: application.link
            })
        })
        basePage.checkElementExist({
            selector: baseSelectors.header
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h6,
            text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.headerText
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.header,
            prop: CssAttr.backgroundColor,
            value: Constants.color.oceanBluePearl
        })
        basePage.checkElementExist({
            selector: alertMessages.alert
        })
        basePage.checkElementWithTextPresence({
            selector: alertMessages.alert,
            text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.alertMessage
        })
        basePage.checkElementExist({
            selector: buttons.closeButton
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.paragraphs.first
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.paragraphs.second
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.paragraphs.third
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.linkTag,
            index: Constants.commonConstantsData.commonIndexes.ten,
            attr: Constants.commonConstantsData.commonAttributes.attr,
            prop: Constants.commonConstantsData.commonAttributes.href,
            value: Constants.hrefs.comprehensiveDemoApp.gitHub
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemoApp.App1.mainPage.buttonText
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.button,
            prop: CssAttr.backgroundColor,
            value: Constants.color.paleVioletRed
        })
    })

    it('Check Main Tab Functionality', () => {
        basePage.checkBrowserAlertByText({
            selector: baseSelectors.button,
            alertMessage: Constants.elementsText.comprehensiveDemoApp.alertMessage
        })
        basePage.clickElementBySelector({
            selector: buttons.closeButton
        })
        basePage.checkElementHaveProperty({
            selector: alertMessages.alert,
            attr: Constants.commonConstantsData.commonAttributes.attr,
            prop: Constants.commonConstantsData.commonAttributes.style,
            value: Constants.commonConstantsData.commonAttributes.displayNone
        })
        Constants.elementsText.comprehensiveDemoApp.comprehensiveDemoDemoPages.forEach((demoPage) => {
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: demoPage.name
            })
            basePage.checkUrlText(
                demoPage.link,
                true
            )
        })
        Constants.elementsText.comprehensiveDemoApp.comprehensiveDemoDemoPages.forEach((application) => {
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
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
        basePage.openLocalhost(3001, Constants.hrefs.comprehensiveDemoApp.uiLibrary)
        basePage.checkElementExist({
            selector: baseSelectors.header
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h6,
            text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.headerText
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.header,
            prop: CssAttr.backgroundColor,
            value: Constants.color.oceanBluePearl
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.paragraphs.first
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.paragraphs.second
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.paragraphs.third
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonConstantsData.commonButtonWithEmoji
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.linkTag,
            index: Constants.commonConstantsData.commonIndexes.ten,
            attr: Constants.commonConstantsData.commonAttributes.attr,
            prop: Constants.commonConstantsData.commonAttributes.href,
            value: Constants.hrefs.comprehensiveDemoApp.app3
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.linkTag,
            index: Constants.commonConstantsData.commonIndexes.eleven,
            attr: Constants.commonConstantsData.commonAttributes.attr,
            prop: Constants.commonConstantsData.commonAttributes.href,
            value: Constants.hrefs.comprehensiveDemoApp.routingDemo
        })
    })

    it('Check Dialog elements', () => {
        basePage.openLocalhost(3001, Constants.hrefs.comprehensiveDemoApp.demoDialog)
        basePage.checkElementExist({
            selector: baseSelectors.header
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h6,
            text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.dialogHeader
        })
        basePage.checkElementHaveProperty({
            selector: baseSelectors.header,
            prop: CssAttr.backgroundColor,
            value: Constants.color.oceanBluePearl
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.uiLibrary.dialogParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemoApp.App2.openDialogButtonText
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemoApp.App2.openDialogButtonText
        })
        basePage.checkElementExist({
            selector: dialogs.comprehensiveDemoDialogApp2
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.comprehensiveDemoApp.App2.dialogHeader
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App2.dialogParagraph
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemoApp.App2.dialogButtonText
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemoApp.App2.dialogButtonText
        })
    })

    it('Check Svelte Page elements', () => {
        basePage.openLocalhost(3001, Constants.hrefs.comprehensiveDemoApp.demoSvelte)
        basePage.checkElementExist({
            selector: baseSelectors.header
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h6,
            text: Constants.elementsText.comprehensiveDemoApp.App1.svelte.headerText
        })
        basePage.checkElementExist({
            selector: baseSelectors.input
        })
        basePage.fillField({
            selector: baseSelectors.input,
            text: Constants.commonConstantsData.standardPhrase
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.updatedConstantsData.baseSvelteIntroMessage
        })
    })

    it('Check Routing elements', () => {
        basePage.openLocalhost(
            3001,
            Constants.hrefs.comprehensiveDemoApp.routingDemo.replace("http://localhost:3001/", '')
        )
        basePage.checkElementExist({
            selector: baseSelectors.header
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h6,
            text: Constants.elementsText.comprehensiveDemoApp.App1.routing.headerText
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.routing.paragraphs.first
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.routing.paragraphs.second
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.routing.paragraphs.third
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.routing.paragraphs.forth
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.comprehensiveDemoApp.App1.routing.paragraphs.forth
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.firstTab.name
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.firstTab.name
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.firstTab.paragraphText
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.secondTab.name
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.secondTab.paragraphText
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.secondTab.buttonText
        })
        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemoApp.App2.dialogTabs.secondTab.buttonText,
            prop: CssAttr.backgroundColor,
            value: Constants.color.paleVioletRed
        })
    })
})