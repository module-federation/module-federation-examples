import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

export class VueCliMethods extends BaseMethods {

    public checkBrowserAlertForMultipleHosts
    ({
         selector,
         message,
         isEqual = true,
         index = 0,
         host,
         wait = 0
    }: {
        selector: string,
        message: string,
        isEqual?: boolean,
        index?: number,
        host: number,
        wait?: number
    }): void {
        this.checkBrowserAlertByText(selector, message, isEqual, index)
         cy.origin(Cypress.env(`localhost${host}`), {args: {selector, message, wait}}, ({selector, message, wait}) => {
            cy.visit('/')
             cy.get(selector).wait(wait).click()
              cy.on('window:alert', (alertText: string) => {
                  if(isEqual) {
                      expect(alertText).to.be.eq(message)
                  } else {
                      expect(alertText).not.to.be.eq(message);
                  }
                 });
        });
    }

    public checkCodeTagAppearance
    (): void {
        this.checkElementContainText(baseSelectors.section, Constants.elementsText.vueCliOtherSectionCodeBlock, 0 , false)
        this.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.vueCliButtonsText.otherSectionButton,
        })
        this.checkChildElementVisibility(baseSelectors.section, baseSelectors.code)
        this.checkElementWithTextPresence({
            parentSelector: baseSelectors.section,
            selector: baseSelectors.code,
            text: Constants.elementsText.vueCliOtherSectionCodeBlock,
            visibilityState: 'be.visible'
        })
        this.reloadWindow()
        this.checkElementContainText(baseSelectors.section, Constants.elementsText.vueCliOtherSectionCodeBlock, 0 , false)
        this.checkChildElementVisibility(baseSelectors.section, baseSelectors.code, false,
            '', '', 'not.be.visible')
    }
}