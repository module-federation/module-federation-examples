import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

export class Vue2InVue3Methods extends BaseMethods {

    public checkCounterChangedAfterClick(
        {
            clicksCounter,
            isReloadNeeded = false,
            isValueCompared = false,
        }: {
            clicksCounter: number,
            isReloadNeeded?: boolean,
            isValueCompared?: boolean,
        }): void {
        let counter: number = 0;

        this.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.commonPhrases.vueAppsDefaultCounterText,
            visibilityState: 'be.visible'
        })

        for (let i: number = 0; i < clicksCounter; i++) {
            this.clickElementBySelector(baseSelectors.button)
            counter++
        }

        this.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.commonPhrases.vueAppsDefaultCounterText.replace(/[0-9]/g, counter.toString()),
            visibilityState: 'be.visible'
        })

        if (isValueCompared) {
            expect(counter.toString()).to.eq(Constants.commonPhrases.vueAppsDefaultCounterText.replace(/[0-9]/g, counter.toString()).split(':')[1].trim())
        }

        if (isReloadNeeded) {
            cy.reload()
            this.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: Constants.commonPhrases.vueAppsDefaultCounterText,
                visibilityState: 'be.visible'
            })
        }
    }

    public checkCounterOnNonDefaultHost(
        host: number,
        div: string,
        defaultCounterText: string,
        changedCounterText: string
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.origin(Cypress.env(`localhost${host}`), {args: {div, defaultCounterText, changedCounterText}}, ({div, defaultCounterText, changedCounterText}) => {
            cy.visit('/')
            // do not get it as checkElementWithTextPresence() due to inability of origin to get outside methods
            cy.get(div).contains(defaultCounterText).should('be.visible')
            cy.get(div).contains(changedCounterText).should('not.exist')
        });
    }
}