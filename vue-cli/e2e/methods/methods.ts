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
        this.checkBrowserAlertByText({
            selector,
            alertMessage: message,
            isEqual,
            index
        })
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
        this.checkElementContainText({
            selector: baseSelectors.tags.section,
            text: Constants.elementsText.vueCliApp.otherSectionCodeBlock,
            index: 0 ,
            isContain: false
        })
        this.clickElementWithText({
            selector: baseSelectors.tags.coreElements.button,
            text: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton,
        })
        this.checkElementVisibility({
            parentSelector: baseSelectors.tags.section,
            selector: baseSelectors.tags.code
        })
        this.checkElementWithTextPresence({
            parentSelector: baseSelectors.tags.section,
            selector: baseSelectors.tags.code,
            text: Constants.elementsText.vueCliApp.otherSectionCodeBlock,
            visibilityState: 'be.visible'
        })
        this.reloadWindow()
        this.checkElementContainText({
            selector: baseSelectors.tags.section,
            text: Constants.elementsText.vueCliApp.otherSectionCodeBlock,
            index: 0 ,
            isContain: false
        })
        this.checkElementVisibility({
            parentSelector: baseSelectors.tags.section,
            selector: baseSelectors.tags.code,
            isVisible: false,
            notVisibleState: 'not.be.visible'
        })
    }
}