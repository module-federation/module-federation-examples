import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

describe("Check Next host", () => {
    beforeEach(() => {
        basePage.openLocalhost(3000)
    })

    it('Check the content exist on Next host', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.nextHostButtonEn})

        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.nextHostTextEn
        })
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.nextHostTitleEn
        })

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonEn})

        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.reactRemoteTitleEn
        })
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.reactRemoteTextEn
        })
    })

    it('Check the language is changed from Next section', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.section,
            text: Constants.translation.nextHostButtonEn})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.nextHostButtonFr})

        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.nextHostTextFr
        })
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.nextHostTitleFr
        })

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonFr})

        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.reactRemoteTitleFr
        })
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.reactRemoteTextFr
        })

        basePage.clickElementWithText({
            selector: baseSelectors.section,
            text: Constants.translation.nextHostButtonFr})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.nextHostButtonEn})

        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.nextHostTextEn
        })
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.nextHostTitleEn
        })

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonEn})

        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.reactRemoteTitleEn
        })
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.reactRemoteTextEn
        })
    })

    it('Check the language is changed from remote child section', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonEn})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section, 
            text: Constants.translation.nextHostButtonFr})

        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.nextHostTextFr
        })
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.nextHostTitleFr
        })

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonFr})

        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.reactRemoteTitleFr
        })
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.reactRemoteTextFr
        })

        basePage.clickElementWithText({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonFr})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.nextHostButtonEn})
            
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.nextHostTextEn
        })
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.nextHostTitleEn
        })

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonEn})
            
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.reactRemoteTitleEn
        })
        basePage.checkElementContainText({
            selector: baseSelectors.section, 
            text: Constants.translation.reactRemoteTextEn
        })
    })
})
