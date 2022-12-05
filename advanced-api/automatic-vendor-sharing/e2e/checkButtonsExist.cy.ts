import { BaseMethods } from '../../../cypress/common/base';
import { baseSelectors } from '../../../cypress/common/selectors';

const basePage: BaseMethods = new BaseMethods()

describe("Check button exist", () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Check buttons exist', () => {
        basePage.checkElementWithTextPresence(baseSelectors.button, 'App 1 Button')
        basePage.checkElementWithTextPresence(baseSelectors.button, 'App 2 Button')
    })
})
