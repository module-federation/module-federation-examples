import { BaseMethods } from "../../../cypress/common/base";
import {selectors, updatedSelectors} from "../../../cypress/common/selectors";

const basePage: BaseMethods = new BaseMethods()

describe("It checks host app", () => {
    beforeEach(() => {
        basePage.openLocalhost(3000)
    })

    it('Checks imported remote component visibility', () => {
        basePage.checkElementVisibility(selectors.craReactRewiredApp.componentInfo)
    })

    it('Checks imported remote component block includes red border', () => {
        basePage.checkElementVisibility(updatedSelectors.craReactAppRewiredApp.componentBorder)
    })
})
