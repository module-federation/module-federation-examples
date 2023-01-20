import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

describe("Check remote app", () => {

        // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.nextjsReact)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.nextjsReact)
        // })

    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Check button exists', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.commonText.remoteButton})
    })

    it('Check button color', () => {
        basePage.checkElementWithTextHaveProperty( {
            selector: baseSelectors.button,
            text: Constants.commonText.remoteButton,
            prop: Constants.commonText.background,
            value: Constants.color.darkMutedBlue
        })
    })
})
