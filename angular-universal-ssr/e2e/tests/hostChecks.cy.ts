import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {AngularUniversalSsrMethods} from "../methods/methods";
import {CommonTestData} from "../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: AngularUniversalSsrMethods = new AngularUniversalSsrMethods()

const baseElementsQuantity: number = 3

describe('Angular Universal SSR', () => {
    context('It checks host app', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 4000
            })
        })

        it('Checks app root component visibility', () => {
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.appRoot
            })
        })

        it('Checks app root component header text', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.appRoot,
                text: Constants.commonPhrases.angularUniversalSsrApp.components.rootComponent
            })
        })

        it('Checks value input visibility', () => {
            basePage.checkElementVisibility({
                selector: baseSelectors.tags.inputs.input
            })
        })

        it('Checks value input is not disabled', () => {
            basePage.checkElementState({
                parentSelector: baseSelectors.tags.coreElements.div,
                selector: baseSelectors.tags.inputs.input,
                state: 'not.be.disabled'
            })
        })

        it('Checks value input button visibility', () => {
            basePage.checkElementVisibility({
                parentSelector: baseSelectors.tags.coreElements.div,
                selector: baseSelectors.tags.coreElements.button,
            })
        })

        it('Checks value input button text', () => {
            basePage.checkElementWithTextPresence({
                parentSelector: baseSelectors.tags.coreElements.div,
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.angularUniversalSsrApp.inputButtonText,
                visibilityState: 'be.visible'
            })
        })

        it('Checks value input button color', () => {
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.angularUniversalSsrApp.inputButtonText,
                prop: CssAttr.backgroundColor,
                value: Constants.color.lightGrey
            })
        })

        it('Checks value input button is not disabled', () => {
            basePage.checkElementState({
                parentSelector: baseSelectors.tags.coreElements.div,
                selector: baseSelectors.tags.coreElements.button,
                state: 'not.be.disabled'
            })
        })

        it('Checks value input has no validation', () => {
            CommonTestData.multipleSizeStringsArray.forEach((string: string) => {
                basePage.fillField({
                    selector: baseSelectors.tags.inputs.input,
                    text: string
                })
                basePage.checkInputValue(string)
            })
        })

        it( `Checks that by default added values quantity equal to ${baseElementsQuantity}`, () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.list,
                quantity: baseElementsQuantity
            })
        })

        it('Checks basically added values names', () => {
            methodsPage.checkTextedElementsVisibility(Constants.elementsText.angularUniversalSsrApp.angularUniversalSsrAddedValuesNames, baseSelectors.tags.coreElements.list)
        })

        it('Checks add new value functionality', () => {
            methodsPage.addNewListValue()
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.list,
                text: Constants.commonConstantsData.standardPhrase,
                visibilityState: 'be.visible'
            })
        })

        it('Checks that after applying value status in input it can be added more then once', () => {
            methodsPage.addNewListValue()
            basePage.checkInputValue(Constants.commonConstantsData.standardPhrase)
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.angularUniversalSsrApp.inputButtonText,
            })
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.list,
                quantity: 5
            })
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.list,
                text: Constants.commonConstantsData.standardPhrase,
                quantity: 2,
                jqueryValue: true
            })
        })

        it('Checks that empty input would not add new value to the list', () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.list,
                quantity: baseElementsQuantity
            })
            basePage.checkInputValue('')
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.angularUniversalSsrApp.inputButtonText,
            })
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.list,
                quantity: baseElementsQuantity
            })
        })

        it('Checks that newly added value disappears after reload', () => {
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.list,
                quantity: baseElementsQuantity
            })
            basePage.fillField({
                selector: baseSelectors.tags.inputs.input,
                text: Constants.commonConstantsData.standardPhrase
            })
            basePage.checkInputValue(Constants.commonConstantsData.standardPhrase)
            basePage.clickElementWithText({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.angularUniversalSsrApp.inputButtonText,
            })
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.list,
                quantity: 4
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.list,
                text: Constants.commonConstantsData.standardPhrase,
                visibilityState: 'be.visible'
            })
            basePage.reloadWindow()
            basePage.checkElementQuantity({
                selector: baseSelectors.tags.coreElements.list,
                quantity: baseElementsQuantity
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.list,
                text: Constants.commonConstantsData.standardPhrase,
                isVisible: false
            })
        })

        it('Checks app home component element text', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.appRoot,
                text: Constants.commonPhrases.angularUniversalSsrApp.components.homeComponent
            })
        })

        it(`Checks that tabs quantity equal to ${baseElementsQuantity}`, () => {
            basePage.checkElementQuantity({
                selector: updatedSelectors.angularUniversalSsrApp.tab,
                quantity: baseElementsQuantity
            })
        })

        it('Checks tab names visibility', () => {
            methodsPage.checkTextedElementsVisibility(Constants.elementsText.angularUniversalSsrApp.tabsNames, updatedSelectors.angularUniversalSsrApp.tab)
        })

        it('Checks cities block appears after click on federation tab', () => {
            basePage.checkElementVisibility({
                selector: selectors.angularUniversalSsrApp.citiesBlock,
                isVisible: false
            })
            basePage.clickElementWithText({
                selector: updatedSelectors.angularUniversalSsrApp.tab,
                text: Constants.elementsText.angularUniversalSsrApp.tabsNames[2]
            })
            basePage.checkElementVisibility({
                selector:  selectors.angularUniversalSsrApp.citiesBlock
            })
        })

        it('Checks that cities block which appears after click on federation tab is equal to one in client app', () => {
            basePage.checkElementVisibility({
                selector: selectors.angularUniversalSsrApp.citiesBlock,
                isVisible: false
            })
            basePage.clickElementWithText({
                selector: updatedSelectors.angularUniversalSsrApp.tab,
                text: Constants.elementsText.angularUniversalSsrApp.tabsNames[2]
            })
            basePage.checkElementVisibility({
                selector: selectors.angularUniversalSsrApp.citiesBlock
            })
            basePage.compareInfoBetweenHosts(selectors.angularUniversalSsrApp.citiesBlock, 3000)
        })

        it('Checks added cities block functionality are the same for root and client hosts', () => {
            methodsPage.checkAddedCitiesBlockFunctionalityForMultipleHosts(3000,
                Constants.elementsText.angularUniversalSsrApp.addedCities, updatedSelectors.angularUniversalSsrApp.addedCity,
                Constants.commonPhrases.angularUniversalSsrApp.selectedCityInfo, selectors.angularUniversalSsrApp.selectedCityInfo)
        })
    })
})
