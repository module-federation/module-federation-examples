import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {CssAttr} from "../../../cypress/types/cssAttr";
import {AngularUniversalSsrMethods} from "../methods/methods";
import {CommonTestData} from "../../../cypress/fixtures/commonTestData";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: AngularUniversalSsrMethods = new AngularUniversalSsrMethods()

const baseElementsQuantity: number = 3

describe("It checks host app", () => {
    beforeEach(() => {
        basePage.openLocalhost(4000)
    })

    it('Checks app root component visibility', () => {
        basePage.checkElementVisibility(baseSelectors.appRoot)
    })

    it('Checks app root component header text', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.appRoot,
            text: Constants.commonPhrases.angularUniversalSsrComponentsMessages.rootComponent
        })
    })

    it('Checks value input visibility', () => {
        basePage.checkElementVisibility(baseSelectors.input)
    })

    it('Checks value input is not disabled', () => {
        basePage.checkElementState({
            parentSelector: baseSelectors.divElement,
            selector: baseSelectors.input,
            state: 'not.be.disabled'
        })
    })

    it('Checks value input button visibility', () => {
        basePage.checkChildElementVisibility(baseSelectors.divElement, baseSelectors.button)
    })

    it('Checks value input button text', () => {
        basePage.checkElementWithTextPresence({
            parentSelector: baseSelectors.divElement,
            selector: baseSelectors.button,
            text: Constants.elementsText.angularUniversalSsrValueInputButtonText,
            visibilityState: 'be.visible'
        })
    })

    it('Checks value input button color', () => {
        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.elementsText.angularUniversalSsrValueInputButtonText,
            prop: CssAttr.backgroundColor,
            value: Constants.color.lightGrey
        })
    })

    it('Checks value input button is not disabled', () => {
        basePage.checkElementState({
            parentSelector: baseSelectors.divElement,
            selector: baseSelectors.button,
            state: 'not.be.disabled'
        })
    })

    it('Checks value input has no validation', () => {
        CommonTestData.multipleSizeStringsArray.forEach((string: string) => {
            basePage.fillField({
                selector: baseSelectors.input,
                text: string
            })
            basePage.checkInputValue(string)
        })
    })

    it( `Checks that by default added values quantity equal to ${baseElementsQuantity}`, () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.listElement,
            quantity: baseElementsQuantity
        })
    })

    it('Checks basically added values names', () => {
        methodsPage.checkTextedElementsVisibility(Constants.commonText.angularUniversalSsrAddedValuesNames, baseSelectors.listElement)
    })

    it('Checks add new value functionality', () => {
        methodsPage.addNewListValue()
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.listElement,
            text: Constants.commonPhrases.standartText,
            visibilityState: 'be.visible'
        })
    })

    it('Checks that after applying value status in input it can be added more then once', () => {
        methodsPage.addNewListValue()
        basePage.checkInputValue(Constants.commonPhrases.standartText)
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.angularUniversalSsrValueInputButtonText,
        })
        basePage.checkElementQuantity({
            selector: baseSelectors.listElement,
            quantity: 5
        })
        basePage.checkElementQuantity({
            selector: baseSelectors.listElement,
            text: Constants.commonPhrases.standartText,
            quantity: 2,
            jqueryValue: true
        })
    })

    it('Checks that empty input would not add new value to the list', () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.listElement,
            quantity: baseElementsQuantity
        })
        basePage.checkInputValue('')
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.angularUniversalSsrValueInputButtonText,
        })
        basePage.checkElementQuantity({
            selector: baseSelectors.listElement,
            quantity: baseElementsQuantity
        })
    })

    it('Checks that newly added value disappears after reload', () => {
        basePage.checkElementQuantity({
            selector: baseSelectors.listElement,
            quantity: baseElementsQuantity
        })
        basePage.fillField({
            selector: baseSelectors.input,
            text: Constants.commonPhrases.standartText
        })
        basePage.checkInputValue(Constants.commonPhrases.standartText)
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.angularUniversalSsrValueInputButtonText,
        })
        basePage.checkElementQuantity({
            selector: baseSelectors.listElement,
            quantity: 4
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.listElement,
            text: Constants.commonPhrases.standartText,
            visibilityState: 'be.visible'
        })
        basePage.reloadWindow()
        basePage.checkElementQuantity({
            selector: baseSelectors.listElement,
            quantity: baseElementsQuantity
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.listElement,
            text: Constants.commonPhrases.standartText,
            isVisible: false
        })
    })

    it('Checks app home component element text', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.appRoot,
            text: Constants.commonPhrases.angularUniversalSsrComponentsMessages.homeComponent
        })
    })

    it(`Checks that tabs quantity equal to ${baseElementsQuantity}`, () => {
        basePage.checkElementQuantity({
            selector: updatedSelectors.angularUniversalSsrTab,
            quantity: baseElementsQuantity
        })
    })

    it('Checks tab names visibility', () => {
        methodsPage.checkTextedElementsVisibility(Constants.elementsText.angularUniversalSsrTabsNames, updatedSelectors.angularUniversalSsrTab)
    })

    it('Checks cities block appears after click on federation tab', () => {
        basePage.checkElementVisibility(selectors.angularUniversalSsrCitiesBlock, false, 'not.exist')
        basePage.clickElementWithText({
            selector: updatedSelectors.angularUniversalSsrTab,
            text: Constants.elementsText.angularUniversalSsrTabsNames[2]
        })
        basePage.checkElementVisibility(selectors.angularUniversalSsrCitiesBlock)
    })

    it('Checks that cities block which appears after click on federation tab is equal to one in client app', () => {
        basePage.checkElementVisibility(selectors.angularUniversalSsrCitiesBlock, false, 'not.exist')
        basePage.clickElementWithText({
            selector: updatedSelectors.angularUniversalSsrTab,
            text: Constants.elementsText.angularUniversalSsrTabsNames[2]
        })
        basePage.checkElementVisibility(selectors.angularUniversalSsrCitiesBlock)
        basePage.compareInfoBetweenHosts(selectors.angularUniversalSsrCitiesBlock, 5000)
    })

    it('Checks added cities block functionality are the same for root and client hosts', () => {
        methodsPage.checkAddedCitiesBlockFunctionalityForMultipleHosts(5000,
            Constants.elementsText.angularUniversalSsrAddedCities, updatedSelectors.angularUniversalSsrAddedCity,
            Constants.commonPhrases.angularUniversalSsrSelectedCityInfo, selectors.angularUniversalSsrSelectedCityInfo)
    })
})
