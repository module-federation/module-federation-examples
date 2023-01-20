import { BaseMethods } from "../../../cypress/common/base";
import {selectors} from "../../../cypress/common/selectors";

const basePage: BaseMethods = new BaseMethods()

describe("It checks remote app", () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Checks that remote app message changes after import into host app', () => {
        basePage.compareInfoBetweenHosts(selectors.craReactAppRemoteComponentInfo, 3000, false)
    })
})
