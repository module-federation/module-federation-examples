import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";
const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        header1: Constants.elementsText.umdFederationApp.App1.firstHeader,
        header2: Constants.elementsText.umdFederationApp.App1.secondHeader,
        header3: Constants.elementsText.umdFederationApp.App1.thirdHeader,
        host: 9001
    },

    {
        host: 9002
    }
]

appsData.forEach((
    property: {
        header1?: string,
        header2?: string,
        header3?: string,
        host: number
    }
) => {
    describe(`UMD Federation`, () => {
        context(`Check app1 and app2 starts and running + emenets exist on the page`, () => {
            beforeEach(()=> {
                basePage.openLocalhost({
                    number: property.host
                })
            })
            it (`Check App1 elements`, () => {
                basePage.skipTestByCondition(property.host === 9002)
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: String(property.header1)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: String(property.header2)
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: String(property.header3)
                })
            })
            it (`Check App URL`, () => {
                basePage.checkUrlText(`http://localhost:${property.host}/`, true)
            })
        })
    })
})
