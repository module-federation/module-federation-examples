import {BaseMethods} from "../../../cypress-e2e/common/base";
import {baseSelectors} from "../../../cypress-e2e/common/selectors";
import {Constants} from "../../../cypress-e2e/fixtures/constants";
import {RequestsTypes} from "../../../cypress-e2e/types/requestsTypes";

const basePage: BaseMethods = new BaseMethods()

describe('Third Party Scripts', () => {
    context('It checks basic host-remote app', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3001
            })
        })

        it('Checks app header visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.commonConstantsData.basicComponents.basicHostRemote,
                visibilityState: 'be.visible'
            })
        })

        it('Checks app description visibility', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.paragraph,
                text: Constants.commonPhrases.thirdPartyScriptsApp.description,
                visibilityState: 'be.visible'
            })
        })

        it('Checks third party network call created', () => {
            basePage.checkNetworkCallCreated(RequestsTypes.POST, Constants.hrefs.thirdPartyScriptsPostRequestPath, 3001, 200)
        })
    })
})
