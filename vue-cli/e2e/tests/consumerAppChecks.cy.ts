import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {VueCliMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: VueCliMethods = new VueCliMethods()

describe("It checks consumer app", () => {
    beforeEach(() => {
        basePage.openLocalhost(8080)
    })

    it('Checks consumer page header visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.vueCliConsumerSectionHeader,
            visibilityState: 'be.visible'
        })
    })

    it('Checks core imported part message visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h4,
            text: Constants.elementsText.vueCliConsumerImportMessages.coreImportMessage,
            visibilityState: 'be.visible'
        })
    })

    it('Checks that imported and basic core component names are equal', () => {
        basePage.compareInfoBetweenHosts(updatedSelectors.sectionName, 9000)
    })

    it('Checks that imported core section button text is not equal to base core section button text', () => {
        basePage.compareInfoBetweenHosts(updatedSelectors.sectionButton, 9000, false)
    })

    it('Checks core section description visibility', () => {
        basePage.checkElementState({
            selector: baseSelectors.section,
            text: Constants.elementsText.vueCliSectionsDescriptions.consumerCoreSection,
            state: 'not.be.disabled'
        })
    })

    it('Checks other part message visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h4,
            text: Constants.elementsText.vueCliConsumerImportMessages.otherImportMessage,
            visibilityState: 'be.visible'
        })
    })

    it('Checks that imported and basic other component descriptions are equal', () => {
        basePage.compareInfoBetweenHosts(baseSelectors.section, 9001, true, 1)
    })

    it('Checks that imported other section button text is equal to base other section button text', () => {
        basePage.compareInfoBetweenHosts(baseSelectors.button, 9001, true, 1)
    })

    it('Checks that on imported and base other sections same code block appears by click', () => {
        basePage.checkElementContainText({
            selector: baseSelectors.section,
            text: Constants.elementsText.vueCliOtherSectionCodeBlock,
            index: 0 ,
            contain: false
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.vueCliButtonsText.otherSectionButton,
            wait: 1500
        })
        basePage.compareInfoBetweenHosts(baseSelectors.code, 9001, true, 0, baseSelectors.button, 1500)
    })

    it('Checks that on imported and base other sections same browser alert appears by click on button', () => {
        methodsPage.checkBrowserAlertForMultipleHosts({
            selector: baseSelectors.button,
            message: Constants.commonPhrases.vueCliOtherAppAlertMessage,
            index: 1,
            host: 9001,
            wait: 1500
        })
    })
})