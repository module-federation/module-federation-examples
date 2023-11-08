import { BaseMethods } from "../../../cypress-e2e/common/base";
import {selectors, updatedSelectors} from "../../../cypress-e2e/common/selectors";

const basePage: BaseMethods = new BaseMethods()

describe('CRA React App Rewired', () => {
    context("It checks host app", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3000
            })
        })
    
        it('Checks imported remote component visibility', () => {
            basePage.checkElementVisibility({
                selector: selectors.craReactRewiredApp.componentInfo,
            })
        })
    
        it('Checks imported remote component block includes red border', () => {
            basePage.checkElementVisibility({
                selector: updatedSelectors.craReactAppRewiredApp.componentBorder,
            })
        })
    })
})
