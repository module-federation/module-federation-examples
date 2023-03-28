import { baseSelectors, selectors } from './../../cypress/common/selectors';
import { Constants } from './../../cypress/fixtures/constants';
import { BaseMethods } from "../../cypress/common/base";

const basePage: BaseMethods = new BaseMethods()

const appsData = [
    {
        headerText: Constants.elementsText.differentReactVersionsIsolatedApp.headers.app1,
        appName: Constants.commonConstantsData.commonCountAppNames.app1,
        buttonName: Constants.updatedConstantsData.commonAppWithButton.app2,
        host: 3001
    },
    {
        headerText: Constants.elementsText.differentReactVersionsIsolatedApp.headers.app2,
        appName: Constants.commonConstantsData.commonCountAppNames.app2,
        buttonName: Constants.updatedConstantsData.commonAppWithButton.app2,
        host: 3002
    }
]

appsData.forEach((
    property: {
        headerText: string,
        appName: string,
        buttonName: string
        host: number
    }
) => {
    describe('Different React Versions Isolated', () => {
        context(`Check ${property.appName}`, () => {
            beforeEach(() => {
                basePage.openLocalhost({
                    number: property.host
                })
            })
        
            it(`Check ${property.appName} have ${property.headerText} header`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: property.headerText
                })
            })
        
            it(`Check ${property.appName} have ${property.appName} subheader`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: property.appName
                })
            })
    
            it(`Check ${property.appName} have ${property.buttonName} button`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: property.buttonName
                })
            })
        
        
            it(`Check Apps share div with React version 16.14.0`, () => {
                basePage.checkElementVisibility({
                    selector: selectors.differentReactVersionsIsolatedApp.sharedBlock,
                })
                if(property.host === 3001) {
                    basePage.openLocalhost({
                        number: 3002
                    })
                } else {
                    basePage.openLocalhost({
                        number: 3001
                    })
                }
                basePage.checkElementVisibility({
                    selector: selectors.differentReactVersionsIsolatedApp.sharedBlock,
                }) 
            })
    
            if(property.host === 3001) {
                it(`Check ${property.appName} inject React version 16.14.0 block into a div parent element`, () => {
                    basePage.checkElementVisibility({
                        parentSelector: baseSelectors.tags.coreElements.div,
                        selector: selectors.differentReactVersionsIsolatedApp.sharedBlock,
                    })
                    basePage.checkElementVisibility({
                        selector: selectors.differentReactVersionsIsolatedApp.divParent,
                    })
                })
            } else {
                it(`Check ${property.appName} didn't inject React version 16.14.0 block into a div parent element`, () => {
                    basePage.checkElementVisibility({
                        parentSelector: baseSelectors.tags.coreElements.div,
                        selector: selectors.differentReactVersionsIsolatedApp.sharedBlock,
                    })
                    basePage.checkElementVisibility({
                        selector: selectors.differentReactVersionsIsolatedApp.sharedBlock,
                    })
                    basePage.checkElementVisibility({
                        selector: selectors.differentReactVersionsIsolatedApp.divParent,
                        isVisible: false
                    })
                })
            }
        
            it(`Check React version 16.14.0 block`, () => {
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h1,
                    text: Constants.elementsText.differentReactVersionsIsolatedApp.headers.app2,
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.headers.h2,
                    text: Constants.commonConstantsData.commonCountAppNames.app2
                })
                basePage.checkElementWithTextPresence({
                    selector: baseSelectors.tags.coreElements.button,
                    text: Constants.updatedConstantsData.commonAppWithButton.app2
                })
            })
        })
    })
})
