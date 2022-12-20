import { BaseMethods } from '../../../cypress/common/base';
import { baseSelectors } from '../../../cypress/common/selectors';
import { Constants } from '../../../cypress/fixtures/constants';
import {getDateWithFormat} from "../../../cypress/helpers/base-helper";
import * as constants from "constants";

const basePage: BaseMethods = new BaseMethods()

describe('Check HOST APP', () => {
    beforeEach(() => {
        basePage.openLocalhost(3000)
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
            text: Constants.elementsText.dynamicSystemHostHeaderH2

        })
    })

    it('Check subheader h3 precense', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.h3,
            text: Constants.elementsText.dynamicSystemHostHeaderH3

        })
    })

    it('Check paragraph precense', () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.paragraph,
            text: Constants.elementsText.dynamicSystemHostParagraph

        })
    })

    it('Check button Load Remote Widget exists and clickable', () => {
        basePage.clickElementWithText({
            selector: baseSelectors.button,
            text: Constants.elementsText.dynamicSystemHostButton

        })

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
