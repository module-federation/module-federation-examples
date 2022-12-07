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
        basePage.openLocalhost(3000)
    })

    it('Check the content exist on Next host', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.nextHostButtonEn})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.nextHostTextEn)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.nextHostTitleEn)

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonEn})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTitleEn)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTextEn)
    })

    it('Check the language is changed from Next section', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.section,
            text: Constants.translation.nextHostButtonEn})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.nextHostButtonFr})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.nextHostTextFr)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.nextHostTitleFr)

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonFr})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTitleFr)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTextFr)

        basePage.clickElementWithText({
            selector: baseSelectors.section,
            text: Constants.translation.nextHostButtonFr})

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.nextHostButtonEn})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.nextHostTextEn)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.nextHostTitleEn)

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
            text: Constants.translation.nextHostButtonFr})

        basePage.checkElementContainText(baseSelectors.section, Constants.translation.nextHostTextFr)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.nextHostTitleFr)

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
            text: Constants.translation.nextHostButtonEn})
            
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.nextHostTextEn)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.nextHostTitleEn)

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.section,
            text: Constants.translation.reactRemoteButtonEn})
            
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTitleEn)
        basePage.checkElementContainText(baseSelectors.section, Constants.translation.reactRemoteTextEn)
    })
})
