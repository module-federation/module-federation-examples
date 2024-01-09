import { BaseMethods } from '../../cypress-e2e/common/base';
import { baseSelectors } from '../../cypress-e2e/common/selectors';
import { Constants } from '../../cypress-e2e/fixtures/constants';

const basePage: BaseMethods = new BaseMethods();

describe("React HMR", () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.react-livereload)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.react-livereload)
        // })
    context('Check remote app', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3001
            })
        })

        it('Check the content of the page exists', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.elementsText.reactHmrApp.remote.button})

            basePage.checkElementContainText({
                selector: baseSelectors.tags.headers.h1,
                text: Constants.elementsText.reactHmrApp.remote.text + 0
            })
        })

        it('Check the button works', () => {
            for (let i = 1 ; i < 3; i++){
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.elementsText.reactHmrApp.remote.button})

                basePage.checkElementContainText({
                    selector: baseSelectors.tags.headers.h1,
                    text: Constants.elementsText.reactHmrApp.remote.text + i
                })
            }
        })
    })
})
