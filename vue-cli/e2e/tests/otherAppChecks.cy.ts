import { BaseMethods } from "../../../cypress-e2e/common/base";
import {baseSelectors} from "../../../cypress-e2e/common/selectors";
import {Constants} from "../../../cypress-e2e/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe('Vue CLI', () => {
    context("It checks other app", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 9001
            })
        })
    
        it('Checks other section browser alert text', () => {
            basePage.checkBrowserAlertByText({
                selector: baseSelectors.tags.coreElements.button,
                alertMessage: Constants.commonPhrases.vueCliApp.otherAppAlertMessage
            })
        })
    })
})
