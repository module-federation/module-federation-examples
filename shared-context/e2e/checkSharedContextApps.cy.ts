import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";
const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        header: Constants.elementsText.sharedContext.header,
        subheader: Constants.elementsText.sharedContext.app1.subheader,
        paragraph: Constants.elementsText.sharedContext.app1.paragraph,
        host: 3001
    },

    {
        header: Constants.elementsText.sharedContext.header,
        subheader: Constants.elementsText.sharedContext.app2.subheader,
        paragraph: Constants.elementsText.sharedContext.app2.paragraph,
        host: 3002
    }
]

appsData.forEach((
    property: {
        header: string,
        subheader: string,
        paragraph: string,
        host: number
    }
) => {
    describe(`Check ${property.subheader}`, () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host)
        })
        it (`Check ${property.subheader} elements (header, subHeader, paragraph)`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: property.header
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h2,
                text: property.subheader
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.paragraph,
                text: property.paragraph
            })
        })
    })
})

