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
            this.clickElementBySelector({selector: baseSelectors.button})
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
}