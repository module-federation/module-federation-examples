import { Constants } from '../../cypress/fixtures/constants';
import {baseSelectors, selectors} from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

describe('Comprehencive Demo React 18', () => {
    context('Check is Comprehensive Demo App5 working and have elements', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3005
            })
        })
    
        it('Check App build and running & Check app elements exist', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.comprehensiveDemoApp.App5.buttonText
            })
            basePage.checkElementVisibility({
                selector: selectors.comprehensiveDemoApp.alert
            })
            basePage.checkElementWithTextPresence({
                selector: selectors.comprehensiveDemoApp.alert,
                text: Constants.elementsText.comprehensiveDemoApp.App5.alertText
            })
            basePage.checkElementVisibility({
                selector: selectors.comprehensiveDemoApp.closeButton
            })
        })
    
        it('Check Application functionality (Alert message & close button exist)', () => {
            basePage.checkBrowserAlertByText({
                selector: baseSelectors.tags.coreElements.button,
                alertMessage: Constants.elementsText.comprehensiveDemoApp.alertMessage
            })
            basePage.clickElementBySelector({
                selector: selectors.comprehensiveDemoApp.closeButton
            })
            basePage.checkElementHaveProperty({
                selector: selectors.comprehensiveDemoApp.alert,
                attr: Constants.commonConstantsData.commonAttributes.attr,
                prop: Constants.commonConstantsData.commonAttributes.style,
                value: Constants.commonConstantsData.commonAttributes.displayNone
            })
        })
    })
})
