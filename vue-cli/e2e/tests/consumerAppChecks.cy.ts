import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {VueCliMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: VueCliMethods = new VueCliMethods()

describe('Vue CLI', () => {
    context("It checks consumer app", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 8080
            })
        })
    
        it('Checks consumer page header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.vueCliApp.consumerSection.header,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks core imported part message visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h4,
                text: Constants.elementsText.vueCliApp.consumerSection.importMessages.core,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks that imported and basic core component names are equal', () => {
            basePage.compareInfoBetweenHosts(updatedSelectors.vueCliApp.sectionElements.name, 9000)
        })
    
        it('Checks that imported core section button text is not equal to base core section button text', () => {
            basePage.compareInfoBetweenHosts(updatedSelectors.vueCliApp.sectionElements.button, 9000, false)
        })
    
        it('Checks core section description visibility', () => {
            basePage.checkElementState({
                selector: baseSelectors.tags.section,
                text: Constants.elementsText.vueCliApp.sectionsDescriptions.consumerCoreSection,
                state: 'not.be.disabled'
            })
        })
    
        it('Checks other part message visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h4,
                text:  Constants.elementsText.vueCliApp.consumerSection.importMessages.other,
                visibilityState: 'be.visible'
            })
        })
    
        it('Checks that imported and basic other component descriptions are equal', () => {
            basePage.compareInfoBetweenHosts(baseSelectors.tags.section, 9001, true, 1)
        })
    
        it('Checks that imported other section button text is equal to base other section button text', () => {
            basePage.compareInfoBetweenHosts(baseSelectors.tags.coreElements.button, 9001, true, 1)
        })
    
        it('Checks that on imported and base other sections same code block appears by click', () => {
            basePage.checkElementContainText({
                selector: baseSelectors.tags.section,
                text: Constants.elementsText.vueCliApp.otherSectionCodeBlock,
                index: 0 ,
                isContain: false
            })
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton,
                wait: 1500
            })
            basePage.compareInfoBetweenHosts(baseSelectors.tags.code, 9001, true, 0, baseSelectors.tags.coreElements.button, 1500)
        })
    
        it('Checks that on imported and base other sections same browser alert appears by click on button', () => {
            methodsPage.checkBrowserAlertForMultipleHosts({
                selector: baseSelectors.tags.coreElements.button,
                message: Constants.commonPhrases.vueCliApp.otherAppAlertMessage,
                index: 1,
                host: 9001,
                wait: 1500
            })
        })
    })
})
