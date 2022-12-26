import {BaseMethods} from "../../../cypress/common/base";
import {baseSelectors} from "../../../cypress/common/selectors";
import {Constants} from "../../../cypress/fixtures/constants";
import base = Mocha.reporters.base;
const basePage: BaseMethods = new BaseMethods()
const appsData = [
    {
        appName: Constants.elementsText.reactHostNextJsRemoteHeader,
        appNav: Constants.elementsText.reactHostNextJsRemoteNav,
        host: 8080
    }
]

appsData.forEach((
    property: {
        appName: string,
        appNav: string,
        host: number
    }
)=>{
    describe(`Check ${property.appName} starts and running`, () => {
        before(()=> {
            basePage.openLocalhost(8080)
        })
        it(`Check Host ${property.appName} UI elements`, ()=> {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.divElement,
                text: property.appName
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.navigation,
                text: property.appNav
            })
        })
        it(`Check Remote ${property.appName} starts and running`, () => {
            basePage.openLocalhost(8081)
        })
    })
})