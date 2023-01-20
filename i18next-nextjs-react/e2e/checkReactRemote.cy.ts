import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods();

describe("Check React remote", () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.i18nextNextjsReact)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.i18nextNextjsReact)
        // })

    beforeEach(() => {
        basePage.openLocalhost(3002)
    })

    it('Check the content of the page exist', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.translation.reactRemoteButtonEn})

        basePage.checkElementContainText({
            selector: baseSelectors.appId, 
            text: Constants.translation.reactRemoteTitleEn
        })
        basePage.checkElementContainText({
            selector: baseSelectors.appId, 
            text: Constants.translation.reactRemoteTextEn
        })
    })

    it('Check the language is changed', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.translation.reactRemoteButtonEn})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.translation.reactRemoteButtonFr})

        basePage.checkElementContainText({
            selector: baseSelectors.appId, 
            text: Constants.translation.reactRemoteTitleFr
        })
        basePage.checkElementContainText({
            selector: baseSelectors.appId, 
            text: Constants.translation.reactRemoteTextFr
        })
        basePage.clickElementWithText({
            selector: baseSelectors.button,text: Constants.translation.reactRemoteButtonFr})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.translation.reactRemoteButtonEn})

        basePage.checkElementContainText({
            selector: baseSelectors.appId, 
            text: Constants.translation.reactRemoteTitleEn
        })
        basePage.checkElementContainText({
            selector: baseSelectors.appId, 
            text: Constants.translation.reactRemoteTextEn
        })
    })
})
