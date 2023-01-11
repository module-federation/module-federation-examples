import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

describe("Check host app", () => {

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
        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.commonText.nextJSButton,
            prop: Constants.commonText.background,
            value: Constants.color.lightSaturatedYellow
        })

        cy.wait(200)

        basePage.checkElementWithTextHaveProperty({
            selector: baseSelectors.button,
            text: Constants.commonText.remoteButton,
            prop: Constants.commonText.background,
            value: Constants.color.darkMutedBlue
        })
    })
})
