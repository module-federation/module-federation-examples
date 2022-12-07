import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

describe("Check host app", () => {

    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.nextjsReact)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.nextjsReact)
        // })

    beforeEach(() => {
        basePage.openLocalhost(3000)
    })

    it('Check buttons exist', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.nextJSButton})

        cy.wait(200)

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.remoteButton})
    })

    it('Check button color', () => {
        basePage.checkElementWithTextHaveCssProperty(
            baseSelectors.button,
            Constants.commonText.nextJSButton,
            Constants.commonText.background,
            Constants.color.lightSaturatedYellow)

        cy.wait(200)

        basePage.checkElementWithTextHaveCssProperty(
            baseSelectors.button,
            Constants.commonText.remoteButton,
            Constants.commonText.background,
            Constants.color.darkMutedBlue)
    })
})
