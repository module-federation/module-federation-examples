import { BaseMethods } from "../../cypress/common/base";
import { baseSelectors } from "../../cypress/common/selectors";
import { Constants } from "../../cypress/fixtures/constants";
const basePage: BaseMethods = new BaseMethods()

describe('Check app1', () => {
    beforeEach(()=> {
        basePage.openLocalhost(3001)
    })
    it('Check app starts and running', ()=> {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.elementsText.sharedContextApp1H1

        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.sharedContextApp1H2
        })
        basePage.checkElementWithTextPresence({
            selector:baseSelectors.paragraph,
            text: Constants.elementsText.sharedContextApp1Paragraph
        })
    })
})