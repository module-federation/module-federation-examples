import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('Check BI-Directional APP 1', () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })
    it('Check header presence',() => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.elementsText.biDirectionalHeader
        })

    })

    it('Check subheader presence', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.automaticVendorFirstAppName
        })
    })

    it('Check App 1 and App 2 buttons exists', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.biDirectionalButton1
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.biDirectionalButton2
        })
    })

})


