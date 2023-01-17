import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {RequestsTypes} from "../../../cypress/types/requestsTypes";

const basePage: BaseMethods = new BaseMethods()

describe("It checks basic host-remote app", () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Checks app header visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.commonPhrases.thirdPartyScriptsAppPhrases.header,
            visibilityState: 'be.visible'
        })
    })

    it('Checks app description visibility', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.commonPhrases.thirdPartyScriptsAppPhrases.description,
            visibilityState: 'be.visible'
        })
    })

    it('Checks third party network call created', () => {
        basePage.checkNetworkCallCreated(RequestsTypes.POST, Constants.hrefs.thirdPartyScriptsPostRequestPath, 3001, 200)
    })
})
