import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appName: Constants.elementsText.sharedContextApp1H2,
        buttonEm: Constants.elementsText.sharedRoutes2HomeButtonEM,
        buttonAbout: Constants.elementsText.sharedRoutes2AboutButtonEM,
        host: 3001
    },

    {
        appName: Constants.elementsText.sharedContextApp2H2,
        buttonEm: Constants.elementsText.sharedRoutes2AboutButtonEM,
        buttonAbout: Constants.elementsText.sharedRoutes2HomeButtonEM,
        host: 3002
    }
]

appsData.forEach((
    property: {
        appName: string,
        host: number,
        buttonEm: string,
        buttonAbout: string
    }
    ) => {
    describe(`Check Shared-routes ${property.appName} starts and running`, () => {
        before(() => {
            basePage.openLocalhost(property.host)
        })

        it (`Check ${property.appName} UI and buttons Home, About`, () => {
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: property.appName
            })
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: Constants.tabsNames.homeTab
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: Constants.elementsText.sharedRoutes2HomeButtonH1
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h2,
                text: Constants.elementsText.sharedRoutes2HomeButtonH2
            })
            if(property.host==3001){
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.emphasis,
                    text: property.buttonEm
                })
            }else{
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.emphasis,
                    text: property.buttonAbout
                })
            }
            basePage.clickElementWithText({
                selector: baseSelectors.linkTag,
                text: Constants.tabsNames.aboutTab
            })
            basePage.checkElementWithTextPresence({
                selector: baseSelectors.h1,
                text: Constants.elementsText.sharedRoutes2AboutButtonH1
            })
            if(property.host==3001){
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.emphasis,
                    text: property.buttonAbout
                })
            }else{
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.emphasis,
                    text: property.buttonEm
                })
            }

        })
    })
    }

)
