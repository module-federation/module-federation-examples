import { BaseMethods } from "../../../cypress-e2e/common/base";
import {selectors} from "../../../cypress-e2e/common/selectors";

const basePage: BaseMethods = new BaseMethods()

describe('CRA React App Rewired', () => {
    context("It checks remote app", () => {
        beforeEach(() => {
            basePage.openLocalhost({
                number: 3001
            })
        })
    
        it('Checks that remote app message changes after import into host app', () => {
            basePage.compareInfoBetweenHosts(selectors.craReactRewiredApp.componentInfo, 3000, false)
        })
    })
})
