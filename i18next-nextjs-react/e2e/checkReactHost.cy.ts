import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

describe("Check Next host", () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.i18nextNextjsReact)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.i18nextNextjsReact)
        // })

    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Check the content exist on React host', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactHostButtonEn})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactHostTextEn)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactHostTitleEn)

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonEn})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTitleEn)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTextEn)
    })

    it('Check the language is changed from Next section', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.section,
            text: Constants.translation.reactHostButtonEn})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactHostButtonFr})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactHostTextFr)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactHostTitleFr)

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonFr})
            
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTitleFr)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTextFr)

        basePage.clickElementWithText({
            selector: baseSelectors.section,
            text: Constants.translation.reactHostButtonFr})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactHostButtonEn})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactHostTextEn)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactHostTitleEn)

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonEn})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTitleEn)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTextEn)
    })

    it('Check the language is changed from remote child section', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonEn})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactHostButtonFr})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactHostTextFr)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactHostTitleFr)

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonFr})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTitleFr)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTextFr)
        
        basePage.clickElementWithText({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonFr})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactHostButtonEn})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactHostTextEn)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactHostTitleEn)

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonEn})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTitleEn)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTextEn)
    })
})
