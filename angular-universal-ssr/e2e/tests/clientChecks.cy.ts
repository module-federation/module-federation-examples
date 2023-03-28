import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {AngularUniversalSsrMethods} from "../methods/methods";

const basePage: BaseMethods = new BaseMethods()
const methodsPage: AngularUniversalSsrMethods = new AngularUniversalSsrMethods()

describe('Angular Universal SSR', () => {
    context('It checks client app', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3000
            })
        })

        it('Checks cities block visibility', () => {
            basePage.checkElementVisibility({
                selector: selectors.angularUniversalSsrApp.citiesBlock
            })
        })

        it('Checks cities block header visibility', () => {
            basePage.checkElementWithTextPresence({
                parentSelector: selectors.angularUniversalSsrApp.citiesBlock,
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.commonPhrases.angularUniversalSsrApp.blockHeaderText,
                visibilityState: 'be.visible'
            })
        })

        it('Checks base cities names visibility', () => {
            methodsPage.checkTextedElementsVisibility(Constants.elementsText.angularUniversalSsrApp.addedCities, updatedSelectors.angularUniversalSsrApp.addedCity)
        })

        it('Checks that both cities links can be clicked', () => {
            basePage.checkElementState({
                selector: updatedSelectors.angularUniversalSsrApp.addedCity,
                state: ':disabled',
                isMultiple: true,
                jqueryValue: false
            })
        })

        it('Clicks on city by name and checks description with text appear', () => {
            Constants.elementsText.angularUniversalSsrApp.addedCities.forEach((city: string, counter: number) => {
                basePage.clickElementWithText({
                    selector: updatedSelectors.angularUniversalSsrApp.addedCity,
                    text: city
                })
                basePage.checkElementWithTextPresence({
                    selector: selectors.angularUniversalSsrApp.selectedCityInfo,
                    text: Constants.commonPhrases.angularUniversalSsrApp.selectedCityInfo[counter],
                    visibilityState: 'be.visible'
                })
            })
        })

        it('Checks that selection of city info can be reverted after reload', () => {
            methodsPage.checkCitiesBlockFunctionality()
        })
    })
})
