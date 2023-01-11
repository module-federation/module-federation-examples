import { Constants } from '../../cypress/fixtures/constants';
import { baseSelectors } from '../../cypress/common/selectors';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

describe('Check is Comprehensive Demo App4 working and have elements', () => {
    beforeEach(() => {
        basePage.openLocalhost(3004)
    })

    it('Check App build and running & Check app elements exist', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.elementsText.comprehensiveDemo.App4.headerText
        })
    })
})