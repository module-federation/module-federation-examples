import { BaseMethods } from '../../../../cypress/common/base';
import { baseSelectors } from '../../../../cypress/common/selectors';
import { Constants } from '../../../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

describe("Check Webpack Remote", () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.Nested)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.Nested)
        // })

    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Check elements exist', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.remoteButton
        })    
    })
})