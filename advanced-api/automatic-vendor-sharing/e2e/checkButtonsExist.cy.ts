import { BaseMethods } from '../../../cypress/common/base';
import { Base } from '../../../cypress/common/selectors';

const basePage: BaseMethods = new BaseMethods()

describe("Check button exist", () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it('Check buttons exist', () => {
        basePage.checkElementExistWithText(Base.button, 'App 1 Button')
        basePage.checkElementExistWithText(Base.button, 'App 2 Button')
    })
})
