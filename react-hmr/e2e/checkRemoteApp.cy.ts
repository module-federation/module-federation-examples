import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods();

describe("Check remote app", () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.react-hmr)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.react-hmr)
        // })

    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Check the content of the page exists', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.button,
            text: Constants.elementsText.reactHmrRemoteButton})

        basePage.checkElementContainText(baseSelectors.h1, Constants.elementsText.reactHmrRemoteText + 0)
    })

    it('Check the button works', () => {
        for (let i = 1 ; i < 3; i++){
            basePage.clickElementWithText({
                selector: baseSelectors.button,
                text: Constants.elementsText.reactHmrRemoteButton})

            basePage.checkElementContainText(baseSelectors.h1, Constants.elementsText.reactHmrRemoteText + i)
        }
    })   
})
