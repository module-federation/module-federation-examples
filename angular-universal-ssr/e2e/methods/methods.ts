import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors, selectors, updatedSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

export class AngularUniversalSsrMethods extends BaseMethods {

    public checkActiveTabNameConnection(activeTabName: string, componentName: string): void {
        cy.get(selectors.activeTab)
            .invoke('text')
            .then((text: string) => {
                if(text === activeTabName) {
                    this.checkElementWithTextPresence({
                        selector: baseSelectors.appRoot,
                        text: componentName,
                        visibilityState: 'be.visible'
                    })
                }
            });
    }

    public checkAddedCitiesBlockFunctionalityForMultipleHosts(extraHost: number, addedCities: string[], addedCitySelector: string, selectedCityInfo: string[], selectedCityInfoSelector: string): void {
        this.clickElementWithText({
            selector: updatedSelectors.angularUniversalSsrTab,
            text: Constants.elementsText.angularUniversalSsrTabsNames[2]
        })
        this.checkCitiesBlockFunctionality()
        cy.origin(Cypress.env(`localhost${extraHost}`), { args: { addedCities, addedCitySelector, selectedCityInfoSelector, selectedCityInfo } }, ({ addedCities, addedCitySelector, selectedCityInfoSelector, selectedCityInfo }) => {
            cy.visit('/')
            addedCities.forEach((city: string, counter: number) => {
                cy.get(addedCitySelector).contains(city).click()
                cy.get(selectedCityInfoSelector).contains(selectedCityInfo[counter]).should('be.visible')
                cy.reload()
                cy.get(selectedCityInfoSelector).should('not.exist')
            })
        });
    }

    public checkCitiesBlockFunctionality(): void {
        Constants.elementsText.angularUniversalSsrAddedCities.forEach((city: string, counter: number) => {
            this.clickElementWithText({
                selector: updatedSelectors.angularUniversalSsrAddedCity,
                text: city
            })
            this.checkElementWithTextPresence({
                selector: selectors.angularUniversalSsrSelectedCityInfo,
                text: Constants.commonPhrases.angularUniversalSsrSelectedCityInfo[counter],
                visibilityState: 'be.visible'
            })
            this.reloadWindow()
            this.checkElementVisibility(selectors.angularUniversalSsrSelectedCityInfo, false, 'not.exist')
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
            selector: baseSelectors.listElement,
            quantity: 3
        })
        this.fillField({
            selector: baseSelectors.input,
            text: Constants.commonPhrases.standartText
        })
        this.checkInputValue(Constants.commonPhrases.standartText)
        this.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.angularUniversalSsrValueInputButtonText,
        })
        this.checkElementQuantity({
            selector: baseSelectors.listElement,
            quantity: 4
        })
    }
}
