import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

export class AngularUniversalSsrMethods extends BaseMethods {

    public checkActiveTabNameConnection(activeTabName: string, componentName: string): void {
        cy.get(selectors.angularUniversalSsrApp.activeTab)
            .invoke('text')
            .then((text: string) => {
                if(text === activeTabName) {
                    this.checkElementWithTextPresence({
                        selector: baseSelectors.tags.appRoot,
                        text: componentName,
                        visibilityState: 'be.visible'
                    })
                }
            });
    }

    public checkAddedCitiesBlockFunctionalityForMultipleHosts(extraHost: number, addedCities: string[], addedCitySelector: string, selectedCityInfo: string[], selectedCityInfoSelector: string): void {
        this.clickElementWithText({
            selector: updatedSelectors.angularUniversalSsrApp.tab,
            text: Constants.elementsText.angularUniversalSsrApp.tabsNames[2]
        })
        this.checkCitiesBlockFunctionality()
        cy.origin(Cypress.env(`localhost${extraHost}`), { args: { addedCities, addedCitySelector, selectedCityInfoSelector, selectedCityInfo } }, ({ addedCities, addedCitySelector, selectedCityInfoSelector, selectedCityInfo }) => {
            cy.visit('/')
            addedCities.forEach((city: string, counter: number) => {
                cy.get(addedCitySelector).contains(city).click()
                cy.get(selectedCityInfoSelector).contains(selectedCityInfo[counter]).should('be.visible')
                cy.reload(true)
                cy.get(selectedCityInfoSelector).should('not.exist')
            })
        });
    }

    public checkCitiesBlockFunctionality(): void {
        Constants.elementsText.angularUniversalSsrApp.addedCities.forEach((city: string, counter: number) => {
            this.clickElementWithText({
                selector: updatedSelectors.angularUniversalSsrApp.addedCity,
                text: city
            })
            this.checkElementWithTextPresence({
                selector: selectors.angularUniversalSsrApp.selectedCityInfo,
                text: Constants.commonPhrases.angularUniversalSsrApp.selectedCityInfo[counter],
                visibilityState: 'be.visible'
            })
            this.reloadWindow()
            this.checkElementVisibility({
                selector: selectors.angularUniversalSsrApp.selectedCityInfo,
                isVisible: false,
            })
        })
    }

    public checkTextedElementsVisibility(elementsArray: string[], elementSelector: string): void {
        elementsArray.forEach((element: string) => {
            this.checkElementWithTextPresence({
                selector: elementSelector,
                text: element,
                visibilityState: 'be.visible'
            })
        })
    }

    public addNewListValue(): void {
        this.checkElementQuantity({
            selector: baseSelectors.tags.coreElements.list,
            quantity: 3
        })
        this.fillField({
            selector: baseSelectors.tags.inputs.input,
            text: Constants.commonConstantsData.standardPhrase
        })
        this.checkInputValue(Constants.commonConstantsData.standardPhrase)
        this.clickElementWithText({
            selector: baseSelectors.tags.coreElements.button,
            text: Constants.elementsText.angularUniversalSsrApp.inputButtonText,
        })
        this.checkElementQuantity({
            selector: baseSelectors.tags.coreElements.list,
            quantity: 4
        })
    }
}
