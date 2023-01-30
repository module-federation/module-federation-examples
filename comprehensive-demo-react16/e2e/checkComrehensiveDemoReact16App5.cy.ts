import { Constants } from '../../cypress/fixtures/constants';
import { baseSelectors, buttons, alertMessages } from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

describe('Check is Comprehensive Demo App5 working and have elements', () => {
    beforeEach(() => {
        basePage.openLocalhost(3005)
    })

    it('Check App build and running & Check app elements exist', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.comprehensiveDemoApp.App5.buttonText
        })
        basePage.checkElementExist({
            selector: alertMessages.alert
        })
        basePage.checkElementWithTextPresence({
            selector: alertMessages.alert,
            text: Constants.elementsText.comprehensiveDemoApp.App5.alertText
        })
        basePage.checkElementExist({
            selector: buttons.closeButton
        })
    })

    it('Check Application functionality (Alert message & close button exist)', () => {
        basePage.checkBrowserAlertByText({
            selector: baseSelectors.button,
            alertMessage: Constants.elementsText.comprehensiveDemoApp.alertMessage
        })
        basePage.clickElementBySelector({
            selector: buttons.closeButton
        })
        basePage.checkElementHaveProperty({
            selector: alertMessages.alert,
            attr: Constants.commonConstantsData.commonAttributes.attr,
            prop: Constants.commonConstantsData.commonAttributes.style,
            value: Constants.commonConstantsData.commonAttributes.displayNone
        })
    })
})