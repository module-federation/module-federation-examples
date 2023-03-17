import {BaseMethods} from "../../cypress/common/base";
import {baseSelectors} from "../../cypress/common/selectors";
import {Constants} from "../../cypress/fixtures/constants";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        appName: Constants.commonConstantsData.commonCountAppNames.app1,
        buttonEm: Constants.elementsText.sharedRoutes2App.buttons.homeButtons.em,
        buttonAbout: Constants.elementsText.sharedRoutes2App.buttons.aboutButtons.em,
        host: 3001
    },

    {
        appName: Constants.commonConstantsData.commonCountAppNames.app2,
        buttonEm: Constants.elementsText.sharedRoutes2App.buttons.aboutButtons.em,
        buttonAbout: Constants.elementsText.sharedRoutes2App.buttons.homeButtons.em,
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
    describe('Shared Routes 2', () => {
        context(`Check Shared-routes ${property.appName} starts and running`, () => {
            before(() => {
                basePage.openLocalhost({
                    number: property.host
                })
            })
    
            it (`Check ${property.appName} UI and buttons Home, About`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: property.appName
                })
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.link,
                    text: Constants.commonConstantsData.home
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: Constants.elementsText.sharedRoutes2App.buttons.homeButtons.h1
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: Constants.elementsText.sharedRoutes2App.buttons.homeButtons.h2
                })
                if(property.host==3001){
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.emphasis,
                        text: property.buttonEm
                    })
                }else{
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.emphasis,
                        text: property.buttonAbout
                    })
                }
                basePage.clickElementWithText({
                    selector: baseSelectors.tags.coreElements.link,
                    text: Constants.elementsText.vue3CliDemoApp.aboutTab
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: Constants.elementsText.sharedRoutes2App.buttons.aboutButtons.h1
                })
                if(property.host==3001){
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.emphasis,
                        text: property.buttonAbout
                    })
                }else{
                    basePage.checkElementWithTextPresence({
                        selector: baseSelectors.tags.emphasis,
                        text: property.buttonEm
                    })
                }
    
            })
        })
    })
})
