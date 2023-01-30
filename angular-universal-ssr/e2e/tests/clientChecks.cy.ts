import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {AngularUniversalSsrMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: AngularUniversalSsrMethods = new AngularUniversalSsrMethods()

describe("It checks client app", () => {
    beforeEach(() => {
        basePage.openLocalhost(5000)
    })

    it('Checks cities block visibility', () => {
        basePage.checkElementVisibility(selectors.angularUniversalSsrCitiesBlock)
    })

    it('Checks cities block header visibility', () => {
        basePage.checkElementWithTextPresence({
            parentSelector: selectors.angularUniversalSsrCitiesBlock,
            selector: baseSelectors.divElement,
            text: Constants.commonPhrases.angularUniversalSsrApp.blockHeaderText,
            visibilityState: 'be.visible'
        })
    })

    it('Checks base cities names visibility', () => {
        methodsPage.checkTextedElementsVisibility(Constants.elementsText.angularUniversalSsrApp.addedCities, updatedSelectors.angularUniversalSsrAddedCity)
    })

    it('Checks that both cities links can be clicked', () => {
        basePage.checkElementState({
            selector: updatedSelectors.angularUniversalSsrAddedCity,
            state: ':disabled',
            isMultiple: true,
            jqueryValue: false
        })
    })

    it('Clicks on city by name and checks description with text appear', () => {
        Constants.elementsText.angularUniversalSsrApp.addedCities.forEach((city: string, counter: number) => {
            basePage.clickElementWithText({
                selector: updatedSelectors.angularUniversalSsrAddedCity,
                text: city
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.angularUniversalSsrSelectedCityInfo,
                text: Constants.commonPhrases.angularUniversalSsrApp.selectedCityInfo[counter],
                visibilityState: 'be.visible'
            })
        })
    })

    it('Checks that selection of city info can be reverted after reload', () => {
        methodsPage.checkCitiesBlockFunctionality()
    })
})
