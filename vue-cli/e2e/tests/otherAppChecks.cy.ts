import { BaseMethods } from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe("It checks other app", () => {
    beforeEach(() => {
        basePage.openLocalhost(9001)
    })

    it('Checks other section browser alert text', () => {
        basePage.checkBrowserAlertByText(baseSelectors.button, Constants.commonPhrases.vueCliOtherAppAlertMessage)
    })
})