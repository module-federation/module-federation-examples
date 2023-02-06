import { BaseMethods } from '../../cypress/common/base';
import { baseSelectors } from '../../cypress/common/selectors';
import { Constants } from '../../cypress/fixtures/constants';
import {CssAttr} from "../../cypress/types/cssAttr";

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
            selector: baseSelectors.tags.coreElements.button,
            text: Constants.elementsText.nextJsReactApp.buttons.remote})
    })

    it('Check button color', () => {
        basePage.checkElementHaveProperty({
            selector: baseSelectors.tags.coreElements.button,
            text: Constants.elementsText.nextJsReactApp.buttons.remote,
            prop: CssAttr.background,
            value: Constants.color.darkMutedBlue
        })
    })
})
