import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";
const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        header: Constants.elementsText.sharedContextApp.header,
        subheader: Constants.commonConstantsData.commonCountAppNames.app1,
        paragraph: Constants.elementsText.sharedContextApp.app1.paragraph,
        host: 3001
    },

    {
        header: Constants.elementsText.sharedContextApp.header,
        subheader: Constants.commonConstantsData.commonCountAppNames.app2,
        paragraph: Constants.elementsText.sharedContextApp.app2.paragraph,
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
    describe('Shared Context', () => {
        context(`Check ${property.subheader}`, () => {
            beforeEach(() => {
                basePage.openLocalhost({
                    number: property.host
                })
            })
            it (`Check ${property.subheader} elements (header, subHeader, paragraph)`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: property.header
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: property.subheader
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.paragraph,
                    text: property.paragraph
                })
            })
        })
    })
})

