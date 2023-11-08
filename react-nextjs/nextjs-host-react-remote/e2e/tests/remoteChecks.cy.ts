import {BaseMethods} from "../../../../cypress-e2e/common/base";
import {baseSelectors} from "../../../../cypress-e2e/common/selectors";
import {Constants} from "../../../../cypress-e2e/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

describe("It checks remote page", () => {
    beforeEach(() => {
        basePage.openLocalhost({
            number: 8081
        })
    })

    it('Checks remote app message visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.coreElements.div,
            text: Constants.commonPhrases.nextJsHostReactRemoteApp.messages.remotes.page,
            visibilityState: 'be.visible'
        })
    })
})
