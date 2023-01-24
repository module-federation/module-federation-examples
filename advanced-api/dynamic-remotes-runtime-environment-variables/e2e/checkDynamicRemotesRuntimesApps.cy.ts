import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import {getDateWithFormat} from "../../../cypress/helpers/base-helper";
const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        header: Constants.elementsText.dynamicSystemRemotesRuntime.host.header,
        subheader: Constants.elementsText.dynamicSystemRemotesRuntime.host.subHeader,
        hostH3: Constants.elementsText.dynamicSystemRemotesRuntime.host.hostH3,
        paragraph: Constants.elementsText.dynamicSystemRemotesRuntime.paragraph,
        button: Constants.elementsText.dynamicSystemRemotesRuntime.host.button,
        loading: Constants.elementsText.dynamicSystemRemotesRuntime.loading,
        buttonHeader: Constants.elementsText.dynamicSystemRemotesRuntime.buttonHeader,
        buttonH2: Constants.elementsText.dynamicSystemRemotesRuntime.buttonH2,
        buttonParagraph: Constants.elementsText.dynamicSystemRemotesRuntime.buttonParagraph,
        host: 3000
    },
    {
        header: Constants.elementsText.dynamicSystemRemotesRuntime.host.header,
        subheader: Constants.elementsText.dynamicSystemRemotesRuntime.remote.subHeader,
        loading: Constants.elementsText.dynamicSystemRemotesRuntime.loading,
        buttonHeader: Constants.elementsText.dynamicSystemRemotesRuntime.buttonHeader,
        buttonH2: Constants.elementsText.dynamicSystemRemotesRuntime.buttonH2,
        buttonParagraph: Constants.elementsText.dynamicSystemRemotesRuntime.buttonParagraph,
        host: 3001
    }
]

appsData.forEach((
    property: {
        header: string,
        subheader: string,
        hostH3?: string,
        paragraph?: string,
        button?: string,
        loading: string,
        buttonHeader: string,
        buttonH2: string,
        buttonParagraph: string,
        host: number
    }
) => {
    describe(`Check Host and Remote apps`, () => {
        beforeEach(() => {
            basePage.openLocalhost(property.host)
        })

        it (`Check ${property.subheader} app Widget functionality and application elements`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: property.header
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h2,
                text: property.subheader
            })
            if (property.host === 3000) {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.h3,
                    text: property.hostH3
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.paragraph,
                    text: property.paragraph
                })
                basePage.clickElementWithText({
                    selector: baseSelectors.button,
                    text: String(property.button)
                })
            }
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.loading
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.loading,
                isVisible: false
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h2,
                text: property.buttonHeader
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h2,
                text: property.buttonH2
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.paragraph,
                text: property.buttonParagraph
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.paragraph,
                text: getDateWithFormat('current', 'MMMM Do YYYY, h:mm')
            })
        })
    })
})

