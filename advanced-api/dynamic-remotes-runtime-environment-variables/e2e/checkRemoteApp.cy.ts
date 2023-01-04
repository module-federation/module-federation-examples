import { BaseMethods } from '../../../cypress/common/base';
import { baseSelectors } from '../../../cypress/common/selectors';
import { Constants } from '../../../cypress/fixtures/constants';
import {getDateWithFormat} from "../../../cypress/helpers/base-helper";

const basePage: BaseMethods = new BaseMethods()

describe('Check HOST APP', () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })
    it('Check header presence', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h1,
            text: Constants.elementsText.dynamicSystemHostHeader
        })

    })

    it('Check subheader h2 presence', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.dynamicSystemRemoteHeaderH2
        })
    })


    it('Check widget', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.divElement,
            text: Constants.elementsText.dynamicSystemHostLoading,
            isVisible: false
        })

        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.dynamicSystemHostButtonH2
        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h2,
            text: Constants.elementsText.dynamicSystemHostButtonH2Second

        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.dynamicSystemHostButtonParagraph

        })
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm:ss a')
        })
    })

})