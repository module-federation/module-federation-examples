import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import { CssAttr } from '../../cypress/types/cssAttr';

const basePage: BaseMethods = new BaseMethods()

describe("Nested", () => {
    // TODO cy.exec don't build the apps correctly cause lerna executes without exit code. Uncomment after fix this issue!
        // before(() => {
        //     basePage.buildTheSample(Constants.samplesPath.Nested)
        // })

        // after(() => {
        //     basePage.shutdownTheSample(Constants.samplesPath.Nested)
        // })
    context("Check App 1", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3001
            })
        })
    
        it('Check elements exist', () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.updatedConstantsData.commonAppWithButton.app3})
                
            basePage.checkElementContainText({
                selector: baseSelectors.ids.root,
                text: Constants.elementsText.nestedApp.app2Container
            })
            basePage.checkElementContainText({
                selector: baseSelectors.ids.root,
                text: Constants.elementsText.nestedApp.app1Text
            })
        })
    
        it('Check colors', () => {
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.div,
                text: Constants.elementsText.nestedApp.app2Container,
                prop: CssAttr.backgroundColor,
                value: Constants.color.chineseSilver
            })
            basePage.checkElementHaveProperty({
                selector: baseSelectors.tags.coreElements.button,
                text: Constants.updatedConstantsData.commonAppWithButton.app3,
                prop: CssAttr.background,
                value: Constants.color.aquamarine
            })
        })
    })
})
