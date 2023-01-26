import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

export class VersionDiscrepancyMethods extends BaseMethods {

    public checkMessageVisibilityByLodashVersion(message: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(baseSelectors.divElement)
            .then((element: JQuery<HTMLElement>) => {
                if(element.text().includes(Constants.commonPhrases.versionDiscrepancyApp.lodashVersions.app1)) {
                    this.checkElementWithTextPresence({
                        selector: baseSelectors.divElement,
                        text: message,
                        visibilityState: 'be.visible'
                    })

                    return;
                }

                this.checkElementWithTextPresence({
                    selector: baseSelectors.divElement,
                    text: message,
                    isVisible: false
                })
            });
    }
}