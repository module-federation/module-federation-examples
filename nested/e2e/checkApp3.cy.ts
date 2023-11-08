import { BaseMethods } from '../../cypress-e2e/common/base';
import { baseSelectors } from '../../cypress-e2e/common/selectors';
import { Constants } from '../../cypress-e2e/fixtures/constants';
import { CssAttr } from '../../cypress-e2e/types/cssAttr';

const basePage: BaseMethods = new BaseMethods()

describe("Nested", () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.Nested)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.Nested)
        // })
    context('Check App 3', () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3003
            })
        })
    
        it('Check button exists', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.updatedConstantsData.commonAppWithButton.app3})
        })
    
        it('Check button color', () => {
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.updatedConstantsData.commonAppWithButton.app3,
                prop: CssAttr.background,
                value: Constants.color.aquamarine
            })
        })
    })
})
